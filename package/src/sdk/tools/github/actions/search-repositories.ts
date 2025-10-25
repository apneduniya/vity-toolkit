import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubSearchRepositories = async (inputParams: { 
    query: string; 
    page?: number; 
    perPage?: number; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(inputParams.query)}&page=${inputParams.page || 1}&per_page=${inputParams.perPage || 30}`;
        
        const results = await makeGitHubRequest('GET', url, null, githubPat);

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

export const githubSearchRepositoriesTool = createAction({
    name: "githubSearchRepositories",
    description: "Search for GitHub repositories using the GitHub API.",
    inputParams: z.object({
        query: z.string().describe("Search query (see GitHub search syntax)"),
        page: z.number().optional().default(1).describe("Page number for pagination"),
        perPage: z.number().optional().default(30).describe("Number of results per page (max: 100)")
    }),
    execute: githubSearchRepositories,
});
