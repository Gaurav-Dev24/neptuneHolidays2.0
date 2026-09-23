import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import {
    searchFlights,
    type FlightSearchRequest,
} from "./flight-api";

export function useFlightSearch(
    payload: FlightSearchRequest | null
) {
    return useQuery({
        queryKey: ["flight-search", payload],

        queryFn: () => {
            if (!payload) {
                throw new Error(
                    "Flight search request is missing."
                );
            }

            return searchFlights(payload);
        },

        enabled: payload !== null,

        staleTime: 60 * 1000,

        placeholderData: keepPreviousData,

        refetchOnWindowFocus: false,
    });
}