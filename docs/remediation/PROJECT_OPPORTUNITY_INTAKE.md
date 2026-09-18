# Project Opportunity Intake — Batch 2

Status: code-complete on remediation branch; not deployed.

## Public route

- `/[locale]/opportunity`
- Intended public English route: `/en/opportunity`
- Spanish locale currently renders the same English form copy; translation is a later content-polish task unless explicitly promoted in scope.

## Submission path

1. Provider submits the form.
2. Browser POSTs JSON to `/api/opportunity`.
3. API validates required fields and email format.
4. API inserts a row into `project_opportunity_submissions`.
5. If Resend is configured, the API emails `info@nwkids.org` (or `OPPORTUNITY_EMAIL_TO`).
6. User receives an accessible confirmation state with optional supported-device haptic feedback.

## Required runtime configuration

- `SUPABASE_URL` (or existing `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY` — server only
- `RESEND_API_KEY` — required for email notification
- `OPPORTUNITY_EMAIL_FROM` — verified sender, e.g. `New World Kids <forms@nwkids.org>`
- `OPPORTUNITY_EMAIL_TO` — optional; defaults to `info@nwkids.org`

Run the migration:

- `supabase/migrations/20260918_project_opportunity_submissions.sql`

## Security note

A repository search surfaced an old hard-coded Supabase service-role credential in `scripts/setup-supabase.js` on repository history/default branch. Treat that credential as compromised. Rotate/revoke it before any backend deployment and remove it from active code/history remediation scope. Do not reuse it for this form.

## Acceptance gate before deployment

- migration applied to the correct New World Kids Supabase project
- new service-role credential stored only as server secret
- sender domain verified
- form submit stores exactly one record
- notification reaches `info@nwkids.org`
- failure state does not lose user guidance
- no project submission data is publicly readable
- mobile, keyboard, validation, and privacy-link QA pass
