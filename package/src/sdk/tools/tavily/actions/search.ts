import { z } from "zod";
import { TavilyTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeTavilyRequest } from "../common";

const tavilySearch = async (inputParams: {
    query: string;
    search_depth?: 'basic' | 'advanced';
    topic?: 'general' | 'news';
    days?: number;
    time_range?: 'day' | 'week' | 'month' | 'year' | 'd' | 'w' | 'm' | 'y';
    start_date?: string;
    end_date?: string;
    max_results?: number;
    include_images?: boolean;
    include_image_descriptions?: boolean;
    include_raw_content?: boolean;
    include_domains?: string[];
    exclude_domains?: string[];
    country?: string;
    include_favicon?: boolean;
}): Promise<string> => {
    try {
        const tool = new TavilyTool();
        const { TAVILY_API_KEY } = await tool.createClient();
        if (!TAVILY_API_KEY) {
            throw new Error("Tavily client is not initialized");
        }

        const payload: any = { ...inputParams };
        if (payload.country) {
            payload.topic = 'general';
        }

        const results = await makeTavilyRequest('search', payload, TAVILY_API_KEY);

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

export const tavilySearchTool = createAction({
    name: "tavilySearch",
    description: "Search the web using Tavily's AI search engine.",
    inputParams: z.object({
        query: z.string().describe("Search query"),
        search_depth: z.enum(['basic','advanced']).optional().describe("Search depth"),
        topic: z.enum(['general','news']).optional().describe("Search topic"),
        days: z.number().optional().describe("Days back for news topic"),
        time_range: z.enum(['day','week','month','year','d','w','m','y']).optional().describe("Time range back from now"),
        start_date: z.string().optional().describe("Start date YYYY-MM-DD"),
        end_date: z.string().optional().describe("End date YYYY-MM-DD"),
        max_results: z.number().min(5).max(20).optional().describe("Max results (5-20)"),
        include_images: z.boolean().optional().describe("Include related images"),
        include_image_descriptions: z.boolean().optional().describe("Include image descriptions"),
        include_raw_content: z.boolean().optional().describe("Include parsed HTML content"),
        include_domains: z.array(z.string()).optional().describe("Only include these domains"),
        exclude_domains: z.array(z.string()).optional().describe("Exclude these domains"),
        country: z.string().optional().describe("Boost results from this country (lowercase)"),
        include_favicon: z.boolean().optional().describe("Include favicon URL for each result"),
    }),
    execute: tavilySearch,
});


