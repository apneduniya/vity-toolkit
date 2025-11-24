import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { App, OpenAIToolkit } from "vity-toolkit";


const P = (globalThis as any).process;
const apiKey = P?.env?.OPENAI_API_KEY;

const client = new OpenAI({ apiKey });
const toolkit = new OpenAIToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});

const tools = toolkit.getTools({ apps: [App.PEXELS] });

const startMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a travel assistant that curates inspiring visuals." },
    { role: "user", content: "Show me reference photos for winter trips in Japan." },
];

const initialResponse = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: startMessages,
    tools,
});

const toolCalls = initialResponse.choices[0].message.tool_calls;

if (toolCalls?.length) {
    const toolOutputs = await toolkit.handleToolCalls(toolCalls, { apps: [App.PEXELS] });

    const followUp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            ...startMessages,
            initialResponse.choices[0].message,
            ...toolOutputs,
        ],
    });

    console.log(followUp.choices[0].message.content);
} else {
    console.log(initialResponse.choices[0].message.content);
}


