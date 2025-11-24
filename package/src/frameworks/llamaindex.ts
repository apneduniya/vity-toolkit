import { tool as createLlamaIndexTool } from "llamaindex";
import { VityToolKit } from "../sdk";
import type { ToolConfig } from "../sdk/helpers/createAction";
import type { Action, App } from "../sdk/tools";
import type { StorageProvider } from "../storage-providers";

type ToolkitSelection = { apps?: App[]; actions?: Action[] };

type ToolRegistry = Record<string, ToolConfig>;

export type LlamaIndexTool = ReturnType<typeof createLlamaIndexTool>;

export class LlamaIndexToolkit extends VityToolKit {
    constructor({
        userPrivateKey,
        appPrivateKey,
        userApiKey,
        appApiKey,
        storageProvider,
        apiBaseUrl,
    }: {
        userPrivateKey?: string;
        appPrivateKey?: string;
        userApiKey?: string;
        appApiKey?: string;
        storageProvider?: StorageProvider;
        apiBaseUrl?: string;
    } = {}) {
        super({ userPrivateKey, appPrivateKey, userApiKey, appApiKey, storageProvider, apiBaseUrl });
    }

    getTools(): LlamaIndexTool[];
    getTools(params: ToolkitSelection): LlamaIndexTool[];
    getTools(params: ToolkitSelection = {}): LlamaIndexTool[] {
        const { schemas } = this.collectSchemas(params);
        return this.schemaToTool(schemas);
    }

    async executeToolCall(
        toolName: string,
        arguments_: Record<string, any>,
        params: ToolkitSelection = {}
    ): Promise<string> {
        const { registry } = this.collectSchemas(params);
        const tool = registry[toolName];

        if (!tool) {
            throw new Error(`Tool ${toolName} is not registered in this toolkit selection`);
        }

        const result = await tool.execute(arguments_);
        return typeof result === "string" ? result : JSON.stringify(result);
    }

    private collectSchemas(params: ToolkitSelection) {
        const { apps, actions } = params;
        const appTools = apps ? this._getApps(apps) : [];
        const actionTools = actions ? this._getActions(actions) : [];
        const schemas = [...appTools, ...actionTools];

        const registry = schemas.reduce((acc, schema) => {
            acc[schema.name] = schema;
            return acc;
        }, {} as ToolRegistry);

        return { schemas, registry };
    }

    private schemaToTool(schemas: ToolConfig[]) {
        return schemas.map(schema => this.createLlamaIndexTool(schema));
    }

    private createLlamaIndexTool({ name, description, inputParams, execute }: ToolConfig): LlamaIndexTool {
        return createLlamaIndexTool({
            name,
            description: description || name,
            parameters: inputParams && "shape" in inputParams ? inputParams : undefined,
            execute: async (input: any) => {
                try {
                    const result = await execute(input);
                    return typeof result === "string" ? result : JSON.stringify(result);
                } catch (error: any) {
                    return JSON.stringify({ error: error.message || String(error) });
                }
            },
        });
    }
}

