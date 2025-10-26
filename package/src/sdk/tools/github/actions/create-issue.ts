import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubCreateIssue = async (inputParams: { 
    owner: string; 
    repo: string; 
    title: string; 
    body?: string; 
    labels?: string[]; 
    assignees?: string[]; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        const url = `https://api.github.com/repos/${inputParams.owner}/${inputParams.repo}/issues`;
        const data = {
            title: inputParams.title,
            body: inputParams.body,
            labels: inputParams.labels,
            assignees: inputParams.assignees
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

export const githubCreateIssueTool = createAction({
    name: "githubCreateIssue",
    description: "Create a new issue in a GitHub repository.",
    inputParams: z.object({
        owner: z.string().describe("Repository owner (username or organization)"),
        repo: z.string().describe("Repository name"),
        title: z.string().describe("Issue title"),
        body: z.string().optional().describe("Issue body/description"),
        labels: z.array(z.string()).optional().describe("Labels to assign to the issue"),
        assignees: z.array(z.string()).optional().describe("Usernames to assign to the issue")
    }),
    execute: githubCreateIssue,
});
