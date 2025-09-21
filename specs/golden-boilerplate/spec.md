# Feature Specification: Golden Boilerplate Transformation

## Overview
Transform the existing Lovable-generated Vite/React application into the Golden Boilerplate architecture (Next.js + Express + Prisma) for improved deployment and scalability.

## Business Requirements

### What Users Need
1. **Same Functionality**: All existing features must continue to work
2. **Better Performance**: Server-side rendering and optimized loading
3. **Scalable Architecture**: Separate frontend/backend for independent scaling
4. **Easy Deployment**: One-click deployment to Vercel and Railway
5. **Developer Experience**: Clear development setup and documentation

### Why This Transformation
- **Current Pain Points**: Direct Supabase integration limits backend flexibility
- **Scalability**: Monolithic client-side app harder to scale
- **Deployment**: Need standardized deployment to Vercel/Railway
- **Team Development**: Separate concerns for frontend/backend teams

## Technical Requirements

### Architecture Changes
1. **Frontend Migration**: Vite/React Router → Next.js 14 App Router
2. **Backend Creation**: Extract data layer into Express + Prisma API
3. **Database Migration**: Supabase → PostgreSQL with Prisma ORM
4. **Routing**: Client-side routing → App Router with SSR/SSG
5. **Environment**: Move all secrets to platform dashboards

### Core Features to Preserve
- [ ] Home page with hero section and interactive map
- [ ] Blog system with dynamic routing (`/blog/[topic]/[slug]`)
- [ ] Donation page with progress tracking
- [ ] Wallet integration (Solana)
- [ ] Dashboard and impact projects
- [ ] Leaderboards and NFT features
- [ ] AI workforce and agents pages
- [ ] Multi-language support

### New Features Added
- [ ] Health check endpoints for monitoring
- [ ] API documentation
- [ ] Database migrations
- [ ] Containerized backend
- [ ] CI/CD pipeline

## Success Criteria

### Functional Requirements
- [ ] All existing pages load and function correctly
- [ ] Wallet connection works in Next.js environment
- [ ] Blog posts display with proper SEO metadata
- [ ] API endpoints respond correctly
- [ ] Database operations work through Prisma

### Performance Requirements
- [ ] Initial page load < 3 seconds
- [ ] API response time < 500ms
- [ ] Lighthouse score > 90 for performance
- [ ] No console errors in production

### Deployment Requirements
- [ ] Frontend deploys successfully to Vercel
- [ ] Backend deploys successfully to Railway
- [ ] Environment variables work correctly
- [ ] Database connection established
- [ ] Health checks pass

## Technical Implementation

### Directory Structure
```
apps/
├── frontend/           # Next.js 14 application
│   ├── app/           # App Router pages
│   ├── components/    # React components (migrated)
│   ├── lib/          # Utilities and configurations
│   └── public/       # Static assets
└── backend/           # Express + Prisma API
    ├── src/          # TypeScript source code
    ├── prisma/       # Database schema and migrations
    └── Dockerfile    # Container configuration
```

### API Design
- `GET /health` - Health check endpoint
- `GET /api/blog/posts` - Blog posts listing
- `GET /api/blog/posts/[slug]` - Individual blog post
- `POST /api/donations` - Create donation record
- `GET /api/leaderboard` - Leaderboard data

### Database Schema (Prisma)
```prisma
model BlogPost {
  id        String   @id @default(cuid())
  title     String
  content   String
  slug      String   @unique
  topic     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Donation {
  id        String   @id @default(cuid())
  amount    Float
  donorId   String?
  animalId  String?
  createdAt DateTime @default(now())
}
```

## Checklist for Completion
- [x] No remaining `[NEEDS CLARIFICATION]` items
- [x] All requirements are testable
- [x] Success criteria are measurable
- [x] Technical decisions are documented
- [x] Migration plan is clear

## Risk Assessment
- **Data Migration**: Need to ensure no data loss during Supabase → PostgreSQL migration
- **Wallet Integration**: Solana wallets may need configuration for Next.js SSR
- **SEO Impact**: Ensure proper meta tags and SSR for blog content
- **Performance**: Bundle size may increase with server-side components

## Testing Strategy
1. **Unit Tests**: API endpoints and utility functions
2. **Integration Tests**: Database operations and API flows
3. **E2E Tests**: Critical user journeys (donation flow, wallet connection)
4. **Performance Tests**: Page load times and API response times