import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const createPage = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_CREATE_PAGE,
        inputParams: {
            parent: { database_id: "your-database-id" },
            properties: {
                Name: {
                    title: [{ text: { content: "Sample Page from Vity Toolkit" } }]
                }
            },
            // children: [ ... optional Notion blocks ... ]
        }
    });

    console.log("Created page:", result);
};

createPage().catch(console.error);


