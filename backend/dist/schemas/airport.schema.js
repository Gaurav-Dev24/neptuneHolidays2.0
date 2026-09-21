"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrivalAirportSchema = exports.departureAirportSchema = void 0;
const zod_1 = require("zod");
exports.departureAirportSchema = zod_1.z.object({
    keyword: zod_1.z.string().trim().max(100).optional().default(""),
});
exports.arrivalAirportSchema = zod_1.z.object({
    departureAirportId: zod_1.z.string().trim().min(1),
});
