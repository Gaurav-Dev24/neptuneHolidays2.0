"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const airports_js_1 = require("../data/airports.js");
const AppError_js_1 = require("../errors/AppError.js");
const airport_schema_js_1 = require("../schemas/airport.schema.js");
const router = (0, express_1.Router)();
router.post("/departures", (req, res, next) => {
    try {
        const parsed = airport_schema_js_1.departureAirportSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new AppError_js_1.AppError("Invalid departure airport search request", 400, "INVALID_REQUEST");
        }
        const { keyword } = parsed.data;
        const normalizedKeyword = keyword.toLowerCase();
        const result = airports_js_1.airports.filter((airport) => {
            if (!normalizedKeyword) {
                return true;
            }
            return (airport.name.toLowerCase().includes(normalizedKeyword) ||
                airport.code.toLowerCase().includes(normalizedKeyword) ||
                airport.city.toLowerCase().includes(normalizedKeyword));
        });
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
router.post("/arrivals", (req, res, next) => {
    try {
        const parsed = airport_schema_js_1.arrivalAirportSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new AppError_js_1.AppError("Departure airport is required", 400, "INVALID_DEPARTURE_AIRPORT");
        }
        const { departureAirportId } = parsed.data;
        const departureAirport = airports_js_1.airports.find((airport) => airport.id === departureAirportId);
        if (!departureAirport) {
            throw new AppError_js_1.AppError("Departure airport not found", 404, "AIRPORT_NOT_FOUND");
        }
        const result = airports_js_1.airports.filter((airport) => airport.id !== departureAirportId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
