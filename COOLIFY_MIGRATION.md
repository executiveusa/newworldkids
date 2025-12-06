# Coolify Migration Checklist

> **Status**: Pending Migration  
> **Last Updated**: 2024-12-06  
> **Target Platform**: Coolify v4.x on Hostinger VPS

## Migration Overview

This document provides a step-by-step checklist for migrating New World Kids from Railway to Coolify, triggered by either:

- Free tier ceiling breach
- Manual migration request
- Cost protection auto-shutdown

## Pre-Migration Checklist

### Infrastructure Setup

- [ ] **Hostinger VPS provisioned**
  - Minimum specs: 2 vCPU, 4GB RAM, 80GB SSD
  - OS: Ubuntu 22.04 LTS
  - Location: Choose region closest to users

- [ ] **Domain configured**
  - A record pointing to VPS IP
  - Wildcard subdomain for services (optional)

- [ ] **Coolify installed**
  ```bash
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
  ```

- [ ] **SSL certificates configured**
  - Let's Encrypt auto-renewal enabled
  - Wildcard certificate (optional)

### Database Migration

- [ ] **Export Railway database**
  ```bash
  pg_dump -h <railway-host> -U <user> -d <database> > backup.sql
  ```

- [ ] **Create Coolify PostgreSQL instance**
  - Via Coolify dashboard: Add Resource > PostgreSQL

- [ ] **Import database**
  ```bash
  psql -h localhost -U <user> -d newworldkids < backup.sql
  ```

- [ ] **Verify data integrity**
  - Check row counts
  - Verify foreign key relationships
  - Test critical queries

### Secrets Migration

- [ ] **Collect all secrets from Railway dashboard**
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `FRONTEND_URL`
  
- [ ] **Update `master.secrets.json` locally**
  - Refer to `master.secrets.json.template`

- [ ] **Configure secrets in Coolify dashboard**
  - Navigate to your project
  - Add environment variables
  - Mark sensitive values as "Secret"

### Application Deployment

- [ ] **Deploy Backend**
  1. Add new resource in Coolify
  2. Select "Docker Compose" or "Dockerfile"
  3. Point to `apps/backend` directory
  4. Configure environment variables
  5. Set health check endpoint: `/health`
  6. Deploy

- [ ] **Deploy Frontend**
  1. Add new resource in Coolify
  2. Select "Docker Compose" or "Dockerfile"
  3. Point to `apps/frontend` directory
  4. Set `NEXT_PUBLIC_API_BASE_URL` to new backend URL
  5. Deploy

- [ ] **Configure networking**
  - Internal service communication
  - External access via reverse proxy

### Post-Migration Verification

- [ ] **Health check endpoints responding**
  - Backend: `https://your-domain.com/api/health`
  - Frontend: `https://your-domain.com/healthz`

- [ ] **Database connectivity verified**
  - Test API endpoints that require database

- [ ] **Authentication working**
  - JWT token generation
  - Protected routes accessible

- [ ] **All features functional**
  - Blog posts loading
  - Wallet connection working
  - Dashboard accessible

### DNS & Traffic Cutover

- [ ] **Update DNS records**
  ```
  # Example DNS changes
  A     @           <coolify-vps-ip>
  A     api         <coolify-vps-ip>
  CNAME www         @
  ```

- [ ] **Update Railway deployment**
  - Redirect to new domain (optional)
  - Or delete Railway deployment

- [ ] **Verify SSL certificates active**
  - Check certificate chain
  - Test HTTPS connections

### Monitoring Setup

- [ ] **Configure Coolify monitoring**
  - Enable built-in metrics
  - Set up alerts

- [ ] **External monitoring (optional)**
  - Uptime monitoring service
  - Performance monitoring

- [ ] **Log aggregation**
  - Configure log retention
  - Set up log alerts

## Rollback Plan

If migration fails:

1. **Restore Railway deployment**
   - Re-enable Railway service
   - Verify Railway health checks

2. **Revert DNS**
   - Point DNS back to Railway
   - Wait for propagation

3. **Investigate issues**
   - Check Coolify logs
   - Review deployment configuration

## Cost Comparison

| Service | Railway Free Tier | Coolify on Hostinger |
|---------|-------------------|---------------------|
| Compute | Limited | Full VPS resources |
| Database | 1GB limit | Self-managed |
| Bandwidth | Metered | VPS bandwidth |
| Monthly Cost | $0-5 (overage risk) | ~$5-10 (fixed) |

## Timeline Estimate

| Phase | Duration |
|-------|----------|
| Infrastructure setup | 1-2 hours |
| Database migration | 30 minutes |
| Application deployment | 1 hour |
| Verification & testing | 1-2 hours |
| DNS cutover | 1 hour (+ propagation) |
| **Total** | **4-6 hours** |

## Emergency Contacts

- Coolify Support: [Discord](https://discord.gg/coolify)
- Hostinger Support: Via dashboard
- Project Maintainer: See repository

## Related Documents

- [COOLIFY_SUPPORT.md](./COOLIFY_SUPPORT.md) - Configuration scaffolding
- [.agents](./.agents) - Secret specification
- [apps/backend/railway.toml](./apps/backend/railway.toml) - Current Railway config

---

**Note**: This migration checklist is generated automatically when cost protection guardrails are triggered. Review and customize based on your specific requirements.
