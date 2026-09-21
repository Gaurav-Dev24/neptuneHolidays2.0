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

export const flights: Flight[] = [
    {
        id: "FL001",
        airline: {
            code: "6E",
            name: "IndiGo",
        },
        departure: {
            airportId: "ccu",
            airportCode: "CCU",
            dateTime: "2026-10-10T06:30:00+05:30",
        },
        arrival: {
            airportId: "del",
            airportCode: "DEL",
            dateTime: "2026-10-10T08:55:00+05:30",
        },
        durationMinutes: 145,
        stops: 0,
        price: 5899,
        currency: "INR",
    },

    {
        id: "FL002",
        airline: {
            code: "AI",
            name: "Air India",
        },
        departure: {
            airportId: "ccu",
            airportCode: "CCU",
            dateTime: "2026-10-10T10:15:00+05:30",
        },
        arrival: {
            airportId: "del",
            airportCode: "DEL",
            dateTime: "2026-10-10T12:45:00+05:30",
        },
        durationMinutes: 150,
        stops: 0,
        price: 6749,
        currency: "INR",
    },

    {
        id: "FL003",
        airline: {
            code: "6E",
            name: "IndiGo",
        },
        departure: {
            airportId: "ccu",
            airportCode: "CCU",
            dateTime: "2026-10-10T14:20:00+05:30",
        },
        arrival: {
            airportId: "del",
            airportCode: "DEL",
            dateTime: "2026-10-10T18:10:00+05:30",
        },
        durationMinutes: 230,
        stops: 1,
        price: 4829,
        currency: "INR",
    },

    {
        id: "FL004",
        airline: {
            code: "AI",
            name: "Air India",
        },
        departure: {
            airportId: "bom",
            airportCode: "BOM",
            dateTime: "2026-10-10T09:00:00+05:30",
        },
        arrival: {
            airportId: "del",
            airportCode: "DEL",
            dateTime: "2026-10-10T11:10:00+05:30",
        },
        durationMinutes: 130,
        stops: 0,
        price: 5299,
        currency: "INR",
    },

    {
        id: "FL005",
        airline: {
            code: "6E",
            name: "IndiGo",
        },
        departure: {
            airportId: "ccu",
            airportCode: "CCU",
            dateTime: "2026-10-10T19:30:00+05:30",
        },
        arrival: {
            airportId: "bom",
            airportCode: "BOM",
            dateTime: "2026-10-10T22:25:00+05:30",
        },
        durationMinutes: 175,
        stops: 0,
        price: 6199,
        currency: "INR",
    },
];