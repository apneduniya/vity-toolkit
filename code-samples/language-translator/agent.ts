import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { App, LangchainToolkit } from "vity-toolkit";

const model = new ChatOpenAI({ model: "gpt-4o" });
const toolKit = new LangchainToolkit();

const tools = toolKit.getTools({ apps: [App.LANGUAGE_TRANSLATOR] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Translate short phrases using the rule-based Language Translator tool. Avoid inventing translations yourself."],
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

const response = await agentExecutor.invoke({ input: "Translate 'hello' from English to Spanish." });

console.log(response.output);


