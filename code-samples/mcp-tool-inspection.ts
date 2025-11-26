import { VityToolKit, App, type ToolConfig } from 'vity-toolkit'

const P = (globalThis as any).process;

// Initialize toolkit (same as MCP server does)
const toolkit = new VityToolKit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
})

// Get first 5 tools from different apps
const appsToCheck = [App.BASIC_MATH, App.SOLANA_WALLET, App.PEXELS, App.TAVILY, App.RANDOMIZER]

console.log('='.repeat(80))
console.log('MCP TOOL INSPECTION - First 5 Tools Structure')
console.log('='.repeat(80))
console.log()

for (const app of appsToCheck) {
    try {
        const appTools = toolkit._getApps([app])
        if (appTools.length > 0) {
            const tool = appTools[0] // Get first tool from each app
            console.log(`\n📦 App: ${app}`)
            console.log(`   Tool Name: ${tool.name}`)
            console.log(`   Tool Description: ${tool.description}`)
            console.log(`   Input Params Type: ${tool.inputParams ? 'ZodObject' : 'undefined'}`)
            
            if (tool.inputParams && 'shape' in tool.inputParams) {
                const shape = tool.inputParams.shape
                console.log(`   Input Schema Shape:`)
                Object.keys(shape).forEach((key) => {
                    const field = shape[key]
                    const isOptional = field._def?.typeName === 'ZodOptional'
                    const innerType = isOptional ? field._def.innerType : field
                    const typeName = innerType._def?.typeName || 'unknown'
                    const description = innerType._def?.description || 'No description'
                    
                    console.log(`     - ${key}: ${typeName}${isOptional ? ' (optional)' : ' (required)'}`)
                    console.log(`       Description: ${description}`)
                })
            }
            
            console.log(`\n   What gets passed to registerTool:`)
            console.log(`   {`)
            console.log(`     name: "${tool.name}",`)
            console.log(`     description: "${tool.description}",`)
            console.log(`     inputSchema: tool.inputParams,  // <-- This is the Zod schema`)
            console.log(`     callback: async (args) => { ... }`)
            console.log(`   }`)
        }
    } catch (error) {
        console.log(`\n⚠️  App ${app}: ${error}`)
    }
}

console.log('\n' + '='.repeat(80))
console.log('Example: pexelsSearchPhotos tool structure')
console.log('='.repeat(80))

try {
    const pexelsTools = toolkit._getApps([App.PEXELS])
    const pexelsSearchTool = pexelsTools.find(t => t.name === 'pexelsSearchPhotos')
    
    if (pexelsSearchTool) {
        console.log('\nTool Config:')
        console.log(JSON.stringify({
            name: pexelsSearchTool.name,
            description: pexelsSearchTool.description,
            hasInputParams: !!pexelsSearchTool.inputParams,
            inputParamsType: pexelsSearchTool.inputParams ? 'ZodObject' : 'undefined',
        }, null, 2))
        
        if (pexelsSearchTool.inputParams && 'shape' in pexelsSearchTool.inputParams) {
            console.log('\nInput Schema Fields:')
            const shape = pexelsSearchTool.inputParams.shape
            const fields = Object.keys(shape).map(key => {
                const field = shape[key]
                const isOptional = field._def?.typeName === 'ZodOptional'
                const innerType = isOptional ? field._def.innerType : field
                return {
                    name: key,
                    type: innerType._def?.typeName || 'unknown',
                    required: !isOptional,
                    description: innerType._def?.description || '',
                }
            })
            console.log(JSON.stringify(fields, null, 2))
        }
        
        console.log('\nWhat MCP registerTool receives:')
        console.log('server.registerTool(')
        console.log(`  "${pexelsSearchTool.name}",`)
        console.log('  {')
        console.log(`    description: "${pexelsSearchTool.description}",`)
        console.log('    inputSchema: pexelsSearchTool.inputParams,  // Zod schema with query, orientation, etc.')
        console.log('  },')
        console.log('  async (args) => { ... }')
        console.log(')')
    }
} catch (error) {
    console.log(`Error inspecting Pexels tool: ${error}`)
}

console.log('\n' + '='.repeat(80))
console.log('Summary: MCP registerTool receives the Zod schema directly')
console.log('This allows the MCP SDK to properly validate and expose parameters')
console.log('to the LLM, so it knows what fields like "query" are required.')
console.log('='.repeat(80))

