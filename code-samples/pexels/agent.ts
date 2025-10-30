import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";
import { AgentExecutor } from "langchain/agents";

const P = (globalThis as any).process;

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});

const tools = toolKit.getTools({ apps: [App.PEXELS] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent responsible for fetching stock media from Pexels on users' behalf. Use the Pexels tools to search photos/videos and fetch by ID.`],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
]);

const agent = createToolCallingAgent({ llm: model, tools, prompt });

const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: false,
});

const response = await agentExecutor.invoke({ input: "I'm designing a summer beach landing page. Can you find 6 beautiful beach photos (mix of landscape and portrait) and 2 short videos with warm sunset vibes? Please include direct preview links and a suggested filename for each." });

console.log(response);
