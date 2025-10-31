import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const retrieveBlockChildren = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_RETRIEVE_BLOCK_CHILDREN,
        inputParams: {
            blockId: "your-block-id",
            pageSize: 10,
        }
    });

    console.log("Children:", result);
};

retrieveBlockChildren().catch(console.error);


