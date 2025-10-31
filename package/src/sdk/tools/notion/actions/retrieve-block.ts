import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionRetrieveBlock = async (inputParams: {
    blockId: string;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/blocks/${inputParams.blockId}`;

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

export const notionRetrieveBlockTool = createAction({
    name: "notionRetrieveBlock",
    description: "Retrieve a Notion block by ID.",
    inputParams: z.object({
        blockId: z.string().describe("Notion block ID"),
    }),
    execute: notionRetrieveBlock,
});


