import type { StorageProvider } from "../../storage-providers";
import { ApiKeyService } from "./apiKeyService";

/*
    VityToolKitSDKContext class provides a global context for storing SDK configuration.
    This singleton class maintains essential SDK settings like user's privateKey or API keys.
    It is used to store the user's privateKey/API keys in a global context so that it can be accessed by other modules without having to pass the configuration around.

    Warning: Can cause problems if there are multiple instances of the SDK running in the same process.
*/
class VityToolKitSDKContext {
    static appPrivateKey?: string;
    static appPublicKey?: string;
    static userPrivateKey?: string;
    static userPublicKey?: string;
    static storageProvider?: StorageProvider;
    
    // API Key system
    static userApiKey?: string;
    static appApiKey?: string;
    static apiKeyService?: ApiKeyService;
    static apiBaseUrl?: string;
}

export default VityToolKitSDKContext;



