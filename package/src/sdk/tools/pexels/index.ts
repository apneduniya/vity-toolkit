import VityToolKitSDKContext from "../../utils/vityToolKitContext";
import { AuthType } from "../../types";
import { pexelsSearchPhotosTool } from "./actions/search-photos";
import { pexelsSearchVideosTool } from "./actions/search-videos";
import { pexelsGetPhotoTool } from "./actions/get-photo";
import { pexelsGetVideoTool } from "./actions/get-video";
import { pexelsGetCuratedPhotosTool } from "./actions/get-curated-photos";
import { pexelsGetPopularVideosTool } from "./actions/get-popular-videos";
import { App } from "..";
import { Connection } from "../../utils/connection";

export class PexelsTool {
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
            pexelsSearchPhotosTool,
            pexelsSearchVideosTool,
            pexelsGetPhotoTool,
            pexelsGetVideoTool,
            pexelsGetCuratedPhotosTool,
            pexelsGetPopularVideosTool,
        ];
    }


    async createClient(): Promise<string> {
        const authData = await this.getAuthData();
        return authData.PEXELS_API_KEY;
    }

    private async getAuthData(): Promise<{ PEXELS_API_KEY: string }> {
        const connectionAuthData = await new Connection().getConnection({ app: App.PEXELS });

        if (!connectionAuthData.success) {
            throw new Error("Failed to get auth data from connection");
        }

        return connectionAuthData.data
    }

    static getExpectedParamsForConnection(type: AuthType) {
        switch (type) {
            case AuthType.API_KEY:
                return { "PEXELS_API_KEY": "" };
            default:
                throw new Error("Only API Key auth is supported for Pexels");
        }
    }
}
