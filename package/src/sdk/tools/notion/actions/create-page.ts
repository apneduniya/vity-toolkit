import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionCreatePage = async (inputParams: {
    parent: { database_id?: string; page_id?: string };
    properties: any;
    children?: any[];
    icon?: any;
    cover?: any;
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/pages`;
        const body: any = {
            parent: inputParams.parent,
            properties: inputParams.properties,
        };
        if (inputParams.children) body.children = inputParams.children;
        if (inputParams.icon) body.icon = inputParams.icon;
        if (inputParams.cover) body.cover = inputParams.cover;

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

export const notionCreatePageTool = createAction({
    name: "notionCreatePage",
    description: "Create a Notion page in a database or under a page.",
    inputParams: z.object({
        parent: z.object({
            database_id: z.string().optional(),
            page_id: z.string().optional(),
        }).refine(v => v.database_id || v.page_id, { message: "Provide either database_id or page_id" }),
        properties: z.any().describe("Page properties per Notion API"),
        children: z.array(
            z.object({}).catchall(z.any())
        ).optional().describe("Optional children blocks (Notion block objects)"),
        icon: z.any().optional(),
        cover: z.any().optional(),
    }),
    execute: notionCreatePage,
});


