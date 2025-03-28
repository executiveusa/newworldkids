
import { AgentContext, AgentMessage, createAgentSession, sendMessageToAgent } from "@/services/agents/agentService";

export class FlowAgent {
  private context: AgentContext | null = null;

  constructor() {
    // Initialize agent
  }

  async initialize(metadata: Record<string, any> = {}): Promise<void> {
    this.context = await createAgentSession('FlowAgent', metadata);
    
    // Add initial system messages to context if needed
    const welcomeMessage: AgentMessage = {
      role: 'agent',
      content: "Welcome! I'm FlowAgent, your process automation assistant. I can guide you through document workflows and approval processes. How can I help streamline your work today?",
      timestamp: new Date(),
      agentType: 'FlowAgent'
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
    const response = await sendMessageToAgent('FlowAgent', message, this.context!);
    
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

export default FlowAgent;
