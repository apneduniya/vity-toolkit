import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const createComment = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_CREATE_COMMENT,
        inputParams: {
            parent: { page_id: "your-page-id" },
            richText: [
                {
                    type: "text",
                    text: { content: "This is a comment from Vity Toolkit." }
                }
            ]
        }
    });

    console.log("Created comment:", result);
};

createComment().catch(console.error);


