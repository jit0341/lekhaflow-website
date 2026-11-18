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
- Private object storage only; never public buckets or public object URLs.
- Per-client quota: 1 GiB (1,073,741,824 bytes), enforced server-side and atomically.
- Initial file types: PDF, JPG, JPEG, PNG, WEBP.
- Categories: Purchase, Sales, Bank Statements.
- Store document metadata in PostgreSQL and file bytes in private object storage.
- Authorize every list, upload, download and delete operation against the authenticated user's client ID.
- Downloads use short-lived signed URLs after server-side ownership checks.
- Enforce file size, MIME and file-signature checks; add rate limits and audit events.
- Provide delete/retention and backup/recovery policy before customer launch.

## Proposed platform
Supabase Auth + PostgreSQL + private Storage, integrated server-side with Next.js. Use Row Level Security for client isolation. Service-role credentials must remain server-only and must never be exposed to browser code or desktop software.

## Existing website findings
- Next.js 16.2.6 / React 19.2.4 App Router.
- Existing Razorpay routes include `app/api/create_order`, `app/api/verify_payment`, and `app/api/webhook`; preserve them.
- Existing admin login uses `LEKHA_ADMIN_PASSWORD` and an `lekhaflow_admin_auth` cookie. The current `app/admin/page.tsx` is a client component without a server-side session guard; do not reuse it as the security boundary for Document Cloud administration.
- No Supabase package or `supabase/config.toml` was found in the inspected branch.
- Navbar is in `components/layout/Navbar.tsx`; root layout is `app/layout.tsx`.

## Delivery phases
1. Provision Supabase project, configure secrets and redirect URLs; add database schema, RLS and private bucket.
2. Registration, email verification, login, logout and password reset.
3. Secure administrator review/approval and test-client lifecycle.
4. Mobile upload, categories, progress and quota display.
5. Document listing, preview, download and delete.
6. Isolation, quota/concurrency, upload validation and regression testing.
7. Preview acceptance, owner approval, then production release.
8. Desktop-app cloud fetch is a separate later phase.

## Acceptance tests
- Unverified and pending clients cannot access portal data.
- Active client A cannot list, read, download, overwrite or delete client B's documents, including by changing IDs or paths.
- Owner and Jishan test accounts can independently register/sign in and exercise the same flows.
- Quota cannot be exceeded under concurrent uploads.
- Unsupported or spoofed file types are rejected.
- Razorpay payment and license routes continue to behave unchanged.
