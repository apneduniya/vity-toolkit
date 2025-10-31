import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const notionSearch = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_SEARCH,
        inputParams: {
            query: "product roadmap",
            pageSize: 5,
            sortDirection: 'descending',
            sortTimestamp: 'last_edited_time',
        }
    });

    console.log("Search results:", result);
};

notionSearch().catch(console.error);


