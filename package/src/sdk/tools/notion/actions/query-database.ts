import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";


const notionQueryDatabase = async (inputParams: {
    databaseId: string;
    filter?: any;
    sorts?: any[];
    pageSize?: number;
    startCursor?: string;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/databases/${inputParams.databaseId}/query`;
        const body: any = {};
        if (inputParams.filter) body.filter = inputParams.filter;
        if (inputParams.sorts) body.sorts = inputParams.sorts;
        if (inputParams.pageSize) body.page_size = inputParams.pageSize;
        if (inputParams.startCursor) body.start_cursor = inputParams.startCursor;

        const results = await makeNotionRequest('POST', url, body, NOTION_API_KEY, NOTION_VERSION);

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


export const notionQueryDatabaseTool = createAction({
    name: "notionQueryDatabase",
    description: "Query a Notion database with optional filter/sorts.",
    inputParams: z.object({
        databaseId: z.string().describe("Notion database ID"),
        filter: z.any().optional().describe("Filter object per Notion API"),
        sorts: z.array(z.object({
            property: z.string().optional().describe("Property name to sort by"),
            timestamp: z.enum(["created_time","last_edited_time"]).optional().describe("Timestamp to sort by"),
            direction: z.enum(["ascending","descending"]).describe("Sort direction"),
        })).optional().describe("Array of sort conditions per Notion API"),
        pageSize: z.number().optional().describe("Number of results per page"),
        startCursor: z.string().optional().describe("Cursor for pagination"),
    }),
    execute: notionQueryDatabase,
});


