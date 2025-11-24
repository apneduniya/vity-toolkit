import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.BASIC_MATH] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a precise calculator that can perform simple math using the Basic Math tool."],
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

const response = await agentExecutor.invoke({ input: "Multiply 4 and 8, then tell me the result." });

console.log(response.output);


