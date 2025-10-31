import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const P = (globalThis as any).process;

const run = async () => {
    const toolKit = new VityToolKit({
        appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
        userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    });

    const res = await toolKit.executeAction({
        action: Action.TAVILY_EXTRACT,
        inputParams: {
            urls: ["https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html"],
            extract_depth: "advanced",
            format: "markdown",
            include_images: false,
        },
    });

    console.log(res);
}

run().catch(console.error);


