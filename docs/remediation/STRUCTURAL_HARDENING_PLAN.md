# New World Kids — Structural Hardening Sprint

Branch: `remediation/batches-1-3-structural-hardening`

## Change-control lock

- Do **not** deploy to Netlify during this sprint.
- Do **not** merge to `main` until all agreed remediation work is complete, tested, reviewed, and explicitly approved.
- Do **not** modify production.
- Work only on this remediation branch.
- Keep changes small and reviewable; complete one or two numbered repairs at a time.

## Sprint scope

This branch initially covers repair-list items:

1. Fix `/en/opportunity` so it is a real project-provider intake path, not a donation redirect.
2. Publish and wire a privacy policy to data-collecting surfaces.
3. Add one meaningful semantic `<h1>` to each public page.
8. Surface the fiscal-sponsorship disclosure outside the donation flow.
9. Clarify New World Kids public identity, fiscal-sponsor relationship, and donation recipient without implying independent 501(c)(3) status.

These map to the first three implementation batches:

### Batch 1 — Privacy + semantic structure
- Repair item #2
- Repair item #3

### Batch 2 — Project-provider intake
- Repair item #1

### Batch 3 — Fiscal sponsor + identity clarity
- Repair item #8
- Repair item #9

## Required proof before merge

- Build passes.
- Lint/type checks pass where available.
- Every changed public page has exactly one meaningful `<h1>`.
- Privacy policy is reachable from the footer and every data-collecting form.
- `/en/opportunity` no longer resolves to the donation flow.
- Project-provider form has a defined destination, success state, failure state, and staff follow-up owner.
- Fiscal-sponsor language is factually consistent across the site.
- No page implies New World Kids independently holds 501(c)(3) recognition unless separately verified.
- English/Spanish routing remains intact.
- No production deployment occurs during this branch.

## Known identity/content conflicts requiring resolution

The repository currently contains older/stale identity material that must not be propagated without human confirmation. `docs/FISCAL_SPONSOR.md` currently names an older project lead, a phone number, address, donation methods, and broad eligibility claims. Those details require review before reuse.

## Human decisions still needed

See the current implementation-grill in the working conversation. Only decisions that cannot be safely inferred from code or authoritative records should block implementation.
