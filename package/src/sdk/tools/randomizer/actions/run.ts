import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";

type RandomizerInput = {
    mode: "coin_flip" | "dice" | "yes_no" | "pick";
    diceSides?: number;
    options?: string[];
};

const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1;

const randomizerRun = async (inputParams: RandomizerInput) => {
    try {
        const { mode, diceSides = 6, options } = inputParams;

        let result: string | number;

        switch (mode) {
            case "coin_flip":
                result = Math.random() < 0.5 ? "heads" : "tails";
                break;
            case "dice":
                if (diceSides < 2) {
                    throw new Error("diceSides must be at least 2.");
                }
                result = rollDice(Math.floor(diceSides));
                break;
            case "yes_no":
                result = Math.random() < 0.5 ? "yes" : "no";
                break;
            case "pick":
                if (!options || options.length === 0) {
                    throw new Error("Provide a non-empty list of options to pick from.");
                }
                result = options[Math.floor(Math.random() * options.length)];
                break;
            default:
                throw new Error(`Unsupported mode: ${mode}`);
        }

        return toolMessage({
            success: true,
            data: {
                mode,
                result,
                diceSides: mode === "dice" ? diceSides : undefined,
                options: mode === "pick" ? options : undefined,
                generated_at: new Date().toISOString(),
            },
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
};

export const randomizerRunTool = createAction({
    name: "randomizerRun",
    description: "Generate playful randomness via coin flips, dice rolls, yes/no decisions, or picking from a custom list.",
    inputParams: z.object({
        mode: z.enum(["coin_flip", "dice", "yes_no", "pick"]).describe("Randomizer mode to execute."),
        diceSides: z.number().int().min(2).optional().describe("Number of sides for dice mode. Defaults to 6."),
        options: z.array(z.string()).optional().describe("List of choices for pick mode."),
    }),
    execute: randomizerRun,
});


