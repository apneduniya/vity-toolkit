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

const tools = toolKit.getTools({ apps: [App.TAVILY] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent that uses Tavily to search, extract, crawl and map websites on users' behalf.
                You need to take action on Tavily using Tavily APIs. Use correct tools to run APIs from the given tool-set.`],
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

const response = await agentExecutor.invoke({ input: "Use Tavily to find the latest Solana core updates (last 6 months, advanced). Prefer docs.solana.com, solana.com, solana.com/news, solana.org, foundation.solana.org. Summarize key changes with links and dates." });

console.log(response);


