import { VityToolKit } from "vity-toolkit";
import { Action } from "vity-toolkit";

const createRepository = async () => {
    const toolKit = new VityToolKit({
        userPrivateKey: "your-user-private-key",
        appPrivateKey: "your-app-private-key",
    });

    // Create a new repository
    const result = await toolKit.executeAction({
        action: Action.GITHUB_CREATE_REPOSITORY,
        inputParams: {
            name: "my-awesome-project",
            description: "A project created with VityToolKit",
            private: false,
            autoInit: true
        }
    });

    console.log("Repository created:", result);
};

createRepository().catch(console.error);
