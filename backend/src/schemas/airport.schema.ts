import { z } from "zod";

export const departureAirportSchema = z.object({
    keyword: z.string().trim().max(100).optional().default(""),
});

export const arrivalAirportSchema = z.object({
    departureAirportId: z.string().trim().min(1),
});

export type DepartureAirportInput = z.infer<
    typeof departureAirportSchema
>;

export type ArrivalAirportInput = z.infer<
    typeof arrivalAirportSchema
>;