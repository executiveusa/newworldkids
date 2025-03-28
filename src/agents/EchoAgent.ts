
import { AgentContext, AgentMessage, createAgentSession, sendMessageToAgent } from "@/services/agents/agentService";

export class EchoAgent {
  private context: AgentContext | null = null;

  constructor() {
    // Initialize agent
  }

  async initialize(metadata: Record<string, any> = {}): Promise<void> {
    this.context = await createAgentSession('EchoAgent', metadata);
    
    // Add initial system messages to context if needed
    const welcomeMessage: AgentMessage = {
      role: 'agent',
      content: "Hi there! I'm EchoAgent, your communication specialist. I can help bridge conversations across different platforms like WhatsApp and voice channels. How can I assist you today?",
      timestamp: new Date(),
      agentType: 'EchoAgent'
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
    const response = await sendMessageToAgent('EchoAgent', message, this.context!);
    
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

export default EchoAgent;
