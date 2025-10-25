import { VityToolKit } from "vity-toolkit";
import { App } from "vity-toolkit";
import { AuthType } from "vity-toolkit/src/sdk/types";

const connection = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: process.env.SOLANA_PRIVATE_KEY,
        userPrivateKey: process.env.SOLANA_PRIVATE_KEY,
    });

    // Check if GitHub is connected
    const isConnected = await toolKit.isConnection({ 
        app: App.GITHUB, 
        type: AuthType.API_KEY 
    });
    
    console.log("GitHub connection status:", isConnected);

    if (!isConnected.success) {
        // Initiate GitHub connection
        const connectionResult = await toolKit.initiateAppConnection({
            app: App.GITHUB,
            type: AuthType.API_KEY,
            authData: {
                GITHUB_PAT: process.env.GITHUB_PAT
            }
        });
        
        console.log("GitHub connection result:", connectionResult);
    }
};

connection().catch(console.error);
