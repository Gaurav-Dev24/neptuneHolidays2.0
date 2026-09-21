import { api } from "./api";

export interface Airport {
    id: string;
    code: string;
    name: string;
    city: string;
    country: string;
}

export interface AirportResponse {
    success: boolean;
    data: Airport[];
}

export async function searchDepartureAirports(
    keyword: string
): Promise<Airport[]> {
    const response = await api.post<AirportResponse>(
        "/user/airports/departures",
        { keyword }
    );

    return response.data.data;
}