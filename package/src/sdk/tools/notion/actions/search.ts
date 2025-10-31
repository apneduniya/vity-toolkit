import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionSearch = async (inputParams: {
    query: string;
    pageSize?: number;
    sortDirection?: 'ascending' | 'descending';
    sortTimestamp?: 'last_edited_time' | 'created_time';
    filterObject?: { value: 'page' | 'database' | 'block' | 'space' | 'comment' | 'page_or_database'; property: 'object' };
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/search`;
        const body: any = {
            query: inputParams.query,
        };

        if (inputParams.pageSize) body.page_size = inputParams.pageSize;
        if (inputParams.sortDirection || inputParams.sortTimestamp) {
            body.sort = {
                direction: inputParams.sortDirection || 'descending',
                timestamp: inputParams.sortTimestamp || 'last_edited_time',
            };
        }
        if (inputParams.filterObject) {
            body.filter = inputParams.filterObject;
        }

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

export const notionSearchTool = createAction({
    name: "notionSearch",
    description: "Search across Notion pages and databases using Notion API.",
    inputParams: z.object({
        query: z.string().describe("Search query for Notion search endpoint"),
        pageSize: z.number().optional().describe("Number of results per page (page_size)"),
        sortDirection: z.enum(['ascending','descending']).optional().describe("Sort direction"),
        sortTimestamp: z.enum(['last_edited_time','created_time']).optional().describe("Sort timestamp field"),
        filterObject: z.object({
            value: z.enum(['page','database','block','space','comment','page_or_database']),
            property: z.literal('object')
        }).optional().describe("Filter by object type"),
    }),
    execute: notionSearch,
});


