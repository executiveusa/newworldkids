
import { useState, useEffect } from 'react';
import { AgentMessage, AgentType } from '@/services/agents/agentService';
import NovaSignAgent from '@/agents/NovaSignAgent';
import EchoAgent from '@/agents/EchoAgent';
import FlowAgent from '@/agents/FlowAgent';
import PulseAgent from '@/agents/PulseAgent';

export const useAgent = (agentType: AgentType) => {
  const [agent, setAgent] = useState<NovaSignAgent | EchoAgent | FlowAgent | PulseAgent | null>(null);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAgent = async () => {
      try {
        let newAgent;
        
        switch (agentType) {
          case 'NovaSign':
            newAgent = new NovaSignAgent();
            break;
          case 'EchoAgent':
            newAgent = new EchoAgent();
            break;
          case 'FlowAgent':
            newAgent = new FlowAgent();
            break;
          case 'PulseAgent':
            newAgent = new PulseAgent();
            break;
          default:
            throw new Error(`Unknown agent type: ${agentType}`);
        }
        
        await newAgent.initialize();
        setAgent(newAgent);
        setMessages(newAgent.getMessages());
      } catch (err) {
        console.error('Error initializing agent:', err);
        setError('Failed to initialize agent');
      }
    };
    
    initializeAgent();
  }, [agentType]);

  const sendMessage = async (content: string) => {
    if (!agent) {
      setError('Agent not initialized');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await agent.sendMessage(content);
      setMessages(agent.getMessages());
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};
