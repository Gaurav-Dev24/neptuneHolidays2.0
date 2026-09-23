import { Router } from "express";
import { airports } from "../data/airports.js";
import { flights } from "../data/flights.js";
import { AppError } from "../errors/AppError.js";
import {
    arrivalAirportSchema,
    departureAirportSchema,
} from "../schemas/airport.schema.js";
import { flightSearchSchema } from "../schemas/flight.schema.js";

const router = Router();

// departure endpoint
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

// arrival endpoint
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

// search flights endpoint
router.post("/search-flights", (req, res, next) => {
    try {
        const parsed = flightSearchSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError(
                "Invalid flight search request",
                400,
                "INVALID_FLIGHT_SEARCH_REQUEST"
            );
        }

        const {
            departureAirportId,
            arrivalAirportId,
            departureDate,
            tripType,
            directFlightsOnly,
            filters,
        } = parsed.data;

        const departureAirport = airports.find(
            (airport) => airport.id === departureAirportId
        );

        if (!departureAirport) {
            throw new AppError(
                "Departure airport not found",
                404,
                "DEPARTURE_AIRPORT_NOT_FOUND"
            );
        }

        const arrivalAirport = airports.find(
            (airport) => airport.id === arrivalAirportId
        );

        if (!arrivalAirport) {
            throw new AppError(
                "Arrival airport not found",
                404,
                "ARRIVAL_AIRPORT_NOT_FOUND"
            );
        }

        if (departureAirportId === arrivalAirportId) {
            throw new AppError(
                "Departure and arrival airports cannot be the same",
                400,
                "SAME_DEPARTURE_ARRIVAL_AIRPORT"
            );
        }

        // Base result for the selected route and date.
        const baseResults = flights.filter((flight) => {
            return (
                flight.departure.airportId === departureAirportId &&
                flight.arrival.airportId === arrivalAirportId &&
                flight.departure.dateTime.startsWith(departureDate)
            );
        });

        // Facets are calculated before filters so the UI
        // can continue to display all available filter options.
        const airlineMap = new Map<
            string,
            { code: string; name: string }
        >();

        const stopsSet = new Set<string>();

        baseResults.forEach((flight) => {
            airlineMap.set(
                flight.airline.code,
                flight.airline
            );

            const stopLabel =
                flight.stops === 0
                    ? "Non-Stop"
                    : flight.stops === 1
                        ? "One Stop"
                        : `${flight.stops} Stops`;

            stopsSet.add(stopLabel);
        });

        const facets = {
            airlines: Array.from(airlineMap.values()),
            stops: Array.from(stopsSet),
        };

        let result = [...baseResults];

        if (directFlightsOnly) {
            result = result.filter(
                (flight) => flight.stops === 0
            );
        }

        if (filters?.airlines?.length) {
            result = result.filter((flight) =>
                filters.airlines!.includes(
                    flight.airline.code
                )
            );
        }

        if (filters?.stops?.length) {
            result = result.filter((flight) => {
                const stopLabel =
                    flight.stops === 0
                        ? "Non-Stop"
                        : flight.stops === 1
                            ? "One Stop"
                            : `${flight.stops} Stops`;

                return filters.stops!.includes(stopLabel);
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                tripType,
                departure: departureAirport,
                arrival: arrivalAirport,
                departureDate,
                results: result,
                meta: {
                    total: result.length,
                    facets,
                },
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;