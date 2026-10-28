"""Auth regressions. PostgreSQL coverage requires an empty dedicated test database."""
import contextvars
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
import json
import os
from pathlib import Path
import sys
import shutil
import uuid
import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / '.runtime-deps'))
import server
from cryptography.fernet import Fernet


class BrowserResponse:
    def __init__(self, cookie=''):
        self.headers = {'Cookie': cookie}
        self.client_address = ('127.0.0.1', 12345)
        self.sent = []

    def send_response(self, status):
        self.status = status

    def send_header(self, key, value):
        self.sent.append((key, value))

    def end_headers(self):
        pass


class OriginProbe:
    def __init__(self, host, origin):
        self.headers = {'Host': host, 'Origin': origin}
        self.client_address = ('127.0.0.1', 12345)
        self.path = '/api/auth/login'
        self.result = None

    def out(self, status, body):
        self.result = (status, body)


class IsolatedAuth(unittest.TestCase):
    def setUp(self):
        parent = ROOT / '.auth-test-data'
        parent.mkdir(exist_ok=True)
        root = parent / ('auth-' + uuid.uuid4().hex)
        root.mkdir()
        self.addCleanup(shutil.rmtree, root)
        workspace_dir = root / 'workspaces'
        workspace_dir.mkdir()
        self.environment = patch.dict(os.environ, {
            **{key: '' for key in server.INTEGRATION_FIELDS},
            'CALMA_ENV': 'development', 'DATABASE_URL': '',
            'CALMA_ENCRYPTION_KEY': Fernet.generate_key().decode(),
            'CALMA_JWT_SECRET': 'auth-regression-' + 'x' * 48,
            'CALMA_SIGNUP_ENABLED': 'true',
            'CALMA_PUBLIC_BASE_URL': 'http://127.0.0.1:4173',
            'CALMA_GOOGLE_OAUTH_CLIENT_ID': 'test-client',
            'CALMA_GOOGLE_OAUTH_CLIENT_SECRET': 'test-secret',
        })
        self.environment.start()
        self.addCleanup(self.environment.stop)
        self.paths = patch.multiple(server, DATA=root, DB=root / 'calma.sqlite3',
            IDENTITY_DB=root / 'identity.sqlite3', WORKSPACES=workspace_dir,
            REQUEST_DB=contextvars.ContextVar('auth_test_db', default=str(root / 'calma.sqlite3')),
            purge_shared_provider_values=lambda: None, sync_webhook_routes=lambda: None)
        self.paths.start()
        self.addCleanup(self.paths.stop)
        server.init()
        server.init_identity()

    def account(self, email='owner@example.test'):
        return server.create_account(email, 'a-valid-test-password-123', 'Test workspace')


class AuthSecurityTests(IsolatedAuth):
    def test_oauth_browser_binding_pkce_and_single_use(self):
        self.account()
        started = BrowserResponse()
        server.google_oauth_start(started)
        location = next(value for key, value in started.sent if key == 'Location')
        query = parse_qs(urlparse(location).query)
        state = query['state'][0]
        state_hash = hashlib.sha256(state.encode()).hexdigest()
        with server.identity_conn() as connection:
            pending = connection.execute('SELECT code_verifier FROM google_oauth_requests WHERE state_hash=?', (state_hash,)).fetchone()
        self.assertEqual(query['code_challenge_method'], ['S256'])
        self.assertEqual(query['code_challenge'][0], server._b64(hashlib.sha256(pending['code_verifier'].encode()).digest()))
        callback = {'state': [state], 'code': ['provider-code']}
        with patch.object(server.urllib.request, 'urlopen') as provider:
            with self.assertRaisesRegex(ValueError, 'browser where it started'):
                server.google_oauth_callback(BrowserResponse('calma_oauth_state=wrong-browser'), callback)
            provider.assert_not_called()
        responses = [io.BytesIO(json.dumps({'access_token': 'test-access'}).encode()),
            io.BytesIO(json.dumps({'email': 'owner@example.test', 'email_verified': True}).encode())]
        with patch.object(server.urllib.request, 'urlopen', side_effect=responses) as provider:
            completed = BrowserResponse('calma_oauth_state=' + state)
            server.google_oauth_callback(completed, callback)
            exchange = parse_qs(provider.call_args_list[0].args[0].data.decode())
            self.assertEqual(exchange['code_verifier'], [pending['code_verifier']])
            self.assertEqual(completed.status, 302)
        with self.assertRaisesRegex(ValueError, 'expired'):
            server.google_oauth_callback(BrowserResponse('calma_oauth_state=' + state), callback)

    def test_password_reset_revokes_sessions_and_cannot_repeat(self):
        self.account()
        raw, account = server.login_account('owner@example.test', 'a-valid-test-password-123')
        digest = hashlib.sha256(raw.encode()).hexdigest()
        with patch.object(server, 'auth_mail') as delivery:
            server.request_password_reset('owner@example.test')
        body = delivery.call_args.args[2]
        token = body.split('login.html?reset=')[1].split()[0]
        server.reset_password(token, 'new-valid-test-password-123')
        with server.identity_conn() as connection:
            self.assertIsNone(connection.execute('SELECT 1 FROM sessions WHERE token_hash=?', (digest,)).fetchone())
        with self.assertRaises(ValueError):
            server.reset_password(token, 'another-test-password-123')
        with self.assertRaises(ValueError):
            server.login_account('owner@example.test', 'a-valid-test-password-123')
        _, updated = server.login_account('owner@example.test', 'new-valid-test-password-123')
        self.assertEqual(updated['id'], account['id'])

    def test_invalid_roles_fail_closed(self):
        account = self.account()
        raw, _ = server.login_account('owner@example.test', 'a-valid-test-password-123')
        with server.identity_conn() as connection:
            connection.execute('UPDATE users SET role=? WHERE id=?', ('unexpected-role', account['id']))
        self.assertIsNone(server.session_user(BrowserResponse('calma_session=' + raw)))
        with self.assertRaisesRegex(ValueError, 'Account role is invalid'):
            server.login_account('owner@example.test', 'a-valid-test-password-123')

    def test_rate_limit_reservations_are_atomic(self):
        def attempt(_):
            return server.auth_rate_allowed(BrowserResponse(), True)

        with ThreadPoolExecutor(max_workers=12) as pool:
            results = list(pool.map(attempt, range(20)))
        self.assertEqual(results.count(True), 10)
        self.assertEqual(results.count(False), 10)
        with server.identity_conn() as connection:
            self.assertEqual(connection.execute('SELECT COUNT(*) FROM auth_attempts').fetchone()[0], 10)

    def test_password_login_selects_matching_workspace(self):
        first = self.account()
        second = server.create_account('owner@example.test', 'a-valid-test-password-123', 'Second workspace')
        with self.assertRaises(server.WorkspaceSelectionRequired) as caught:
            server.login_account('owner@example.test', 'a-valid-test-password-123')
        self.assertEqual({item['id'] for item in caught.exception.workspaces},
                         {first['workspace_id'], second['workspace_id']})
        raw, selected = server.login_account('owner@example.test', 'a-valid-test-password-123', second['workspace_id'])
        self.assertEqual(selected['workspace_id'], second['workspace_id'])
        self.assertEqual(server.session_user(BrowserResponse('calma_session=' + raw))['workspace_id'], second['workspace_id'])
        with self.assertRaisesRegex(ValueError, 'Email or password did not match'):
            server.login_account('owner@example.test', 'wrong-password-123', second['workspace_id'])

    def test_origin_requires_exact_scheme_host_and_port(self):
        valid = OriginProbe('127.0.0.1:4173', 'http://127.0.0.1:4173')
        self.assertTrue(server.App._check_origin(valid))
        for origin in ('http://127.0.0.1:9999', 'https://127.0.0.1:4173',
                       'http://localhost:4173'):
            with self.subTest(origin=origin):
                probe = OriginProbe('127.0.0.1:4173', origin)
                self.assertFalse(server.App._check_origin(probe))
                self.assertEqual(probe.result[0], 403)


@unittest.skipUnless(os.getenv('CALMA_AUTH_TEST_DATABASE_URL'), 'Set CALMA_AUTH_TEST_DATABASE_URL to an empty dedicated PostgreSQL database')
class PostgresMigrationTests(IsolatedAuth):
    def test_migration_preserves_tenant_data_and_runs_once(self):
        import psycopg
        database_url = os.environ['CALMA_AUTH_TEST_DATABASE_URL']
        with psycopg.connect(database_url) as target:
            if target.execute("SELECT to_regclass('public.users')").fetchone()[0] is not None:
                self.fail('PostgreSQL test database must be empty; existing identity data will not be touched.')
        account = self.account()
        raw, _ = server.login_account('owner@example.test', 'a-valid-test-password-123')
        session_hash = hashlib.sha256(raw.encode()).hexdigest()
        with server.conn(account['db_path']) as tenant:
            tenant.execute('INSERT INTO locations VALUES(?,?,?,?,?,?)', ('location-test', 'Migrated business', '', '', '', server.now()))
            tenant.execute('INSERT INTO inbox_conversations(id,channel,external_id,last_message_at,created_at,updated_at) VALUES(?,?,?,?,?,?)', ('conversation-test', 'email', 'external-test', server.now(), server.now(), server.now()))
            tenant.execute('INSERT INTO inbox_messages VALUES(?,?,?,?,?,?,?)', ('message-test', 'conversation-test', 'provider-test', 'inbound', 'Persist this message', 'received', server.now()))
        with server.identity_conn() as source:
            expected_expiry = source.execute('SELECT expires_at FROM sessions WHERE token_hash=?', (session_hash,)).fetchone()[0]
        os.environ['DATABASE_URL'] = database_url
        server.init()
        server.init_identity()
        server.migrate_legacy_identity()
        server.init_workspaces()
        with server.identity_conn() as target:
            workspace = target.execute('SELECT db_path FROM workspaces WHERE id=?', (account['workspace_id'],)).fetchone()[0]
            self.assertEqual(workspace, 'tenant_' + account['workspace_id'])
            actual_expiry = target.execute('SELECT expires_at FROM sessions WHERE token_hash=?', (session_hash,)).fetchone()[0]
            self.assertAlmostEqual(actual_expiry, expected_expiry, places=5)
            target.execute('DELETE FROM sessions WHERE token_hash=?', (session_hash,))
        with server.conn(workspace) as tenant:
            self.assertEqual(tenant.execute('SELECT comment FROM reviews LIMIT 1').fetchone(), None)
            self.assertEqual(tenant.execute('SELECT name FROM locations WHERE id=?', ('location-test',)).fetchone()[0], 'Migrated business')
            self.assertEqual(tenant.execute('SELECT body FROM inbox_messages WHERE id=?', ('message-test',)).fetchone()[0], 'Persist this message')
        server.migrate_legacy_identity()
        with server.identity_conn() as target:
            self.assertIsNone(target.execute('SELECT 1 FROM sessions WHERE token_hash=?', (session_hash,)).fetchone())
            self.assertEqual(target.execute('SELECT COUNT(*) FROM identity_migrations').fetchone()[0], 1)


if __name__ == '__main__':
    unittest.main()
