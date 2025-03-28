
import { AgentContext, AgentMessage, createAgentSession, sendMessageToAgent } from "@/services/agents/agentService";

export class PulseAgent {
  private context: AgentContext | null = null;

  constructor() {
    // Initialize agent
  }

  async initialize(metadata: Record<string, any> = {}): Promise<void> {
    this.context = await createAgentSession('PulseAgent', metadata);
    
    // Add initial system messages to context if needed
    const welcomeMessage: AgentMessage = {
      role: 'agent',
      content: "Hello! I'm PulseAgent, your analytics and monetization specialist. I can help track engagement and manage affiliate relationships. What would you like to know about your metrics today?",
      timestamp: new Date(),
      agentType: 'PulseAgent'
    };
    
    this.context.messages.push(welcomeMessage);
  }

  async sendMessage(message: string): Promise<AgentMessage> {
    if (!this.context) {
      await this.initialize();
    }
    
    // Add user message to context
    const userMessage: AgentMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    this.context!.messages.push(userMessage);
    
    // Process with agent service
    const response = await sendMessageToAgent('PulseAgent', message, this.context!);
    
    // Add response to context
    this.context!.messages.push(response);
    
    return response;
  }

  getMessages(): AgentMessage[] {
    return this.context?.messages || [];
  }

  getContext(): AgentContext | null {
    return this.context;
  }
}

export default PulseAgent;
