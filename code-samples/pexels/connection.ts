import { VityToolKit } from "vity-toolkit";
import { App } from "vity-toolkit";
import { AuthType } from "vity-toolkit/src/sdk/types";

const P = (globalThis as any).process;

const connection = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    // Check if Pexels is connected
    const isConnected = await toolKit.isConnection({ 
        app: App.PEXELS, 
        type: AuthType.API_KEY 
    });

    console.log("Pexels connection status:", isConnected);

    if (!isConnected.success) {
        // Initiate Pexels connection
        const connectionResult = await toolKit.initiateAppConnection({
            app: App.PEXELS,
            type: AuthType.API_KEY,
            authData: {
                PEXELS_API_KEY: P?.env?.PEXELS_API_KEY as string,
            }
        });

        console.log("Pexels connection result:", connectionResult);
    }
};

connection().catch(console.error);
