import { z } from "zod";
import { PexelsTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makePexelsRequest } from "../common";

const pexelsGetCuratedPhotos = async (inputParams: { page?: number; perPage?: number }): Promise<string> => {
  try {
    const tool = new PexelsTool();
    const apiKey = await tool.createClient();
    const data = await makePexelsRequest("GET", "/curated", {
      page: inputParams.page,
      per_page: inputParams.perPage,
    }, apiKey);
    return toolMessage({ success: true, data });
  } catch (error: any) {
    return toolMessage({ success: false, data: error.message });
  }
};

export const pexelsGetCuratedPhotosTool = createAction({
  name: "pexelsGetCuratedPhotos",
  description: "Get curated featured photos from Pexels.",
  inputParams: z.object({
    page: z.number().optional().describe("Page number"),
    perPage: z.number().optional().describe("Photos per page (max 80)")
  }),
  execute: pexelsGetCuratedPhotos,
});
