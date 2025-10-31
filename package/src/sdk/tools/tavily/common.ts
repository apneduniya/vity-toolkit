import axios from 'axios';


type TavilyEndpoint = 'search' | 'extract' | 'crawl' | 'map';

const BASE_URLS: Record<TavilyEndpoint, string> = {
    search: 'https://api.tavily.com/search',
    extract: 'https://api.tavily.com/extract',
    crawl: 'https://api.tavily.com/crawl',
    map: 'https://api.tavily.com/map',
}

export async function makeTavilyRequest(endpoint: TavilyEndpoint, data: any, apiKey: string) {
    try {
        const response = await axios({
            method: 'POST',
            url: BASE_URLS[endpoint],
            data: {
                ...data,
                api_key: apiKey,
            },
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'X-Client-Source': 'VityToolKit',
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error('Invalid API key');
        } else if (error.response?.status === 429) {
            throw new Error('Usage limit exceeded');
        } else if (error.response?.status === 400) {
            // Extract detailed error message from 400 responses
            const errorMsg = error.response?.data?.error || error.response?.data?.message || error.response?.data?.detail || 'Invalid request parameters';
            throw new Error(`Tavily API Error (400): ${errorMsg}`);
        }
        throw new Error(`Tavily API Error: ${error.response?.data?.message || error.response?.data?.error || error.message}`);
    }
}


