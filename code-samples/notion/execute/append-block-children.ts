import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const appendBlockChildren = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_APPEND_BLOCK_CHILDREN,
        inputParams: {
            blockId: "your-parent-block-or-page-id",
            children: [
                {
                    object: "block",
                    type: "paragraph",
                    paragraph: {
                        rich_text: [
                            { type: "text", text: { content: "Hello from Vity Toolkit!" } }
                        ]
                    }
                }
            ]
        }
    });

    console.log("Append result:", result);
};

appendBlockChildren().catch(console.error);


