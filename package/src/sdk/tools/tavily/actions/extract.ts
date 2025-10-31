import { z } from "zod";
import { TavilyTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeTavilyRequest } from "../common";

const tavilyExtract = async (inputParams: {
    urls: string[];
    extract_depth?: 'basic' | 'advanced';
    include_images?: boolean;
    format?: 'markdown' | 'text';
    include_favicon?: boolean;
}): Promise<string> => {
    try {
        const tool = new TavilyTool();
        const { TAVILY_API_KEY } = await tool.createClient();
        if (!TAVILY_API_KEY) {
            throw new Error("Tavily client is not initialized");
        }

        const results = await makeTavilyRequest('extract', inputParams, TAVILY_API_KEY);

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

export const tavilyExtractTool = createAction({
    name: "tavilyExtract",
    description: "Extract and process content from URLs using Tavily.",
    inputParams: z.object({
        urls: z.array(z.string()).describe("List of URLs to extract from"),
        extract_depth: z.enum(['basic','advanced']).optional().describe("Depth of extraction"),
        include_images: z.boolean().optional().describe("Include extracted images"),
        format: z.enum(['markdown','text']).optional().describe("Output format"),
        include_favicon: z.boolean().optional().describe("Include favicon URL for each result"),
    }),
    execute: tavilyExtract,
});


