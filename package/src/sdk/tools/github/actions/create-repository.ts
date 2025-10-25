import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubCreateRepository = async (inputParams: { 
    name: string; 
    description?: string; 
    private?: boolean; 
    autoInit?: boolean; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        const url = 'https://api.github.com/user/repos';
        const data = {
            name: inputParams.name,
            description: inputParams.description,
            private: inputParams.private || false,
            auto_init: inputParams.autoInit || false
        };
        
        const result = await makeGitHubRequest('POST', url, data, githubPat);

        return toolMessage({
            success: true,
            data: result,
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
}

export const githubCreateRepositoryTool = createAction({
    name: "githubCreateRepository",
    description: "Create a new GitHub repository in your account.",
    inputParams: z.object({
        name: z.string().describe("Repository name"),
        description: z.string().optional().describe("Repository description"),
        private: z.boolean().optional().default(false).describe("Whether the repository should be private"),
        autoInit: z.boolean().optional().default(false).describe("Initialize with README.md")
    }),
    execute: githubCreateRepository,
});
