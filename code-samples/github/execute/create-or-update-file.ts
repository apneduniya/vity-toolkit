import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const createOrUpdateFile = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Create or update a file
    const result = await toolKit.executeAction({
        action: Action.GITHUB_CREATE_OR_UPDATE_FILE,
        inputParams: {
            owner: "your-username",
            repo: "your-repo",
            path: "src/utils/helper.ts",
            content: `export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}`,
            message: "Add utility functions for date formatting and string capitalization",
            branch: "main"
        }
    });

    console.log("File created/updated:", result);
};

createOrUpdateFile().catch(console.error);
