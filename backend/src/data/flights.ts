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

// Baseline fixed flights for legacy and regression tests
const baseFlights: Flight[] = [
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

const AIRLINES = {
    INDIGO: { code: "6E", name: "IndiGo" },
    AIR_INDIA: { code: "AI", name: "Air India" },
    VISTARA: { code: "UK", name: "Vistara" },
    SPICEJET: { code: "SG", name: "SpiceJet" },
    AKASA: { code: "QP", name: "Akasa Air" },
};

interface FlightScheduleTemplate {
    depTime: string;
    airline: { code: string; name: string };
    durationMin: number;
    stops: number;
    price: number;
}

interface RouteTemplate {
    from: { id: string; code: string };
    to: { id: string; code: string };
    schedules: FlightScheduleTemplate[];
}

// Major domestic city routes across all 20 airports
const routeTemplates: RouteTemplate[] = [
    // CCU <-> DEL
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "06:30", airline: AIRLINES.INDIGO, durationMin: 145, stops: 0, price: 5899 },
            { depTime: "10:15", airline: AIRLINES.AIR_INDIA, durationMin: 150, stops: 0, price: 6749 },
            { depTime: "14:20", airline: AIRLINES.INDIGO, durationMin: 230, stops: 1, price: 4829 },
            { depTime: "17:45", airline: AIRLINES.VISTARA, durationMin: 140, stops: 0, price: 7299 },
            { depTime: "20:30", airline: AIRLINES.SPICEJET, durationMin: 155, stops: 0, price: 5199 },
        ],
    },
    {
        from: { id: "del", code: "DEL" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "07:00", airline: AIRLINES.VISTARA, durationMin: 140, stops: 0, price: 6999 },
            { depTime: "11:30", airline: AIRLINES.INDIGO, durationMin: 145, stops: 0, price: 5699 },
            { depTime: "15:45", airline: AIRLINES.AIR_INDIA, durationMin: 150, stops: 0, price: 6499 },
            { depTime: "19:10", airline: AIRLINES.SPICEJET, durationMin: 215, stops: 1, price: 4799 },
            { depTime: "22:00", airline: AIRLINES.INDIGO, durationMin: 140, stops: 0, price: 5399 },
        ],
    },

    // BOM <-> DEL
    {
        from: { id: "bom", code: "BOM" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "06:00", airline: AIRLINES.INDIGO, durationMin: 130, stops: 0, price: 5499 },
            { depTime: "09:00", airline: AIRLINES.AIR_INDIA, durationMin: 130, stops: 0, price: 5299 },
            { depTime: "13:30", airline: AIRLINES.VISTARA, durationMin: 125, stops: 0, price: 6599 },
            { depTime: "16:45", airline: AIRLINES.AKASA, durationMin: 135, stops: 0, price: 4999 },
            { depTime: "21:15", airline: AIRLINES.INDIGO, durationMin: 130, stops: 0, price: 5799 },
        ],
    },
    {
        from: { id: "del", code: "DEL" },
        to: { id: "bom", code: "BOM" },
        schedules: [
            { depTime: "07:30", airline: AIRLINES.AIR_INDIA, durationMin: 130, stops: 0, price: 5499 },
            { depTime: "10:45", airline: AIRLINES.VISTARA, durationMin: 125, stops: 0, price: 6799 },
            { depTime: "14:15", airline: AIRLINES.INDIGO, durationMin: 130, stops: 0, price: 5299 },
            { depTime: "18:00", airline: AIRLINES.AKASA, durationMin: 135, stops: 0, price: 4899 },
            { depTime: "22:30", airline: AIRLINES.SPICEJET, durationMin: 210, stops: 1, price: 4299 },
        ],
    },

    // BLR <-> DEL
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "06:15", airline: AIRLINES.INDIGO, durationMin: 165, stops: 0, price: 6199 },
            { depTime: "11:00", airline: AIRLINES.VISTARA, durationMin: 160, stops: 0, price: 7499 },
            { depTime: "16:20", airline: AIRLINES.AIR_INDIA, durationMin: 170, stops: 0, price: 6399 },
            { depTime: "20:00", airline: AIRLINES.AKASA, durationMin: 245, stops: 1, price: 5199 },
        ],
    },
    {
        from: { id: "del", code: "DEL" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "08:00", airline: AIRLINES.VISTARA, durationMin: 160, stops: 0, price: 7299 },
            { depTime: "13:15", airline: AIRLINES.INDIGO, durationMin: 165, stops: 0, price: 5999 },
            { depTime: "17:30", airline: AIRLINES.AIR_INDIA, durationMin: 170, stops: 0, price: 6499 },
            { depTime: "21:45", airline: AIRLINES.SPICEJET, durationMin: 170, stops: 0, price: 5699 },
        ],
    },

    // CCU <-> BOM
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "bom", code: "BOM" },
        schedules: [
            { depTime: "07:15", airline: AIRLINES.AIR_INDIA, durationMin: 170, stops: 0, price: 6599 },
            { depTime: "12:30", airline: AIRLINES.INDIGO, durationMin: 175, stops: 0, price: 5999 },
            { depTime: "19:30", airline: AIRLINES.INDIGO, durationMin: 175, stops: 0, price: 6199 },
            { depTime: "15:00", airline: AIRLINES.SPICEJET, durationMin: 260, stops: 1, price: 4799 },
        ],
    },
    {
        from: { id: "bom", code: "BOM" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "06:45", airline: AIRLINES.INDIGO, durationMin: 165, stops: 0, price: 5899 },
            { depTime: "11:20", airline: AIRLINES.AIR_INDIA, durationMin: 170, stops: 0, price: 6499 },
            { depTime: "18:15", airline: AIRLINES.VISTARA, durationMin: 165, stops: 0, price: 7199 },
            { depTime: "21:00", airline: AIRLINES.INDIGO, durationMin: 170, stops: 0, price: 5799 },
        ],
    },

    // CCU <-> BLR
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "06:00", airline: AIRLINES.INDIGO, durationMin: 155, stops: 0, price: 5799 },
            { depTime: "13:45", airline: AIRLINES.AIR_INDIA, durationMin: 160, stops: 0, price: 6299 },
            { depTime: "18:30", airline: AIRLINES.AKASA, durationMin: 150, stops: 0, price: 5299 },
        ],
    },
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "08:30", airline: AIRLINES.INDIGO, durationMin: 150, stops: 0, price: 5699 },
            { depTime: "14:10", airline: AIRLINES.VISTARA, durationMin: 155, stops: 0, price: 6899 },
            { depTime: "20:45", airline: AIRLINES.AKASA, durationMin: 150, stops: 0, price: 5199 },
        ],
    },

    // BOM <-> BLR
    {
        from: { id: "bom", code: "BOM" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "07:00", airline: AIRLINES.INDIGO, durationMin: 100, stops: 0, price: 3899 },
            { depTime: "11:45", airline: AIRLINES.AKASA, durationMin: 105, stops: 0, price: 3499 },
            { depTime: "17:15", airline: AIRLINES.AIR_INDIA, durationMin: 105, stops: 0, price: 4299 },
            { depTime: "21:30", airline: AIRLINES.VISTARA, durationMin: 100, stops: 0, price: 4799 },
        ],
    },
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "bom", code: "BOM" },
        schedules: [
            { depTime: "06:30", airline: AIRLINES.AKASA, durationMin: 100, stops: 0, price: 3499 },
            { depTime: "10:15", airline: AIRLINES.INDIGO, durationMin: 105, stops: 0, price: 3999 },
            { depTime: "15:30", airline: AIRLINES.VISTARA, durationMin: 100, stops: 0, price: 4699 },
            { depTime: "19:45", airline: AIRLINES.AIR_INDIA, durationMin: 105, stops: 0, price: 4199 },
        ],
    },

    // DEL <-> GOI (Goa)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "goi", code: "GOI" },
        schedules: [
            { depTime: "08:15", airline: AIRLINES.INDIGO, durationMin: 155, stops: 0, price: 5999 },
            { depTime: "13:00", airline: AIRLINES.VISTARA, durationMin: 150, stops: 0, price: 7499 },
            { depTime: "18:20", airline: AIRLINES.SPICEJET, durationMin: 160, stops: 0, price: 5499 },
        ],
    },
    {
        from: { id: "goi", code: "GOI" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "11:45", airline: AIRLINES.INDIGO, durationMin: 155, stops: 0, price: 5899 },
            { depTime: "16:20", airline: AIRLINES.VISTARA, durationMin: 150, stops: 0, price: 7299 },
            { depTime: "21:40", airline: AIRLINES.SPICEJET, durationMin: 160, stops: 0, price: 5399 },
        ],
    },

    // BOM <-> GOI (Goa)
    {
        from: { id: "bom", code: "BOM" },
        to: { id: "goi", code: "GOI" },
        schedules: [
            { depTime: "07:30", airline: AIRLINES.INDIGO, durationMin: 75, stops: 0, price: 3299 },
            { depTime: "12:15", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3699 },
            { depTime: "17:40", airline: AIRLINES.AKASA, durationMin: 75, stops: 0, price: 2999 },
        ],
    },
    {
        from: { id: "goi", code: "GOI" },
        to: { id: "bom", code: "BOM" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 75, stops: 0, price: 3199 },
            { depTime: "14:20", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3599 },
            { depTime: "19:50", airline: AIRLINES.AKASA, durationMin: 75, stops: 0, price: 2899 },
        ],
    },

    // BLR <-> GOI
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "goi", code: "GOI" },
        schedules: [
            { depTime: "08:45", airline: AIRLINES.INDIGO, durationMin: 75, stops: 0, price: 3199 },
            { depTime: "16:30", airline: AIRLINES.AKASA, durationMin: 70, stops: 0, price: 2799 },
        ],
    },
    {
        from: { id: "goi", code: "GOI" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "10:45", airline: AIRLINES.INDIGO, durationMin: 75, stops: 0, price: 3299 },
            { depTime: "18:25", airline: AIRLINES.AKASA, durationMin: 70, stops: 0, price: 2899 },
        ],
    },

    // DEL <-> HYD
    {
        from: { id: "del", code: "DEL" },
        to: { id: "hyd", code: "HYD" },
        schedules: [
            { depTime: "06:30", airline: AIRLINES.INDIGO, durationMin: 135, stops: 0, price: 4999 },
            { depTime: "14:00", airline: AIRLINES.AIR_INDIA, durationMin: 140, stops: 0, price: 5499 },
            { depTime: "19:15", airline: AIRLINES.VISTARA, durationMin: 135, stops: 0, price: 6199 },
        ],
    },
    {
        from: { id: "hyd", code: "HYD" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 135, stops: 0, price: 4899 },
            { depTime: "16:45", airline: AIRLINES.AIR_INDIA, durationMin: 140, stops: 0, price: 5399 },
            { depTime: "22:15", airline: AIRLINES.VISTARA, durationMin: 135, stops: 0, price: 6299 },
        ],
    },

    // DEL <-> MAA (Chennai)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "maa", code: "MAA" },
        schedules: [
            { depTime: "07:10", airline: AIRLINES.INDIGO, durationMin: 170, stops: 0, price: 5999 },
            { depTime: "15:20", airline: AIRLINES.AIR_INDIA, durationMin: 175, stops: 0, price: 6499 },
            { depTime: "20:00", airline: AIRLINES.VISTARA, durationMin: 170, stops: 0, price: 7199 },
        ],
    },
    {
        from: { id: "maa", code: "MAA" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "06:45", airline: AIRLINES.AIR_INDIA, durationMin: 175, stops: 0, price: 6299 },
            { depTime: "11:00", airline: AIRLINES.INDIGO, durationMin: 170, stops: 0, price: 5899 },
            { depTime: "18:45", airline: AIRLINES.VISTARA, durationMin: 170, stops: 0, price: 6999 },
        ],
    },

    // BLR <-> MAA
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "maa", code: "MAA" },
        schedules: [
            { depTime: "07:00", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 2499 },
            { depTime: "15:15", airline: AIRLINES.AIR_INDIA, durationMin: 60, stops: 0, price: 2899 },
            { depTime: "20:30", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 2699 },
        ],
    },
    {
        from: { id: "maa", code: "MAA" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "08:45", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 2599 },
            { depTime: "17:00", airline: AIRLINES.AIR_INDIA, durationMin: 60, stops: 0, price: 2999 },
            { depTime: "22:15", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 2499 },
        ],
    },

    // CCU <-> GAU (Guwahati)
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "gau", code: "GAU" },
        schedules: [
            { depTime: "07:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 3499 },
            { depTime: "13:15", airline: AIRLINES.SPICEJET, durationMin: 75, stops: 0, price: 3199 },
            { depTime: "17:50", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3899 },
        ],
    },
    {
        from: { id: "gau", code: "GAU" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 3399 },
            { depTime: "15:20", airline: AIRLINES.SPICEJET, durationMin: 75, stops: 0, price: 3099 },
            { depTime: "19:40", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3799 },
        ],
    },

    // CCU <-> IXB (Bagdogra / Siliguri)
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "ixb", code: "IXB" },
        schedules: [
            { depTime: "08:00", airline: AIRLINES.SPICEJET, durationMin: 65, stops: 0, price: 3199 },
            { depTime: "12:45", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 3599 },
            { depTime: "16:30", airline: AIRLINES.AIR_INDIA, durationMin: 65, stops: 0, price: 3999 },
        ],
    },
    {
        from: { id: "ixb", code: "IXB" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "10:00", airline: AIRLINES.SPICEJET, durationMin: 65, stops: 0, price: 3099 },
            { depTime: "14:30", airline: AIRLINES.INDIGO, durationMin: 60, stops: 0, price: 3499 },
            { depTime: "18:20", airline: AIRLINES.AIR_INDIA, durationMin: 65, stops: 0, price: 3899 },
        ],
    },

    // CCU <-> BBI (Bhubaneswar)
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "bbi", code: "BBI" },
        schedules: [
            { depTime: "08:15", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2599 },
            { depTime: "17:30", airline: AIRLINES.AIR_INDIA, durationMin: 60, stops: 0, price: 2999 },
        ],
    },
    {
        from: { id: "bbi", code: "BBI" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "10:00", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2499 },
            { depTime: "19:15", airline: AIRLINES.AIR_INDIA, durationMin: 60, stops: 0, price: 2899 },
        ],
    },

    // CCU <-> PAT (Patna)
    {
        from: { id: "ccu", code: "CCU" },
        to: { id: "pat", code: "PAT" },
        schedules: [
            { depTime: "09:00", airline: AIRLINES.SPICEJET, durationMin: 65, stops: 0, price: 2999 },
            { depTime: "18:00", airline: AIRLINES.INDIGO, durationMin: 65, stops: 0, price: 3299 },
        ],
    },
    {
        from: { id: "pat", code: "PAT" },
        to: { id: "ccu", code: "CCU" },
        schedules: [
            { depTime: "11:00", airline: AIRLINES.SPICEJET, durationMin: 65, stops: 0, price: 2899 },
            { depTime: "20:00", airline: AIRLINES.INDIGO, durationMin: 65, stops: 0, price: 3199 },
        ],
    },

    // DEL <-> JAI (Jaipur)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "jai", code: "JAI" },
        schedules: [
            { depTime: "07:15", airline: AIRLINES.AIR_INDIA, durationMin: 55, stops: 0, price: 2699 },
            { depTime: "18:45", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2999 },
        ],
    },
    {
        from: { id: "jai", code: "JAI" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "09:00", airline: AIRLINES.AIR_INDIA, durationMin: 55, stops: 0, price: 2599 },
            { depTime: "20:30", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2899 },
        ],
    },

    // DEL <-> LKO (Lucknow)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "lko", code: "LKO" },
        schedules: [
            { depTime: "08:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 3199 },
            { depTime: "17:15", airline: AIRLINES.AIR_INDIA, durationMin: 75, stops: 0, price: 3599 },
        ],
    },
    {
        from: { id: "lko", code: "LKO" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "10:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 3099 },
            { depTime: "19:15", airline: AIRLINES.AIR_INDIA, durationMin: 75, stops: 0, price: 3499 },
        ],
    },

    // DEL <-> ATQ (Amritsar)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "atq", code: "ATQ" },
        schedules: [
            { depTime: "06:45", airline: AIRLINES.AIR_INDIA, durationMin: 65, stops: 0, price: 2899 },
            { depTime: "16:30", airline: AIRLINES.INDIGO, durationMin: 65, stops: 0, price: 3199 },
        ],
    },
    {
        from: { id: "atq", code: "ATQ" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "08:45", airline: AIRLINES.AIR_INDIA, durationMin: 65, stops: 0, price: 2799 },
            { depTime: "18:30", airline: AIRLINES.INDIGO, durationMin: 65, stops: 0, price: 3099 },
        ],
    },

    // DEL <-> IXC (Chandigarh)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "ixc", code: "IXC" },
        schedules: [
            { depTime: "07:50", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2799 },
            { depTime: "17:20", airline: AIRLINES.VISTARA, durationMin: 55, stops: 0, price: 3399 },
        ],
    },
    {
        from: { id: "ixc", code: "IXC" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 55, stops: 0, price: 2699 },
            { depTime: "19:00", airline: AIRLINES.VISTARA, durationMin: 55, stops: 0, price: 3299 },
        ],
    },

    // DEL <-> AMD (Ahmedabad)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "amd", code: "AMD" },
        schedules: [
            { depTime: "07:00", airline: AIRLINES.INDIGO, durationMin: 95, stops: 0, price: 4199 },
            { depTime: "13:30", airline: AIRLINES.AIR_INDIA, durationMin: 100, stops: 0, price: 4699 },
            { depTime: "19:45", airline: AIRLINES.SPICEJET, durationMin: 95, stops: 0, price: 3899 },
        ],
    },
    {
        from: { id: "amd", code: "AMD" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 95, stops: 0, price: 4099 },
            { depTime: "16:00", airline: AIRLINES.AIR_INDIA, durationMin: 100, stops: 0, price: 4599 },
            { depTime: "22:00", airline: AIRLINES.SPICEJET, durationMin: 95, stops: 0, price: 3799 },
        ],
    },

    // DEL <-> PNQ (Pune)
    {
        from: { id: "del", code: "DEL" },
        to: { id: "pnq", code: "PNQ" },
        schedules: [
            { depTime: "06:20", airline: AIRLINES.INDIGO, durationMin: 125, stops: 0, price: 5199 },
            { depTime: "14:10", airline: AIRLINES.VISTARA, durationMin: 120, stops: 0, price: 6299 },
            { depTime: "20:15", airline: AIRLINES.AIR_INDIA, durationMin: 130, stops: 0, price: 5499 },
        ],
    },
    {
        from: { id: "pnq", code: "PNQ" },
        to: { id: "del", code: "DEL" },
        schedules: [
            { depTime: "09:15", airline: AIRLINES.INDIGO, durationMin: 125, stops: 0, price: 5099 },
            { depTime: "17:00", airline: AIRLINES.VISTARA, durationMin: 120, stops: 0, price: 6199 },
            { depTime: "23:00", airline: AIRLINES.AIR_INDIA, durationMin: 130, stops: 0, price: 5399 },
        ],
    },

    // BLR <-> COK (Kochi)
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "cok", code: "COK" },
        schedules: [
            { depTime: "07:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 2799 },
            { depTime: "16:45", airline: AIRLINES.AIR_INDIA, durationMin: 75, stops: 0, price: 3199 },
        ],
    },
    {
        from: { id: "cok", code: "COK" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "09:30", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 2699 },
            { depTime: "18:45", airline: AIRLINES.AIR_INDIA, durationMin: 75, stops: 0, price: 3099 },
        ],
    },

    // BLR <-> TRV (Thiruvananthapuram)
    {
        from: { id: "blr", code: "BLR" },
        to: { id: "trv", code: "TRV" },
        schedules: [
            { depTime: "08:15", airline: AIRLINES.INDIGO, durationMin: 80, stops: 0, price: 3299 },
            { depTime: "17:00", airline: AIRLINES.AIR_INDIA, durationMin: 85, stops: 0, price: 3699 },
        ],
    },
    {
        from: { id: "trv", code: "TRV" },
        to: { id: "blr", code: "BLR" },
        schedules: [
            { depTime: "10:30", airline: AIRLINES.INDIGO, durationMin: 80, stops: 0, price: 3199 },
            { depTime: "19:15", airline: AIRLINES.AIR_INDIA, durationMin: 85, stops: 0, price: 3599 },
        ],
    },

    // HYD <-> VTZ (Visakhapatnam)
    {
        from: { id: "hyd", code: "HYD" },
        to: { id: "vtz", code: "VTZ" },
        schedules: [
            { depTime: "07:45", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 2999 },
            { depTime: "18:20", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3399 },
        ],
    },
    {
        from: { id: "vtz", code: "VTZ" },
        to: { id: "hyd", code: "HYD" },
        schedules: [
            { depTime: "09:45", airline: AIRLINES.INDIGO, durationMin: 70, stops: 0, price: 2899 },
            { depTime: "20:20", airline: AIRLINES.AIR_INDIA, durationMin: 70, stops: 0, price: 3299 },
        ],
    },
];

// Helper to calculate arrival date/time string with timezone offset
function calculateArrivalDateTime(
    dateStr: string,
    timeStr: string,
    durationMinutes: number
): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, mins] = timeStr.split(":").map(Number);
    const date = new Date(year, month - 1, day, hours, mins);
    date.setMinutes(date.getMinutes() + durationMinutes);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const arrYear = date.getFullYear();
    const arrMonth = pad(date.getMonth() + 1);
    const arrDay = pad(date.getDate());
    const arrHours = pad(date.getHours());
    const arrMins = pad(date.getMinutes());

    return `${arrYear}-${arrMonth}-${arrDay}T${arrHours}:${arrMins}:00+05:30`;
}

// Generate flight schedules for an extensive date window
function generateComprehensiveFlightSchedule(): Flight[] {
    const generated: Flight[] = [];
    const dateSet: string[] = [];

    // 1. Ensure benchmark date 2026-10-10 is included
    dateSet.push("2026-10-10");

    // 2. Generate dates spanning September 2026 to December 2026 (122 days)
    // September 2026 (30 days)
    for (let day = 1; day <= 30; day++) {
        const d = `2026-09-${day.toString().padStart(2, "0")}`;
        if (!dateSet.includes(d)) dateSet.push(d);
    }
    // October 2026 (31 days)
    for (let day = 1; day <= 31; day++) {
        const d = `2026-10-${day.toString().padStart(2, "0")}`;
        if (!dateSet.includes(d)) dateSet.push(d);
    }
    // November 2026 (30 days)
    for (let day = 1; day <= 30; day++) {
        const d = `2026-11-${day.toString().padStart(2, "0")}`;
        if (!dateSet.includes(d)) dateSet.push(d);
    }
    // December 2026 (31 days)
    for (let day = 1; day <= 31; day++) {
        const d = `2026-12-${day.toString().padStart(2, "0")}`;
        if (!dateSet.includes(d)) dateSet.push(d);
    }

    let idCounter = 100;

    for (const date of dateSet) {
        for (const route of routeTemplates) {
            for (let idx = 0; idx < route.schedules.length; idx++) {
                const sched = route.schedules[idx];
                const depDateTime = `${date}T${sched.depTime}:00+05:30`;
                const arrDateTime = calculateArrivalDateTime(
                    date,
                    sched.depTime,
                    sched.durationMin
                );

                // Skip duplicating the original 5 base flights on 2026-10-10
                if (
                    date === "2026-10-10" &&
                    ((route.from.id === "ccu" &&
                        route.to.id === "del" &&
                        (sched.depTime === "06:30" ||
                            sched.depTime === "10:15" ||
                            sched.depTime === "14:20")) ||
                        (route.from.id === "bom" &&
                            route.to.id === "del" &&
                            sched.depTime === "09:00") ||
                        (route.from.id === "ccu" &&
                            route.to.id === "bom" &&
                            sched.depTime === "19:30"))
                ) {
                    continue;
                }

                idCounter++;
                const flightId = `FL${idCounter}`;

                generated.push({
                    id: flightId,
                    airline: sched.airline,
                    departure: {
                        airportId: route.from.id,
                        airportCode: route.from.code,
                        dateTime: depDateTime,
                    },
                    arrival: {
                        airportId: route.to.id,
                        airportCode: route.to.code,
                        dateTime: arrDateTime,
                    },
                    durationMinutes: sched.durationMin,
                    stops: sched.stops,
                    price: sched.price,
                    currency: "INR",
                });
            }
        }
    }

    // Combine original baseline flights with comprehensive schedules
    return [...baseFlights, ...generated];
}

export const flights: Flight[] = generateComprehensiveFlightSchedule();