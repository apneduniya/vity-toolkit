import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { Action, LangchainToolkit } from "vity-toolkit";

const toolKit = new LangchainToolkit({
  userApiKey: "k2Ghzsw69OQU1Dgd3ygCtjmgc9d/Axkw42Nl5ue9bmwYgh3TkGo8Ogu1ae8o5v99Zp0YDLMkm1Ni5nKec2lDDw==",
  apiBaseUrl: "http://localhost:3000",
});

const tools = toolKit.getTools({
  actions: [
    Action.SOLANA_WALLET_GENERATE_KEYPAIR,
    Action.SOLANA_WALLET_GET_BALANCE,
    Action.SOLANA_WALLET_GET_MY_PUBLIC_KEY,
  ],
});

const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
}).bindTools(tools);

function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const last = messages[messages.length - 1] as AIMessage;
  return last?.tool_calls?.length ? "tools" : "__end__";
}

async function callModel(state: typeof MessagesAnnotation.State) {
  const reply = await model.invoke(state.messages);
  return { messages: [reply] };
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue);

const app = workflow.compile();

const result = await app.invoke({
  messages: [
    new HumanMessage("First tell me my public key, then check the balance of that account."),
  ],
});

console.log(result.messages[result.messages.length - 1].content);