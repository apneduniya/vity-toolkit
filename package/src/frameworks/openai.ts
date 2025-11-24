import type OpenAI from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { VityToolKit } from "../sdk";
import type { ToolConfig } from "../sdk/helpers/createAction";
import type { Action, App } from "../sdk/tools";
import type { StorageProvider } from "../storage-providers";

type ToolkitSelection = { apps?: App[]; actions?: Action[] };

type ToolRegistry = Record<string, ToolConfig>;

const EMPTY_PARAMETERS = {
    type: "object",
    properties: {},
};

export class OpenAIToolkit extends VityToolKit {
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

    getTools(): OpenAI.ChatCompletionTool[];
    getTools(params: ToolkitSelection): OpenAI.ChatCompletionTool[];
    getTools(params: ToolkitSelection = {}): OpenAI.ChatCompletionTool[] {
        const { schemas } = this.collectSchemas(params);
        return this.schemaToTool(schemas);
    }

    async executeToolCall(
        toolCall: OpenAI.ChatCompletionMessageToolCall,
        params: ToolkitSelection = {}
    ): Promise<string> {
        const { registry } = this.collectSchemas(params);
        const tool = registry[toolCall.function.name];

        if (!tool) {
            throw new Error(`Tool ${toolCall.function.name} is not registered in this toolkit selection`);
        }

        const parsedInput = this.parseFunctionArguments(toolCall.function.arguments, toolCall.function.name);
        const result = await tool.execute(parsedInput);
        return typeof result === "string" ? result : JSON.stringify(result);
    }

    async handleToolCalls(
        toolCalls: OpenAI.ChatCompletionMessageToolCall[],
        params: ToolkitSelection = {}
    ): Promise<OpenAI.ChatCompletionToolMessageParam[]> {
        const outputs: OpenAI.ChatCompletionToolMessageParam[] = [];

        for (const call of toolCalls) {
            const content = await this.executeToolCall(call, params);
            outputs.push({
                role: "tool",
                tool_call_id: call.id,
                content,
            });
        }

        return outputs;
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

    private parseFunctionArguments(rawArguments: string | undefined, toolName: string) {
        if (!rawArguments) {
            return {};
        }

        try {
            return JSON.parse(rawArguments);
        } catch (error) {
            throw new Error(`Invalid JSON arguments for tool ${toolName}: ${error}`);
        }
    }

    private schemaToTool(schemas: ToolConfig[]) {
        return schemas.map(schema => this.createOpenAITool(schema));
    }

    private createOpenAITool({ name, description, inputParams }: ToolConfig): OpenAI.ChatCompletionTool {
        return {
            type: "function",
            function: {
                name,
                description,
                parameters: this.toJsonSchema(name, inputParams),
            },
        };
    }

    private toJsonSchema(name: string, inputParams?: ToolConfig["inputParams"]) {
        if (inputParams && "shape" in inputParams) {
            const rawSchema = (zodToJsonSchema as unknown as (
                schema: ToolConfig["inputParams"],
                name?: string,
                options?: Record<string, unknown>
            ) => Record<string, any>)(
                inputParams,
                name,
                {
                    target: "jsonSchema7",
                    $refStrategy: "none",
                }
            );

            const resolvedSchema = this.ensureObjectSchema(rawSchema, name);
            return (resolvedSchema as OpenAI.FunctionParameters) ?? EMPTY_PARAMETERS;
        }

        return EMPTY_PARAMETERS;
    }

    private ensureObjectSchema(schema: Record<string, any>, name: string) {
        if (schema?.type === "object") {
            return schema;
        }

        const definition = schema?.$ref && schema?.definitions?.[name];
        if (definition && definition.type === "object") {
            return definition;
        }

        return {
            ...EMPTY_PARAMETERS,
            properties: schema?.properties ?? {},
            required: schema?.required ?? [],
        };
    }
}


