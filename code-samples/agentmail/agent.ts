import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import { App, LangchainToolkit } from "vity-toolkit";

const P = (globalThis as any).process;

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});

const tools = toolKit.getTools({ apps: [App.AGENTMAIL] });

const agent = createAgent({
    model,
    tools,
    systemPrompt: "You are an AI agent using AgentMail MCP tools. Use the provided tools to list available AgentMail capabilities and execute them as requested.",
});

const response = await agent.invoke({
    messages: [new HumanMessage("List all AgentMail tools")],
});

console.log(response.messages.at(-1)?.content ?? response);


