import { ChatOpenAI } from '@langchain/openai';
const model = new ChatOpenAI({ model: 'gpt-4o' });
console.log('bind' in model, typeof model.bind);
