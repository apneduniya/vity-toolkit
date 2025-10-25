import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const createIssue = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Create an issue
    const result = await toolKit.executeAction({
        action: Action.GITHUB_CREATE_ISSUE,
        inputParams: {
            owner: "your-username",
            repo: "your-repo",
            title: "Bug: Application crashes on startup",
            body: "The application crashes when I try to start it. This happens consistently.",
            labels: ["bug", "high-priority"],
            assignees: ["your-username"]
        }
    });

    console.log("Issue created:", result);
};

createIssue().catch(console.error);
