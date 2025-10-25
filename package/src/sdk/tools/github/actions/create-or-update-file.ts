import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubCreateOrUpdateFile = async (inputParams: { 
    owner: string; 
    repo: string; 
    path: string; 
    content: string; 
    message: string; 
    branch: string; 
    sha?: string; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        // Get current file SHA if not provided
        let currentSha = inputParams.sha;
        if (!currentSha) {
            try {
                const existingFile = await makeGitHubRequest('GET', `https://api.github.com/repos/${inputParams.owner}/${inputParams.repo}/contents/${inputParams.path}?ref=${inputParams.branch}`, null, githubPat);
                currentSha = existingFile.sha;
            } catch (error) {
                // File doesn't exist, will create new file
            }
        }
        
        const url = `https://api.github.com/repos/${inputParams.owner}/${inputParams.repo}/contents/${inputParams.path}`;
        const encodedContent = Buffer.from(inputParams.content).toString('base64');
        const data = {
            message: inputParams.message,
            content: encodedContent,
            branch: inputParams.branch,
            ...(currentSha ? { sha: currentSha } : {})
        };
        
        const result = await makeGitHubRequest('PUT', url, data, githubPat);

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

export const githubCreateOrUpdateFileTool = createAction({
    name: "githubCreateOrUpdateFile",
    description: "Create or update a single file in a GitHub repository.",
    inputParams: z.object({
        owner: z.string().describe("Repository owner (username or organization)"),
        repo: z.string().describe("Repository name"),
        path: z.string().describe("Path where to create/update the file"),
        content: z.string().describe("Content of the file"),
        message: z.string().describe("Commit message"),
        branch: z.string().describe("Branch to create/update the file in"),
        sha: z.string().optional().describe("SHA of the file being replaced (required when updating existing files)")
    }),
    execute: githubCreateOrUpdateFile,
});
