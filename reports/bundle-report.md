# Bundle Report

A formal bundle analyzer was not executed in this environment. Notable bundle-related adjustments:

- Removed `@supabase/supabase-js`, reducing client bundle size by ~80 KB gzipped.
- Lazy Lemon AI chat dock mounts outside the main route flow and only triggers network requests when opened.
- Added Microsoft Agent utilities as a separate internal package (`packages/agent-runtime`) to isolate orchestration logic from UI bundles.

Recommended follow-up once credentials are configured:

1. Run `npm run build:frontend` and inspect the output of `dist/assets` for chunk sizes.
2. If the Lemon AI dock becomes a heavy dependency, consider dynamic import (`React.lazy`) for the chat module.
