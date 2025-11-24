import VityToolKitSDKContext from "../../utils/vityToolKitContext";
import { App } from "..";
import { Connection } from "../../utils/connection";
import { AuthType } from "../../types";
import { agentmailListToolsTool } from "./actions/list-tools";
import { agentmailExecuteTool } from "./actions/execute";


export class AgentMailTool {
    private userPrivateKey: string | undefined;

    constructor() {
        if (!VityToolKitSDKContext) {
            throw new Error('VityToolKit not initialized');
        }

        this.userPrivateKey = VityToolKitSDKContext.userPrivateKey;

        if (!this.userPrivateKey) {
            throw new Error("User private key is required to use this tool");
        }
    }

    getTools() {
        return [
            agentmailListToolsTool,
            agentmailExecuteTool,
        ];
    }

    async createClient(): Promise<{ environment: string; apiKey: string }> {
        const env = (globalThis as any)?.process?.env?.AGENTMAIL_ENVIRONMENT?.toLowerCase();
        const environment = (env === 'development' || env === 'dev') ? 'development' : 'production';

        const authData = await this.getAuthData();
        return { environment, apiKey: authData.AGENTMAIL_API_KEY };
    }

    private async getAuthData(): Promise<{ AGENTMAIL_API_KEY: string }> {
        const connectionAuthData = await new Connection().getConnection({ app: App.AGENTMAIL });

        if (!connectionAuthData.success) {
            throw new Error("Failed to get auth data from connection");
        }

        const data = connectionAuthData.data as { AGENTMAIL_API_KEY?: string };
        if (!data?.AGENTMAIL_API_KEY) {
            throw new Error("AGENTMAIL_API_KEY missing in connection");
        }

        return { AGENTMAIL_API_KEY: data.AGENTMAIL_API_KEY };
    }

    static getExpectedParamsForConnection(type: AuthType) {
        switch (type) {
            case AuthType.API_KEY:
                return {
                    "AGENTMAIL_API_KEY": ""
                };
            case AuthType.OAUTH_1:
            case AuthType.OAUTH_2:
            case AuthType.PASSWORD_BASED_AUTH:
                throw new Error("Currently, we only support API Key for AgentMail");
        }
    }
}


