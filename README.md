# New World Kids Platform

> **Moving young people from survival mode to purpose and dignity.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22.x-green)](https://nodejs.org/)
[![Turborepo](https://img.shields.io/badge/turborepo-2.x-blueviolet)](https://turbo.build/)

## 🌟 About

New World Kids is a **nonprofit media company** creating real-world projects that teach self-sufficiency in food, water, energy, and shelter. We're building an inclusive, self-sufficient standard of living for the next **7 generations**.

### Our Projects

| Project | Description | Status |
|---------|-------------|--------|
| **Proyecto Indigo Azul** | Food forest in Puerto Vallarta, Mexico | 🟢 Active |
| **Culture Shock Program** | Life skills training for ages 18-25 | 🟢 Active |
| **Culture Shock Sports** | Athlete mentorship & documentation | 🟡 Building |
| **The Real Minority Report** | Community newspaper for PNW | 🔵 Launching 2026 |

---

## 🏗️ Project Structure

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

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x
- Yarn 1.22.x
- Docker (for CMS)

### Installation

```bash
# Clone the repository
git clone https://github.com/executiveusa/strapi-template-new-world-kids.git
cd strapi-template-new-world-kids

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

## 🤖 AI Agents (Stellar Cockpit)

Our platform is powered by 6 AI agents:

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

## 💰 Donations

We accept donations via:

- **Solana blockchain** (SOL, USDC) - NFT receipt for $50+
- **Traditional methods** via our fiscal sponsor

See [docs/FISCAL_SPONSOR.md](docs/FISCAL_SPONSOR.md) for details.

---

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [API Reference](docs/API.md)
- [Agent System](docs/AGENTS.md)
- [Fiscal Sponsor](docs/FISCAL_SPONSOR.md)

---

## 🏛️ Fiscal Sponsorship

New World Kids is a fiscally sponsored project of **Humanitarian Social Innovations**, a 501(c)(3) nonprofit organization. Donations are tax-deductible to the extent allowed by law.

**Contact:**
- 📍 6725 S 116th Pl, Seattle, WA 98178
- 📧 info@nwkids.org
- 📞 323-484-2914

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ for the next 7 generations.**
