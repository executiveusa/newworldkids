# Accessibility Report

Automated axe/Lighthouse scans were not executed because the Lovable Cloud endpoints are not available in this environment. Manual steps completed:

- Added ARIA labels to the Lemon AI chat dock trigger and close buttons.
- Ensured chat messages respect reduced motion and maintain readable contrast against dark background (`bg-card` / `bg-primary`).
- Introduced status alerts on the Agents page with semantic roles via `Alert` component.
- Added keyboard focusable scroll-to-top button with accessible label.

Follow-up actions:
1. After configuring Lovable Cloud credentials, run `npx @axe-core/cli http://localhost:5173` during development.
2. Capture Lighthouse accessibility scores for Home, Dashboard, and Agents pages (target ≥ 95).
3. Validate color contrast again if brand palette is adjusted.
