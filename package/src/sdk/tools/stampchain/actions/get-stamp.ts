import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainGetStamp = async (inputParams: { stampId: number | string, includeBase64?: boolean }): Promise<string> => {
    try {
        const id = typeof inputParams.stampId === "string" ? Number(inputParams.stampId) : inputParams.stampId;
        const data = await makeStampchainRequest("GET", `/stamps/${id}`);
        if (inputParams.includeBase64 && data?.data?.stamp?.stampBase64) {
            // already included by API when present
        }
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainGetStampTool = createAction({
    name: "stampchainGetStamp",
    description: "Retrieve detailed information about a specific Bitcoin Stamp by its ID.",
    inputParams: z.object({
        stampId: z.union([z.number(), z.string()]).describe("Stamp ID to fetch"),
        includeBase64: z.boolean().optional().describe("Whether to include base64 image data if available")
    }),
    execute: stampchainGetStamp,
});


