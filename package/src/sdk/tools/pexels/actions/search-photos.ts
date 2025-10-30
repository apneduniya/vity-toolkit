import { z } from "zod";
import { PexelsTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makePexelsRequest } from "../common";

const pexelsSearchPhotos = async (inputParams: {
  query: string;
  orientation?: "landscape" | "portrait" | "square";
  size?: "large" | "medium" | "small";
  color?: string;
  locale?: string;
  page?: number;
  perPage?: number;
}): Promise<string> => {
  try {
    const tool = new PexelsTool();
    const apiKey = await tool.createClient();
    const data = await makePexelsRequest("GET", "/search", {
      query: inputParams.query,
      orientation: inputParams.orientation,
      size: inputParams.size,
      color: inputParams.color,
      locale: inputParams.locale,
      page: inputParams.page,
      per_page: inputParams.perPage,
    }, apiKey);
    return toolMessage({ success: true, data });
  } catch (error: any) {
    return toolMessage({ success: false, data: error.message });
  }
};

export const pexelsSearchPhotosTool = createAction({
  name: "pexelsSearchPhotos",
  description: "Search for stock photos by query from Pexels.",
  inputParams: z.object({
    query: z.string().describe("The search query for images (e.g. 'nature', 'office desk', etc.)"),
    orientation: z.enum(["landscape", "portrait", "square"]).optional().describe("Photo orientation"),
    size: z.enum(["large", "medium", "small"]).optional().describe("Minimum photo size"),
    color: z.string().optional().describe("Desired photo color (e.g. 'red', '#ff0000')"),
    locale: z.string().optional().describe("Locale, e.g. 'en-US', 'es-ES'"),
    page: z.number().optional().describe("Page number"),
    perPage: z.number().optional().describe("Photos per page (max 80)")
  }),
  execute: pexelsSearchPhotos,
});
