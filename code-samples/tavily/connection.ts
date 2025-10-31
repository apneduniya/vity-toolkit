import { VityToolKit, App } from "vity-toolkit";
import { AuthType } from "vity-toolkit/src/sdk/types";

const P = (globalThis as any).process;

const connection = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const isConnected = await toolKit.isConnection({ 
        app: App.TAVILY, 
        type: AuthType.API_KEY 
    });
    
    console.log("Tavily connection status:", isConnected);

    if (!isConnected.success) {
        const connectionResult = await toolKit.initiateAppConnection({
            app: App.TAVILY,
            type: AuthType.API_KEY,
            authData: {
                TAVILY_API_KEY: P?.env?.TAVILY_API_KEY as string,
            }
        });
        
        console.log("Tavily connection result:", connectionResult);
    }
};

connection().catch(console.error);


