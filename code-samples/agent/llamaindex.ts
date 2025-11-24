import { agent } from "@llamaindex/workflow";
import { openai } from "@llamaindex/openai";
import { App, LlamaIndexToolkit } from "vity-toolkit";


const P = (globalThis as any).process;
const apiKey = P?.env?.OPENAI_API_KEY;

const toolkit = new LlamaIndexToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});

const tools = toolkit.getTools({ apps: [App.PEXELS] });

const pexelsAgent = agent({
    name: "Pexels Agent",
    description: "An agent that searches for photos using Pexels",
    llm: openai({ model: "gpt-4o-mini", apiKey }),
    systemPrompt: "You are a travel assistant that curates inspiring visuals. Use the available tools to search for photos.",
    tools,
});

const result = await pexelsAgent.run("Show me reference photos for winter trips in Japan.");

console.log("Agent result:", result.data.message.content);

