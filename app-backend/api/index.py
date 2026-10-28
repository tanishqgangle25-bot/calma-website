"""Vercel entry point for Calma's existing HTTP application."""
import os
import sys
import threading
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlsplit

# Vercel functions have ephemeral, read-only application filesystems. Calma
# keeps persistent state in PostgreSQL; /tmp is only for request temp files.
os.environ.setdefault("CALMA_DEPLOY_TARGET", "vercel")
os.environ.setdefault("CALMA_DATA_DIR", "/tmp/calma")
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from server import (  # noqa: E402
    App,
    auth_production_check,
    init_identity,
    init_workspaces,
    migrate_legacy_identity,
    sync_webhook_routes,
)

_initialized = False
_init_lock = threading.Lock()


def _ensure_initialized():
    global _initialized
    if _initialized:
        return
    with _init_lock:
        if _initialized:
            return
        auth_production_check()
        init_identity()
        migrate_legacy_identity()
        init_workspaces()
        sync_webhook_routes()
        _initialized = True


class handler(App):
    """Vercel's BaseHTTPRequestHandler-compatible request entry point."""

    def parse_request(self):
        if not super().parse_request():
            return False
        parsed = urlsplit(self.path)
        routed_path = parse_qs(parsed.query, keep_blank_values=True).pop("__calma_path", [None])[0]
        if routed_path:
            query = parse_qs(parsed.query, keep_blank_values=True)
            query.pop("__calma_path", None)
            suffix = urlencode(query, doseq=True)
            self.path = routed_path + ("?" + suffix if suffix else "")
        return True

    def __init__(self, *args, **kwargs):
        _ensure_initialized()
        super().__init__(*args, **kwargs)
