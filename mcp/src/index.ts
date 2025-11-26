#!/usr/bin/env node
import 'dotenv/config'
import { VityToolKit, App, Action, type ToolConfig } from 'vity-toolkit'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const allApps = (): App[] => Object.values(App);

class VityToolKitMCP extends VityToolKit {
    getToolsForMCP(params: { apps?: App[]; actions?: Action[] } = {}): ToolConfig[] {
        const selectedApps = params.apps ?? allApps()
        const selectedActions = params.actions ?? []

        const appTools: ToolConfig[] = []
        for (const app of selectedApps) {
            try {
                appTools.push(...this._getApps([app]))
            } catch (error) {
                console.warn(`Skipping app ${app} due to initialization error: ${error}`)
            }
        }

        const actionTools = selectedActions.length ? this._getActions(selectedActions) : []

        const toolRegistry = new Map<string, ToolConfig>()
        for (const tool of [...appTools, ...actionTools]) {
            if (!toolRegistry.has(tool.name)) {
                toolRegistry.set(tool.name, tool)
            }
        }

        return Array.from(toolRegistry.values())
    }
}

const parseAppsArg = (): App[] | undefined => {
    const args = process.argv.slice(2)
    const appsIndex = args.indexOf('--apps')
    if (appsIndex === -1) return undefined

    const appsArg = args[appsIndex + 1]
    if (!appsArg) {
        console.error('Error: --apps flag requires a comma-separated list of app names')
        process.exit(1)
    }

    return appsArg.split(',').map((app) => app.trim() as App)
}

const parseActionsArg = (): Action[] | undefined => {
    const args = process.argv.slice(2)
    const actionsIndex = args.indexOf('--actions')
    if (actionsIndex === -1) return undefined

    const actionsArg = args[actionsIndex + 1]
    if (!actionsArg) {
        console.error('Error: --actions flag requires a comma-separated list of action enum values')
        process.exit(1)
    }

    // Parse action enum values (e.g., "SOLANA_WALLET_GET_BALANCE, TWITTER_SEARCH")
    return actionsArg.split(',').map((action) => {
        const trimmed = action.trim()
        // Try to find matching Action enum value
        const actionKey = trimmed as keyof typeof Action
        if (Action[actionKey] !== undefined) {
            return Action[actionKey]
        }
        console.error(`Error: Unknown action: ${action}. Use Action enum values like SOLANA_WALLET_GET_BALANCE`)
        process.exit(1)
    })
}

const main = async () => {
    const apps = parseAppsArg()
    const actions = parseActionsArg()

    // Initialize VityToolKit with credentials from environment variables
    const toolkit = new VityToolKitMCP({
        userPrivateKey: process.env.VITY_USER_PRIVATE_KEY,
        appPrivateKey: process.env.VITY_APP_PRIVATE_KEY,
        userApiKey: process.env.VITY_USER_API_KEY,
        appApiKey: process.env.VITY_APP_API_KEY,
        apiBaseUrl: process.env.VITY_API_BASE_URL,
    })

    // Get tools based on apps/actions filters
    const toolConfigs = toolkit.getToolsForMCP({ apps, actions })

    if (toolConfigs.length === 0) {
        console.error('No tools found. Check your --apps and --actions filters.')
        process.exit(1)
    }

    // Create MCP server
    const server = new McpServer({ name: 'VityToolKit', version: '0.1.0' })
    const transport = new StdioServerTransport()

    // Register each tool with the MCP server, using the original Zod schema
    for (const tool of toolConfigs) {
        server.registerTool(
            tool.name,
            {
                description: tool.description,
                inputSchema: tool.inputParams as any,
            },
            async (args: any, _extra: any) => {
                try {
                    const rawResult = await tool.execute(args)
                    const parsedResult = typeof rawResult === 'string' ? JSON.parse(rawResult) : rawResult
                    const payload = parsedResult?.data ?? parsedResult ?? rawResult

                    return {
                        content: [
                            {
                                type: 'text' as const,
                                text: typeof payload === 'string' ? payload : JSON.stringify(payload),
                            },
                        ],
                    }
                } catch (error: any) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: 'text' as const,
                                text: error?.message ? String(error.message) : String(error),
                            },
                        ],
                    }
                }
            }
        )
    }

    await server.connect(transport)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})

