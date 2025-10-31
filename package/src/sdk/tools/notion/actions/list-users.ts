import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionListUsers = async (inputParams: {
    pageSize?: number;
    startCursor?: string;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const params: string[] = [];
        if (inputParams.pageSize) params.push(`page_size=${inputParams.pageSize}`);
        if (inputParams.startCursor) params.push(`start_cursor=${encodeURIComponent(inputParams.startCursor)}`);
        const query = params.length ? `?${params.join('&')}` : '';
        const url = `https://api.notion.com/v1/users${query}`;

        const results = await makeNotionRequest('GET', url, null, NOTION_API_KEY, NOTION_VERSION);

        return toolMessage({
            success: true,
            data: results,
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
}

export const notionListUsersTool = createAction({
    name: "notionListUsers",
    description: "List Notion users.",
    inputParams: z.object({
        pageSize: z.number().optional(),
        startCursor: z.string().optional(),
    }),
    execute: notionListUsers,
});


