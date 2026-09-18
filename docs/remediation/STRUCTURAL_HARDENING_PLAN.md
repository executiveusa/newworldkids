# New World Kids — Structural Hardening Sprint

Branch: `remediation/batches-1-3-structural-hardening`

## Change-control lock

- Do **not** deploy to Netlify during this sprint.
- Do **not** merge to `main` until all agreed remediation work is complete, tested, reviewed, and explicitly approved.
- Do **not** modify production.
- Work only on this remediation branch.
- Keep changes small and reviewable; complete one or two numbered repairs at a time.

## Current numbered repair status

| # | Repair | Status | Proof / blocker |
|---|---|---|---|
| 1 | Replace `/en/opportunity` donation misroute with a real project-provider intake | CODE COMPLETE | Localized route, structured form, API route, migration, success/error states, privacy notice, database + email notification wiring added. Runtime integration still requires verified backend secrets and end-to-end test. |
| 2 | Publish privacy policy | DONE IN BRANCH | English/Spanish policy route added; footer link added; 12-month normal retention; specific-request contact allowed; no automatic marketing opt-in. |
| 3 | One semantic H1 per public page | PARTIAL | Homepage and all new remediation pages have one H1. Full CMS-driven route audit remains a release test. |
| 4 | Remove visible hero production placeholder | RESOLVED IN BRANCH SOURCE / VERIFY LATER | Current branch hero contains no “Reserved for” label. Must verify rendered preview before release because audited production differed from repository source. |
| 5 | Replace empty Gallery with real Indigo Azul proof | STRUCTURE PATCHED / EVIDENCE BLOCKED | Placeholder wall replaced by an honest proof-archive state. Connected media-access folders are currently empty; no media will be invented or published without rights review. |
| 6 | Add leadership/governance accountability | CODE COMPLETE | Leadership & Accountability page added. Jeremy Bowers is the accountable contact. Unconfirmed titles/roles are intentionally omitted. |
| 7 | Add youth safeguarding surface | CODE COMPLETE / POLICY DETAILS PENDING | Safeguarding page added with verified current commitments and explicit list of controls still being finalized. No unverified background-check/guardian-consent claim was invented. |
| 8 | Surface fiscal-sponsorship disclosure outside Donate | DONE IN BRANCH | Homepage institutional trust strip, public footer, fiscal-sponsor badge, and governance page now state the relationship. |
| 9 | Clarify public/legal identity | DONE IN BRANCH | Public name locked to New World Kids; fiscal sponsor identified as Humanitarian Social Innovations; Jeremy Bowers accountable contact; no independent 501(c)(3) claim. |
| 10 | Organization phone | SKIPPED BY HUMAN | User explicitly removed #10 from this sprint. |

## Security findings discovered during remediation

| # | Finding | Severity | Status |
|---|---|---|---|
| 71 | Supabase service-role credential committed in repository | P0 | ACTIVE BRANCH SANITIZED. Hard-coded credential removed from active scripts/templates and tracked production env file removed. Credential must still be revoked/rotated in the actual Supabase project because Git history remains public. |
| 72 | Supabase management/MCP access credential committed in repository/docs | P0 | ACTIVE BRANCH SANITIZED where located. Actual credential rotation/revocation still required. |
| 73 | Vercel API token committed in repository/docs | P0 | ACTIVE BRANCH SANITIZED where located. Actual token rotation/revocation still required. |
| 74 | Historical repository still contains old deployment/account assumptions | P1 | Marked historical where touched. Full repository-wide stale-infrastructure cleanup remains later scope. |

## Batch status

### Batch 1 — Privacy + semantic structure
- #2: done in branch.
- #3: source-level remediation done for affected pages; final route-by-route H1 audit remains.

### Batch 2 — Project-provider intake
- #1: code complete.
- Runtime backend setup and end-to-end proof are intentionally deferred until the correct New World Kids backend is securely connected.

### Batch 3 — Fiscal sponsor + identity clarity
- #8: done in branch.
- #9: done in branch.

### Batch 4 — Accountability + safeguarding
- #6: code complete.
- #7: code complete with unconfirmed policy details explicitly left pending rather than fabricated.

### Batch 5 — Hero + proof archive
- #4: current branch source has no visible production placeholder; preview verification required.
- #5: structural placeholder wall removed, but real proof media is blocked by an empty media-access folder and publication-rights review.

## Required proof before merge

- Build passes.
- Lint/type checks pass where available.
- Every public route has exactly one meaningful `<h1>`.
- Privacy policy is reachable from the footer and every data-collecting form.
- `/en/opportunity` renders the intake form and never resolves to FundRazr.
- Opportunity submission writes exactly one protected database record.
- Opportunity notification reaches `info@nwkids.org`.
- Public users cannot read project-opportunity submissions.
- Fiscal-sponsor language is consistent across homepage, footer, Donate, governance, and sponsor badge.
- No page implies New World Kids independently holds 501(c)(3) recognition.
- Governance, privacy, and safeguarding pages render correctly on mobile and keyboard.
- Gallery contains no fake proof and no production-instruction placeholder wall.
- Exposed Supabase/Vercel credentials are revoked/rotated before any deployment.
- English/Spanish routing remains intact.
- No production deployment occurs until final human approval.

## Human inputs still genuinely required

1. Confirm Pamela Knox's exact public role/title before she is added to leadership.
2. Approve the final operating details for background checks, incident reporting, one-to-one adult/youth contact, and guardian consent before the safeguarding page can move from pre-launch commitments to a full operating policy.
3. Add or approve consent-cleared Indigo Azul media to the New World Kids media-access folders before #5 can be fully completed.
4. Connect or authorize the correct New World Kids Supabase project so credentials can be rotated and the opportunity migration can be applied/tested.
5. Rotate the exposed Vercel token through the owning account before release.

## Governance rule

Missing information stays visibly missing. We do not convert placeholders into invented evidence, invent officer titles, invent youth-safety processes, or reuse stale repository identity data merely to make the site look finished.
