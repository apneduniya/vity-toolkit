import VityToolKitSDKContext from "../../utils/vityToolKitContext";
import { AuthType } from "../../types";
import { App } from "..";
import { Connection } from "../../utils/connection";
import { notionSearchTool } from "./actions/search";
import { notionGetPageTool } from "./actions/get-page";
import { notionGetDatabaseTool } from "./actions/get-database";
import { notionQueryDatabaseTool } from "./actions/query-database";
import { notionCreatePageTool } from "./actions/create-page";
import { notionAppendBlockChildrenTool } from "./actions/append-block-children";
import { notionRetrieveBlockTool } from "./actions/retrieve-block";
import { notionRetrieveBlockChildrenTool } from "./actions/retrieve-block-children";
import { notionListUsersTool } from "./actions/list-users";
import { notionListCommentsTool } from "./actions/list-comments";
import { notionCreateCommentTool } from "./actions/create-comment";


export class NotionTool {
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
            notionSearchTool,
            notionGetPageTool,
            notionGetDatabaseTool,
            notionQueryDatabaseTool,
            notionCreatePageTool,
            notionAppendBlockChildrenTool,
            notionRetrieveBlockTool,
            notionRetrieveBlockChildrenTool,
            notionListUsersTool,
            notionListCommentsTool,
            notionCreateCommentTool,
        ]
    }

    async createClient(): Promise<{ NOTION_API_KEY: string; NOTION_VERSION?: string }> {
        const authData = await this.getAuthData();
        return authData;
    }

    private async getAuthData(): Promise<{ NOTION_API_KEY: string; NOTION_VERSION?: string }> {
        const connectionAuthData = await new Connection().getConnection({ app: App.NOTION });

        if (!connectionAuthData.success) {
            throw new Error("Failed to get auth data from connection");
        }

        return connectionAuthData.data
    }

    static getExpectedParamsForConnection(type: AuthType) {
        switch (type) {
            case AuthType.OAUTH_1:
                throw new Error("OAuth 1 is not supported for Notion");
            case AuthType.OAUTH_2:
                throw new Error("OAuth 2 is not supported for Notion");
            case AuthType.API_KEY:
                return {
                    "NOTION_API_KEY": "",
                    "NOTION_VERSION": "2022-06-28"
                }
            case AuthType.PASSWORD_BASED_AUTH:
                throw new Error("Password-based auth is not supported for Notion");
        }
    }
}


