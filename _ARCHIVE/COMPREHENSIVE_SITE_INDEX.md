# 🌟 NEW WORLD KIDS - COMPREHENSIVE SITE INDEX
**Generated:** 2025-12-07T23:44:34-06:00  
**Repository:** executiveusa/strapi-template-new-world-kids  
**Purpose:** Complete site indexing for restructuring and rebuild

---

## 📊 EXECUTIVE SUMMARY

### Project Overview
**New World Kids** is a comprehensive educational platform with an ambitious **Stellar Agentic Cockpit** system. The platform combines:
- **Strapi CMS** for content management
- **Next.js 15** frontend with App Router
- **AI Agent Orchestration** (6 stellar agents)
- **Voice-driven workflows** (OpenAI Realtime + ElevenLabs)
- **Browser automation** (Playwright + Gemini Computer Use)
- **Blockchain integration** (Solana NFT minting)
- **Real-time features** (Supabase + WebSockets)

### Current State
- ✅ **Monorepo Architecture** (Turborepo)
- ✅ **2 Apps** (web, mobile)
- ✅ **13 Services** (CMS, agents, streaming, blockchain, etc.)
- ✅ **33 Packages** (shared utilities)
- ✅ **Extensive Documentation** (50+ markdown files)
- ⚠️ **Partially Implemented** (agents scaffolded, UI in progress)

### Technology Stack
| Category | Technology | Version |
|----------|-----------|---------|
| **Frontend** | Next.js | 15.4.7 |
| **React** | React | 18.3.1 |
| **Styling** | Tailwind CSS | 4.0.9 |
| **UI Library** | tweakcn-next | latest |
| **CMS** | Strapi | 5.12.4 |
| **Database** | Supabase + PostgreSQL | latest |
| **Package Manager** | Yarn | 1.22.19 |
| **Node** | Node.js | 22.x |
| **Build System** | Turborepo | 2.5.8 |

---

## 🗂️ PROJECT STRUCTURE

### Root Directory
```
strapi-template-new-world-kids/
├── .agents                          # Agent configuration
├── .claude/                         # Claude AI settings
├── .github/                         # GitHub workflows
├── .spec-kit/                       # Design specifications
├── apps/                            # Applications (2)
│   ├── mobile/                      # Mobile app (4 files)
│   └── web/                         # Next.js web app (397 files)
├── bmad_method/                     # BMAD methodology docs
├── docs/                            # Documentation (14 files)
├── envsmith/                        # Environment management (32 files)
├── packages/                        # Shared packages (33)
├── services/                        # Microservices (13)
│   ├── ai-agents/                   # Existing AI agents
│   ├── big-3-orchestrator/          # Multi-agent coordinator
│   ├── blockchain/                  # Solana integration
│   ├── browser-service/             # Playwright automation
│   ├── chrome-devtools-mcp/         # Chrome DevTools MCP
│   ├── cms/                         # Strapi CMS (155 files)
│   ├── computer-control/            # Gemini Computer Use
│   ├── stellar-agents/              # 6 Stellar agents (14 files)
│   ├── stream/                      # HLS streaming
│   └── voice-assistant/             # Voice integration
├── scripts/                         # Automation scripts (7)
├── supabase/                        # Database migrations
└── [50+ documentation files]        # Specs, plans, guides
```

---

## 🎯 CORE APPLICATIONS

### 1. Web Application (`apps/web/`)

#### Directory Structure
```
apps/web/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (platform)/              # Platform routes (no i18n)
│   │   │   ├── blog/[slug]/         # Blog posts
│   │   │   ├── cockpit/             # AI Agent Cockpit
│   │   │   │   ├── agents/[name]/   # Individual agent pages
│   │   │   │   ├── observability/   # Real-time logs
│   │   │   │   └── page.tsx         # Dashboard
│   │   │   ├── donate/              # Donation flow
│   │   │   └── impact/              # Impact metrics
│   │   ├── [locale]/                # Internationalized routes
│   │   │   ├── [[...rest]]/         # Dynamic CMS pages
│   │   │   ├── auth/                # Authentication flows
│   │   │   ├── listen/              # Audio streaming
│   │   │   └── player/              # Media player
│   │   └── api/                     # API routes
│   │       ├── auth/[...nextauth]/  # NextAuth
│   │       ├── public-proxy/        # Strapi public API
│   │       ├── private-proxy/       # Strapi private API
│   │       └── voice/command/       # Voice commands
│   ├── components/                  # React components (292 files)
│   │   ├── cockpit/                 # Cockpit UI components
│   │   ├── editor/                  # Page builder (38 files)
│   │   ├── elementary/              # Reusable components
│   │   ├── examples/                # Reference implementations
│   │   ├── home/                    # Landing page
│   │   ├── impact/                  # Impact dashboard
│   │   ├── providers/               # Context providers
│   │   └── ui/                      # shadcn/ui components (50+)
│   ├── hooks/                       # Custom React hooks (6)
│   ├── lib/                         # Utilities (26 files)
│   │   ├── fonts.ts                 # Font configuration
│   │   ├── navigation.ts            # i18n routing
│   │   ├── supabase/                # Supabase client
│   │   └── utils.ts                 # Helper functions
│   ├── styles/                      # Global styles (2)
│   └── types/                       # TypeScript types (6)
├── public/                          # Static assets
├── locales/                         # i18n translations (3)
├── package.json                     # Dependencies
├── next.config.mjs                  # Next.js config
├── tailwind.config.ts               # Tailwind config
└── tsconfig.json                    # TypeScript config
```

#### Key Routes

**Platform Routes** (No locale prefix)
| Route | File | Purpose | Auth |
|-------|------|---------|------|
| `/cockpit` | `(platform)/cockpit/page.tsx` | Agent dashboard | 🔒 |
| `/cockpit/agents/[name]` | `(platform)/cockpit/agents/[name]/page.tsx` | Agent detail | 🔒 |
| `/cockpit/observability` | `(platform)/cockpit/observability/page.tsx` | Real-time logs | 🔒 |
| `/blog/[slug]` | `(platform)/blog/[slug]/page.tsx` | Blog posts | ✅ |
| `/donate` | `(platform)/donate/page.tsx` | Donation flow | ✅ |
| `/impact` | `(platform)/impact/page.tsx` | Impact metrics | ✅ |

**Localized Routes** (`/{locale}/...`)
| Route | File | Purpose | Auth |
|-------|------|---------|------|
| `/[locale]/[[...rest]]` | `[locale]/[[...rest]]/page.tsx` | Dynamic CMS pages | ✅ |
| `/[locale]/auth/*` | `[locale]/auth/*/page.tsx` | Auth flows (7 pages) | Mixed |
| `/[locale]/listen` | `[locale]/listen/page.tsx` | Audio streaming | ✅ |
| `/[locale]/player` | `[locale]/player/page.tsx` | Media player | ✅ |

**API Routes**
| Route | Purpose | Auth |
|-------|---------|------|
| `/api/auth/[...nextauth]` | NextAuth handler | ✅ |
| `/api/public-proxy/[...slug]` | Public Strapi proxy | ❌ |
| `/api/private-proxy/[...slug]` | Private Strapi proxy | 🔒 |
| `/api/voice/command` | Voice command processing | 🔒 |
| `/api/agents/execute` | Agent execution | 🔒 |

---

## 🤖 STELLAR AGENTS SYSTEM

### The Six Stellar Agents

#### 1. **Sirius** - The Navigator (Orchestrator)
- **Role:** Plans features, coordinates sub-agents
- **Model:** GPT-4 Turbo (OpenAI)
- **Temperature:** 0.7
- **Capabilities:**
  - Task decomposition
  - Agent orchestration
  - Workflow planning
  - Resource allocation

#### 2. **Andromeda** - The Coder
- **Role:** Code generation, refactoring, debugging
- **Model:** Claude 3.5 Sonnet (Anthropic)
- **Temperature:** 0.3
- **Capabilities:**
  - Full-stack code generation
  - Code refactoring
  - Bug fixing
  - Test generation

#### 3. **Vega** - The Validator
- **Role:** UI testing, visual regression, accessibility
- **Model:** Gemini 2.0 Flash (Google)
- **Temperature:** 0.2
- **Capabilities:**
  - Automated browser testing (Playwright)
  - Visual regression detection
  - Accessibility audits (WCAG 2.1 AA)
  - Performance testing (Lighthouse)

#### 4. **Rigel** - The Researcher
- **Role:** Web research, competitive analysis
- **Model:** Gemini 2.0 Flash (Google)
- **Temperature:** 0.5
- **Capabilities:**
  - Web scraping
  - Competitive analysis
  - Documentation research
  - API discovery

#### 5. **Cassiopeia** - The Communicator
- **Role:** Voice recognition, text-to-speech
- **Model:** GPT-4o Realtime (OpenAI) + ElevenLabs
- **Voice:** Shimmer (OpenAI), Rachel (ElevenLabs)
- **Capabilities:**
  - Real-time voice transcription
  - Text-to-speech synthesis
  - Command routing
  - Multi-turn dialogue

#### 6. **Betelgeuse** - The Builder
- **Role:** Infrastructure, deployments, CI/CD
- **Model:** Claude 3.5 Sonnet (Anthropic)
- **Temperature:** 0.4
- **Capabilities:**
  - Deployment automation
  - Docker container management
  - CI/CD pipeline creation
  - Monitoring and alerting

---

## 🎨 UI COMPONENT LIBRARY

### shadcn/ui Components (50+)

**Form & Input**
- Button, Input, Textarea, Checkbox, Radio Group
- Select, Switch, Slider, Input OTP
- Form, Label, Calendar, Date Picker

**Layout**
- Card, Accordion, Tabs, Dialog, Sheet
- Drawer, Separator, Scroll Area, Aspect Ratio
- Resizable

**Navigation**
- Navigation Menu, Menubar, Dropdown Menu
- Context Menu, Breadcrumb, Pagination, Command

**Feedback**
- Alert, Alert Dialog, Toast, Sonner
- Progress, Skeleton, Spinner

**Display**
- Avatar, Badge, Tooltip, Popover
- Hover Card, Carousel, Chart, Table

### Custom Components

**Cockpit Components** (`components/cockpit/`)
- AgentCard, AgentHeader, AgentStats
- ActivityFeed, CockpitHeader
- DonationFeedWidget, LiveLogsViewer
- LogEntry, LogFilters, ServicesPanel
- SessionsList, VoiceCommandButton

**Editor Components** (`components/editor/`)
- 38+ page builder components
- AI-assisted editing tools
- Theme preview system

---

## 🗄️ DATABASE ARCHITECTURE

### Supabase Tables (New - Agent System)

**Core Agent Tables**
```sql
agents                  -- Agent registry (6 stellar agents)
agent_sessions          -- Session tracking
agent_logs              -- Observability logs (all actions)
```

**AI & Voice**
```sql
ai_conversations        -- Chat history (multi-modal)
voice_sessions          -- Voice recordings + transcripts
```

**Blockchain**
```sql
donations_feed          -- Real-time donation events
```

**Browser Automation**
```sql
browser_sessions        -- Browser test sessions
```

**Infinite Loop**
```sql
agentic_waves          -- Wave iterations
variant_results        -- Variant scores
```

**Services**
```sql
services               -- Service registry
service_health_history -- Health check history
```

**Content**
```sql
user_profiles          -- Extended user data
user_perks            -- User rewards
tutorials             -- Cosmic Tutorials
```

### PostgreSQL (Existing - Strapi)
- **DO NOT MODIFY** - Strapi owns these tables
- All tables prefixed with `strapi_*`

---

## 🔌 SERVICES & PORTS

| Service | Port | Status | Purpose |
|---------|------|--------|---------|
| **Strapi CMS** | 1337 | ✅ Existing | Content management |
| **Stream Service** | 3001 | ✅ Existing | HLS streaming |
| **Blockchain** | 3002 | ✅ Existing | Solana NFT minting |
| **AI Agents** | 3003 | ✅ Existing | Nova, Echo, Flow, Pulse |
| **Stellar Agents** | 3004 | 🚧 New | Six stellar agents |
| **Computer Control** | 3005 | ✅ Existing | Basic Gemini |
| **Big-3 Orchestrator** | 3010 | 🚧 New | Multi-agent coordination |
| **Browser Service** | 3013 | 🚧 New | Playwright automation |
| **Chrome DevTools MCP** | 3014 | 🚧 New | CDP integration |
| **Infinite Loop** | 3015 | 🚧 New | Variant generation |
| **Next.js Web** | 3000 | ✅ Running | Frontend + Cockpit UI |

---

## 📚 DOCUMENTATION FILES

### Core Documents (50+)

**Constitutional & Planning**
- `constitution.md` - Non-negotiable principles (12 commandments)
- `specification.md` - Complete PRD (2,410 lines)
- `plan.md` - Technical implementation plan (796 lines)
- `tasks.md` - Implementation checklist (1,045 lines)

**Deployment & Infrastructure**
- `DEPLOYMENT.md` - Complete deployment guide
- `DEPLOYMENT_ARCHITECTURE.md` - Infrastructure design
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
- `RAILWAY_ZERO_SECRETS_DEPLOYMENT.md` - Railway setup
- `COOLIFY_SUPPORT.md` - Self-hosted deployment
- `DOCKER_SETUP.md` - Containerization guide

**Development Guides**
- `README.md` - Main project documentation
- `QUICK_START.md` - Getting started guide
- `START_HERE.md` - Onboarding document
- `PROJECT_STATUS.md` - Current state
- `CODEBASE_ANALYSIS.md` - Code structure analysis

**Design & UI**
- `DESIGN_AUDIT.md` - UI/UX audit
- `DESIGN_AUDIT_CHECKLIST.md` - Design review
- `GAME_UI_TRANSFORMATION.md` - GameUI components
- `AWWWARDS_IMPLEMENTATION_PLAN.md` - Premium design
- `AWWWARDS_SUMMARY.md` - Design inspiration

**AI & Agents**
- `CODEX_PROMPT.md` - AI coding prompts
- `CODEX_PHASE2_PROMPT.md` - Phase 2 instructions
- `FINAL_CODEX_PROMPT.md` - Final implementation
- `MULTI_LLM_CONFIGURATION.md` - Multi-model setup
- `ROUTELLM_SETUP.md` - Router LLM config

**Build & Integration**
- `BUILD_COMPLETE.md` - Build completion report
- `BUILD_FINAL.md` - Final build status
- `IMPLEMENTATION_COMPLETE.md` - Implementation summary
- `INTEGRATION_COMPLETE.md` - Integration report
- `WAVE1_COMPLETE.md` - Wave 1 completion

**Migration & Setup**
- `MIGRATION_NOTES.md` - Migration guide
- `SUPABASE_MIGRATION_GUIDE.md` - Supabase setup
- `SUPABASE_SETUP.md` - Supabase configuration
- `ENV_SETUP.md` - Environment variables
- `FIREBASE_SETUP.md` - Firebase integration

**Specialized**
- `REDPLANET_CORE_INTEGRATION.md` - RedPlanet integration
- `STELLAR_COCKPIT_README.md` - Cockpit documentation
- `SITE_INDEX.md` - Previous site index
- `FEASIBILITY_ANALYSIS.md` - Technical feasibility
- `MANUAL_STEPS_REQUIRED.md` - Manual interventions

---

## 🎨 DESIGN SYSTEM

### Typography (Awwwards-Inspired)

**Font Stack**
| Purpose | Font | Usage |
|---------|------|-------|
| **Display** | Space Grotesk | Headings, hero sections |
| **Cosmic** | Orbitron | Technical UI, agent names |
| **Body** | Inter | Paragraphs, UI text |
| **Code** | JetBrains Mono | Logs, code blocks |
| **Serif** | Playfair Display | Editorial content |
| **Impact** | Bebas Neue | Callouts, emphasis |

**Tailwind Classes**
- `font-display` - Space Grotesk
- `font-cosmic` - Orbitron
- `font-sans` - Inter
- `font-mono` - JetBrains Mono
- `font-serif` - Playfair Display
- `font-impact` - Bebas Neue

### Color Palette (Cosmic Theme)

```css
--purple-primary: #667eea
--purple-secondary: #764ba2
--blue-accent: #3b82f6
--green-success: #10b981
--yellow-warning: #f59e0b
--red-error: #ef4444
--gray-bg: #0f172a (slate-950)
--gray-card: #1e293b (slate-900)
```

---

## 🔐 AUTHENTICATION & SECURITY

### Auth Flow
```
User → Supabase Auth → JWT Token
  ↓
Vercel Edge Functions (validate JWT)
  ↓
Supabase RLS (Row Level Security)
  ↓
Protected API Routes
```

### Environment Variables (Required)

**Node Environment**
```bash
NODE_ENV=production
PORT=1337
```

**Database**
```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_NAME=strapi
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
```

**Strapi Secrets**
```bash
ADMIN_JWT_SECRET=your-secret
JWT_SECRET=your-secret
API_TOKEN_SALT=your-secret
APP_KEYS=your-keys
```

**AI Services**
```bash
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
GOOGLE_API_KEY=your-key
ELEVENLABS_API_KEY=your-key
```

**Supabase**
```bash
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-key
```

---

## 🚀 DEPLOYMENT STRATEGY

### Current Deployments
- **Frontend:** Vercel (Next.js)
- **Backend:** Render (Strapi CMS)
- **Database:** Supabase (PostgreSQL + Real-time)
- **CDN:** Vercel Edge Network

### Planned Deployments
- **Stellar Agents:** Railway (Node.js)
- **Big-3 Orchestrator:** Railway
- **Browser Service:** Railway (with Playwright)
- **Chrome DevTools MCP:** Railway
- **Infinite Loop:** Railway

---

## 📊 KEY METRICS & GOALS

### Phase 1 Goals (Week 1)
- ✅ All 6 agents operational
- ✅ Voice commands working
- ✅ Dashboard accessible
- ✅ Real-time logs streaming
- ✅ 3+ tutorials published

### Phase 2 Goals (Week 2)
- ✅ Browser automation functional
- ✅ Big-3 orchestrator coordinating agents
- ✅ Infinite loop generating variants
- ✅ 10+ agent sessions per day
- ✅ 95% uptime

### Phase 3 Goals (Week 3+)
- ✅ 100+ users onboarded
- ✅ 1000+ agent invocations
- ✅ Community contributions
- ✅ 4.5/5 user satisfaction
- ✅ 99.9% uptime SLA

---

## 🔧 DEVELOPMENT WORKFLOW

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/executiveusa/strapi-template-new-world-kids.git
cd strapi-template-new-world-kids

# 2. Install dependencies
nvm use  # Switch to Node 22
yarn     # Install all workspace dependencies

# 3. Setup environment variables
cp .env.example .env.local
# Add STRAPI_REST_READONLY_API_KEY after starting Strapi

# 4. Start services
yarn dev:cms  # Start Strapi on :1337
yarn dev:web  # Start Next.js on :3000

# 5. Access
# - Web UI: http://localhost:3000
# - Strapi Admin: http://localhost:1337/admin
# - Cockpit: http://localhost:3000/cockpit
```

### Build Commands

```bash
# Development
yarn dev              # Start all services
yarn dev:cms          # Strapi CMS only
yarn dev:web          # Next.js only
yarn dev:stream       # Stream service only

# Production
yarn build            # Build all services
yarn build:cms        # Build Strapi
yarn build:web        # Build Next.js
yarn start            # Start production servers

# Testing
yarn test             # Run all tests
yarn lint             # Lint all code
yarn typecheck        # TypeScript check
```

---

## 🎯 NEXT STEPS FOR RESTRUCTURING

### Immediate Priorities

1. **Database Migration**
   - Apply Supabase migration (`supabase/migrations/20250120_initial_schema.sql`)
   - Verify all 14 tables created
   - Test RLS policies

2. **Typography Setup**
   - Create `apps/web/src/lib/fonts.ts`
   - Update root layout with font variables
   - Update Tailwind config with font families

3. **Stellar Agents Implementation**
   - Build base agent class
   - Implement 6 stellar agents
   - Create agent registry
   - Set up API server (port 3004)

4. **Cockpit UI Development**
   - Create cockpit layout
   - Build dashboard page
   - Implement agent cards
   - Add real-time log viewer
   - Integrate voice command button

5. **Voice Integration**
   - Set up OpenAI Realtime API
   - Configure ElevenLabs TTS
   - Build voice command router
   - Create voice UI components

6. **Browser Automation**
   - Set up Playwright service
   - Create test scenarios
   - Build screenshot utilities
   - Implement test runner

7. **Documentation**
   - Create agent documentation
   - Write API contracts
   - Build tutorials
   - Update README

---

## 📝 CRITICAL NOTES

### Constitutional Rules (Must Follow)

1. ⛔ **NEVER modify existing back-end** (`services/cms/`, Strapi database)
2. 🌌 **Cosmic naming only** (Sirius, Andromeda, Vega, etc.)
3. 🎨 **tweakcn-next components only** (no other UI libraries)
4. 🖋️ **Follow typography system** (Space Grotesk, Orbitron, etc.)
5. 🔐 **Supabase for new data** (never modify Strapi PostgreSQL)
6. 🎙️ **Voice-first interaction** (Cassiopeia accessible everywhere)
7. 🔄 **Idempotent operations** (safe to run multiple times)
8. 📊 **Observable by default** (log all agent actions)
9. 💰 **Token budget awareness** (2M token soft cap)
10. 🛡️ **Safety-first** (confirm destructive operations)
11. 🧩 **Modular architecture** (easy to extend)
12. 📚 **Documentation as code** (every feature documented)

### Protected Directories (Read-Only)
```
services/cms/              # Strapi CMS
services/stream/           # HLS streaming
services/cms/config/       # Strapi config
services/cms/database/     # Strapi DB
```

### Approved Stack
- **Frontend:** Next.js 15.4.7, React 18
- **UI:** tweakcn-next, Tailwind CSS 4.0.9
- **Database:** Supabase (PostgreSQL + Real-time)
- **CMS:** Strapi 5.12.4 (existing)
- **Voice:** OpenAI Realtime, ElevenLabs
- **Browser:** Playwright, Gemini Computer Use
- **Fonts:** Space Grotesk, Orbitron, Inter, JetBrains Mono

---

## 📞 SUPPORT & RESOURCES

### Documentation
- **Main README:** `README.md`
- **Constitution:** `constitution.md`
- **Specification:** `specification.md`
- **Plan:** `plan.md`
- **Tasks:** `tasks.md`

### External Resources
- **GitHub:** https://github.com/executiveusa/strapi-template-new-world-kids
- **Supabase Dashboard:** https://supabase.com/dashboard/project/sbbuxnyvflczfzvsglpe
- **Render Deployment:** https://strapi-template-new-world-kids.onrender.com

---

**Index Complete. Ready for restructuring and rebuild.**

**Last Updated:** 2025-12-07T23:44:34-06:00  
**Indexer:** Claude (Sonnet 4)  
**Version:** 1.0.0
