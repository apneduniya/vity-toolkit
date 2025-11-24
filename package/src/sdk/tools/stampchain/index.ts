import { stampchainGetStampTool } from "./actions/get-stamp";
import { stampchainSearchStampsTool } from "./actions/search-stamps";
import { stampchainGetRecentStampsTool } from "./actions/get-recent-stamps";
import { stampchainGetRecentSalesTool } from "./actions/get-recent-sales";
import { stampchainGetMarketDataTool } from "./actions/get-market-data";
import { stampchainGetStampMarketDataTool } from "./actions/get-stamp-market-data";

export class StampchainTool {
    getTools() {
        return [
            stampchainGetStampTool,
        stampchainSearchStampsTool,
            stampchainGetRecentStampsTool,
            stampchainGetRecentSalesTool,
            stampchainGetMarketDataTool,
            stampchainGetStampMarketDataTool,
        ];
    }
}


