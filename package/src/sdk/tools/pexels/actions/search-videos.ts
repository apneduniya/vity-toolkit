import { z } from "zod";
import { PexelsTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makePexelsRequest } from "../common";

const pexelsSearchVideos = async (inputParams: {
  query: string;
  orientation?: "landscape" | "portrait" | "square";
  size?: "large" | "medium" | "small";
  locale?: string;
  page?: number;
  perPage?: number;
}): Promise<string> => {
  try {
    const tool = new PexelsTool();
    const apiKey = await tool.createClient();
    const data = await makePexelsRequest("GET", "/videos/search", {
      query: inputParams.query,
      orientation: inputParams.orientation,
      size: inputParams.size,
      locale: inputParams.locale,
      page: inputParams.page,
      per_page: inputParams.perPage,
    }, apiKey);
    return toolMessage({ success: true, data });
  } catch (error: any) {
    return toolMessage({ success: false, data: error.message });
  }
};

export const pexelsSearchVideosTool = createAction({
  name: "pexelsSearchVideos",
  description: "Search for stock videos by query from Pexels.",
  inputParams: z.object({
    query: z.string().describe("The search query for videos (e.g. 'timelapse', 'yoga', etc.)"),
    orientation: z.enum(["landscape", "portrait", "square"]).optional().describe("Video orientation"),
    size: z.enum(["large", "medium", "small"]).optional().describe("Minimum video size"),
    locale: z.string().optional().describe("Locale, e.g. 'en-US', 'fr-FR'"),
    page: z.number().optional().describe("Page number"),
    perPage: z.number().optional().describe("Videos per page (max 80)")
  }),
  execute: pexelsSearchVideos,
});
