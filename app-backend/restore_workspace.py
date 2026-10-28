"""Restore one Calma workspace recovery bundle into an existing Calma data directory."""
import argparse
from contextlib import closing
import hashlib
import json
import os
import re
import shutil
import secrets
import sqlite3
import sys
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path

import server


def digest(path):
    h = hashlib.sha256()
    with Path(path).open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def rows(db, table):
    with closing(sqlite3.connect(db)) as conn:
        conn.row_factory = sqlite3.Row
        return [dict(row) for row in conn.execute(f"SELECT * FROM {table}")]


def restore(bundle, replace_existing=False):
    bundle = Path(bundle).resolve()
    expected = {"workspace.sqlite3", "identity.sqlite3", "manifest.json", "RESTORE.txt"}
    temp_paths = []
    target = None
    with zipfile.ZipFile(bundle) as archive:
        listed_names = archive.namelist()
        if len(listed_names) != len(set(listed_names)) or set(listed_names) != expected:
            raise ValueError("Recovery bundle has unexpected or missing files.")
        if any(archive.getinfo(name).file_size > 2_000_000_000 for name in expected):
            raise ValueError("Recovery bundle exceeds the 2 GB per-file limit.")
        if archive.getinfo("manifest.json").file_size > 1_000_000:
            raise ValueError("Recovery manifest exceeds size limit.")
        manifest = json.loads(archive.read("manifest.json"))
        if manifest.get("format") != "calma-workspace-recovery-v1":
            raise ValueError("Unsupported recovery bundle format.")
        try:
            temp = {}
            for name in ("workspace.sqlite3", "identity.sqlite3"):
                with tempfile.NamedTemporaryFile(prefix="calma-restore-", suffix=".sqlite3", dir=server.DATA, delete=False) as stream:
                    temp[name] = Path(stream.name)
                    temp_paths.append(Path(stream.name))
                    with archive.open(name) as source:
                        shutil.copyfileobj(source, stream, 1024 * 1024)
            for name in ("workspace.sqlite3", "identity.sqlite3"):
                if digest(temp[name]) != manifest.get("files", {}).get(name):
                    raise ValueError(f"Checksum mismatch: {name}.")
            with closing(sqlite3.connect(temp["workspace.sqlite3"])) as check:
                if check.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
                    raise ValueError("Workspace database failed SQLite integrity check.")
            with closing(sqlite3.connect(temp["identity.sqlite3"])) as check:
                if check.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
                    raise ValueError("Identity database failed SQLite integrity check.")
                workspaces = check.execute("SELECT id,name FROM workspaces").fetchall()
                if len(workspaces) != 1 or workspaces[0][0] != manifest.get("workspace_id") or workspaces[0][1] != manifest.get("workspace_name"):
                    raise ValueError("Identity bundle does not match its manifest.")

            workspace_id = manifest["workspace_id"]
            if not isinstance(workspace_id, str) or not re.fullmatch(r"[a-f0-9]{32}", workspace_id):
                raise ValueError("Manifest workspace ID is invalid.")
            if not isinstance(manifest.get("workspace_name"), str) or not manifest["workspace_name"]:
                raise ValueError("Manifest workspace name is invalid.")
            server.init_identity()
            server.WORKSPACES.mkdir(parents=True, exist_ok=True)
            stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
            target = (server.WORKSPACES / f"{workspace_id}-restored-{stamp}-{secrets.token_hex(4)}.sqlite3").resolve()
            if target.exists():
                raise FileExistsError("Restore target already exists; retry with a new timestamp.")
            shutil.copy2(temp["workspace.sqlite3"], target)
            try:
                server.init(target)
                if not os.getenv("CALMA_ENCRYPTION_KEY"):
                    raise ValueError("Matching CALMA_ENCRYPTION_KEY is missing. Restore the original .env first.")
                from cryptography.fernet import Fernet, InvalidToken
                cipher = Fernet(os.environ["CALMA_ENCRYPTION_KEY"].encode())
                with server.conn(target) as tenant:
                    encrypted = [row[0] for row in tenant.execute("SELECT value_ciphertext FROM integration_secrets")]
                try:
                    for value in encrypted:
                        cipher.decrypt(value.encode())
                except InvalidToken as exc:
                    raise ValueError("CALMA_ENCRYPTION_KEY does not match workspace provider credentials.") from exc
                exported = {
                    table: rows(temp["identity.sqlite3"], table)
                    for table in ("workspaces", "users", "sessions", "invites", "qr_tokens", "webhook_routes", "billing_subscriptions")
                }
                exported["workspaces"][0]["db_path"] = str(target)
                member_ids = {user["id"] for user in exported["users"]}
                if not exported["users"] or any(session["user_id"] not in member_ids for session in exported["sessions"]):
                    raise ValueError("Identity records are incomplete.")
                with server.identity_conn() as identity:
                    identity.execute("PRAGMA foreign_keys=ON")
                    identity.execute("BEGIN IMMEDIATE")
                    existing = identity.execute("SELECT id FROM workspaces WHERE id=?", (workspace_id,)).fetchone()
                    if existing and not replace_existing:
                        raise ValueError("Workspace already exists. Stop Calma and rerun with --replace-existing to restore over it.")
                    if existing:
                        identity.execute("DELETE FROM invites WHERE workspace_id=?", (workspace_id,))
                        identity.execute("DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE workspace_id=?)", (workspace_id,))
                        identity.execute("DELETE FROM qr_tokens WHERE workspace_id=?", (workspace_id,))
                        identity.execute("DELETE FROM webhook_routes WHERE workspace_id=?", (workspace_id,))
                        identity.execute("DELETE FROM billing_subscriptions WHERE workspace_id=?", (workspace_id,))
                        identity.execute("DELETE FROM users WHERE workspace_id=?", (workspace_id,))
                        identity.execute("DELETE FROM workspaces WHERE id=?", (workspace_id,))
                    for table in ("workspaces", "users", "sessions", "invites", "qr_tokens", "webhook_routes", "billing_subscriptions"):
                        for item in exported[table]:
                            columns = list(item)
                            marks = ",".join("?" for _ in columns)
                            identity.execute(f"INSERT INTO {table} ({','.join(columns)}) VALUES ({marks})", [item[key] for key in columns])
                return {"workspace_id": workspace_id, "workspace_name": manifest["workspace_name"], "database": str(target), "members": len(exported["users"])}
            except Exception:
                target.unlink(missing_ok=True)
                raise
        except Exception:
            if target and target.exists():
                target.unlink(missing_ok=True)
            raise
        finally:
            for path in temp_paths:
                path.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description="Restore a Calma workspace recovery bundle.")
    parser.add_argument("bundle", help="Path to the .zip recovery bundle")
    parser.add_argument("--replace-existing", action="store_true", help="Replace identity records for matching workspace ID; keeps prior database file")
    args = parser.parse_args()
    if not server.DATA.exists():
        raise SystemExit("Calma data directory not found. Run this from the configured Calma installation.")
    if not server.IDENTITY_DB.exists():
        raise SystemExit("Identity database not found. Start Calma once before restoring.")
    result = restore(args.bundle, args.replace_existing)
    print(f"Restored {result['workspace_name']} ({result['workspace_id']}) with {result['members']} team accounts.")
    print(f"Workspace database: {result['database']}")
    print("Restart Calma. Keep the matching .env encryption key; provider secrets cannot be decrypted without it.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, sqlite3.Error, zipfile.BadZipFile, ValueError) as exc:
        print(f"Restore failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
