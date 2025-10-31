import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const P = (globalThis as any).process;

const run = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const res = await toolKit.executeAction({
        action: Action.TAVILY_MAP,
        inputParams: {
            url: "https://nodejs.org/en/docs",
            max_depth: 1,
            max_breadth: 10,
            limit: 50,
        },
    });

    console.log(res);
}

run().catch(console.error);


