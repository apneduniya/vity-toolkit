import VityToolKitSDKContext from "../utils/vityToolKitContext";
import { getPublicKey } from "./getPublicKey";
import logger from "../utils/logger";

/**
 * Get private key either from direct input or by fetching from API using API key
 * @param keyType - Type of key to get ('user' or 'app')
 * @param directPrivateKey - Direct private key if provided
 * @param apiKey - API key if using API system
 * @returns Promise<{ privateKey: string; publicKey: string }> - The private and public keys
 */
export async function getPrivateKey(
    keyType: 'user' | 'app',
    directPrivateKey?: string,
    apiKey?: string
): Promise<{ privateKey: string; publicKey: string }> {
    // If direct private key is provided, use it
    if (directPrivateKey) {
        logger.debug(`Using direct ${keyType} private key`);
        const publicKey = getPublicKey(directPrivateKey);
        return { privateKey: directPrivateKey, publicKey };
    }

    // If API key is provided, use API service
    if (apiKey) {
        logger.debug(`Using API key to fetch ${keyType} private key`);
        
        // Initialize API service if not already done or if API key changed
        if (!VityToolKitSDKContext.apiKeyService || 
            (keyType === 'user' ? VityToolKitSDKContext.userApiKey : VityToolKitSDKContext.appApiKey) !== apiKey) {
            const { ApiKeyService } = await import("../utils/apiKeyService");
            VityToolKitSDKContext.apiKeyService = new ApiKeyService(apiKey, VityToolKitSDKContext.apiBaseUrl);
        }

        const privateKey = await VityToolKitSDKContext.apiKeyService.getPrivateKey(keyType);
        const publicKey = getPublicKey(privateKey);
        return { privateKey, publicKey };
    }

    // Check if we have cached private key from context
    const contextPrivateKey = keyType === 'user' ? VityToolKitSDKContext.userPrivateKey : VityToolKitSDKContext.appPrivateKey;
    if (contextPrivateKey) {
        logger.debug(`Using cached ${keyType} private key from context`);
        const publicKey = keyType === 'user' ? VityToolKitSDKContext.userPublicKey : VityToolKitSDKContext.appPublicKey;
        if (publicKey) {
            return { privateKey: contextPrivateKey, publicKey };
        }
    }

    // Check if we have API key in context
    const contextApiKey = keyType === 'user' ? VityToolKitSDKContext.userApiKey : VityToolKitSDKContext.appApiKey;
    if (contextApiKey) {
        logger.debug(`Using context API key to fetch ${keyType} private key`);
        
        // Initialize API service if not already done
        if (!VityToolKitSDKContext.apiKeyService) {
            const { ApiKeyService } = await import("../utils/apiKeyService");
            VityToolKitSDKContext.apiKeyService = new ApiKeyService(contextApiKey, VityToolKitSDKContext.apiBaseUrl);
        }
        
        const privateKey = await VityToolKitSDKContext.apiKeyService.getPrivateKey(keyType);
        const publicKey = getPublicKey(privateKey);
        return { privateKey, publicKey };
    }

    throw new Error(`No ${keyType} private key or API key provided. Please provide either a direct private key or an API key.`);
}

/**
 * Get private key from context (for internal use)
 * @param keyType - Type of key to get ('user' or 'app')
 * @returns Promise<{ privateKey: string; publicKey: string }> - The private and public keys
 */
export async function getPrivateKeyFromContext(keyType: 'user' | 'app'): Promise<{ privateKey: string; publicKey: string }> {
    logger.debug(`Getting ${keyType} private key from context`);
    logger.debug(`Context userApiKey: ${VityToolKitSDKContext.userApiKey ? 'present' : 'missing'}`);
    logger.debug(`Context appApiKey: ${VityToolKitSDKContext.appApiKey ? 'present' : 'missing'}`);
    logger.debug(`Context userPrivateKey: ${VityToolKitSDKContext.userPrivateKey ? 'present' : 'missing'}`);
    logger.debug(`Context appPrivateKey: ${VityToolKitSDKContext.appPrivateKey ? 'present' : 'missing'}`);
    
    const contextPrivateKey = keyType === 'user' ? VityToolKitSDKContext.userPrivateKey : VityToolKitSDKContext.appPrivateKey;
    const contextPublicKey = keyType === 'user' ? VityToolKitSDKContext.userPublicKey : VityToolKitSDKContext.appPublicKey;
    
    if (contextPrivateKey && contextPublicKey) {
        logger.debug(`Using cached ${keyType} private key from context`);
        return { privateKey: contextPrivateKey, publicKey: contextPublicKey };
    }

    // Try to get from API if available
    const contextApiKey = keyType === 'user' ? VityToolKitSDKContext.userApiKey : VityToolKitSDKContext.appApiKey;
    if (contextApiKey) {
        logger.debug(`Using context API key to fetch ${keyType} private key from getPrivateKeyFromContext`);
        logger.debug(`API Base URL: ${VityToolKitSDKContext.apiBaseUrl}`);
        
        // Initialize API service if not already done
        if (!VityToolKitSDKContext.apiKeyService) {
            const { ApiKeyService } = await import("../utils/apiKeyService");
            VityToolKitSDKContext.apiKeyService = new ApiKeyService(contextApiKey, VityToolKitSDKContext.apiBaseUrl);
            logger.debug(`API service initialized`);
        }
        
        const privateKey = await VityToolKitSDKContext.apiKeyService.getPrivateKey(keyType);
        const publicKey = getPublicKey(privateKey);
        return { privateKey, publicKey };
    }

    throw new Error(`No ${keyType} private key found in context. Please initialize the toolkit with proper credentials.`);
}
