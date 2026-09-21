import { useQuery } from "@tanstack/react-query";

import { searchDepartureAirports } from "./airport-api";

export function useAirportSearch(keyword: string) {
    const normalizedKeyword = keyword.trim();

    return useQuery({
        queryKey: ["departure-airports", normalizedKeyword],
        queryFn: () => searchDepartureAirports(normalizedKeyword),
        enabled: normalizedKeyword.length >= 2,
        staleTime: 5 * 60 * 1000,

        refetchOnWindowFocus: false,
    });
}