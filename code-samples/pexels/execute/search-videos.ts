import { VityToolKit, Action } from "vity-toolkit";

const P = (globalThis as any).process;

const run = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const result = await toolKit.executeAction({
        action: Action.PEXELS_SEARCH_VIDEOS,
        inputParams: {
            query: "drone ocean",
            page: 1,
            perPage: 5,
        },
    });

    console.log(result);
};

run().catch(console.error);
