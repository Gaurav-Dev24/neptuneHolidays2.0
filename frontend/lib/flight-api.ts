import { api } from "./api";

export type TripType = "oneWay" | "return";

export type CabinClass =
    | "ECONOMY"
    | "PREMIUM_ECONOMY"
    | "BUSINESS"
    | "FIRST";

export interface PassengerCount {
    adult: number;
    child: number;
    infant: number;
}

export interface FlightFilters {
    stops?: string[];
    airlines?: string[];
    departureTime?: string[];
    arrivalTime?: string[];
}

export interface FlightSearchRequest {
    departureAirportId: string;
    arrivalAirportId: string;
    departureDate: string;
    returnDate?: string;
    tripType: TripType;

    passengers: PassengerCount;

    cabinClass: CabinClass;
    flexibleDates: boolean;
    directFlightsOnly: boolean;

    filters?: FlightFilters;
}

export interface Flight {
    id: string;

    airline: {
        code: string;
        name: string;
    };

    departure: {
        airportId: string;
        airportCode: string;
        dateTime: string;
    };

    arrival: {
        airportId: string;
        airportCode: string;
        dateTime: string;
    };

    durationMinutes: number;
    stops: number;
    price: number;
    currency: string;
}

export interface FlightSearchResponse {
    success: boolean;

    data: {
        tripType: TripType;

        departure: {
            id: string;
            code: string;
            name: string;
            city: string;
            country: string;
        };

        arrival: {
            id: string;
            code: string;
            name: string;
            city: string;
            country: string;
        };

        departureDate: string;

        results: Flight[];

        meta: {
            total: number;

            facets: {
                airlines: {
                    code: string;
                    name: string;
                }[];

                stops: string[];
            };
        };
    };
}

export async function searchFlights(
    payload: FlightSearchRequest
): Promise<FlightSearchResponse["data"]> {
    const response =
        await api.post<FlightSearchResponse>(
            "/user/airports/search-flights",
            payload
        );

    return response.data.data;
}