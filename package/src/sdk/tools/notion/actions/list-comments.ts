import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionListComments = async (inputParams: {
    blockId: string;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/comments?block_id=${encodeURIComponent(inputParams.blockId)}`;

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

export const notionListCommentsTool = createAction({
    name: "notionListComments",
    description: "List comments for a discussion or block (by block_id).",
    inputParams: z.object({
        blockId: z.string().describe("Block ID (discussion target)"),
    }),
    execute: notionListComments,
});


