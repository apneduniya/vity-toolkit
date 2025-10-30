import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainGetStampMarketData = async (inputParams: { stampId: number | string }): Promise<string> => {
    try {
        const id = typeof inputParams.stampId === "string" ? Number(inputParams.stampId) : inputParams.stampId;
        // Market data is included in the stamp response via /stamps/{id}
        // The response includes marketData object when available
        const data = await makeStampchainRequest("GET", `/stamps/${id}`);
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainGetStampMarketDataTool = createAction({
    name: "stampchainGetStampMarketData",
    description: "Retrieve market data details for a specific Bitcoin Stamp.",
    inputParams: z.object({
        stampId: z.union([z.number(), z.string()]).describe("Stamp ID"),
    }),
    execute: stampchainGetStampMarketData,
});


