# New World Kids – UX Audit

Following Krug's *Don't Make Me Think* principles, I reviewed the donation journey and surfaced high-leverage fixes.

## Improvements implemented now
- Added a reusable **Every.org donate button** with the organization's EIN so supporters can give via card, bank, PayPal, Venmo, Apple/Google Pay, crypto, stocks, or DAFs in a single flow.
- Surfaced the donate call-to-action in the navigation, donation landing page hero, and footer to keep the next step obvious on every visit.
- Introduced an accessible **skip to content** link and ensured the main layout exposes an anchor target for keyboard users.

## Recommendations to prioritize next
1. Trim the top navigation to the 3–5 most important destinations and group secondary items inside a "More" or "Resources" menu to reduce decision friction.
2. Establish a single primary CTA per page (usually "Donate" on supporter pages) so buttons aren't competing for attention.
3. Audit headings on each page to confirm there is a logical outline with one `<h1>` and descriptive subheadings that match what follows.
4. Increase contrast on any text below WCAG AA (4.5:1) and ensure tappable controls have at least a 44px touch target.
5. Instrument donation completions with analytics or Every.org webhooks so the team can measure funnel health.

## QA checklist
- [ ] Desktop and mobile nav: open/close states, focus trap, and escape key handling.
- [ ] Donation form: labels, validation, and confirmation messaging behave as expected.
- [ ] Every.org button loads successfully in staging/production environments and records test transactions before launch.
