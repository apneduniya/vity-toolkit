import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const retrieveBlock = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_RETRIEVE_BLOCK,
        inputParams: {
            blockId: "your-block-id",
        }
    });

    console.log("Block:", result);
};

retrieveBlock().catch(console.error);


