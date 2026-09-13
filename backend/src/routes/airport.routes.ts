import { Router } from "express";
import { airports } from "../data/airports.js";

const router = Router();

router.post("/departures", (req, res) => {
    const keyword = String(req.body?.keyword ?? "")
        .trim()
        .toLowerCase();

    const result = airports.filter((airport) => {
        if (!keyword) return true;

        return (
            airport.name.toLowerCase().includes(keyword) ||
            airport.code.toLowerCase().includes(keyword) ||
            airport.city.toLowerCase().includes(keyword)
        );
    });

    res.status(200).json({
        success: true,
        data: result,
    });
});

router.post("/arrivals", (req, res) => {
    const departureAirportId = String(
        req.body?.departureAirportId ?? ""
    );

    const result = airports.filter(
        (airport) => airport.id !== departureAirportId
    );

    res.status(200).json({
        success: true,
        data: result,
    });
});

export default router;