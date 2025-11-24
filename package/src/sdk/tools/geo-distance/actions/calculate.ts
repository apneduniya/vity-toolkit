import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";

type Coordinate = { latitude: number; longitude: number };

const EARTH_RADIUS_KM = 6371;
const KM_TO_MILES = 0.621371;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const haversineDistance = (from: Coordinate, to: Coordinate) => {
    const deltaLat = toRadians(to.latitude - from.latitude);
    const deltaLon = toRadians(to.longitude - from.longitude);

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(toRadians(from.latitude)) *
            Math.cos(toRadians(to.latitude)) *
            Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
};

const calculateDistance = async (inputParams: {
    pointA: Coordinate;
    pointB: Coordinate;
    unit?: "km" | "mi";
}) => {
    try {
        const { pointA, pointB, unit = "km" } = inputParams;

        const distanceKm = haversineDistance(pointA, pointB);
        const distanceMi = distanceKm * KM_TO_MILES;

        return toolMessage({
            success: true,
            data: {
                pointA,
                pointB,
                distance_km: Number(distanceKm.toFixed(3)),
                distance_mi: Number(distanceMi.toFixed(3)),
                unit,
                distance: Number((unit === "km" ? distanceKm : distanceMi).toFixed(3)),
            },
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
};

export const geoDistanceCalculateTool = createAction({
    name: "geoDistanceCalculate",
    description: "Calculate great-circle distance between two coordinates using the Haversine formula.",
    inputParams: z.object({
        pointA: z.object({
            latitude: z.number().min(-90).max(90).describe("Latitude of the first point."),
            longitude: z.number().min(-180).max(180).describe("Longitude of the first point."),
        }),
        pointB: z.object({
            latitude: z.number().min(-90).max(90).describe("Latitude of the second point."),
            longitude: z.number().min(-180).max(180).describe("Longitude of the second point."),
        }),
        unit: z.enum(["km", "mi"]).default("km").describe("Unit for the `distance` field (km or mi)."),
    }),
    execute: calculateDistance,
});


