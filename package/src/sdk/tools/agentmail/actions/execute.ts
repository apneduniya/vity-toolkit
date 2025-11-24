import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { AgentMailTool } from "..";
import { AgentMailClient } from "agentmail";
import { AgentMailToolkit } from "agentmail-toolkit/mcp";

const agentmailExecute = async (inputParams: {
    tool: string;
    params?: Record<string, any>;
}) => {
    try {
        const toolWrapper = new AgentMailTool();
        const { environment, apiKey } = await toolWrapper.createClient();

        const client = new AgentMailClient({ environment, apiKey });
        const toolkit = new AgentMailToolkit(client);

        const tools = toolkit.getTools([inputParams.tool]);
        const selected = tools.find((t: any) => t.name === inputParams.tool);
        if (!selected) {
            throw new Error(`AgentMail tool not found: ${inputParams.tool}`);
        }

        const result = await selected.callback(inputParams.params || {});

        return toolMessage({ success: true, data: result });
    } catch (error: any) {
        return toolMessage({ success: false, data: error?.message || String(error) });
    }
}

export const agentmailExecuteTool = createAction({
    name: "agentmailExecute",
    description: "Execute a specific AgentMail MCP tool by name with parameters",
    inputParams: z.object({
        tool: z.string().describe("AgentMail tool name to execute"),
        params: z.record(z.any()).optional().describe("Parameters for the selected AgentMail tool"),
    }),
    execute: agentmailExecute,
});


