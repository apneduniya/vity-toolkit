import { z } from "zod";
import { PexelsTool } from "..";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";
import { makePexelsRequest } from "../common";

const pexelsGetPhoto = async (inputParams: { id: number }): Promise<string> => {
  try {
    const tool = new PexelsTool();
    const apiKey = await tool.createClient();
    const data = await makePexelsRequest("GET", `/photos/${inputParams.id}`, undefined, apiKey);
    return toolMessage({ success: true, data });
  } catch (error: any) {
    return toolMessage({ success: false, data: error.message });
  }
};

export const pexelsGetPhotoTool = createAction({
  name: "pexelsGetPhoto",
  description: "Get a photo by its Pexels ID.",
  inputParams: z.object({ id: z.number().describe("Photo ID") }),
  execute: pexelsGetPhoto,
});
