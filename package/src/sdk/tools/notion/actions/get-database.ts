import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionGetDatabase = async (inputParams: {
    databaseId: string;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/databases/${inputParams.databaseId}`;

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

export const notionGetDatabaseTool = createAction({
    name: "notionGetDatabase",
    description: "Fetch a Notion database by ID.",
    inputParams: z.object({
        databaseId: z.string().describe("Notion database ID"),
    }),
    execute: notionGetDatabase,
});


