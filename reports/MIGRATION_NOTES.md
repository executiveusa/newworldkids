# Migration Notes

## Overview
- Replaced all Supabase references with a Lovable Cloud aware client (`src/services/client.ts`).
- Added Microsoft Agent Framework scaffold via `packages/agent-runtime` and runtime health checks on the Agents page.
- Introduced a reusable Lemon AI chat dock with feature flagging and Lovable Cloud transport fallbacks.
- Added floating scroll control to improve navigation accessibility across long-form pages.

## Environment Variables
Add the following variables to your `.env` or Infisical workspace:

```
VITE_API_URL=https://your-lovable-cloud-endpoint
VITE_LOVABLE_KEY=lovable_api_key
VITE_CHAT_ENABLED=true
VITE_LEMONAI_API_KEY=placeholder-or-proxy-token
```

> **Note:** The Lemon AI API key should be brokered through the backend; the frontend only checks for presence to decide visibility.

## Infisical
- Created `infra/infisical/.infisical.template.json` with the expected secret structure.
- Added documentation in this file and `reports/spec-kit.json` for running `npx @infisical/cli run -- npm run dev` once external network access is restored.
- CLI installation is blocked in the execution environment (ENETUNREACH). Install `@infisical/cli` locally where internet access is available.

## Microsoft Agent Framework
- `packages/agent-runtime` exposes `createAgent` and `createLovableTransport` helpers to wrap the Microsoft Agent Framework conventions.
- `src/integrations/microsoftAgent.ts` wires the Lovable transport when credentials are available and falls back to local tool execution.
- The Agents page now runs `runAgentSelfCheck` on mount to surface runtime health.

## Lemon AI Chatbot
- `src/components/chatbot/ChatDock.tsx` is mounted globally in `App.tsx`.
- Feature flagging uses `VITE_CHAT_ENABLED` (default `true`). If Lovable credentials or Lemon API keys are absent, the component displays informative copy and mock responses.

## Scroll Utilities
- `ScrollToTopButton` listens for scroll offsets and respects the `prefers-reduced-motion` media query.

## After Pull
1. Install dependencies with `npm install --legacy-peer-deps` from the repository root (and within `newworldkids-main/` if that package remains in active use).
2. Configure Infisical or `.env` files as outlined above.
3. Run `npm run dev:frontend` to verify the chat dock and agent status widgets render correctly.
4. Once Lovable Cloud endpoints are available, run the agent self-check again to confirm live connectivity.
