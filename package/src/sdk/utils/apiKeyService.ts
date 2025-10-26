import axios from 'axios';
import logger from './logger';

/**
 * Service for managing API key authentication and private key retrieval
 */
export class ApiKeyService {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private privateKeyCache: Map<string, string> = new Map();

    constructor(apiKey: string, baseUrl?: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl || process.env.VITY_API_BASE_URL || 'http://localhost:3000';
    }

    /**
     * Fetch private key from the API using the provided API key
     * @param keyType - Type of key to fetch ('user' or 'app')
     * @returns Promise<string> - The private key
     */
    async getPrivateKey(keyType: 'user' | 'app' = 'user'): Promise<string> {
        const cacheKey = `${keyType}_${this.apiKey}`;
        
        // Check cache first
        if (this.privateKeyCache.has(cacheKey)) {
            logger.debug(`Retrieved ${keyType} private key from cache`);
            return this.privateKeyCache.get(cacheKey)!;
        }

        try {
            logger.info(`Fetching ${keyType} private key from API`);
            logger.debug(`API URL: ${this.baseUrl}/api/wallet/private-key`);
            logger.debug(`API Key: ${this.apiKey.substring(0, 10)}...`);
            
            const response = await axios.post(`${this.baseUrl}/api/wallet/private-key`, {
                apiKey: this.apiKey
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 second timeout
            });

            if (response.data.success && response.data.data?.privateKey) {
                const privateKey = response.data.data.privateKey;
                
                // Cache the private key
                this.privateKeyCache.set(cacheKey, privateKey);
                
                logger.info(`Successfully retrieved ${keyType} private key from API`);
                return privateKey;
            } else {
                throw new Error(`API returned unsuccessful response: ${JSON.stringify(response.data)}`);
            }
        } catch (error: any) {
            logger.error(`Failed to fetch ${keyType} private key from API: ${error.message}`);
            
            if (error.response) {
                // Server responded with error status
                throw new Error(`API request failed with status ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`);
            } else if (error.request) {
                // Request was made but no response received
                throw new Error(`API request failed: No response from server. Please check if the API server is running at ${this.baseUrl}`);
            } else {
                // Something else happened
                throw new Error(`API request failed: ${error.message}`);
            }
        }
    }

    /**
     * Clear the private key cache
     */
    clearCache(): void {
        this.privateKeyCache.clear();
        logger.debug('Private key cache cleared');
    }

    /**
     * Get cached private key without making API request
     * @param keyType - Type of key to fetch ('user' or 'app')
     * @returns string | undefined - The cached private key or undefined if not cached
     */
    getCachedPrivateKey(keyType: 'user' | 'app' = 'user'): string | undefined {
        const cacheKey = `${keyType}_${this.apiKey}`;
        return this.privateKeyCache.get(cacheKey);
    }

    /**
     * Check if private key is cached
     * @param keyType - Type of key to check ('user' or 'app')
     * @returns boolean - True if cached, false otherwise
     */
    isPrivateKeyCached(keyType: 'user' | 'app' = 'user'): boolean {
        const cacheKey = `${keyType}_${this.apiKey}`;
        return this.privateKeyCache.has(cacheKey);
    }
}
