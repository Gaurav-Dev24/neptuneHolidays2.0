import { useQuery } from "@tanstack/react-query";

import { getArrivalAirports } from "./airport-api";

export function useArrivalAirports(
    departureAirportId: string | null
) {
    return useQuery({
        queryKey: ["arrival-airports", departureAirportId],

        queryFn: () => {
            if (!departureAirportId) {
                throw new Error("Departure airport is required.");
            }

            return getArrivalAirports(departureAirportId);
        },

        enabled: Boolean(departureAirportId),

        staleTime: 5 * 60 * 1000,

        refetchOnWindowFocus: false,
    });
}