import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";
import { AgentExecutor } from "langchain/agents";


const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit({
    userPrivateKey: process.env.SOLANA_PRIVATE_KEY,
    appPrivateKey: process.env.SOLANA_PRIVATE_KEY,
});

const tools = toolKit.getTools({ apps: [App.GITHUB] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent responsible for taking actions on GitHub on users' behalf. 
        You need to take action on GitHub using GitHub APIs. Use correct tools to run APIs from the given tool-set.`],
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

const response = await agentExecutor.invoke({ input: "Search for repositories related to 'machine learning python'" });

console.log(response);
