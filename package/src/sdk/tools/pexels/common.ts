import axios from 'axios';

export async function makePexelsRequest(
  method: string,
  endpoint: string,
  data: any,
  apiKey: string
) {
  const baseUrl = 'https://api.pexels.com';
  const isVideo = endpoint.startsWith('/videos');
  // standardize for axios
  const url = `${baseUrl}${isVideo ? '' : '/v1'}${endpoint}`;

  try {
    const response = await axios({
      method,
      url,
      // for GET, axios expects query via params and body only for non-GET
      params: method.toUpperCase() === 'GET' ? data : undefined,
      data: method.toUpperCase() !== 'GET' ? data : undefined,
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'VityToolKit-Pexels-Client',
      },
    });
    return response.data;
  } catch (error: any) {
    const raw = error?.response?.data?.error ?? error?.response?.data ?? error?.message;
    const detail =
      typeof raw === 'string'
        ? raw
        : raw
        ? JSON.stringify(raw)
        : 'Unknown Pexels API error';

    throw new Error(`Pexels API Error: ${detail}`);
  }
}