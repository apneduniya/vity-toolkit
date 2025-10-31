import { VityToolKit } from "vity-toolkit";
import { App } from "vity-toolkit";
import { AuthType } from "vity-toolkit/src/sdk/types";

const P = (globalThis as any).process;

const connection = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    // Check if Notion is connected
    const isConnected = await toolKit.isConnection({ 
        app: App.NOTION, 
        type: AuthType.API_KEY 
    });
    
    console.log("Notion connection status:", isConnected);

    if (!isConnected.success) {
        // Initiate Notion connection
        const connectionResult = await toolKit.initiateAppConnection({
            app: App.NOTION,
            type: AuthType.API_KEY,
            authData: {
                NOTION_API_KEY: P?.env?.NOTION_API_KEY,
                NOTION_VERSION: P?.env?.NOTION_VERSION || '2025-09-03'
            }
        });
        
        console.log("Notion connection result:", connectionResult);
    }
};

connection().catch(console.error);


