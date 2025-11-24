import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { AgentMailTool } from "..";
import { AgentMailClient } from "agentmail";
import { AgentMailToolkit } from "agentmail-toolkit/mcp";

const agentmailListTools = async (inputParams: { tools?: string[] }) => {
    try {
        const tool = new AgentMailTool();
        const { environment, apiKey } = await tool.createClient();

        const client = new AgentMailClient({ environment, apiKey });
        const toolkit = new AgentMailToolkit(client);

        const tools = toolkit.getTools(inputParams.tools);
        const list = tools.map((t: any) => ({
            name: t.name,
            description: t.description,
        }));

        return toolMessage({ success: true, data: list });
    } catch (error: any) {
        return toolMessage({ success: false, data: error?.message || String(error) });
    }
}

export const agentmailListToolsTool = createAction({
    name: "agentmailListTools",
    description: "List available AgentMail MCP tools (optionally filter by names)",
    inputParams: z.object({
        tools: z.array(z.string()).optional().describe("Optional subset of tool names to include"),
    }),
    execute: agentmailListTools,
});


