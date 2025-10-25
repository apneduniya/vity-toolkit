import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const getFileContents = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Get file contents
    const result = await toolKit.executeAction({
        action: Action.GITHUB_GET_FILE_CONTENTS,
        inputParams: {
            owner: "facebook",
            repo: "react",
            path: "README.md"
        }
    });

    console.log("File contents:", result);
};

getFileContents().catch(console.error);
