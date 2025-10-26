import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubCreatePullRequest = async (inputParams: { 
    owner: string; 
    repo: string; 
    title: string; 
    head: string; 
    base: string; 
    body?: string; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        const url = `https://api.github.com/repos/${inputParams.owner}/${inputParams.repo}/pulls`;
        const data = {
            title: inputParams.title,
            head: inputParams.head,
            base: inputParams.base,
            body: inputParams.body
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

export const githubCreatePullRequestTool = createAction({
    name: "githubCreatePullRequest",
    description: "Create a new pull request in a GitHub repository.",
    inputParams: z.object({
        owner: z.string().describe("Repository owner (username or organization)"),
        repo: z.string().describe("Repository name"),
        title: z.string().describe("Pull request title"),
        head: z.string().describe("The name of the branch where your changes are implemented"),
        base: z.string().describe("The name of the branch you want the changes pulled into"),
        body: z.string().optional().describe("Pull request body/description")
    }),
    execute: githubCreatePullRequest,
});
