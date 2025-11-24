import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.GEO_DISTANCE] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You can compute real-world distances by calling the Geo Distance tool."],
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

const response = await agentExecutor.invoke({
    input: "How far is it between San Francisco (37.7749, -122.4194) and Los Angeles (34.0522, -118.2437) in kilometers?",
});

console.log(response.output);


