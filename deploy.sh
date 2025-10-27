#!/bin/bash

# New World Kids - Google Cloud Run Deployment Script
# This script handles complete deployment to Google Cloud Run

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID=""
REGION="us-central1"
DB_INSTANCE_NAME="newworldkids-db"
DB_NAME="newworldkids"
DB_VERSION="POSTGRES_15"
DB_TIER="db-f1-micro"

# Function to print colored messages
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to check if gcloud is installed
check_gcloud() {
    if ! command -v gcloud &> /dev/null; then
        print_message "❌ gcloud CLI is not installed. Please install it from: https://cloud.google.com/sdk/docs/install" "$RED"
        exit 1
    fi
    print_message "✅ gcloud CLI found" "$GREEN"
}

# Function to get or set project ID
setup_project() {
    if [ -z "$PROJECT_ID" ]; then
        print_message "📋 Select or enter your Google Cloud Project ID:" "$BLUE"
        gcloud projects list
        read -p "Enter Project ID: " PROJECT_ID
    fi

    print_message "🔧 Setting project to: $PROJECT_ID" "$YELLOW"
    gcloud config set project $PROJECT_ID
}

# Function to enable required APIs
enable_apis() {
    print_message "🔌 Enabling required APIs..." "$BLUE"

    apis=(
        "run.googleapis.com"
        "cloudbuild.googleapis.com"
        "sql-component.googleapis.com"
        "sqladmin.googleapis.com"
        "secretmanager.googleapis.com"
        "containerregistry.googleapis.com"
    )

    for api in "${apis[@]}"; do
        print_message "  Enabling $api..." "$YELLOW"
        gcloud services enable $api --project=$PROJECT_ID
    done

    print_message "✅ All APIs enabled" "$GREEN"
}

# Function to create Cloud SQL instance
setup_database() {
    print_message "🗄️  Setting up Cloud SQL PostgreSQL..." "$BLUE"

    # Check if instance exists
    if gcloud sql instances describe $DB_INSTANCE_NAME --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  Database instance already exists" "$YELLOW"
    else
        print_message "Creating PostgreSQL instance (this may take 5-10 minutes)..." "$YELLOW"

        read -sp "Enter a secure root password: " DB_PASSWORD
        echo

        gcloud sql instances create $DB_INSTANCE_NAME \
            --database-version=$DB_VERSION \
            --tier=$DB_TIER \
            --region=$REGION \
            --root-password="$DB_PASSWORD" \
            --project=$PROJECT_ID

        print_message "✅ Database instance created" "$GREEN"
    fi

    # Create database if it doesn't exist
    if gcloud sql databases describe $DB_NAME --instance=$DB_INSTANCE_NAME --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  Database already exists" "$YELLOW"
    else
        print_message "Creating database..." "$YELLOW"
        gcloud sql databases create $DB_NAME \
            --instance=$DB_INSTANCE_NAME \
            --project=$PROJECT_ID
        print_message "✅ Database created" "$GREEN"
    fi

    # Get connection name
    CONNECTION_NAME=$(gcloud sql instances describe $DB_INSTANCE_NAME \
        --project=$PROJECT_ID \
        --format="value(connectionName)")

    print_message "📋 Connection Name: $CONNECTION_NAME" "$BLUE"
    echo $CONNECTION_NAME > .connection-name
}

# Function to create secrets
setup_secrets() {
    print_message "🔐 Setting up secrets in Secret Manager..." "$BLUE"

    # DATABASE_URL
    if gcloud secrets describe DATABASE_URL --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  DATABASE_URL secret already exists" "$YELLOW"
    else
        read -p "Enter DATABASE_URL (postgresql://user:pass@/dbname?host=/cloudsql/CONNECTION_NAME): " DB_URL
        echo -n "$DB_URL" | gcloud secrets create DATABASE_URL \
            --data-file=- \
            --project=$PROJECT_ID
        print_message "✅ DATABASE_URL secret created" "$GREEN"
    fi

    # JWT_SECRET
    if gcloud secrets describe JWT_SECRET --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  JWT_SECRET already exists" "$YELLOW"
    else
        JWT_SECRET=$(openssl rand -base64 32)
        echo -n "$JWT_SECRET" | gcloud secrets create JWT_SECRET \
            --data-file=- \
            --project=$PROJECT_ID
        print_message "✅ JWT_SECRET created" "$GREEN"
    fi

    # LOVABLE_API_KEY
    if gcloud secrets describe LOVABLE_API_KEY --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  LOVABLE_API_KEY already exists" "$YELLOW"
    else
        read -p "Enter LOVABLE_API_KEY (or press Enter to skip): " LOVABLE_KEY
        if [ -n "$LOVABLE_KEY" ]; then
            echo -n "$LOVABLE_KEY" | gcloud secrets create LOVABLE_API_KEY \
                --data-file=- \
                --project=$PROJECT_ID
            print_message "✅ LOVABLE_API_KEY created" "$GREEN"
        fi
    fi

    # LEMONAI_API_KEY
    if gcloud secrets describe LEMONAI_API_KEY --project=$PROJECT_ID 2>/dev/null; then
        print_message "ℹ️  LEMONAI_API_KEY already exists" "$YELLOW"
    else
        read -p "Enter LEMONAI_API_KEY (or press Enter to skip): " LEMONAI_KEY
        if [ -n "$LEMONAI_KEY" ]; then
            echo -n "$LEMONAI_KEY" | gcloud secrets create LEMONAI_API_KEY \
                --data-file=- \
                --project=$PROJECT_ID
            print_message "✅ LEMONAI_API_KEY created" "$GREEN"
        fi
    fi

    # Grant access to Cloud Run service account
    SERVICE_ACCOUNT="$PROJECT_ID-compute@developer.gserviceaccount.com"

    for secret in DATABASE_URL JWT_SECRET LOVABLE_API_KEY LEMONAI_API_KEY; do
        if gcloud secrets describe $secret --project=$PROJECT_ID 2>/dev/null; then
            gcloud secrets add-iam-policy-binding $secret \
                --member="serviceAccount:$SERVICE_ACCOUNT" \
                --role="roles/secretmanager.secretAccessor" \
                --project=$PROJECT_ID 2>/dev/null || true
        fi
    done

    print_message "✅ Secrets configured" "$GREEN"
}

# Function to build and deploy using Cloud Build
deploy_with_cloudbuild() {
    print_message "🚀 Deploying with Cloud Build..." "$BLUE"

    gcloud builds submit \
        --config=cloudbuild.yaml \
        --project=$PROJECT_ID

    print_message "✅ Deployment completed!" "$GREEN"
}

# Function to display service URLs
show_urls() {
    print_message "\n=========================================" "$GREEN"
    print_message "🎉 Deployment Complete!" "$GREEN"
    print_message "=========================================\n" "$GREEN"

    BACKEND_URL=$(gcloud run services describe newworldkids-backend \
        --region=$REGION \
        --project=$PROJECT_ID \
        --format="value(status.url)")

    FRONTEND_URL=$(gcloud run services describe newworldkids-frontend \
        --region=$REGION \
        --project=$PROJECT_ID \
        --format="value(status.url)")

    print_message "Backend API:  $BACKEND_URL" "$BLUE"
    print_message "Frontend App: $FRONTEND_URL" "$BLUE"
    print_message "\nHealth Check: $BACKEND_URL/health" "$YELLOW"
    print_message "\n=========================================" "$GREEN"
}

# Main execution
main() {
    print_message "\n🌍 New World Kids - Cloud Run Deployment\n" "$BLUE"

    check_gcloud
    setup_project
    enable_apis
    setup_database
    setup_secrets
    deploy_with_cloudbuild
    show_urls

    print_message "\n✨ All done! Your application is now live!" "$GREEN"
}

# Run main function
main
