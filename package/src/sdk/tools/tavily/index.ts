import VityToolKitSDKContext from "../../utils/vityToolKitContext";
import { AuthType } from "../../types";
import { App } from "..";
import { Connection } from "../../utils/connection";
import { tavilySearchTool } from "./actions/search";
import { tavilyExtractTool } from "./actions/extract";
import { tavilyCrawlTool } from "./actions/crawl";
import { tavilyMapTool } from "./actions/map";


export class TavilyTool {
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
            tavilySearchTool,
            tavilyExtractTool,
            tavilyCrawlTool,
            tavilyMapTool,
        ]
    }

    async createClient(): Promise<{ TAVILY_API_KEY: string }> {
        const authData = await this.getAuthData();
        return authData;
    }

    private async getAuthData(): Promise<{ TAVILY_API_KEY: string }> {
        const connectionAuthData = await new Connection().getConnection({ app: App.TAVILY });

        if (!connectionAuthData.success) {
            throw new Error("Failed to get auth data from connection");
        }

        return connectionAuthData.data
    }

    static getExpectedParamsForConnection(type: AuthType) {
        switch (type) {
            case AuthType.OAUTH_1:
                throw new Error("OAuth 1 is not supported for Tavily");
            case AuthType.OAUTH_2:
                throw new Error("OAuth 2 is not supported for Tavily");
            case AuthType.API_KEY:
                return {
                    "TAVILY_API_KEY": "",
                }
            case AuthType.PASSWORD_BASED_AUTH:
                throw new Error("Password-based auth is not supported for Tavily");
        }
    }
}



