# Document Cloud — Preview Setup and Acceptance Checklist

This feature remains isolated on `feature/document-cloud`. Do not merge, deploy to Production, or run migrations against the existing production Supabase project as part of this checklist.

## Required isolated services

1. Create a dedicated Supabase project for Document Cloud. Do not reuse the production application's payment/licensing database.
2. Create a private Cloudflare R2 bucket. Public access / r2.dev access must remain disabled.
3. Configure a Vercel Preview environment for this branch only.
4. Configure the preview URL as an allowed Supabase Auth redirect URL.

## Vercel Preview environment variables

Set these only in the Preview environment:

- `NEXT_PUBLIC_SUPABASE_URL` — dedicated Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Supabase publishable/anon key for the dedicated project.
- `SUPABASE_SERVICE_ROLE_KEY` — service-role key for the dedicated project; server-side only.
- `DOCUMENT_CLOUD_ADMIN_EMAILS` — comma-separated, verified admin email addresses.
- `DOCUMENT_CLOUD_CRON_SECRET` — long random secret used by the scheduled cleanup endpoint.
- `R2_ACCOUNT_ID` — Cloudflare account ID.
- `R2_BUCKET_NAME` — private R2 bucket name.
- `R2_ACCESS_KEY_ID` — R2 S3-compatible access key with access to this bucket only.
- `R2_SECRET_ACCESS_KEY` — matching R2 secret.

Never prefix service-role, cron, or R2 secret values with `NEXT_PUBLIC_`. Never commit secrets to Git.

## Database migration order

Apply the following SQL files to the dedicated Document Cloud Supabase project, in order:

1. `supabase/migrations/0001_document_cloud.sql`
2. `supabase/migrations/0002_document_cloud_lifecycle.sql`
3. `supabase/migrations/0003_document_cloud_retention.sql`
4. `supabase/migrations/0004_document_cloud_pending_cleanup.sql`

Verify the tables, triggers, RLS policies, RPC grants and indexes exist. Confirm the `document_cloud_clients` trigger creates profiles only when registration metadata is valid.

## R2 CORS

Configure the bucket CORS policy to allow only the exact Vercel Preview origin(s) and local development origin required for testing. Allow browser methods `PUT` and `GET`; allow the `Content-Type` request header; expose `ETag` and `Content-Length`. Do not use wildcard origins for a customer-facing deployment. CORS is not access control: keep the bucket private and rely on short-lived signed URLs.

## Retention

- R2 bucket lifecycle rule: expire all objects after 14 days as a final safety net.
- Vercel Cron is configured to call `/api/cron/document-cloud-retention` daily at 03:00 UTC.
- Set `DOCUMENT_CLOUD_CRON_SECRET` in Preview; Vercel's cron request must send `Authorization: Bearer <secret>`.
- Application retention: after a successful client-side download, set expiry to the earlier of 3 days after download or 14 days after upload.
- Failed/abandoned reservations older than 30 minutes are cleaned up and their quota released.
- R2 lifecycle expiry is asynchronous; never promise deletion at an exact second.

## Required code review before Preview testing

- Confirm the installed Supabase Auth configuration enforces email confirmation.
- Confirm the R2 CORS policy matches the actual Preview origin.
- Confirm the S3-compatible R2 credentials are restricted to the dedicated bucket.
- Verify R2 SigV4 presigned PUT/GET/HEAD/DELETE requests against the real bucket; do not treat unit-only signature checks as provider validation.
- Ensure the dedicated Supabase project has no customer or production data.
- Run `npm install`, `npm run build`, and the test suite after the lockfile and dependency state are reconciled.
- Run security tests for cross-client ID/path manipulation, forged MIME, oversized uploads, duplicate/concurrent reservations, upload abandonment, deletion failures, and expired signed URLs.

## Acceptance test matrix

1. Register a new client, verify email, and confirm the account enters `APPROVAL_PENDING`.
2. Confirm an unverified or pending client cannot open workspace APIs.
3. Confirm only a verified allowlisted admin can list clients and approve/suspend/reject them.
4. Mark the owner and Jishan test accounts as `TEST` through the admin dashboard; never seed plaintext credentials.
5. Upload PDF/JPG/PNG/WEBP files in each category; reject unsupported extensions, MIME spoofing and incorrect file signatures.
6. Reject each file above 25 MiB and reject any reservation that would exceed 1 GiB, including concurrent requests.
7. Confirm file bytes exist in private R2 and metadata is marked `READY` only after size and signature verification.
8. Confirm a client cannot list, preview, download, delete or finalize another client's document by changing IDs.
9. Confirm download creates a local copy and starts the three-day timer only after successful fetch.
10. Confirm delete removes the R2 object and releases quota exactly once; test retries and partial failures.
11. Confirm abandoned reservations release quota after 30 minutes.
12. Confirm daily retention removes objects after the configured expiry and releases quota.
13. Confirm suspended/rejected clients cannot use any workspace API.
14. Run a full regression test of existing website pages, Razorpay payment routes, license generation and delivery.

## Current known limitations

- The actual Supabase project, R2 bucket, Preview environment variables and R2 CORS/lifecycle rules must be provisioned by the account owner; repository access cannot create or verify those external resources.
- The database migrations have been added to this branch but have not been applied to a Supabase project.
- The code has not yet been built or exercised against real Supabase/R2 credentials.
- Password reset, token refresh, rate limiting, admin audit UI and production-grade observability still require implementation/review before declaring the portal production-ready.
- The current branch has diverged from `main`; compare and reconcile the base branch carefully before opening a production-targeting PR. Never force-push or merge it directly.
