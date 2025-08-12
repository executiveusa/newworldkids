
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentChat from '@/components/agents/AgentChat';
import { getAgentDescription } from '@/services/agents/agentService';

const Agents = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">AI Agents</h1>
      
      <Tabs defaultValue="novasign" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="novasign">NovaSign</TabsTrigger>
          <TabsTrigger value="echo">EchoAgent</TabsTrigger>
          <TabsTrigger value="flow">FlowAgent</TabsTrigger>
          <TabsTrigger value="pulse">PulseAgent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="novasign">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">NovaSign Agent</h2>
              <p className="text-white/80 mb-4">{getAgentDescription('NovaSign')}</p>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">Features</h3>
                  <ul className="list-disc list-inside text-white/80 mt-2">
                    <li>Create smart contracts with natural language</li>
                    <li>Sign documents on the blockchain</li>
                    <li>Manage contract templates</li>
                    <li>Generate contract summaries</li>
                  </ul>
                </div>
              </div>
            </div>
            <AgentChat 
              agentType="NovaSign" 
              title="NovaSign" 
              description="Your contract creation and signing assistant"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="echo">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">EchoAgent</h2>
              <p className="text-white/80 mb-4">{getAgentDescription('EchoAgent')}</p>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">Features</h3>
                  <ul className="list-disc list-inside text-white/80 mt-2">
                    <li>Cross-platform communication integration</li>
                    <li>WhatsApp messaging support</li>
                    <li>Voice channel connectivity</li>
                    <li>Context-aware conversations</li>
                  </ul>
                </div>
              </div>
            </div>
            <AgentChat 
              agentType="EchoAgent" 
              title="EchoAgent" 
              description="Your communication specialist"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="flow">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">FlowAgent</h2>
              <p className="text-white/80 mb-4">{getAgentDescription('FlowAgent')}</p>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">Features</h3>
                  <ul className="list-disc list-inside text-white/80 mt-2">
                    <li>Document workflow automation</li>
                    <li>Approval process management</li>
                    <li>Task scheduling and reminders</li>
                    <li>Process optimization suggestions</li>
                  </ul>
                </div>
              </div>
            </div>
            <AgentChat 
              agentType="FlowAgent" 
              title="FlowAgent" 
              description="Your process automation assistant"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">PulseAgent</h2>
              <p className="text-white/80 mb-4">{getAgentDescription('PulseAgent')}</p>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="font-semibold text-white">Features</h3>
                  <ul className="list-disc list-inside text-white/80 mt-2">
                    <li>Engagement analytics tracking</li>
                    <li>Affiliate relationship management</li>
                    <li>Monetization strategy suggestions</li>
                    <li>Performance reporting</li>
                  </ul>
                </div>
              </div>
            </div>
            <AgentChat 
              agentType="PulseAgent" 
              title="PulseAgent" 
              description="Your analytics and monetization specialist"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agents;
