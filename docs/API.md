# API Reference

## Overview

The New World Kids platform exposes several APIs for frontend consumption and third-party integrations.

---

## Web App API Routes

Base URL: `https://nwkids.org/api`

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-31T00:00:00.000Z"
}
```

### Blockchain Donation Proxy
```
POST /api/blockchain/donate
Content-Type: application/json

{
  "walletAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "amount": 50,
  "currency": "SOL",
  "projectId": "uuid-optional",
  "isAnonymous": false
}
```
Response:
```json
{
  "success": true,
  "data": {
    "donationId": "uuid",
    "transactionHash": "...",
    "status": "confirmed",
    "nftEligible": true
  }
}
```

---

## Blockchain Service API

Base URL: `https://blockchain.nwkids.org`

### Health Check
```
GET /health
```
Response:
```json
{
  "status": "ok",
  "service": "blockchain",
  "network": "mainnet-beta"
}
```

### Create Donation
```
POST /donate
Content-Type: application/json

{
  "walletAddress": "string (44 chars)",
  "amount": "number (positive)",
  "currency": "SOL" | "USDC",
  "projectId": "uuid (optional)",
  "userId": "uuid (optional)",
  "isAnonymous": "boolean (default: false)"
}
```

#### Validation Rules
- `walletAddress`: Must be exactly 44 characters (Solana address)
- `amount`: Must be positive number
- `currency`: Must be "SOL" or "USDC"

#### Response (Success)
```json
{
  "success": true,
  "data": {
    "donationId": "uuid",
    "transactionHash": "string",
    "status": "confirmed",
    "estimatedConfirmationTime": 0,
    "nftEligible": true
  }
}
```

#### Response (Error)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [...]
  }
}
```

---

## Stellar Agents API

Base URL: `https://agents.nwkids.org`

### Health Check
```
GET /health
```

### List All Agents
```
GET /agents
```
Response:
```json
{
  "agents": [
    {
      "id": "uuid",
      "name": "sirius",
      "displayName": "Sirius - The Navigator",
      "type": "orchestrator",
      "status": "idle"
    }
  ]
}
```

### Get Agent Details
```
GET /agents/:name
```

### Execute Agent Task
```
POST /agents/:name/execute
Content-Type: application/json

{
  "type": "plan_feature" | "decompose_task" | "orchestrate",
  "description": "Task description",
  "parameters": {},
  "userId": "uuid (optional)"
}
```
Response:
```json
{
  "success": true,
  "output": {...},
  "tokensUsed": 1234,
  "cost": 0.05
}
```

### Get Agent Capabilities
```
GET /agents/:name/capabilities
```

---

## Strapi CMS API

Base URL: `https://cms.nwkids.org/api`

### Authentication
All requests require an API token:
```
Authorization: Bearer YOUR_API_TOKEN
```

### Content Types

#### Pages
```
GET /api/pages
GET /api/pages/:id
GET /api/pages?filters[slug][$eq]=about
```

#### Blog Posts
```
GET /api/blog-posts
GET /api/blog-posts/:id
GET /api/blog-posts?filters[published][$eq]=true&sort=createdAt:desc
```

#### Projects
```
GET /api/projects
GET /api/projects/:id
```

#### Navbar
```
GET /api/navbar?populate=*
```

#### Footer
```
GET /api/footer?populate=*
```

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `populate` | Include relations | `?populate=*` |
| `filters` | Filter results | `?filters[status][$eq]=active` |
| `sort` | Sort results | `?sort=createdAt:desc` |
| `pagination` | Paginate | `?pagination[page]=1&pagination[pageSize]=10` |
| `fields` | Select fields | `?fields[0]=title&fields[1]=slug` |

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid request data |
| `UNAUTHORIZED` | Missing or invalid authentication |
| `NOT_FOUND` | Resource not found |
| `INTERNAL_ERROR` | Server error |
| `RATE_LIMITED` | Too many requests |
| `DONATION_FAILED` | Blockchain transaction failed |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/donate` | 10 requests/minute |
| `/agents/*/execute` | 30 requests/minute |
| Strapi API | 100 requests/minute |

---

## Webhooks

### Donation Webhook
Configure in environment:
```bash
DONATION_WEBHOOK_URL=https://your-server.com/webhook
DONATION_WEBHOOK_SECRET=your-secret
```

Payload:
```json
{
  "event": "donation.confirmed",
  "data": {
    "donationId": "uuid",
    "amount": 50,
    "currency": "SOL",
    "usdValue": 5000,
    "nftMinted": true
  },
  "timestamp": "2025-12-31T00:00:00.000Z"
}
```

---

## SDKs & Examples

### JavaScript/TypeScript
```typescript
// Fetch projects
const response = await fetch('https://cms.nwkids.org/api/projects', {
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
  }
});
const { data } = await response.json();
```

### Donation Example
```typescript
const donate = async (walletAddress: string, amount: number) => {
  const response = await fetch('/api/blockchain/donate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      walletAddress,
      amount,
      currency: 'SOL'
    })
  });
  return response.json();
};
```

---

*For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md)*
