declare module 'agentmail' {
  export class AgentMailClient {
    constructor(options: { environment: string; apiKey?: string });
  }
}

declare module 'agentmail-toolkit/mcp' {
  export class AgentMailToolkit {
    constructor(client: any);
    getTools(toolNames?: string[]): Array<{
      name: string;
      description: string;
      paramsSchema?: any;
      callback: (params: Record<string, any>) => Promise<any>;
    }>;
  }
}


