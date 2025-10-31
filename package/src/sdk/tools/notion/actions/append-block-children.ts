import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionAppendBlockChildren = async (inputParams: {
    blockId: string;
    children: any[];
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/blocks/${inputParams.blockId}/children`;
        const body = { children: inputParams.children };

        const results = await makeNotionRequest('PATCH', url, body, NOTION_API_KEY, NOTION_VERSION);

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

export const notionAppendBlockChildrenTool = createAction({
    name: "notionAppendBlockChildren",
    description: "Append children blocks to a Notion block.",
    inputParams: z.object({
        blockId: z.string().describe("Notion block ID"),
        children: z.array(
            z.object({}).catchall(z.any())
        ).describe("Array of child blocks to append (Notion block objects)"),
    }),
    execute: notionAppendBlockChildren,
});


