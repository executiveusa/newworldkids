# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NEW WORLD KIDS PLATFORM                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │
│  │   Web App   │  │  Timeline   │  │   Mobile    │   APPS           │
│  │  (Next.js)  │  │ (CopilotKit)│  │   (React    │                  │
│  │   Port 3000 │  │   Port 3001 │  │   Native)   │                  │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘                  │
│         │                │                                           │
│  ───────┼────────────────┼───────────────────────────────────────   │
│         │                │                                           │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌─────────────┐                  │
│  │  Strapi CMS │  │  Blockchain │  │   Stellar   │   SERVICES       │
│  │   Port 1337 │  │   Service   │  │   Agents    │                  │
│  │             │  │   Port 3002 │  │   Port 3004 │                  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                  │
│         │                │                │                          │
│  ───────┼────────────────┼────────────────┼─────────────────────    │
│         │                │                │                          │
│  ┌──────▼────────────────▼────────────────▼──────┐                  │
│  │              SUPABASE (PostgreSQL)             │   DATA LAYER    │
│  │  - User profiles & auth                        │                  │
│  │  - Agent sessions & logs                       │                  │
│  │  - Donations & blockchain transactions         │                  │
│  │  - Impact metrics & projects                   │                  │
│  └────────────────────────────────────────────────┘                  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **Tailwind CSS 4** | Utility-first CSS |
| **Radix UI** | Accessible component primitives |
| **Framer Motion** | Animations |
| **Three.js** | 3D graphics (star field, effects) |
| **CopilotKit** | AI-powered UI generation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Strapi 5** | Headless CMS |
| **Express.js** | API services |
| **Prisma** | ORM for PostgreSQL |
| **Supabase** | Auth, database, realtime |

### AI/ML
| Technology | Purpose |
|------------|---------|
| **OpenAI GPT-4** | Orchestration, voice |
| **Claude 3.5** | Code generation |
| **Gemini 2.0** | Browser automation |
| **RouteLLM** | Cost-optimized routing |

### Blockchain
| Technology | Purpose |
|------------|---------|
| **Solana** | Donation transactions |
| **Metaplex** | NFT receipt minting |
| **@solana/web3.js** | Blockchain interaction |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **Turborepo** | Monorepo build system |
| **Docker** | Containerization |
| **Vercel** | Web app hosting |
| **Railway/Render** | Service hosting |

---

## Monorepo Structure

```
strapi-template-new-world-kids/
├── apps/
│   ├── web/                 # Main Next.js application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── lib/         # Utilities
│   │   │   └── types/       # TypeScript types
│   │   └── public/          # Static assets
│   │
│   ├── timeline/            # CopilotKit timeline app
│   └── mobile/              # React Native app (future)
│
├── services/
│   ├── cms/                 # Strapi CMS
│   │   ├── src/api/         # Content types
│   │   ├── config/          # Strapi config
│   │   └── database/        # DB settings
│   │
│   ├── blockchain/          # Solana donation service
│   │   ├── src/routes/      # API routes
│   │   └── prisma/          # Schema
│   │
│   └── agents/              # Stellar Agents service
│       └── src/agents/      # 6 AI agents
│
├── packages/
│   ├── design-system/       # Shared UI components
│   ├── shared-data/         # Shared types/data
│   ├── ai-router/           # RouteLLM integration
│   ├── eslint-config/       # ESLint rules
│   ├── prettier-config/     # Prettier rules
│   └── typescript-config/   # TS configs
│
├── supabase/
│   └── migrations/          # Database migrations
│
├── docs/                    # Documentation
├── scripts/                 # Build scripts
└── configs/                 # Shared configs
```

---

## Data Flow

### Donation Flow
```
User → Web App → Blockchain Service → Solana Network
                         ↓
                   Supabase DB
                         ↓
                   NFT Minting (if $50+)
                         ↓
                   User Wallet
```

### Agent Task Flow
```
User → Voice/Chat Input → Stellar Agents
                               ↓
                         Sirius (Orchestrator)
                               ↓
                    ┌──────────┼──────────┐
                    ↓          ↓          ↓
               Andromeda    Vega      Rigel
               (Code)     (Test)   (Research)
                    ↓          ↓          ↓
                    └──────────┼──────────┘
                               ↓
                         Results → User
```

---

## Environment Variables

See `.env.example` for full list. Key variables:

```bash
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
GOOGLE_API_KEY=...

# Blockchain
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=...

# Services
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=...
```

---

## Security

- **Authentication**: Supabase Auth with RLS policies
- **API Security**: JWT tokens, rate limiting, CORS
- **Blockchain**: Wallet signature verification
- **Secrets**: Environment variables, never committed

---

*For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)*
