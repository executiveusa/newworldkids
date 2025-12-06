# 🧱 New World Kids - Golden Boilerplate

> **Educational platform for children focused on blockchain technology and conservation**

Successfully transformed from Lovable-generated Vite/React to the Golden Boilerplate architecture (Next.js + Express + Prisma).

[![Deploy Backend to Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fexecutiveusa%2Fnewworldkids&envs=DATABASE_URL%2CJWT_SECRET%2CFRONTEND_URL&optionalEnvs=FRONTEND_URL&DATABASE_URLDesc=PostgreSQL+connection+string&JWT_SECRETDesc=Secret+key+for+JWT+tokens&FRONTEND_URLDesc=URL+of+your+deployed+frontend&DATABASE_URLDefault=postgresql%3A%2F%2Fuser%3Apass%40host%3Aport%2Fdb&JWT_SECRETDefault=your_super_secret_jwt_key_here&FRONTEND_URLDefault=https%3A%2F%2Fyour-frontend.vercel.app&referralCode=newworldkids)

## 🏗️ Architecture

This project uses the **Golden Boilerplate** architecture:

- **Frontend**: Next.js 14 with App Router (deployed to Vercel)
- **Backend**: Express.js + TypeScript (deployed to Railway)
- **Database**: PostgreSQL with Prisma ORM (hosted on Railway)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Solana wallet integration

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database (or use Railway for hosting)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/executiveusa/newworldkids.git
   cd newworldkids
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   **Frontend** (`apps/frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   ```
   
   **Backend** (`apps/backend/.env`):
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/newworldkids
   JWT_SECRET=your_development_secret_here
   FRONTEND_URL=http://localhost:3000
   PORT=8080
   ```

4. **Set up the database**
   ```bash
   cd apps/backend
   npm run db:generate
   npm run db:push
   ```

5. **Start development servers**
   
   **Terminal 1** (Backend):
   ```bash
   npm run dev:backend
   ```
   
   **Terminal 2** (Frontend):
   ```bash
   npm run dev:frontend
   ```

6. **Visit the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Health Check: http://localhost:3000/healthz

## 📁 Project Structure

```
newworldkids/
├── apps/
│   ├── frontend/                 # Next.js 14 application
│   │   ├── app/                 # App Router pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── healthz/         # Health check page
│   │   │   └── layout.tsx       # Root layout
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities
│   │   └── public/              # Static assets
│   └── backend/                 # Express + Prisma API
│       ├── src/
│       │   ├── index.ts         # Express server
│       │   └── routes/          # API routes
│       ├── prisma/
│       │   └── schema.prisma    # Database schema
│       ├── Dockerfile           # Container config
│       └── railway.toml         # Railway deployment
├── specs/                       # Implementation specifications
├── .github/workflows/           # CI/CD pipeline
└── README.md
```

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect your repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `apps/frontend` as the root directory

2. **Configure environment variables in Vercel dashboard**:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app
   NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
   ```

3. **Deploy** - Vercel will automatically deploy on every push to main

### Backend (Railway)

1. **One-click deploy using the button above**, or manually:
   - Visit [railway.app](https://railway.app)
   - Create new project from GitHub repository
   - Select `apps/backend` as the root directory

2. **Configure environment variables in Railway dashboard**:
   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db  # Railway auto-provides this
   JWT_SECRET=your_super_secret_jwt_key_here_replace_in_production
   FRONTEND_URL=https://your-frontend.vercel.app
   PORT=8080
   NODE_ENV=production
   ```

3. **Railway will automatically**:
   - Create a PostgreSQL database
   - Build and deploy your container
   - Provide HTTPS endpoints
   - Handle auto-scaling

## 🔧 Development with VS Code + MCP

This project is optimized for development with VS Code and MCP (Model Context Protocol) servers:

1. **Start MCP Gateway**:
   ```bash
   npx @anthropic-ai/mcp-server-gateway
   ```

2. **Add MCP Servers**:
   - **Vercel MCP Server**: For frontend deployment management
   - **Railway MCP Server**: For backend deployment management

3. **Keep secrets in platform dashboards** - never commit secrets to code

## 🧪 Testing

### Run Tests
```bash
# Frontend tests (when implemented)
npm run test:frontend

# Backend tests (when implemented)  
npm run test:backend

# Build both apps
npm run build
```

### Health Checks
- **Frontend Health**: Visit `/healthz` page to check frontend + backend connectivity
- **Backend Health**: `GET /health` endpoint returns service status
- **Database Health**: Included in backend health check

## 📊 Features

### Current Features (Migrated from Vite)
- ✅ **Home Page**: Hero section with educational content
- ✅ **Blog System**: Dynamic routing for educational topics
- ✅ **Donation System**: Progress tracking and donor management
- ✅ **Wallet Integration**: Solana wallet connectivity
- ✅ **Dashboard**: Impact projects and user data
- ✅ **Leaderboards**: Companies and helpers ranking
- ✅ **NFT Badges**: Special achievement tracking
- ✅ **Multi-language**: Internationalization support

### Golden Boilerplate Additions
- ✅ **Health Monitoring**: Frontend and backend health checks
- ✅ **API Documentation**: RESTful API with proper error handling
- ✅ **Database Migrations**: Prisma-powered schema management
- ✅ **Containerization**: Docker support for Railway deployment
- ✅ **CI/CD Pipeline**: Automated testing and deployment
- ✅ **Type Safety**: End-to-end TypeScript integration

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Backend health check |
| `GET` | `/api/status` | API status information |
| `GET` | `/api/blog/posts` | List blog posts *(coming soon)* |
| `GET` | `/api/donations` | List donations *(coming soon)* |
| `GET` | `/api/leaderboard` | Leaderboard data *(coming soon)* |

## 🗄️ Database Schema

The Prisma schema includes models for:
- **BlogPost**: Educational content with topics and slugs
- **Donation**: Donation tracking with amounts and donors
- **User**: User profiles with wallet integration
- **ImpactProject**: Conservation project tracking
- **NFTBadge**: Special achievement badges

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript | Server-side rendering, static generation |
| **Styling** | Tailwind CSS, shadcn/ui | Responsive design, component library |
| **Backend** | Express.js, TypeScript | RESTful API, middleware |
| **Database** | PostgreSQL, Prisma ORM | Data persistence, type-safe queries |
| **Authentication** | Solana Wallets, JWT | Blockchain wallet integration |
| **Deployment** | Vercel, Railway | Frontend and backend hosting |
| **CI/CD** | GitHub Actions | Automated testing and deployment |

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes and test**: `npm run build`
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Lovable**: For the original application foundation
- **BMAD Method**: For structured planning and development
- **Spec-Kit**: For specification-driven development workflow
- **Golden Boilerplate**: For the Next.js + Express + Prisma architecture

---

**Built with ❤️ for educating the next generation about blockchain and conservation**

## 🧭 Admin & Agent Ops Dashboard

The `/dashboard` route inside the Vite app now exposes an admin shell with tabs for Overview, AI Agents, Tasks, Donors, Documents, and Settings. The layout uses a persistent sidebar and card-first views to keep navigation obvious and align with the "Don’t Make Me Think" guidance.

### Run the dashboard locally
1. Install dependencies at the repo root: `npm install --legacy-peer-deps`.
2. Start the Vite frontend: `npm run dev` (served at http://localhost:5173 by default).
3. Optional: Start the lightweight Express backend if you are developing APIs: `npm run dev:backend`.
4. Visit http://localhost:5173/dashboard to access the admin shell.

### Eigent multi-agent backend (optional but recommended)
1. From the sibling repo `eigent-main/server`, copy the sample env: `cp .env.example .env`.
2. Start the stack with Docker: `docker compose up -d` (FastAPI will listen on http://localhost:3001).
3. In `newworldkids-main`, set `VITE_EIGENT_API_URL=http://localhost:3001` in a `.env.local` file for the Vite app.
4. The dashboard will surface Eigent health, list agents when available, and allow you to create tasks that reference those agents.

### Document handling
- Multi-PDF upload controls exist on the Documents tab; files are staged locally in the UI for quick iteration.
- Connect the upload flow to your preferred storage/API when you wire the backend endpoints.


## 🚀 Zero-Secrets Deployment

This project supports the **Railway Zero-Secrets Bootstrapper** pattern for secure, cost-protected deployments.

### Key Files

| File | Purpose |
|------|---------|
| `.agents` | Machine-readable secret specification for provisioning agents |
| `master.secrets.json.template` | Template for local secrets management |
| `maintenance.html` | Static maintenance page for auto-shutdown |
| `COOLIFY_SUPPORT.md` | Coolify deployment scaffolding |
| `COOLIFY_MIGRATION.md` | Migration checklist for Coolify |

### Cost Protection Guardrails

The Railway deployment includes built-in cost protection:

- **Resource Limits**: Enforced minimal memory/CPU allocation
- **Free Tier Monitoring**: Automatic detection of usage ceiling
- **Auto-Shutdown**: Service pauses when limits approached
- **Maintenance Mode**: Static page deployment during shutdown

### Secret Management

```bash
# 1. Copy template to secure location (outside repo)
cp master.secrets.json.template ~/secure/master.secrets.json

# 2. Fill in your actual secrets
# 3. Use with secrets-provisioning agent for deployment

# NEVER commit master.secrets.json to version control
```

### Multi-Host Failover

When Railway free tier is exceeded:

1. **Automatic Shutdown**: Main service pauses
2. **Maintenance Page**: Static page deployed
3. **Migration Ready**: Coolify config scaffolding available
4. **Checklist Generated**: See `COOLIFY_MIGRATION.md`
