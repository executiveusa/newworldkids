
import { lovableClient, isLovableConfigured } from "@/services/client";

export type AgentType = 'NovaSign' | 'EchoAgent' | 'FlowAgent' | 'PulseAgent';

export interface AgentMessage {
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentType?: AgentType;
}

export interface AgentContext {
  sessionId: string;
  messages: AgentMessage[];
  metadata: Record<string, any>;
}

// Handle agent communication
export const sendMessageToAgent = async (
  agentType: AgentType,
  message: string,
  context?: AgentContext
): Promise<AgentMessage> => {
  try {
    if (isLovableConfigured()) {
      const payload = {
        agentType,
        message,
        context,
      };

      const data = await lovableClient.post<{
        reply: string;
        metadata?: Record<string, unknown>;
      }>(`/agents/${agentType}/messages`, payload);

      return {
        role: 'agent',
        content: data.reply,
        timestamp: new Date(),
        agentType,
      };
    }

    const response: AgentMessage = {
      role: 'agent',
      content: `This is a placeholder response from ${agentType}. In the production version, this would be connected to your AI service.`,
      timestamp: new Date(),
      agentType
    };

    return response;
  } catch (error) {
    console.error(`Error sending message to ${agentType}:`, error);
    throw error;
  }
};

// Create a new agent context/session
export const createAgentSession = async (agentType: AgentType, initialMetadata: Record<string, any> = {}): Promise<AgentContext> => {
  const sessionId = `${agentType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  return {
    sessionId,
    messages: [],
    metadata: {
      ...initialMetadata,
      createdAt: new Date(),
      agentType
    }
  };
};

// Get predefined agent description
export const getAgentDescription = (agentType: AgentType): string => {
  switch (agentType) {
    case 'NovaSign':
      return "AI assistant specialized in document signing and contract creation. Helps users create, sign, and manage digital contracts on the blockchain.";
    case 'EchoAgent':
      return "Communication specialist that helps bridge conversations across different platforms including WhatsApp and voice channels.";
    case 'FlowAgent':
      return "Process automation agent that guides users through document workflows and approval processes.";
    case 'PulseAgent':
      return "Analytics and monetization agent that helps track engagement and manage affiliate relationships.";
    default:
      return "AI assistant";
  }
};
