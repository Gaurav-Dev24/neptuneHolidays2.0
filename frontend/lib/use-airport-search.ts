import { useQuery } from "@tanstack/react-query";
import { searchDepartureAirports } from "./airport-api";

export function useAirportSearch(keyword: string) {
    return useQuery({
        queryKey: ["departure-airports", keyword],
        queryFn: () => searchDepartureAirports(keyword),
        enabled: keyword.trim().length >= 2,

    });
}