export interface AgentTool {
  name: string;
  description: string;
  execute: (input: string, context?: Record<string, unknown>) => Promise<string> | string;
}

export interface AgentExecutionResult {
  output: string;
  metadata?: Record<string, unknown>;
}

export interface AgentConfig {
  id: string;
  name: string;
  instructions: string;
  tools?: AgentTool[];
}

export interface LovableTransportConfig {
  baseUrl: string;
  apiKey: string;
  fetcher?: typeof fetch;
}

export interface AgentRuntime {
  runTask: (input: string, context?: Record<string, unknown>) => Promise<AgentExecutionResult>;
}

const defaultTools: AgentTool[] = [
  {
    name: "http",
    description: "Performs HTTP requests using fetch under the hood.",
    execute: async (input) => {
      const { url, method = "GET", body } = JSON.parse(input) as {
        url: string;
        method?: string;
        body?: unknown;
      };

      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload = await response.text();
      return payload;
    },
  },
];

export const createLovableTransport = (config: LovableTransportConfig) => {
  const fetcher = config.fetcher ?? fetch;

  return async (payload: Record<string, unknown>): Promise<AgentExecutionResult> => {
    const response = await fetcher(`${config.baseUrl.replace(/\/$/, "")}/agent-runtime/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lovable Cloud agent request failed: ${errorText}`);
    }

    const data = (await response.json()) as AgentExecutionResult;
    return data;
  };
};

export const createAgent = (
  config: AgentConfig,
  options?: {
    tools?: AgentTool[];
    transport?: (payload: Record<string, unknown>) => Promise<AgentExecutionResult>;
  }
): AgentRuntime => {
  const tools = [...defaultTools, ...(options?.tools ?? []), ...(config.tools ?? [])];

  const executeLocally = async (
    input: string,
    context: Record<string, unknown> = {}
  ): Promise<AgentExecutionResult> => {
    const toolResults = await Promise.all(
      tools.map(async (tool) => ({
        tool: tool.name,
        output: await tool.execute(input, context),
      }))
    );

    return {
      output: `Executed ${toolResults.length} tools for ${config.name}.`,
      metadata: {
        toolResults,
        context,
      },
    };
  };

  return {
    async runTask(input: string, context: Record<string, unknown> = {}) {
      if (options?.transport) {
        try {
          return await options.transport({
            agentId: config.id,
            input,
            context,
            instructions: config.instructions,
          });
        } catch (error) {
          console.warn("Falling back to local execution due to transport error", error);
        }
      }

      return executeLocally(input, context);
    },
  };
};
