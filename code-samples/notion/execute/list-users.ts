import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const listUsers = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.NOTION_LIST_USERS,
        inputParams: {
            pageSize: 10,
        }
    });

    console.log("Users:", result);
};

listUsers().catch(console.error);


