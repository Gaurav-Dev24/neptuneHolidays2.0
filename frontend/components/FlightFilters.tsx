"use client";

import type { FlightFilters as FlightFilterState } from "../lib/flight-api";

interface AirlineFacet {
    code: string;
    name: string;
}

interface FlightFiltersProps {
    filters: FlightFilterState;
    airlines: AirlineFacet[];
    stops: string[];
    onChange: (
        filters: FlightFilterState
    ) => void;
}

export default function FlightFilters({
    filters,
    airlines,
    stops,
    onChange,
}: FlightFiltersProps) {
    function toggleStop(stop: string) {
        const current = filters.stops ?? [];

        const next = current.includes(stop)
            ? current.filter((item) => item !== stop)
            : [...current, stop];

        onChange({
            ...filters,
            stops: next,
        });
    }

    function toggleAirline(code: string) {
        const current = filters.airlines ?? [];

        const next = current.includes(code)
            ? current.filter((item) => item !== code)
            : [...current, code];

        onChange({
            ...filters,
            airlines: next,
        });
    }

    const hasFilters =
        Boolean(filters.stops?.length) ||
        Boolean(filters.airlines?.length);

    return (
        <div className="rounded-2xl border bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="font-semibold">
                    Filters
                </h2>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={() =>
                            onChange({
                                stops: [],
                                airlines: [],
                            })
                        }
                        className="text-sm font-medium text-gray-600 hover:text-black"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <section className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                    Stops
                </h3>

                <div className="space-y-3">
                    {stops.map((stop) => {
                        const checked =
                            filters.stops?.includes(stop) ?? false;

                        return (
                            <label
                                key={stop}
                                className="flex cursor-pointer items-center gap-3 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleStop(stop)
                                    }
                                    className="h-4 w-4"
                                />

                                <span>{stop}</span>
                            </label>
                        );
                    })}
                </div>
            </section>

            <section>
                <h3 className="mb-3 text-sm font-semibold">
                    Airlines
                </h3>

                <div className="space-y-3">
                    {airlines.map((airline) => {
                        const checked =
                            filters.airlines?.includes(
                                airline.code
                            ) ?? false;

                        return (
                            <label
                                key={airline.code}
                                className="flex cursor-pointer items-center gap-3 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleAirline(
                                            airline.code
                                        )
                                    }
                                    className="h-4 w-4"
                                />

                                <span>
                                    {airline.name}
                                </span>

                                <span className="ml-auto text-xs text-gray-400">
                                    {airline.code}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}