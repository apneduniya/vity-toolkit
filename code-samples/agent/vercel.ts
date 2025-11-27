import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { App, VercelAIToolkit } from "vity-toolkit";

const P = (globalThis as any).process;

const toolKit = new VercelAIToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});
const tools = toolKit.getTools({ apps: [App.PEXELS] });

const { text } = await generateText({
    model: openai("gpt-4o"),
    tools,
    maxSteps: 5,
    prompt: "Show me reference photos for winter trips in Japan.",
});

console.log(text);

