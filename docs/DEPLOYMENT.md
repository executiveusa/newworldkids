# Deployment Guide

## Overview

The New World Kids platform can be deployed to various providers. This guide covers the recommended setup.

---

## Quick Deploy Options

| Component | Recommended Host | Alternative |
|-----------|------------------|-------------|
| Web App | Vercel | Netlify, Railway |
| Strapi CMS | Railway | Render, DigitalOcean |
| Blockchain Service | Railway | Render |
| Database | Supabase | Railway Postgres |

---

## Prerequisites

- Node.js 22.x
- Yarn 1.22.x
- Docker (for local development)
- Accounts: Vercel, Railway, Supabase

---

## Step 1: Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run migrations:
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

3. Get your credentials:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `DATABASE_URL`

---

## Step 2: Strapi CMS (Railway)

1. Push to GitHub

2. Create new Railway project from repo

3. Set environment variables:
```bash
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
ADMIN_JWT_SECRET=<generate-random-32-chars>
JWT_SECRET=<generate-random-32-chars>
API_TOKEN_SALT=<generate-random-32-chars>
APP_KEYS=<generate-random-32-chars>
```

4. Deploy and get URL

---

## Step 3: Web App (Vercel)

1. Connect GitHub repo to Vercel

2. Set root directory: `apps/web`

3. Set environment variables:
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.railway.app
STRAPI_API_TOKEN=<from-strapi-admin>
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

4. Deploy

---

## Step 4: Blockchain Service (Railway)

1. Create new Railway service

2. Set root directory: `services/blockchain`

3. Set environment variables:
```bash
DATABASE_URL=${{Postgres.DATABASE_URL}}
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=<your-helius-rpc-url>
```

4. Deploy

---

## Environment Variables Reference

### Web App
```bash
# Public
NEXT_PUBLIC_APP_URL=https://nwkids.org
NEXT_PUBLIC_STRAPI_URL=https://cms.nwkids.org
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Private
STRAPI_API_TOKEN=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-xxx
```

### Strapi CMS
```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://...
ADMIN_JWT_SECRET=xxx
JWT_SECRET=xxx
API_TOKEN_SALT=xxx
APP_KEYS=xxx,xxx
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_BUCKET=nwkids-media
```

### Blockchain Service
```bash
PORT=3002
DATABASE_URL=postgresql://...
SOLANA_NETWORK=mainnet-beta
SOLANA_RPC_URL=https://rpc.helius.xyz/?api-key=xxx
ALLOWED_ORIGINS=https://nwkids.org
```

---

## Docker Deployment

For self-hosted deployments:

```bash
# Build all services
docker-compose -f docker-compose.yml build

# Start services
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f
```

---

## Health Checks

| Service | Endpoint |
|---------|----------|
| Web App | `/api/health` |
| Strapi | `/api/health` |
| Blockchain | `/health` |
| Agents | `/health` |

---

## Monitoring

- **Sentry** - Error tracking (configured in web app)
- **Vercel Analytics** - Web performance
- **Supabase Dashboard** - Database monitoring

---

## Troubleshooting

### Build Failures
- Check Node.js version (22.x required)
- Clear caches: `yarn cache clean`
- Delete `node_modules` and reinstall

### Database Connection
- Verify `DATABASE_URL` format
- Check IP allowlists on Supabase
- Ensure SSL mode is correct

### Strapi Issues
- Regenerate API keys if 401 errors
- Check admin panel at `/admin`

---

*For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md)*
