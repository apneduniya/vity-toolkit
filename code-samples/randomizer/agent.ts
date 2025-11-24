import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.RANDOMIZER] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Use the Randomizer tool for coin flips, dice rolls, yes/no choices, or selecting from a list."],
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
    input: "Roll a virtual dice to help me decide which board game to start with.",
});

console.log(response.output);


