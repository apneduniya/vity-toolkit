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

const tools = toolKit.getTools({ apps: [App.AGENTMAIL] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent using AgentMail MCP tools. Use the provided tools to list available AgentMail capabilities and execute them as requested.`],
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

// const response = await agentExecutor.invoke({ input: "Send an email to apneduniya.dontdisturb@gmail.com. Subject: 'Quick check-in from Vity Toolkit'. Body: 'Hi there, this is a quick test email sent via AgentMail through Vity Toolkit. If you received this, the integration works! Thanks.' If a send email tool is available, please send it now; otherwise, draft it and show me the exact steps you'd use to send" });

const response = await agentExecutor.invoke({ input: "List all AgentMail tools" });

console.log(response);


