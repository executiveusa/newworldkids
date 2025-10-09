# Component Inventory

## Global Shell
- `App.tsx` – Router, QueryClient provider, layout shell with navbar/footer, ChatDock, ScrollToTopButton.
- `components/Navbar.tsx` – Primary navigation.
- `components/Footer.tsx` – Global footer with contact information.

## Feature Modules
- `components/chatbot/ChatDock.tsx` – Lemon AI docked chatbot with React Query powered mutations.
- `components/ScrollToTopButton.tsx` – Floating scroll control respecting reduced motion.
- `components/agents/AgentChat.tsx` – Agent conversation UI used across tabbed views.
- `components/InteractiveMap.tsx`, `components/globe/*` – Visualizations for conservation missions.
- `components/donation/*` – Donation flow cards and callouts.
- `components/firebase/SyncStatusCard.tsx`, `components/SyncManager.tsx` – Firebase sync console.
- `components/home/*` – Hero sections, testimonials, feature cards for the landing experience.
- `components/blog/*` – Blog layout primitives (topic cards, filters, article tiles).

## Pages
- `pages/Home.tsx` – Landing page with sections from `components/home`.
- `pages/Dashboard.tsx` – Dashboard overview widgets.
- `pages/ImpactProjects.tsx` – Mission catalog.
- `pages/BlockchainTracker.tsx` – Blockchain data visualizations.
- `pages/AIWorkforce.tsx` – AI workforce education content.
- `pages/DonationPage.tsx` – Donation call-to-action.
- `pages/WalletSetup.tsx` – Solana wallet onboarding.
- `pages/NFTReceipt.tsx` – NFT receipt details.
- `pages/LeaderboardCompanies.tsx` / `pages/LeaderboardHelpers.tsx` – Leaderboards.
- `pages/SpecialNFTBadges.tsx`, `pages/ExclusivePerks.tsx`, `pages/Animated3DAnimals.tsx` – Gamified experiences.
- `pages/Agents.tsx` – AI agent hub with Microsoft Agent status alert and chats.
- `pages/Blog.tsx` and nested `[topic]`, `[slug]` routes – Content marketing stack.
- `pages/FirebaseSync.tsx` – Firebase integration dashboard.

## Services & Hooks
- `services/client.ts` – Lovable Cloud client and shared QueryClient.
- `services/agents/agentService.ts` – Agent messaging abstraction using Lovable Cloud with mock fallback.
- `integrations/microsoftAgent.ts` – Microsoft Agent Framework wrapper using new agent-runtime package.
- `hooks/useAgent.ts` – Agent interface for frontend views.
- `hooks/useLanguage.tsx` – Internationalization context.

## Packages
- `packages/agent-runtime` – Internal wrapper providing `createAgent` and Lovable transport helper for Microsoft Agent Framework compliance.
