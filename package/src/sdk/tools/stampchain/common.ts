import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const STAMPCHAIN_BASE_URL = "https://stampchain.io/api/v2";

export async function makeStampchainRequest(method: string, path: string, params?: any) {
    const url = `${STAMPCHAIN_BASE_URL}${path}`;
    const config: AxiosRequestConfig = {
        method,
        url,
    };

    if (method.toUpperCase() === "GET") {
        config.params = params || {};
    } else {
        config.data = params || {};
    }

    try {
        const res = await axios(config);
        return res.data;
    } catch (err: any) {
        const error = err as AxiosError<any>;
        if (error.response) {
            // Surface server error body and status
            const status = error.response.status;
            const data = error.response.data;
            throw new Error(`Stampchain API Error (${status}): ${typeof data === 'string' ? data : JSON.stringify(data)}`);
        } else if (error.request) {
            throw new Error(`Stampchain API Error: No response from server`);
        } else {
            throw new Error(`Stampchain API Error: ${error.message}`);
        }
    }
}


