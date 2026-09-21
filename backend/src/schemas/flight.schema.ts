import { z } from "zod";

export const flightSearchSchema = z.object({
    departureAirportId: z.string().min(1),

    arrivalAirportId: z.string().min(1),

    departureDate: z.string().min(1),

    returnDate: z.string().optional(),

    tripType: z.enum(["oneWay", "return"]),

    passengers: z.object({
        adult: z.number().int().min(1),
        child: z.number().int().min(0),
        infant: z.number().int().min(0),
    }),

    cabinClass: z.enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]),

    flexibleDates: z.boolean().default(false),

    directFlightsOnly: z.boolean().default(false),

    filters: z
        .object({
            stops: z.array(z.string()).optional(),
            airlines: z.array(z.string()).optional(),
            departureTime: z.array(z.string()).optional(),
            arrivalTime: z.array(z.string()).optional(),
        })
        .optional(),
});

export type FlightSearchInput = z.infer<typeof flightSearchSchema>;