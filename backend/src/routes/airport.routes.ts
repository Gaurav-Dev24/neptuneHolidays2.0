import { Router } from "express";
import { airports } from "../data/airports.js";
import { AppError } from "../errors/AppError.js";
import {
    arrivalAirportSchema,
    departureAirportSchema,
} from "../schemas/airport.schema.js";

const router = Router();

router.post("/departures", (req, res, next) => {
    try {
        const parsed = departureAirportSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError(
                "Invalid departure airport search request",
                400,
                "INVALID_REQUEST"
            );
        }

        const { keyword } = parsed.data;

        const normalizedKeyword = keyword.toLowerCase();

        const result = airports.filter((airport) => {
            if (!normalizedKeyword) {
                return true;
            }

            return (
                airport.name.toLowerCase().includes(normalizedKeyword) ||
                airport.code.toLowerCase().includes(normalizedKeyword) ||
                airport.city.toLowerCase().includes(normalizedKeyword)
            );
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/arrivals", (req, res, next) => {
    try {
        const parsed = arrivalAirportSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError(
                "Departure airport is required",
                400,
                "INVALID_DEPARTURE_AIRPORT"
            );
        }

        const { departureAirportId } = parsed.data;

        const departureAirport = airports.find(
            (airport) => airport.id === departureAirportId
        );

        if (!departureAirport) {
            throw new AppError(
                "Departure airport not found",
                404,
                "AIRPORT_NOT_FOUND"
            );
        }

        const result = airports.filter(
            (airport) => airport.id !== departureAirportId
        );

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
});

export default router;