import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";

const dictionary: Record<string, Record<string, Record<string, string>>> = {
    en: {
        es: { hello: "hola", bye: "adiós", thanks: "gracias", yes: "sí", no: "no" },
        fr: { hello: "bonjour", bye: "au revoir", thanks: "merci", yes: "oui", no: "non" },
        de: { hello: "hallo", bye: "tschüss", thanks: "danke", yes: "ja", no: "nein" },
        hi: { hello: "namaste", bye: "alvida", thanks: "dhanyavaad", yes: "haan", no: "nahin" },
    },
    es: {
        en: { hola: "hello", adiós: "bye", gracias: "thanks", sí: "yes", no: "no" },
        fr: { hola: "bonjour", adiós: "au revoir", gracias: "merci", sí: "oui", no: "non" },
    },
    fr: {
        en: { bonjour: "hello", "au revoir": "bye", merci: "thanks", oui: "yes", non: "no" },
    },
    de: {
        en: { hallo: "hello", tschüss: "bye", danke: "thanks", ja: "yes", nein: "no" },
    },
    hi: {
        en: { namaste: "hello", alvida: "bye", dhanyavaad: "thanks", haan: "yes", nahin: "no" },
    },
};

type Lang = "en" | "es" | "fr" | "de" | "hi";

const translate = async (inputParams: { from: Lang, to: Lang, text: string }) => {
    try {
        const from = inputParams.from.toLowerCase() as Lang;
        const to = inputParams.to.toLowerCase() as Lang;
        const text = inputParams.text.trim().toLowerCase();

        if (from === to) {
            throw new Error("Source and target languages must be different.");
        }

        const translationMap = dictionary[from]?.[to];
        const translated = translationMap?.[text];

        if (!translated) {
            throw new Error(`No rule-based translation found for "${text}" from ${from} to ${to}.`);
        }

        return toolMessage({
            success: true,
            data: {
                from,
                to,
                text,
                translated,
            },
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
};

export const languageTranslatorTool = createAction({
    name: "languageTranslator",
    description: "Translate common phrases between a small set of languages using a rule-based dictionary (no AI).",
    inputParams: z.object({
        from: z.enum(["en", "es", "fr", "de", "hi"]).describe("Source language code."),
        to: z.enum(["en", "es", "fr", "de", "hi"]).describe("Target language code."),
        text: z.string().min(1, "Provide a phrase to translate").describe("Phrase to translate (e.g., hello, thanks)."),
    }),
    execute: translate,
});


