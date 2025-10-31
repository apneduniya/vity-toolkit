import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const getPage = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_GET_PAGE,
        inputParams: {
            pageId: "your-page-id",
        }
    });

    console.log("Page details:", result);
};

getPage().catch(console.error);


