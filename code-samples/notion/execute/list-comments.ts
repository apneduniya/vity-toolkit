import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const listComments = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_LIST_COMMENTS,
        inputParams: {
            blockId: "your-block-or-page-id",
        }
    });

    console.log("Comments:", result);
};

listComments().catch(console.error);


