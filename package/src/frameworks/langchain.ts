import { DynamicStructuredTool } from "langchain/tools";
import { VityToolKit } from "../sdk";
import type { ToolConfig } from "../sdk/helpers/createAction";
import type { Action, App } from "../sdk/tools";
import type { StorageProvider } from "../storage-providers";


export class LangchainToolkit extends VityToolKit {

    constructor({ 
        userPrivateKey, 
        appPrivateKey, 
        userApiKey, 
        appApiKey, 
        storageProvider, 
        apiBaseUrl 
    }: { 
        userPrivateKey?: string, 
        appPrivateKey?: string, 
        userApiKey?: string,
        appApiKey?: string,
        storageProvider?: StorageProvider,
        apiBaseUrl?: string
    } = {}) {
        super({ userPrivateKey, appPrivateKey, userApiKey, appApiKey, storageProvider, apiBaseUrl });
    }

    private schemaToTool(schemas: ToolConfig[]) {
        return schemas.map(schema => {
            const { name, description, inputParams, execute } = schema;

            const func = async (input: any) => await execute(input);

            return new DynamicStructuredTool({
                name,
                description,
                schema: inputParams,
                func,
            });
        });
    }

    getTools({ apps, actions }: { apps?: App[], actions?: Action[] }) {
        const appTools = apps ? this._getApps(apps) : [];
        const actionTools = actions ? this._getActions(actions) : [];

        const schema = [...appTools, ...actionTools];

        return this.schemaToTool(schema);
    }
}


