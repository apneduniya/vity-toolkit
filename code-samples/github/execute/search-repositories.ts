import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const searchRepositories = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Search for repositories
    const result = await toolKit.executeAction({
        action: Action.GITHUB_SEARCH_REPOSITORIES,
        inputParams: {
            query: "machine learning python",
            page: 1,
            perPage: 5
        }
    });

    console.log("Search results:", result);
};

searchRepositories().catch(console.error);
