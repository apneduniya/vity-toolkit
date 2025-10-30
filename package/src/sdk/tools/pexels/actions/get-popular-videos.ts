import { z } from "zod";
import { PexelsTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makePexelsRequest } from "../common";


const pexelsGetPopularVideos = async (inputParams: { minWidth?: number; minHeight?: number; minDuration?: number; maxDuration?: number; page?: number; perPage?: number; }): Promise<string> => {
  try {
    const tool = new PexelsTool();
    const apiKey = await tool.createClient();
    const data = await makePexelsRequest("GET", "/videos/popular", {
      min_width: inputParams.minWidth,
      min_height: inputParams.minHeight,
      min_duration: inputParams.minDuration,
      max_duration: inputParams.maxDuration,
      page: inputParams.page,
      per_page: inputParams.perPage,
    }, apiKey);
    return toolMessage({ success: true, data });
  } catch (error: any) {
    return toolMessage({ success: false, data: error.message });
  }
};

export const pexelsGetPopularVideosTool = createAction({
  name: "pexelsGetPopularVideos",
  description: "Get popular videos from Pexels.",
  inputParams: z.object({
    minWidth: z.number().optional().describe("Minimum video width in px"),
    minHeight: z.number().optional().describe("Minimum video height in px"),
    minDuration: z.number().optional().describe("Min duration (in seconds)"),
    maxDuration: z.number().optional().describe("Max duration (in seconds)"),
    page: z.number().optional().describe("Page number"),
    perPage: z.number().optional().describe("Videos per page (max 80)")
  }),
  execute: pexelsGetPopularVideos,
});
