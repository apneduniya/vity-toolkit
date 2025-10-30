import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";
import { AgentExecutor } from "langchain/agents";


const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.STAMPCHAIN] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent that explores Bitcoin Stamps and SRC-20 data using Stampchain APIs. Use the provided tools for all data access.`],
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

const response = await agentExecutor.invoke({ input: "Find recent stamp sales and list the 5 most interesting ones with IDs and prices" });

console.log(response);


