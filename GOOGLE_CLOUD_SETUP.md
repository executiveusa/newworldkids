# Google Cloud Run Deployment Guide

## Quick Start (Automated)

The easiest way to deploy is using the automated script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. Check prerequisites
2. Enable required APIs
3. Set up Cloud SQL PostgreSQL
4. Configure Secret Manager
5. Build and deploy both frontend and backend
6. Display service URLs

---

## Manual Deployment Instructions

If you prefer manual control, follow these steps:

### Prerequisites

1. **Install gcloud CLI**
   ```bash
   # Mac
   brew install google-cloud-sdk

   # Windows
   # Download from: https://cloud.google.com/sdk/docs/install

   # Linux
   curl https://sdk.cloud.google.com | bash
   ```

2. **Authenticate**
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```

3. **Set Project**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   export PROJECT_ID=YOUR_PROJECT_ID
   ```

### Step 1: Enable APIs (5 minutes)

```bash
gcloud services enable run.googleapis.com \
  cloudbuild.googleapis.com \
  sql-component.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  containerregistry.googleapis.com
```

### Step 2: Create Cloud SQL Database (10-15 minutes)

```bash
# Create PostgreSQL instance
gcloud sql instances create newworldkids-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=YOUR_SECURE_PASSWORD

# Create database
gcloud sql databases create newworldkids \
  --instance=newworldkids-db

# Get connection name
gcloud sql instances describe newworldkids-db \
  --format="value(connectionName)"
```

Save the connection name (format: `project:region:instance`)

### Step 3: Configure Secrets (5 minutes)

```bash
# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)

# Create DATABASE_URL secret
echo -n "postgresql://user:pass@/newworldkids?host=/cloudsql/YOUR_CONNECTION_NAME" | \
  gcloud secrets create DATABASE_URL --data-file=-

# Create JWT_SECRET
echo -n "$JWT_SECRET" | \
  gcloud secrets create JWT_SECRET --data-file=-

# Create API keys (optional but recommended)
echo -n "YOUR_LOVABLE_KEY" | \
  gcloud secrets create LOVABLE_API_KEY --data-file=-

echo -n "YOUR_LEMONAI_KEY" | \
  gcloud secrets create LEMONAI_API_KEY --data-file=-

# Grant Cloud Run access
SERVICE_ACCOUNT="$PROJECT_ID-compute@developer.gserviceaccount.com"

gcloud secrets add-iam-policy-binding DATABASE_URL \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding JWT_SECRET \
  --member="serviceAccount:$SERVICE_ACCOUNT" \
  --role="roles/secretmanager.secretAccessor"
```

### Step 4: Deploy Backend (10 minutes)

```bash
cd apps/backend

gcloud run deploy newworldkids-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production \
  --set-secrets DATABASE_URL=DATABASE_URL:latest,JWT_SECRET=JWT_SECRET:latest \
  --add-cloudsql-instances YOUR_CONNECTION_NAME \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300

# Get backend URL
BACKEND_URL=$(gcloud run services describe newworldkids-backend \
  --region us-central1 \
  --format="value(status.url)")

echo "Backend deployed to: $BACKEND_URL"
```

### Step 5: Deploy Frontend (10 minutes)

```bash
cd apps/frontend

gcloud run deploy newworldkids-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,NEXT_PUBLIC_API_URL=$BACKEND_URL \
  --set-secrets NEXT_PUBLIC_LOVABLE_KEY=LOVABLE_API_KEY:latest,NEXT_PUBLIC_LEMONAI_KEY=LEMONAI_API_KEY:latest \
  --memory 1Gi \
  --cpu 2 \
  --min-instances 0 \
  --max-instances 20 \
  --timeout 300

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe newworldkids-frontend \
  --region us-central1 \
  --format="value(status.url)")

echo "Frontend deployed to: $FRONTEND_URL"
```

### Step 6: Run Database Migrations (5 minutes)

```bash
cd apps/backend

# Option 1: Run locally with Cloud SQL Proxy
cloud-sql-proxy YOUR_CONNECTION_NAME &
npm run db:migrate

# Option 2: Run as Cloud Run Job
gcloud run jobs create db-migrate \
  --image gcr.io/$PROJECT_ID/newworldkids-backend:latest \
  --region us-central1 \
  --set-secrets DATABASE_URL=DATABASE_URL:latest \
  --add-cloudsql-instances YOUR_CONNECTION_NAME \
  --execute-now \
  --command npm,run,db:migrate
```

### Step 7: Verify Deployment

```bash
# Check backend health
curl $BACKEND_URL/health

# Expected response:
# {
#   "ok": true,
#   "status": "healthy",
#   "timestamp": "...",
#   "service": "newworldkids-backend",
#   "version": "1.0.0"
# }

# Open frontend
open $FRONTEND_URL
```

---

## CI/CD with Cloud Build

### Set up Automatic Deployments

1. **Connect GitHub Repository**
   ```bash
   gcloud builds triggers create github \
     --repo-name=newworldkids \
     --repo-owner=executiveusa \
     --branch-pattern="^main$" \
     --build-config=cloudbuild.yaml
   ```

2. **Grant Permissions**
   ```bash
   PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
     --role="roles/run.admin"

   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member="serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   ```

3. **Test Trigger**
   ```bash
   # Push to main branch
   git add .
   git commit -m "Test Cloud Build deployment"
   git push origin main

   # Watch build progress
   gcloud builds list --limit=1
   gcloud builds log $(gcloud builds list --limit=1 --format="value(id)")
   ```

---

## Monitoring and Logging

### View Logs

```bash
# Backend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=newworldkids-backend" \
  --limit 50 \
  --format json

# Frontend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=newworldkids-frontend" \
  --limit 50 \
  --format json
```

### Set Up Alerts

```bash
# Create uptime check
gcloud monitoring uptime create backend-health \
  --display-name="Backend Health Check" \
  --resource-type=url \
  --url="$BACKEND_URL/health"

# Create alert policy
gcloud alpha monitoring policies create \
  --notification-channels=YOUR_CHANNEL_ID \
  --display-name="Backend Down" \
  --condition-display-name="Health check failed" \
  --condition-threshold-value=1 \
  --condition-threshold-duration=300s
```

### View Metrics

```bash
# Cloud Run metrics
gcloud run services describe newworldkids-backend \
  --region us-central1 \
  --format="yaml(status.latestReadyRevisionName,status.traffic)"

# SQL metrics
gcloud sql operations list --instance=newworldkids-db
```

---

## Cost Optimization

### Current Configuration Costs (Estimated)

| Resource | Config | Monthly Cost |
|----------|--------|--------------|
| Cloud Run Backend | 500K requests, 512MB | $8-15 |
| Cloud Run Frontend | 1M requests, 1GB | $15-30 |
| Cloud SQL | db-f1-micro | $7-10 |
| Cloud Storage | 10GB | $0.20 |
| Secret Manager | 5 secrets | $0.03 |
| **Total** | | **$30-55/month** |

### Reduce Costs

1. **Use Free Tier**
   - Cloud Run: 2M requests/month free
   - Secret Manager: 6 secret versions free
   - Cloud Build: 120 build-minutes/day free

2. **Scale to Zero**
   ```bash
   # Already configured with min-instances=0
   # Services automatically scale down to 0 when not in use
   ```

3. **Optimize Database**
   ```bash
   # Upgrade to shared-core for production
   gcloud sql instances patch newworldkids-db \
     --tier=db-g1-small
   ```

4. **Set Budget Alerts**
   ```bash
   gcloud billing budgets create \
     --billing-account=YOUR_BILLING_ACCOUNT \
     --display-name="New World Kids Budget" \
     --budget-amount=100USD
   ```

---

## Troubleshooting

### Build Failures

```bash
# View build logs
gcloud builds log $(gcloud builds list --limit=1 --format="value(id)")

# Common issues:
# 1. Missing secrets - Check Secret Manager
# 2. Database connection - Verify connection name
# 3. Memory limits - Increase memory allocation
```

### Deployment Issues

```bash
# Check service status
gcloud run services describe newworldkids-backend --region us-central1

# View recent revisions
gcloud run revisions list --service=newworldkids-backend --region=us-central1

# Rollback to previous revision
gcloud run services update-traffic newworldkids-backend \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

### Database Connection Issues

```bash
# Test Cloud SQL connection
gcloud sql connect newworldkids-db --user=postgres

# Check connection settings
gcloud sql instances describe newworldkids-db

# Enable Cloud SQL Admin API (if not enabled)
gcloud services enable sqladmin.googleapis.com
```

---

## Security Best Practices

1. **Restrict Service Access**
   ```bash
   # Remove unauthenticated access (for backend)
   gcloud run services remove-iam-policy-binding newworldkids-backend \
     --region=us-central1 \
     --member="allUsers" \
     --role="roles/run.invoker"
   ```

2. **Enable Binary Authorization**
   ```bash
   gcloud services enable binaryauthorization.googleapis.com
   ```

3. **Use VPC Connector** (for private database access)
   ```bash
   gcloud compute networks vpc-access connectors create newworldkids-vpc \
     --region=us-central1 \
     --range=10.8.0.0/28
   ```

4. **Rotate Secrets Regularly**
   ```bash
   # Update secret
   echo -n "NEW_SECRET_VALUE" | \
     gcloud secrets versions add SECRET_NAME --data-file=-
   ```

---

## Next Steps

After successful deployment:

1. **Set up Custom Domain**
   ```bash
   gcloud run domain-mappings create \
     --service=newworldkids-frontend \
     --domain=www.newworldkids.org \
     --region=us-central1
   ```

2. **Enable Cloud CDN**
   ```bash
   gcloud compute backend-services update \
     --enable-cdn \
     --cache-mode=CACHE_ALL_STATIC
   ```

3. **Configure Monitoring Dashboard**
   - Visit: https://console.cloud.google.com/monitoring
   - Create custom dashboards for metrics

4. **Set up Continuous Integration**
   - Add tests to cloudbuild.yaml
   - Configure branch protection
   - Set up staging environment

---

## Support

- **Documentation**: [Cloud Run Docs](https://cloud.google.com/run/docs)
- **Pricing**: [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- **Community**: [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-run)

---

Generated: 2025-10-26
