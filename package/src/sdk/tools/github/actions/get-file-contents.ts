import { z } from "zod";
import { GitHubTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeGitHubRequest } from "../common";

const githubGetFileContents = async (inputParams: { 
    owner: string; 
    repo: string; 
    path: string; 
    branch?: string; 
}): Promise<string> => {
    try {
        const githubTool = new GitHubTool();
        const githubPat = await githubTool.createClient();
        if (!githubPat) {
            throw new Error("GitHub client is not initialized");
        }
        
        let url = `https://api.github.com/repos/${inputParams.owner}/${inputParams.repo}/contents/${inputParams.path}`;
        if (inputParams.branch) {
            url += `?ref=${inputParams.branch}`;
        }
        
        const result = await makeGitHubRequest('GET', url, null, githubPat);

        // If it's a file, decode the content
        if (result.content && result.encoding === 'base64') {
            result.content = Buffer.from(result.content, 'base64').toString('utf8');
            result.encoding = 'utf8';
        }

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

export const githubGetFileContentsTool = createAction({
    name: "githubGetFileContents",
    description: "Get the contents of a file or directory from a GitHub repository.",
    inputParams: z.object({
        owner: z.string().describe("Repository owner (username or organization)"),
        repo: z.string().describe("Repository name"),
        path: z.string().describe("Path to the file or directory"),
        branch: z.string().optional().describe("Branch to get contents from")
    }),
    execute: githubGetFileContents,
});
