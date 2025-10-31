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

const PARENT_PAGE_ID = P?.env?.NOTION_PARENT_PAGE_ID || "your-parent-page-id";

const tools = toolKit.getTools({ apps: [App.NOTION] });
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are an AI agent responsible for taking actions on Notion on users' behalf. 
        You need to take action on Notion using Notion APIs. Use correct tools from the given tool-set.`],
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

const response = await agentExecutor.invoke({ input: `Create a new page called 'Product Roadmap' under page ID: ${PARENT_PAGE_ID}. On that page:

- Add a section titled 'Weekly roadmap summary'.
- Add a short bullet list of this week's key tasks (use simple placeholders if needed: title + due date).
- Add a brief paragraph with priorities for the week in plain language.

Keep it short and clear. No need to search my workspace or use any existing pages.
Also give me the link to open and view the page in Notion.` });

console.log(response.output);


