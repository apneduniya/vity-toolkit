import { z } from "zod";
import { TavilyTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeTavilyRequest } from "../common";

const tavilyMap = async (inputParams: {
    url: string;
    max_depth?: number;
    max_breadth?: number;
    limit?: number;
    instructions?: string;
    select_paths?: string[];
    select_domains?: string[];
    allow_external?: boolean;
}): Promise<string> => {
    try {
        const tool = new TavilyTool();
        const { TAVILY_API_KEY } = await tool.createClient();
        if (!TAVILY_API_KEY) {
            throw new Error("Tavily client is not initialized");
        }

        const results = await makeTavilyRequest('map', inputParams, TAVILY_API_KEY);

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

export const tavilyMapTool = createAction({
    name: "tavilyMap",
    description: "Create a structured map of website URLs using Tavily.",
    inputParams: z.object({
        url: z.string().describe("Base URL to map"),
        max_depth: z.number().min(1).optional().describe("Max mapping depth"),
        max_breadth: z.number().min(1).optional().describe("Max links per level"),
        limit: z.number().min(1).optional().describe("Total links to process"),
        instructions: z.string().optional().describe("Natural language mapping instructions"),
        select_paths: z.array(z.string()).optional().describe("Regex patterns to include specific paths"),
        select_domains: z.array(z.string()).optional().describe("Regex patterns to restrict to domains"),
        allow_external: z.boolean().optional().describe("Include external links in response"),
    }),
    execute: tavilyMap,
});


