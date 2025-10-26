import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const createPullRequest = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Create a pull request
    const result = await toolKit.executeAction({
        action: Action.GITHUB_CREATE_PULL_REQUEST,
        inputParams: {
            owner: "your-username",
            repo: "your-repo",
            title: "Add new feature: User authentication",
            head: "feature/user-auth",
            base: "main",
            body: "This PR adds user authentication functionality to the application."
        }
    });

    console.log("Pull request created:", result);
};

createPullRequest().catch(console.error);
