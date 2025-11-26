# VityToolKit MCP Server - Usage Guide

## Overview

The VityToolKit MCP Server exposes all VityToolKit tools and actions as MCP (Model Context Protocol) tools, making them available to MCP-compatible clients like Claude Desktop, Cline, and other AI assistants.

## Installation

1. Navigate to the MCP server directory:
```bash
cd mcp
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Build the project:
```bash
pnpm build
# or
npm run build
```

## Configuration

### Environment Variables

Set the following environment variables based on your needs:

- `VITY_USER_PRIVATE_KEY` - Your user private key (Solana keypair)
- `VITY_APP_PRIVATE_KEY` - Your app private key (Solana keypair)
- `VITY_USER_API_KEY` - Your user API key (alternative to private key)
- `VITY_APP_API_KEY` - Your app API key (alternative to private key)
- `VITY_STORAGE_PROVIDER` - Storage provider (default: PINATA)
- `VITY_API_BASE_URL` - Custom API base URL (optional)

**Note:** You need either private keys OR API keys. Private keys take precedence if both are provided.

### Example `.env` file:

```env
VITY_USER_PRIVATE_KEY=your_user_private_key_here
VITY_APP_PRIVATE_KEY=your_app_private_key_here
VITY_STORAGE_PROVIDER=PINATA
```

## Running the MCP Server

### Basic Usage (All Tools)

Run the server with all available tools:

```bash
node dist/index.js
```

### Filter by Apps

Run the server with specific apps only:

```bash
node dist/index.js --apps "solana-wallet,twitter,github"
```

Available apps:
- `solana-wallet`
- `twitter`
- `earn`
- `reddit`
- `gibwork`
- `github`
- `stampchain`
- `pexels`
- `notion`
- `tavily`
- `agentmail`
- `basic-math`
- `fake-weather`
- `language-translator`
- `geo-distance`
- `randomizer`

### Filter by Actions

Run the server with specific actions only:

```bash
node dist/index.js --actions "SOLANA_WALLET_GET_BALANCE,TWITTER_SEARCH,BASIC_MATH_SOLVE"
```

**Note:** Action names must match the Action enum values exactly (uppercase with underscores).

### Combine Filters

You can combine both filters:

```bash
node dist/index.js --apps "twitter" --actions "TWITTER_SEARCH,TWITTER_CREATE_TWEET"
```

## Integration with MCP Clients

### Claude Desktop

Add to your Claude Desktop MCP configuration file (usually `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "vity-toolkit": {
      "command": "node",
      "args": [
        "/absolute/path/to/vity-toolkit/external-tools/vity-toolkit-mcp/dist/index.js"
      ],
      "env": {
        "VITY_USER_PRIVATE_KEY": "your_user_private_key",
        "VITY_APP_PRIVATE_KEY": "your_app_private_key"
      }
    }
  }
}
```

### With Filters

To use specific apps or actions:

```json
{
  "mcpServers": {
    "vity-toolkit": {
      "command": "node",
      "args": [
        "/absolute/path/to/vity-toolkit/external-tools/vity-toolkit-mcp/dist/index.js",
        "--apps",
        "twitter,github"
      ],
      "env": {
        "VITY_USER_PRIVATE_KEY": "your_user_private_key",
        "VITY_APP_PRIVATE_KEY": "your_app_private_key"
      }
    }
  }
}
```

### Cline (VS Code Extension)

Configure in your VS Code settings or `.cline` configuration:

```json
{
  "mcpServers": {
    "vity-toolkit": {
      "command": "node",
      "args": [
        "/absolute/path/to/vity-toolkit/external-tools/vity-toolkit-mcp/dist/index.js"
      ],
      "env": {
        "VITY_USER_PRIVATE_KEY": "your_user_private_key",
        "VITY_APP_PRIVATE_KEY": "your_app_private_key"
      }
    }
  }
}
```

## Available Tools

The MCP server exposes all tools from VityToolKit. Each tool includes:

- **Name**: The tool identifier
- **Description**: What the tool does
- **Parameters**: JSON Schema defining the input parameters
- **Execution**: The tool's execute function

### Example Tools

- **Solana Wallet Tools**: Generate keypairs, get balance, transfer tokens
- **Twitter Tools**: Search tweets, create tweets, manage Twitter interactions
- **GitHub Tools**: Search repositories, create issues, manage files
- **Notion Tools**: Search pages, create pages, query databases
- **Basic Math**: Perform mathematical operations
- And many more...

## Troubleshooting

### No Tools Found

If you see "No tools found", check:
1. Your `--apps` and `--actions` filters are correct
2. App names match exactly (case-sensitive)
3. Action enum values are correct (uppercase with underscores)

### Credential Errors

If tools require credentials but fail:
1. Ensure environment variables are set correctly
2. Check that private keys or API keys are valid
3. Some apps require integration/connection before use

### Build Errors

If you encounter build errors:
1. Ensure all dependencies are installed: `pnpm install`
2. Check TypeScript version compatibility
3. Verify the `vity-toolkit` package is built and available

## Development

### Making Changes

1. Edit `src/index.ts`
2. Rebuild: `pnpm build`
3. Test the changes

### Adding New Tools

New tools added to VityToolKit will automatically be available in the MCP server when:
1. They're exported from the tools index
2. The package is rebuilt
3. The MCP server is restarted

## Architecture

The MCP server:
1. Extends `VityToolKit` to access tool collection methods
2. Parses command-line arguments for filtering
3. Converts Zod schemas to JSON Schema for MCP compatibility
4. Registers tools with the MCP server
5. Handles tool execution and error responses

## Security Notes

- **Never commit private keys or API keys to version control**
- Use environment variables or secure credential management
- Private keys provide full access - use API keys when possible
- Review tool permissions before granting access

## Support

For issues or questions:
- Check the main VityToolKit documentation
- Review tool-specific requirements in the package
- Ensure all prerequisites are met for specific apps (e.g., Twitter API keys for Twitter tools)

