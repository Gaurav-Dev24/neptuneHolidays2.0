import { useQuery } from "@tanstack/react-query";
import { searchDepartureAirports } from "./airport-api";

export function useAllAirports() {
    return useQuery({
        queryKey: ["airports", "all"],
        queryFn: () => searchDepartureAirports(""),
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
