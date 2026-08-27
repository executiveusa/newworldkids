# New World Kids Platform

> **Help turn interest into opportunity.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22.x-green)](https://nodejs.org/)
[![Turborepo](https://img.shields.io/badge/turborepo-2.x-blueviolet)](https://turbo.build/)

## About

New World Kids connects young people's existing interests to real community projects, experienced mentors, paid opportunities, and a clear next step.

The current Seattle focus is **The First 12**: 12 participants beginning in 2027. The model has four pathways into the same desired outcome.

### The four pathways

| Pathway | Focus | Goal |
|---------|-------|------|
| **Built for Good** | Technology | Real digital projects, paid experience, portfolio work, and mentorship |
| **Beyond the Game** | Sports | Exposure to the work and economy around sports through real roles and mentors |
| **Ground Up** | Urban Gardening + Food Systems | Hands-on food-systems, sustainability, construction, and stewardship projects |
| **Make Your Mark** | Art | Restoration, design, creation, and completed public-facing work |

### Proyecto Indigo Azul

Proyecto Indigo Azul in Puerto Vallarta, Mexico is the proof of concept behind part of the model. It showed what can happen when youth are given meaningful work, responsibility, and a chance to contribute. Seattle will look different, but the principle stays the same.

---

## Project Structure

```
new-world-kids/
├── apps/
│   ├── web/                 # Main website (Next.js 15)
│   ├── timeline/            # Interactive timeline (CopilotKit)
│   └── mobile/              # Mobile app (future)
│
├── services/
│   ├── cms/                 # Strapi CMS
│   ├── blockchain/          # Solana donation service
│   └── agents/              # Stellar AI Agents (6 agents)
│
├── packages/
│   ├── design-system/       # Shared UI components
│   ├── shared-data/         # Shared types & data
│   ├── ai-router/           # LLM routing (RouteLLM)
│   └── config/              # Shared configs
│
├── supabase/                # Database migrations
├── docs/                    # Documentation
└── scripts/                 # Build & deploy scripts
```

---

## Quick Start

### Prerequisites

- Node.js 22.x
- Yarn 1.22.x
- Docker (for CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/executiveusa/newworldkids.git
cd newworldkids

# Install dependencies
yarn install

# Start development
yarn dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start all services in dev mode |
| `yarn dev:web` | Start web app only |
| `yarn dev:cms` | Start Strapi CMS |
| `yarn build` | Build all packages |
| `yarn test` | Run tests |
| `yarn lint` | Lint all packages |

---

## AI Agents (Stellar Cockpit)

Our platform includes 6 AI agent roles:

| Agent | Role | Provider |
|-------|------|----------|
| **Sirius** | Orchestrator - Plans & coordinates | OpenAI GPT-4 |
| **Andromeda** | Coder - Generates & refactors code | Claude 3.5 |
| **Vega** | Validator - Tests & validates UI | Gemini 2.0 |
| **Rigel** | Researcher - Web research & analysis | Gemini 2.0 |
| **Cassiopeia** | Communicator - Voice & summaries | OpenAI Realtime |
| **Betelgeuse** | Builder - DevOps & infrastructure | Claude 3.5 |

Access the cockpit at `/cockpit` after login.

---

## Donations

Donations support participant wages, transportation, project materials, equipment, mentor support, and program coordination for New World Kids projects including the First 12.

Traditional donations are processed through our fiscal sponsor, **Humanitarian Social Innovations**. If a donation receipt lists Humanitarian Social Innovations, that is correct. Please reference **NEW WORLD KIDS**.

See [docs/FISCAL_SPONSOR.md](docs/FISCAL_SPONSOR.md) for details.

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [API Reference](docs/API.md)
- [Agent System](docs/AGENTS.md)
- [Fiscal Sponsor](docs/FISCAL_SPONSOR.md)

---

## Fiscal Sponsorship

New World Kids is a fiscally sponsored project of **Humanitarian Social Innovations**, a 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law.

**Contact:**
- 6725 S 116th Pl, Seattle, WA 98178
- info@nwkids.org
- 323-484-2914

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.
