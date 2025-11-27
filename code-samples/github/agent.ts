import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { App, LangchainToolkit } from "vity-toolkit";


const P = (globalThis as any).process;

const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    maxRetries: 2,
});

const toolkit = new LangchainToolkit({
    userPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
    appPrivateKey: P?.env?.SOLANA_PRIVATE_KEY,
});

const tools = toolkit.getTools({ apps: [App.GITHUB] });
const toolNode = new ToolNode(tools);
const boundModel = model.bindTools(tools);

function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
    const lastMessage = messages[messages.length - 1] as AIMessage;
    if (lastMessage?.tool_calls?.length) {
        return "tools";
    }
    return "__end__";
}

async function callModel(state: typeof MessagesAnnotation.State) {
    console.log("🔄 Calling GitHub agent model...");
    const response = await boundModel.invoke(state.messages);
    return { messages: [response] };
}

const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue);

const graph = workflow.compile();

const initialState = await graph.invoke({
    messages: [
        new HumanMessage(
            "Search GitHub for 'machine learning python' repositories and summarize two interesting ones with stars + description."
        ),
    ],
});

console.log("✅ Initial response:");
console.log(initialState.messages[initialState.messages.length - 1]);

const followUp = await graph.invoke({
    messages: [
        ...initialState.messages,
        new HumanMessage("Now check if any of them has open issues labeled 'help wanted'."),
    ],
});

console.log("✅ Follow-up response:");
console.log(followUp.messages[followUp.messages.length - 1].content);