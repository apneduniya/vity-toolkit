import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";

const weatherOptions = ["Sunny", "Partly cloudy", "Overcast", "Rainy", "Stormy", "Windy", "Snowy", "Humid", "Foggy"];

const pickRandom = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

const generateWeather = async (inputParams: { city: string }) => {
    try {
        const { city } = inputParams;

        const temperatureC = Number((Math.random() * 35 + 5).toFixed(1));
        const humidity = Number((Math.random() * 70 + 20).toFixed(0));
        const windKph = Number((Math.random() * 35 + 1).toFixed(1));
        const feelsLike = Number((temperatureC + (Math.random() * 4 - 2)).toFixed(1));

        return toolMessage({
            success: true,
            data: {
                city,
                weather: pickRandom(weatherOptions),
                temperature_c: temperatureC,
                feels_like_c: feelsLike,
                humidity_percent: humidity,
                wind_speed_kph: windKph,
                advisory: pickRandom([
                    "Great day for a walk!",
                    "Carry an umbrella just in case.",
                    "Perfect weather for a cozy book indoors.",
                    "Stay hydrated and wear sunscreen.",
                    "Maybe keep a light jacket handy.",
                ]),
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

export const fakeWeatherGenerateTool = createAction({
    name: "fakeWeatherGenerate",
    description: "Return a playful, fictional weather report for any city without calling external APIs.",
    inputParams: z.object({
        city: z.string().min(1, "City name is required").describe("Name of the city to generate weather for."),
    }),
    execute: generateWeather,
});


