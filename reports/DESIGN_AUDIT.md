# Design & UX Audit

This audit documents the primary issues identified in the New World Kids experience and the actions taken during this upgrade cycle. Severity ratings follow the convention **P0 (critical)**, **P1 (should fix)**, **P2 (nice to have)**.

## Accessibility

| Severity | Issue | Resolution |
| --- | --- | --- |
| P0 | Missing global chat accessibility affordances – the Lemon AI copilot was absent and conversational UI had no ARIA semantics. | Implemented a global `ChatDock` component with screen-reader labels, focusable controls, and respect for reduced-motion preferences. |
| P1 | Scroll feedback for keyboard users was limited on long pages. | Added a floating “Scroll to Top” button with keyboard focus states and smooth scrolling that respects reduced motion. |
| P1 | AI Agent health status was invisible to screen readers. | Injected status announcements through the new Microsoft Agent Framework alert banner in the Agents page. |

## Navigation & Information Architecture

| Severity | Issue | Resolution |
| --- | --- | --- |
| P0 | No persistent entry point to support chat-based guidance across routes. | Docked the Lemon AI chat widget to the root layout so guidance is one click away on every screen. |
| P1 | Runtime health diagnostics were hidden, forcing users to infer backend outages. | Added a Microsoft Agent Framework self-check on the Agents hub with explicit status messaging. |

## Visual Design & Branding

| Severity | Issue | Resolution |
| --- | --- | --- |
| P1 | Lack of motion guidelines produced abrupt transitions. | Introduced Framer Motion powered micro-animations for the chatbot and floating controls, tuned for 200ms ease. |
| P2 | Agent orchestration state used raw console logs. | Replaced console statements with branded alerts and documentation-driven fallbacks. |

## Code Quality

| Severity | Issue | Resolution |
| --- | --- | --- |
| P0 | Supabase integration persisted in the codebase, conflicting with Lovable Cloud standards. | Removed Supabase clients, introduced a centralized Lovable Cloud service client, and routed agent messaging through it. |
| P0 | No reusable API client ensured consistent auth for Lovable Cloud calls. | Added `src/services/client.ts` with typed helpers and exported `QueryClient` instance. |
| P1 | Lemon AI experience lacked a feature flag and backend bridge. | Provided environment-driven gating with mock fallbacks when credentials are absent. |
| P1 | Microsoft Agent Framework not wired for future orchestration. | Added `packages/agent-runtime` wrapper and integration hooks with self-check utilities. |

## Outstanding Follow-ups

- Enable Infisical CLI installation when network access is available to automate secret injection.
- Run Lighthouse/axe audits once Lovable Cloud credentials are provisioned to validate live data paths.
- Evaluate migrating the legacy `newworldkids-main` package out of the repository once the team confirms no remaining dependencies.
