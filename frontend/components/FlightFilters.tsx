"use client";

import { SlidersHorizontal } from "lucide-react";
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
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#14789C]" />
                    <h2 className="font-bold text-slate-900 text-sm">
                        Filters
                    </h2>
                </div>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={() =>
                            onChange({
                                stops: [],
                                airlines: [],
                            })
                        }
                        className="text-xs font-semibold text-[#14789C] hover:text-[#0f5e7a] transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <section className="mb-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Stops
                </h3>

                <div className="space-y-2.5">
                    {stops.map((stop) => {
                        const checked =
                            filters.stops?.includes(stop) ?? false;

                        return (
                            <label
                                key={stop}
                                className="group flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-[#14789C] transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleStop(stop)
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-[#14789C] accent-[#14789C] focus:ring-[#14789C]/20"
                                />

                                <span className={checked ? "font-semibold text-slate-900" : ""}>
                                    {stop}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </section>

            <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Airlines
                </h3>

                <div className="space-y-2.5">
                    {airlines.map((airline) => {
                        const checked =
                            filters.airlines?.includes(
                                airline.code
                            ) ?? false;

                        return (
                            <label
                                key={airline.code}
                                className="group flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-[#14789C] transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        toggleAirline(
                                            airline.code
                                        )
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-[#14789C] accent-[#14789C] focus:ring-[#14789C]/20"
                                />

                                <span className={checked ? "font-semibold text-slate-900" : ""}>
                                    {airline.name}
                                </span>

                                <span className="ml-auto text-xs font-mono font-medium rounded bg-slate-100 px-2 py-0.5 text-slate-500 group-hover:bg-[#14789C]/10 group-hover:text-[#14789C] transition-colors">
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