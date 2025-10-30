import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainGetRecentSales = async (inputParams: {
    dayRange?: number;
    fullDetails?: boolean;
    page?: number;
    pageSize?: number;
}): Promise<string> => {
    try {
        const params: any = {
            dayRange: inputParams.dayRange || 7,
            fullDetails: inputParams.fullDetails || false,
            page: inputParams.page || 1,
            limit: inputParams.pageSize || 20,
        };
        // Note: stamp_id filter not supported by /stamps/recent-sales endpoint
        // Note: sort_order not supported - results are sorted by timestamp
        Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);
        const data = await makeStampchainRequest("GET", "/stamps/recent-sales", params);
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainGetRecentSalesTool = createAction({
    name: "stampchainGetRecentSales",
    description: "Retrieve recent stamp sales with optional filtering and pagination.",
    inputParams: z.object({
        dayRange: z.number().min(1).max(30).optional().default(7).describe("Number of days to look back for sales (default 7, max 30)"),
        fullDetails: z.boolean().optional().default(false).describe("Include full transaction details in response"),
        page: z.number().optional().default(1).describe("Page number"),
        pageSize: z.number().optional().default(20).describe("Number of items per page (limit)"),
    }),
    execute: stampchainGetRecentSales,
});


