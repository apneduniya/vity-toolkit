import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainGetMarketData = async (inputParams: {
    minHolderCount?: number;
    maxHolderCount?: number;
    minDistributionScore?: number;
    maxTopHolderPercentage?: number;
    minFloorPriceBTC?: number;
    maxFloorPriceBTC?: number;
    minVolume24h?: number;
    minPriceChange24h?: number;
    minDataQualityScore?: number;
    maxCacheAgeMinutes?: number;
    priceSource?: string;
    page?: number;
    pageSize?: number;
    sort?: "ASC" | "DESC";
}): Promise<string> => {
    try {
        const params: any = {
            minHolderCount: inputParams.minHolderCount,
            maxHolderCount: inputParams.maxHolderCount,
            minDistributionScore: inputParams.minDistributionScore,
            maxTopHolderPercentage: inputParams.maxTopHolderPercentage,
            minFloorPriceBTC: inputParams.minFloorPriceBTC,
            maxFloorPriceBTC: inputParams.maxFloorPriceBTC,
            minVolume24h: inputParams.minVolume24h,
            minPriceChange24h: inputParams.minPriceChange24h,
            minDataQualityScore: inputParams.minDataQualityScore,
            maxCacheAgeMinutes: inputParams.maxCacheAgeMinutes,
            priceSource: inputParams.priceSource,
            page: inputParams.page || 1,
            limit: inputParams.pageSize || 20,
            sort: inputParams.sort || "DESC",
        };
        Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);
        // Market data is included in /stamps response when using market data filters
        // Use /stamps endpoint with market data filter parameters
        const data = await makeStampchainRequest("GET", "/stamps", params);
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainGetMarketDataTool = createAction({
    name: "stampchainGetMarketData",
    description: "Retrieve stamps with market data filters. Market data is included in the response.",
    inputParams: z.object({
        minHolderCount: z.number().optional().describe("Minimum number of holders for the stamp"),
        maxHolderCount: z.number().optional().describe("Maximum number of holders for the stamp"),
        minDistributionScore: z.number().min(0).max(100).optional().describe("Minimum holder distribution score (0-100)"),
        maxTopHolderPercentage: z.number().min(0).max(100).optional().describe("Maximum percentage held by top holder (0-100)"),
        minFloorPriceBTC: z.number().optional().describe("Minimum floor price in BTC"),
        maxFloorPriceBTC: z.number().optional().describe("Maximum floor price in BTC"),
        minVolume24h: z.number().optional().describe("Minimum 24-hour trading volume in BTC"),
        minPriceChange24h: z.number().optional().describe("Minimum 24-hour price change percentage"),
        minDataQualityScore: z.number().min(0).max(10).optional().describe("Minimum data quality score (0-10)"),
        maxCacheAgeMinutes: z.number().optional().describe("Maximum age of cached market data in minutes"),
        priceSource: z.string().optional().describe("Filter by price data source (comma-separated for multiple)"),
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(20),
        sort: z.enum(["ASC", "DESC"]).optional().default("DESC"),
    }),
    execute: stampchainGetMarketData,
});


