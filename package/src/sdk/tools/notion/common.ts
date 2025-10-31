import axios, { type Method } from 'axios';


export async function makeNotionRequest(method: Method, urlPath: string, data: any, apiKey: string, notionVersion?: string) {
    try {
        const response = await axios({
            method,
            url: urlPath,
            data,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Notion-Version': notionVersion || '2022-06-28',
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(`Notion API Error: ${error.response?.data?.message || error.message}`);
    }
}


