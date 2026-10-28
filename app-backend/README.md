# Calma · Customer feedback operations

This folder contains the Python application and API deployed at `app.heycalma.in`. The repository root contains the separate React marketing website.

## Run locally

```powershell
python -m pip install -r requirements.txt
python server.py
```

Open `http://127.0.0.1:4173`. First owner creates a workspace from the sign-in page. First workspace adopts existing records from `data/calma.sqlite3`; later workspaces use separate SQLite files under `data/workspaces/`. Guest QR feedback stays public and routes to the workspace that created that QR.

## Product workflows

- Google Business Profile review sync and owner-approved public replies.
- Customer QR feedback, AI review analysis, editable reply drafts, daily insights, and voice questions grounded in saved records.
- Workspace-routed WhatsApp inbox with signed/deduplicated incoming messages, AI reply drafts, and manager-approved replies.
- Follow-up action plans with teammate assignment, due dates, overdue flags, progress states, required closure outcomes, location summaries, exports, activity history, and owner-only workspace recovery bundles with checksums and a restore command.
- Business Owner and Admin team invitations with seven-day links; Admins can manage customer work and teammates; Employees have read-only access. Removed members lose active sessions.
- Email and WhatsApp alerts plus daily insight delivery use a durable, idempotent outbox with retries and delivery status.
- Owner-only Stripe Checkout and billing portal; signed, replay-protected webhook state is stored per workspace.

Connect provider credentials from each workspace's Integrations page. Calma encrypts them in that workspace database. See [SETUP.md](SETUP.md). Never paste secrets into chat or commit `.env`.

## Deployment boundary

Authentication supports password login, signed 15-minute JWT access cookies backed by revocable database sessions, Google OAuth, one-use email password resets, and Business Owner/Admin/Employee roles. Local development defaults to SQLite. Production uses PostgreSQL and HTTPS, with secrets configured in the hosting provider rather than committed to Git. See the authentication deployment section in [SETUP.md](SETUP.md).

The root marketing-site Vercel configuration and this folder's application configuration are separate. Deploy this application from `app-backend/`; do not point the marketing-site project at this folder without reviewing its project settings.
