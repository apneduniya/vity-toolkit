import { VityToolKit } from "../sdk";
import type { ToolConfig } from "../sdk/helpers/createAction";
import type { Action, App } from "../sdk/tools";
import type { StorageProvider } from "../storage-providers";
import { tool, type CoreTool } from "ai";
import { z } from "zod";

export class VercelAIToolkit extends VityToolKit {

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
        return schemas.map(toolConfig => {
            const { name, description, inputParams, execute } = toolConfig;

            const schema =
                inputParams && "shape" in inputParams ? inputParams : z.object({});

            return tool({
                description,
                parameters: schema,
                execute: async (input: any) => await execute(input),
            });
        });
    }

    getTools({ apps, actions }: { apps?: App[], actions?: Action[] }) {
        const appTools = apps ? this._getApps(apps) : [];
        const actionTools = actions ? this._getActions(actions) : [];

        const schemaTools = this.schemaToTool([...appTools, ...actionTools]);
        const tools = schemaTools.reduce((acc, t, i) => {
            acc[`tool_${i}`] = t;
            return acc;
        }, {} as Record<string, CoreTool<any, any>>);

        return tools;
    }
}