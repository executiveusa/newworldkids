# Stellar Agents System

## Overview

The Stellar Agents system is a multi-agent AI orchestration platform that powers the New World Kids cockpit dashboard. It consists of 6 specialized AI agents, each named after celestial objects.

---

## The Agents

### ⭐ Sirius - The Navigator
**Role:** Orchestrator  
**Provider:** OpenAI GPT-4 Turbo  
**Temperature:** 0.7

The brightest star in the night sky. Sirius plans features, coordinates other agents, and navigates the development process.

**Capabilities:**
- Task planning and decomposition
- Agent coordination
- Workflow orchestration
- Decision making

**Example Tasks:**
- "Plan the implementation of a new donation feature"
- "Coordinate testing across all components"

---

### 🌌 Andromeda - The Coder
**Role:** Coding  
**Provider:** Anthropic Claude 3.5 Sonnet  
**Temperature:** 0.3

Named after our nearest galaxy. Expert at generating, refactoring, and optimizing code across multiple languages.

**Capabilities:**
- Code generation
- Refactoring
- Debugging
- Code review
- Test writing

**Example Tasks:**
- "Create a React component for the timeline"
- "Fix the bug in the donation form"

---

### 🌟 Vega - The Validator
**Role:** Browser Automation  
**Provider:** Google Gemini 2.0 Flash  
**Temperature:** 0.2

One of the brightest stars in the northern sky. Tests UI flows, validates designs, and ensures quality through browser automation.

**Capabilities:**
- Browser automation
- UI testing
- Visual regression
- Accessibility testing

**Example Tasks:**
- "Test the donation flow end-to-end"
- "Check if all links work on the homepage"

---

### 💫 Rigel - The Researcher
**Role:** Browser/Research  
**Provider:** Google Gemini 2.0 Flash  
**Temperature:** 0.5

A blue supergiant in Orion. Searches the web, gathers information, and provides contextual knowledge.

**Capabilities:**
- Web browsing
- Research
- Data extraction
- Competitive analysis

**Example Tasks:**
- "Research best practices for nonprofit donation pages"
- "Find similar timeline implementations"

---

### 👑 Cassiopeia - The Communicator
**Role:** Voice  
**Provider:** OpenAI Realtime API  
**Voice:** Shimmer

The queen constellation. Handles voice interactions, summaries, and natural language communication.

**Capabilities:**
- Voice recognition
- Text-to-speech
- Summarization
- Translation
- Conversation

**Example Tasks:**
- "Read out the latest donation metrics"
- "Summarize today's agent activity"

---

### 🔴 Betelgeuse - The Builder
**Role:** Hybrid (DevOps)  
**Provider:** Anthropic Claude 3.5 Sonnet  
**Temperature:** 0.4

The red supergiant in Orion. Builds infrastructure, manages deployments, and handles DevOps tasks.

**Capabilities:**
- Infrastructure setup
- Deployment
- CI/CD
- Monitoring
- Scaling

**Example Tasks:**
- "Deploy the latest changes to staging"
- "Set up monitoring for the blockchain service"

---

## API Reference

### Base URL
```
http://localhost:3004
```

### Endpoints

#### Health Check
```
GET /health
```
Response:
```json
{
  "status": "healthy",
  "service": "stellar-agents",
  "agents": ["sirius", "andromeda", "vega", "rigel", "cassiopeia", "betelgeuse"],
  "timestamp": "2025-12-31T00:00:00.000Z"
}
```

#### List Agents
```
GET /agents
```

#### Get Agent Info
```
GET /agents/:name
```

#### Execute Task
```
POST /agents/:name/execute
Content-Type: application/json

{
  "type": "plan_feature",
  "description": "Create a donation confirmation page",
  "parameters": {}
}
```

#### Get Capabilities
```
GET /agents/:name/capabilities
```

---

## Database Schema

Agents data is stored in Supabase:

```sql
-- Agent registry
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  display_name TEXT,
  type TEXT,  -- 'voice', 'coding', 'browsing', 'orchestrator', 'hybrid'
  description TEXT,
  capabilities JSONB,
  model_config JSONB,
  status TEXT  -- 'idle', 'active', 'busy', 'error', 'offline'
);

-- Agent sessions
CREATE TABLE agent_sessions (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  user_id UUID,
  session_type TEXT,
  input_data JSONB,
  output_data JSONB,
  status TEXT,  -- 'running', 'completed', 'failed'
  tokens_used INTEGER,
  cost_usd DECIMAL
);

-- Agent logs
CREATE TABLE agent_logs (
  id UUID PRIMARY KEY,
  session_id UUID,
  agent_id UUID,
  log_level TEXT,
  message TEXT,
  tool_call TEXT,
  thought_process TEXT,
  screenshot_url TEXT
);
```

---

## Configuration

Environment variables for the agents service:

```bash
# Server
PORT=3004

# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
GOOGLE_API_KEY=...

# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Usage in Cockpit

The agents are accessible through the cockpit dashboard at `/cockpit`:

1. **Agent Cards** - Click any agent to see details and execute tasks
2. **Voice Commands** - Speak naturally to trigger agent actions
3. **Live Logs** - Watch real-time activity from all agents
4. **Observability** - View detailed session logs and metrics

---

*For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md)*
