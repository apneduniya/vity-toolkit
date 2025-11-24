import { VityToolKit } from "vity-toolkit";
import { App } from "vity-toolkit";
import { AuthType } from "vity-toolkit/src/sdk/types";

const P = (globalThis as any).process;


const connection = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    // Check if AgentMail is connected
    const isConnected = await toolKit.isConnection({ 
        app: App.AGENTMAIL, 
        type: AuthType.API_KEY 
    });
    
    console.log("AgentMail connection status:", isConnected);

    if (!isConnected.success) {
        // Initiate AgentMail connection
        const connectionResult = await toolKit.initiateAppConnection({
            app: App.AGENTMAIL,
            type: AuthType.API_KEY,
            authData: {
                AGENTMAIL_API_KEY: P?.env?.AGENTMAIL_API_KEY
            }
        });
        
        console.log("AgentMail connection result:", connectionResult);
    }
};

connection().catch(console.error);


