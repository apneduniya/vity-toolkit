import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.FAKE_WEATHER] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Generate playful weather stories using the Fake Weather tool."],
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

const response = await agentExecutor.invoke({ input: "What's the whimsical forecast for Paris today?" });

console.log(response.output);


