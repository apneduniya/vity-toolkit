import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const queryDatabase = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_QUERY_DATABASE,
        inputParams: {
            databaseId: "your-database-id",
            // Optional filters/sorts per Notion API schema
            // filter: {...},
            // sorts: [...],
            pageSize: 5,
        }
    });

    console.log("Query results:", result);
};

queryDatabase().catch(console.error);


