import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";


const P = (globalThis as any).process;

const run = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const res = await toolKit.executeAction({
        action: Action.TAVILY_SEARCH,
        inputParams: {
            query: "OpenAI o4 mini news",
            topic: "news",
            days: 7,
            max_results: 10,
            include_raw_content: true,
        },
    });

    console.log(res);
}

run().catch(console.error);


