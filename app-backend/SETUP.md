# Calma local setup

Provider credentials are entered in Calma → Integrations and encrypted per workspace. Never paste keys into chat, screenshots, tickets, or source control. The ignored `.env` stores the local encryption key and runtime settings.

## Start

From `D:\calma app` in PowerShell:

```powershell
Copy-Item .env.example .env
notepad .env
python server.py
```

If `.env` already exists, edit it instead of copying over it. Restart Calma after edits. Health status: `http://127.0.0.1:4173/api/health`.

On first launch, open Calma and create the workspace owner account. Existing records in `data/calma.sqlite3` are copied into this first workspace. Create more workspaces through account registration; local workspaces use separate SQLite files. Business Owners and Admins can invite Admins or read-only Employees from the Team page. Invite links last seven days and must be shared through a channel you control.

Workspace registration is enabled by default for this loopback pilot. Set `CALMA_SIGNUP_ENABLED=false` to close new workspace creation. Sign-in and account recovery are throttled after 10 requests from one IP in 15 minutes.

## Authentication deployment

Production auth stores users, workspace membership, sessions, password reset tokens, invitations, and OAuth state in PostgreSQL. Install dependencies with `python -m pip install -r requirements.txt`, set `CALMA_ENV=production`, and provide a reachable PostgreSQL `DATABASE_URL`. Startup refuses production mode if required secrets or services are missing. Existing local SQLite identity and workspace records are migrated on first PostgreSQL startup; keep a full backup before migration and do not run two production instances against the same SQLite files during migration.

Set `CALMA_PUBLIC_BASE_URL` to the public HTTPS origin. Keep the app behind a same-machine reverse proxy as described below. Create a Google OAuth Web application and configure its authorized redirect URI as `{CALMA_PUBLIC_BASE_URL}/api/auth/google/callback`; set `CALMA_GOOGLE_OAUTH_CLIENT_ID` and `CALMA_GOOGLE_OAUTH_CLIENT_SECRET`. Google login only links a verified email to an existing Calma account; it does not create an uninvited account.

Configure platform-owned SMTP using `CALMA_AUTH_SMTP_HOST`, `CALMA_AUTH_SMTP_PORT` (587 by default), `CALMA_AUTH_SMTP_STARTTLS=true`, `CALMA_AUTH_SMTP_USER`, `CALMA_AUTH_SMTP_PASSWORD`, and `CALMA_AUTH_FROM_EMAIL`. This separate mail channel delivers password-reset links; workspace integration credentials are not used for account recovery. Set `CALMA_JWT_SECRET` to at least 32 random characters and `CALMA_ENCRYPTION_KEY` to a valid Fernet key. Generate secrets locally with Python; do not paste them into chat or commit them. Keep stable copies in a production secret manager and configure backups before serving real accounts. Password-reset links expire after 30 minutes and can be used once. Reset revokes every active session for that user.

Roles are `owner` (Business Owner), `admin`, and `employee`. Business Owner and Admin can invite or remove teammates; Admin and Business Owner can change workspace records; Employee can read records but cannot mutate them. Billing and platform credentials stay Business Owner-only.

On first owner signup, any legacy provider keys already in `.env` are encrypted into the first workspace and removed from `.env`. Future workspaces start disconnected and store their own credentials.

## Workspace recovery

An owner can download a ZIP recovery bundle from Calma → Integrations. It contains only that workspace's operational database, member identities, and SHA-256 manifest. Browser sessions and pending invites are deliberately omitted; restored members must sign in again and owners can reissue invites. The archive contains customer data and password hashes; store it encrypted with restricted access. The local provider-secret encryption key is not in the archive, so keep `.env` separately and securely.

To restore into an existing installation, stop Calma, preserve a fresh copy of `data/` and `.env`, then run `python restore_workspace.py <bundle.zip>`. The command validates the archive format, checksums, SQLite integrity, and workspace identity before merging. If that workspace ID already exists, add `--replace-existing`; the previous workspace database file is retained. Restart Calma after restore. For a new machine, first copy the matching `.env` and initialize Calma once so its identity database exists; then stop Calma and run the restore command. This recovery path is for a single workspace bundle and does not restore deleted Stripe event history.

## HTTPS reverse proxy boundary

The default listener is loopback-only. To serve Calma behind a reverse proxy on the same machine, set `CALMA_PUBLIC_BASE_URL` to the exact HTTPS origin and `CALMA_TRUST_PROXY=true`. Keep Calma bound to loopback, and configure the proxy to connect from `127.0.0.1` or `::1`; Calma accepts that one public host only from a loopback peer. It does not trust forwarded host or protocol headers. Configure the proxy to overwrite `X-Forwarded-For` with the connecting client IP as one address, never append or pass through the visitor's supplied value; Calma uses it only for per-client throttling and only on the configured host from loopback. HTTPS mode adds `Secure` to the session cookie. Do not enable proxy mode when the proxy connects over a remote network.

## AI providers: OpenAI or Gemini analysis, reply drafts, assistant, daily insights

1. Create an [OpenAI API key](https://platform.openai.com/api-keys) or a [Gemini API key](https://aistudio.google.com/apikey).
2. Open Calma → Integrations, enter key and model name, then save. Calma encrypts credentials in this workspace. Select provider or leave Automatic to prefer OpenAI and fall back to Gemini when only Gemini is connected.
3. Click **Test AI generation**. Calma makes a live, minimal generation request. Then verify a real AI action (analyze one review, draft a reply, ask voice assistant) before relying on it.

Calma sends selected review text and manager questions to OpenAI when AI actions run. Common email and phone patterns are redacted before AI calls. Generated replies remain drafts until manager approval.

## Google Business Profile: read reviews and post approved replies

Google requires an approved Cloud project and OAuth access. Follow [Google's prerequisites](https://developers.google.com/my-business/content/prereqs) and [basic setup](https://developers.google.com/my-business/content/basic-setup). Google may require API access approval before Business Profile APIs can be enabled.

1. Create/select a Google Cloud project and request Business Profile API access.
2. After approval, enable the seven Business Profile APIs listed in Google’s Basic setup guide, including Google My Business, My Business Account Management, and My Business Business Information, then configure OAuth consent.
3. Create OAuth credentials and obtain an offline refresh token using scope `https://www.googleapis.com/auth/business.manage` for the Google account that manages the profile.
4. Open Calma → Integrations and save the OAuth client ID, client secret, and refresh token for this workspace.
5. In Calma → Integrations, click **Find Google locations**. Calma lists profiles available to the connected account; connect each verified profile you want in this workspace. Calma lists authorized accounts, then retrieves each account’s locations and maps Google’s `locations/{id}` resource to the review API’s `accounts/{accountId}/locations/{locationId}` resource. The manual Add location form remains available for non-Google locations.
6. Check provider readiness, then click Sync reviews. Calma imports up to 20 pages (1,000 reviews) per location per sync by default and persists a per-location cursor; larger history continues on later scheduled/manual syncs. New locations also get their own silent baseline. Regular sync checks the newest five pages by default; tune `GOOGLE_BASELINE_PAGES_PER_SYNC` and `GOOGLE_SYNC_MAX_PAGES_PER_LOCATION` in `.env` (maximum 100 pages per run). Each public reply still requires manager approval.

Google access approval can take time and depends on Google's eligibility review. Calma cannot create or approve this access on your behalf.

## WhatsApp Cloud API: outbound alerts

Use Meta's [WhatsApp Cloud API setup](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started) to create a Meta app, WhatsApp Business Account, registered sender, and long-lived access token. Enter the token, phone number ID, and opted-in alert destination in Calma → Integrations, then save. Workspace credentials take effect immediately; they do not require a server restart. Check readiness, then send a test to a number you control. Restart only after changing server `.env` webhook settings.

For inbound conversations, set `CALMA_META_APP_SECRET` and a random `CALMA_META_WEBHOOK_VERIFY_TOKEN` in server `.env`. Configure Meta callback URL `{CALMA_PUBLIC_BASE_URL}/api/webhooks/whatsapp`, subscribe to the `messages` field, then send a test message. Calma verifies Meta's GET challenge and HMAC signature, routes by connected phone-number ID, deduplicates provider message IDs, and stores messages in that workspace. Meta's maintained SDK describes the verification token/challenge and app-secret signature checks [here](https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/webhooks/start/); Meta's sample app demonstrates HMAC verification [here](https://github.com/fbsamples/whatsapp-api-examples/tree/main/signature-validation-with-webhooks-payloads). Managers can ask AI for a draft, then approve and send a reply from the WhatsApp inbox. The public HTTPS reverse proxy must route to Calma's loopback process before Meta can deliver events. Calma does not autonomously send AI replies.

## Email: IMAP inbox and SMTP replies

For Gmail, prefer Sign in with Google when available. Current Calma connector supports IMAP/SMTP; the Gmail preset fills `imap.gmail.com:993` and `smtp.gmail.com:587` with STARTTLS. Enter the full Gmail address as username and a Google app password only if the account supports app passwords (2-Step Verification required); never use your normal Google password. Google recommends Sign in with Google and notes app passwords are not available for some managed or Advanced Protection accounts ([Google app passwords](https://support.google.com/mail/answer/185833)). Workspace administrators may need to allow the connection. For other providers, use their documented SMTP/IMAP credentials. Enter a verified sender and opted-in alert recipient in Calma → Integrations. Send a test to an address you control. To receive customer conversations, add IMAP host, SSL port (normally 993), inbox username/password, folder, and support inbox address, then click **Check inbound IMAP**. This logs in and selects the folder read-only; it does not import or mark messages. On first connection, Calma records the latest mailbox UID and starts with newer mail, avoiding an unexpected import of old history. It checks for new UIDs once per minute without changing read/unread state, stores deduplicated plain-text messages in that workspace, and sends approved replies through SMTP with email threading headers. Use a dedicated support mailbox or folder. AI drafts need manager approval.

## Billing: Stripe subscriptions

Billing code supports one recurring Stripe Price per checkout. Create that recurring Price in Stripe, then configure `CALMA_STRIPE_SECRET_KEY`, `CALMA_STRIPE_PRICE_ID`, `CALMA_STRIPE_WEBHOOK_SECRET`, and `CALMA_PUBLIC_BASE_URL` in the server environment. Keep the secret key and webhook signing secret server-side; never put them in Calma's workspace credential form. Add a Stripe webhook endpoint at `{CALMA_PUBLIC_BASE_URL}/api/webhooks/stripe` for `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, and `invoice.payment_failed`. Stripe documents hosted Checkout Sessions, portal sessions, and webhook signing in its [Checkout API](https://docs.stripe.com/api/checkout/sessions/create), [Billing Portal API](https://docs.stripe.com/api/customer_portal/sessions/create), and [webhook guide](https://docs.stripe.com/webhooks). The Calma process currently binds loopback; a production HTTPS reverse proxy must route the signed webhook path to it before Stripe can deliver events.

## Scheduled daily insight

Set `CALMA_DAILY_INSIGHT_ENABLED=true`, `CALMA_DAILY_INSIGHT_TIME=08:00`, and `CALMA_TIMEZONE=Asia/Kolkata`. Scheduler runs only while the Calma process stays running. It generates at most one insight per location per local day, only when recent feedback exists and OpenAI is configured. If `CALMA_ALERT_EMAIL` is configured, it queues the insight through the durable email outbox; delivery waits for SMTP configuration and retries transient failures. The dashboard keeps the saved insight either way.

## Current product boundary

Private workspace APIs require sign-in. Each business stores operational records in a separate SQLite file in local mode, or an isolated PostgreSQL schema in production mode. Business Owners and Admins can invite Admins and read-only Employees; invite links expire after seven days. First owner signup adopts existing `data/calma.sqlite3` records. Keep a backup before onboarding.

Guest QR pages remain public by design. Opaque QR tokens route each submission to its owning workspace. Email and WhatsApp alerts enter a persistent outbox and retry after provider failures. Provider credentials are encrypted per workspace; the local master key is kept in `.env`, so back up `.env` and `data/` together. This is local at-rest encryption, not managed production key storage.

This remains a loopback pilot. Email verification, MFA, password reset, broader abuse controls, live Stripe configuration and public webhook delivery, live IMAP/SMTP credentials, live Meta webhook delivery, hosted database, HTTPS, retention operations, and deployment security review remain unfinished. WhatsApp and email inbox ingestion and human-approved reply workflows are implemented but need provider credentials; WhatsApp also needs public HTTPS routing. Provider credentials are encrypted per workspace with a local master key. Do not expose the service publicly.
