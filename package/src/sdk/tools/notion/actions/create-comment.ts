import { z } from "zod";
import { NotionTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeNotionRequest } from "../common";

const notionCreateComment = async (inputParams: {
    parent: { page_id?: string; discussion_id?: string };
    richText: any[];
}): Promise<string> => {
    try {
        const tool = new NotionTool();
        const { NOTION_API_KEY, NOTION_VERSION } = await tool.createClient();
        if (!NOTION_API_KEY) {
            throw new Error("Notion client is not initialized");
        }

        const url = `https://api.notion.com/v1/comments`;
        const body: any = {
            parent: inputParams.parent,
            rich_text: inputParams.richText,
        };

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

export const notionCreateCommentTool = createAction({
    name: "notionCreateComment",
    description: "Create a comment on a page or discussion.",
    inputParams: z.object({
        parent: z.object({
            page_id: z.string().optional(),
            discussion_id: z.string().optional(),
        }).refine(v => v.page_id || v.discussion_id, { message: "Provide page_id or discussion_id" }),
        richText: z.array(
            z.object({}).catchall(z.any())
        ).describe("Rich text array per Notion API"),
    }),
    execute: notionCreateComment,
});


