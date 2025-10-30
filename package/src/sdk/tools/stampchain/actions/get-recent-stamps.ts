import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainGetRecentStamps = async (inputParams: { limit?: number; page?: number; sort?: "ASC" | "DESC" }): Promise<string> => {
    try {
        // Use v2.3 API parameters: limit (default 20), page (default 1), sort (default DESC)
        const params = {
            limit: inputParams.limit || 20,
            page: inputParams.page || 1,
            sort: inputParams.sort || "DESC",
        };
        const data = await makeStampchainRequest("GET", "/stamps", params);
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainGetRecentStampsTool = createAction({
    name: "stampchainGetRecentStamps",
    description: "Retrieve the most recently created Bitcoin Stamps (paginated and sorted).",
    inputParams: z.object({
        limit: z.number().optional().default(20).describe("Max number of recent stamps to fetch (limit parm, default 20)"),
        page: z.number().optional().default(1).describe("Page of results to fetch (default 1)"),
        sort: z.enum(["ASC", "DESC"]).optional().default("DESC").describe("Sort order for stamps, DESC (most recent first) or ASC"),
    }),
    execute: stampchainGetRecentStamps,
});


