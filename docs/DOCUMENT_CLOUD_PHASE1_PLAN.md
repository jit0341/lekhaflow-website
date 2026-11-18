# LekhaFlow Document Cloud — Phase 1 Implementation Plan

## Scope
Build a private client document portal alongside the existing LekhaFlow website. This feature must not alter Razorpay checkout, license generation/delivery, the desktop extraction engine, or Production until explicitly approved.

## Deployment workflow
- Work only on `feature/document-cloud`.
- Validate in a Vercel Preview deployment.
- Merge to the production branch only after owner approval and successful acceptance tests.
- No production deployment or merge is authorized by this plan.

## Client experience
1. A business self-registers with business name, contact name, email and password.
2. The client verifies their email.
3. Their portal access remains locked in `APPROVAL_PENDING` until the LekhaFlow administrator verifies their online/offline purchase or license.
4. After approval, they can sign in and manage documents.
5. One business = one login in Phase 1; no employee subaccounts.

## Account states
- `EMAIL_PENDING`: email not verified.
- `APPROVAL_PENDING`: email verified; purchase/license awaiting administrator review.
- `ACTIVE`: approved portal access.
- `SUSPENDED`: access blocked by administrator.

Test accounts for the owner and Jishan must use the same real authentication and authorization paths as customers, be clearly marked `TEST`, and remain segregated from customer data and reporting. Do not hardcode credentials or seed plaintext passwords. Test accounts should be created through the secured admin workflow or normal registration plus explicit admin approval.

## Storage and document rules
- Use Cloudflare R2 Standard private object storage for document bytes; use Supabase Auth + PostgreSQL for identity and metadata in the initial design, subject to pricing and free-tier review before production.
- Private bucket only; never public buckets or public object URLs.
- Per-client active-storage quota: 1 GiB (1,073,741,824 bytes), enforced server-side and atomically.
- Initial file types: PDF, JPG, JPEG, PNG, WEBP.
- Categories: Purchase, Sales, Bank Statements.
- Store document metadata in PostgreSQL and file bytes in private R2 objects.
- Authorize every list, upload, download and delete operation against the authenticated user's client ID.
- Downloads use short-lived signed URLs after server-side ownership checks.
- Enforce file size, MIME and file-signature checks; add rate limits and audit events.
- No permanent cloud archive is promised. Clients must retain their own original files and downloaded copies.

## Proposed retention policy (initial test setting; confirm before customer launch)
- Absolute maximum R2 object age: 14 days from upload, enforced by an R2 lifecycle expiry rule.
- After the first confirmed successful download, schedule application-level deletion 3 days later.
- If never downloaded, the absolute 14-day expiry still applies.
- Tell clients the exact expiry date/time at upload and in the document list.
- Failed/aborted downloads must not start the 3-day timer.
- Expiry/deletion jobs must update metadata and handle retry/idempotency; clients must be able to manually delete earlier.
- R2 lifecycle deletion is asynchronous (typically within 24 hours of expiry), so do not promise deletion at an exact second.
- Do not claim that storage is physically wiped instantly; verify provider deletion behavior and backup/retention terms before launch.

## Cost controls
- Use R2 Standard pricing and monitor storage GB-month plus Class A/B operations.
- Configure billing notifications/budget alerts where available; do not assume a hard spend cap unless the provider explicitly enforces one.
- Show Admin aggregate storage, active objects, expiring objects and estimated usage.
- Apply upload rate limits and per-file size limits in addition to the 1 GiB client quota.
- Recheck current R2 pricing, free-tier eligibility and account billing requirements before customer launch.

## Existing website findings
- Next.js 16.2.6 / React 19.2.4 App Router.
- Existing Razorpay routes include `app/api/create_order`, `app/api/verify_payment`, and `app/api/webhook`; preserve them.
- Existing admin login uses `LEKHA_ADMIN_PASSWORD` and an `lekhaflow_admin_auth` cookie. The current `app/admin/page.tsx` is a client component without a server-side session guard; do not reuse it as the security boundary for Document Cloud administration.
- No Supabase package or `supabase/config.toml` was found in the inspected branch.
- Navbar is in `components/layout/Navbar.tsx`; root layout is `app/layout.tsx`.

## Delivery phases
1. Provision Cloudflare account/R2 bucket and Supabase project; configure secrets, CORS and redirect URLs; add database schema and policies.
2. Registration, email verification, login, logout and password reset.
3. Secure administrator review/approval and test-client lifecycle.
4. Mobile upload, categories, progress and quota display.
5. Document listing, preview, download, expiry display and delete.
6. Retention scheduler, R2 lifecycle fallback, isolation, quota/concurrency, upload validation and regression testing.
7. Preview acceptance, owner approval, then production release.
8. Desktop-app cloud fetch is a separate later phase.

## Acceptance tests
- Unverified and pending clients cannot access portal data.
- Active client A cannot list, read, download, overwrite or delete client B's documents, including by changing IDs or paths.
- Owner and Jishan test accounts can independently register/sign in and exercise the same flows.
- Quota cannot be exceeded under concurrent uploads.
- Unsupported or spoofed file types are rejected.
- Failed downloads do not trigger post-download deletion timers.
- Successfully downloaded objects are scheduled for deletion after 3 days, subject to the 14-day maximum.
- Never-downloaded objects expire after the 14-day maximum.
- Razorpay payment and license routes continue to behave unchanged.
