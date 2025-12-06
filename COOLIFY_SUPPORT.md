# Coolify Support Documentation

> **Status**: Scaffolding Ready - Not Activated  
> **Last Updated**: 2024-12-06  
> **Compatibility**: Coolify v4.x

## Overview

This document provides compatibility markers and configuration scaffolding for deploying New World Kids on [Coolify](https://coolify.io/), a self-hosted Platform-as-a-Service alternative.

## Deployment Configuration Placeholder

```yaml
# coolify-compose.yml (placeholder - not activated)
version: '3.8'

services:
  backend:
    build:
      context: ./apps/backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=8080
      # Secrets injected via Coolify dashboard
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./apps/frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_BASE_URL=${BACKEND_URL}
    depends_on:
      - backend

  database:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=newworldkids
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

volumes:
  postgres_data:
```

## Hostinger VPN Network Configuration

### Overview

For deployments that require Hostinger VPN tunneling, use the following network configuration markers.

### Network Notes

```text
# HOSTINGER VPN CONFIGURATION MARKERS
# =====================================
# These settings are placeholders for Hostinger VPN tunneling
# Activate when migrating from Railway to self-hosted Coolify

# VPN Tunnel Settings (placeholder)
VPN_ENABLED=false
VPN_SERVER_ADDRESS=your-hostinger-vpn-server.com
VPN_PORT=1194
VPN_PROTOCOL=udp

# Internal Network Range
INTERNAL_NETWORK_CIDR=10.8.0.0/24

# Service Discovery
BACKEND_INTERNAL_HOST=backend.internal
FRONTEND_INTERNAL_HOST=frontend.internal
DATABASE_INTERNAL_HOST=db.internal
```

### DNS Configuration

When using Hostinger VPN with Coolify:

1. Configure internal DNS resolution for services
2. Set up split-horizon DNS if needed
3. Ensure health checks use internal addresses

## Environment Variables Mapping

| Railway Variable | Coolify Variable | Notes |
|-----------------|------------------|-------|
| `DATABASE_URL` | `DATABASE_URL` | Same format |
| `JWT_SECRET` | `JWT_SECRET` | Same format |
| `PORT` | `PORT` | Default: 8080 |
| `FRONTEND_URL` | `FRONTEND_URL` | Update to Coolify domain |

## Resource Configuration

### Cost-Optimized Settings

```yaml
# Coolify resource limits (cost-optimized)
resources:
  backend:
    memory: 512M
    cpu: 0.5
  frontend:
    memory: 512M
    cpu: 0.5
  database:
    memory: 256M
    cpu: 0.25
```

## Migration Triggers

This configuration will be activated when:

1. ✅ Railway free tier is exceeded
2. ✅ Manual migration is triggered
3. ✅ Cost protection guardrails activate auto-shutdown

## Activation Checklist

- [ ] Set up Coolify instance on Hostinger VPS
- [ ] Configure domain and SSL certificates
- [ ] Set up PostgreSQL database
- [ ] Configure environment variables in Coolify dashboard
- [ ] Update DNS records
- [ ] Deploy services
- [ ] Verify health checks
- [ ] Update monitoring

## Related Documents

- [COOLIFY_MIGRATION.md](./COOLIFY_MIGRATION.md) - Step-by-step migration guide
- [.agents](./.agents) - Secret specification for provisioning agent
- [master.secrets.json.template](./master.secrets.json.template) - Local secrets template

---

**Note**: This document contains placeholders only. Actual Coolify deployment requires manual activation and configuration of your Coolify instance.
