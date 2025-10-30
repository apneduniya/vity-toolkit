import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makeStampchainRequest } from "../common";

const stampchainSearchStamps = async (inputParams: {
    query?: string;
    creator?: string;
    collectionId?: string;
    cpid?: string;
    isBtcStamp?: boolean;
    isCursed?: boolean;
    sortOrder?: "ASC" | "DESC";
    page?: number;
    pageSize?: number;
}): Promise<string> => {
    try {
        const params: any = {
            query: inputParams.query,
            creator: inputParams.creator,
            collection_id: inputParams.collectionId,
            cpid: inputParams.cpid,
            is_btc_stamp: inputParams.isBtcStamp,
            is_cursed: inputParams.isCursed,
            sort_order: inputParams.sortOrder || "DESC",
            page: inputParams.page || 1,
            page_size: inputParams.pageSize || 20,
        };

        Object.keys(params).forEach((k) => params[k] === undefined && delete params[k]);

        const data = await makeStampchainRequest("GET", "/stamps", params);
        return toolMessage({ success: true, data });
    } catch (error: any) {
        return toolMessage({ success: false, data: error.message });
    }
}

export const stampchainSearchStampsTool = createAction({
    name: "stampchainSearchStamps",
    description: "Search Bitcoin Stamps with various filters and pagination.",
    inputParams: z.object({
        query: z.string().optional(),
        creator: z.string().optional(),
        collectionId: z.string().optional(),
        cpid: z.string().optional(),
        isBtcStamp: z.boolean().optional(),
        isCursed: z.boolean().optional(),
        sortOrder: z.enum(["ASC", "DESC"]).optional().default("DESC"),
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(20),
    }),
    execute: stampchainSearchStamps,
});


