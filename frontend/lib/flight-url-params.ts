import type {
    CabinClass,
    FlightFilters,
    FlightSearchRequest,
    TripType,
} from "./flight-api";

export interface FlightUrlParams {
    from?: string;
    to?: string;
    date?: string;
    returnDate?: string;
    tripType?: string;
    adult?: string;
    child?: string;
    infant?: string;
    cabinClass?: string;
    stops?: string;
    airlines?: string;
}

/**
 * Converts a FlightSearchRequest payload and optional active filters into a URLSearchParams string
 */
export function buildFlightSearchUrl(
    payload: FlightSearchRequest,
    filters?: FlightFilters
): string {
    const params = new URLSearchParams();

    params.set("from", payload.departureAirportId);
    params.set("to", payload.arrivalAirportId);
    params.set("date", payload.departureDate);

    if (payload.tripType === "return" && payload.returnDate) {
        params.set("returnDate", payload.returnDate);
    }

    params.set("tripType", payload.tripType);
    params.set("adult", String(payload.passengers.adult));
    params.set("child", String(payload.passengers.child));
    params.set("infant", String(payload.passengers.infant));
    params.set("cabinClass", payload.cabinClass);

    // Persist active filter selections in URL if present
    const activeStops = filters?.stops ?? payload.filters?.stops;
    if (activeStops && activeStops.length > 0) {
        params.set("stops", activeStops.join(","));
    }

    const activeAirlines = filters?.airlines ?? payload.filters?.airlines;
    if (activeAirlines && activeAirlines.length > 0) {
        params.set("airlines", activeAirlines.join(","));
    }

    return `/flights?${params.toString()}`;
}

/**
 * Parses URLSearchParams into a typed FlightSearchRequest object if required params exist.
 * Returns null if mandatory parameters (from, to, date) are missing.
 */
export function parseFlightSearchParams(
    searchParams: URLSearchParams
): {
    request: FlightSearchRequest | null;
    filters: FlightFilters;
} {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const stopsParam = searchParams.get("stops");
    const airlinesParam = searchParams.get("airlines");

    const filters: FlightFilters = {
        stops: stopsParam ? stopsParam.split(",").filter(Boolean) : [],
        airlines: airlinesParam ? airlinesParam.split(",").filter(Boolean) : [],
    };

    if (!from || !to || !date) {
        return { request: null, filters };
    }

    const tripType = (searchParams.get("tripType") as TripType) || "oneWay";
    const returnDate = searchParams.get("returnDate") || "";

    const adult = Math.max(1, parseInt(searchParams.get("adult") || "1", 10) || 1);
    const child = Math.max(0, parseInt(searchParams.get("child") || "0", 10) || 0);
    const infant = Math.max(0, parseInt(searchParams.get("infant") || "0", 10) || 0);

    const validCabinClasses: CabinClass[] = [
        "ECONOMY",
        "PREMIUM_ECONOMY",
        "BUSINESS",
        "FIRST",
    ];
    const rawCabin = (searchParams.get("cabinClass") || "ECONOMY") as CabinClass;
    const cabinClass: CabinClass = validCabinClasses.includes(rawCabin)
        ? rawCabin
        : "ECONOMY";

    const request: FlightSearchRequest = {
        departureAirportId: from,
        arrivalAirportId: to,
        departureDate: date,
        returnDate: tripType === "return" ? returnDate : "",
        tripType,
        passengers: {
            adult,
            child,
            infant,
        },
        cabinClass,
        flexibleDates: false,
        directFlightsOnly: false,
        filters,
    };

    return { request, filters };
}
