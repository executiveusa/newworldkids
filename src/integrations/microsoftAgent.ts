import { createAgent, createLovableTransport } from "@newworldkids/agent-runtime";
import { getLovableCredentials, isLovableConfigured } from "@/services/client";

const credentials = getLovableCredentials();

export const microsoftAgent = createAgent(
  {
    id: "microsoft-lemon-orchestrator",
    name: "Microsoft Agent Framework",
    instructions:
      "Coordinate tasks between Lemon AI copilots and Lovable Cloud services. Maintain audit trails and respect user preferences.",
  },
  {
    transport: isLovableConfigured()
      ? createLovableTransport({
          baseUrl: credentials.baseUrl,
          apiKey: credentials.apiKey,
        })
      : undefined,
  }
);

export const runAgentSelfCheck = async () => {
  try {
    const result = await microsoftAgent.runTask("health-check", {
      timestamp: new Date().toISOString(),
    });
    return result;
  } catch (error) {
    console.warn("Microsoft Agent Framework self-check failed", error);
    return null;
  }
};
