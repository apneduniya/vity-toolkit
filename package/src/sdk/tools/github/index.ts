import VityToolKitSDKContext from "../../utils/vityToolKitContext";
import { AuthType } from "../../types";
import { githubSearchRepositoriesTool } from "./actions/search-repositories";
import { githubCreateRepositoryTool } from "./actions/create-repository";
import { githubGetFileContentsTool } from "./actions/get-file-contents";
import { githubCreateOrUpdateFileTool } from "./actions/create-or-update-file";
import { githubCreateIssueTool } from "./actions/create-issue";
import { githubCreatePullRequestTool } from "./actions/create-pull-request";
import { App } from "..";
import { Connection } from "../../utils/connection";

export class GitHubTool {
    private userPrivateKey: string | undefined;

    constructor() {
        // validation
        if (!VityToolKitSDKContext) {
            throw new Error('VityToolKit not initialized');
        }

        this.userPrivateKey = VityToolKitSDKContext.userPrivateKey;

        if (!this.userPrivateKey) { // User private key is required 
            throw new Error("User private key is required to use this tool");
        }
    }

    getTools() {
        return [
            githubSearchRepositoriesTool,
            githubCreateRepositoryTool,
            githubGetFileContentsTool,
            githubCreateOrUpdateFileTool,
            githubCreateIssueTool,
            githubCreatePullRequestTool,
        ]
    }

    async createClient(): Promise<string> {
        // get auth data (via integration and connection)
        const authData = await this.getAuthData();
        return authData.GITHUB_PAT;
    }

    private async getAuthData(): Promise<{ GITHUB_PAT: string }> {
        const connectionAuthData = await new Connection().getConnection({ app: App.GITHUB });

        if (!connectionAuthData.success) {
            throw new Error("Failed to get auth data from connection");
        }

        return connectionAuthData.data
    }

    static getExpectedParamsForConnection(type: AuthType) {
        switch (type) {
            case AuthType.OAUTH_1:
                throw new Error("Currently, we do not support OAuth 1 for GitHub");
            case AuthType.OAUTH_2:
                throw new Error("Currently, we do not support OAuth 2 for GitHub");
            case AuthType.API_KEY:
                return {
                    "GITHUB_PAT": ""
                }
            case AuthType.PASSWORD_BASED_AUTH:
                throw new Error("Currently, we do not support Password-based auth for GitHub");
        }
    }
}
