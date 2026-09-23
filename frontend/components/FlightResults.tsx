"use client";

import { useMemo, useState } from "react";
import {
    PlaneTakeoff,
    SlidersHorizontal,
    ArrowRight,
    RotateCcw,
    Loader2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import FlightFilters from "./FlightFilters";

import type {
    FlightFilters as FlightFilterState,
    FlightSearchResponse,
} from "@/lib/flight-api";

type SortOption =
    | "price-low"
    | "price-high"
    | "duration";

interface FlightResultsProps {
    data:
    | FlightSearchResponse["data"]
    | undefined;

    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;

    filters: FlightFilterState;

    onFiltersChange: (
        filters: FlightFilterState
    ) => void;

    onRetry: () => void;
}

function formatTime(dateTime: string) {
    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateTime));
}

function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

function FlightCard({
    flight,
}: {
    flight: FlightSearchResponse["data"]["results"][number];
}) {
    return (
        <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:border-[#14789C]/40 hover:shadow-md">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Airline Info */}
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14789C]/10 text-[#14789C] font-bold text-sm tracking-wider">
                        {flight.airline.code}
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 leading-tight">
                            {flight.airline.name}
                        </p>
                        <p className="text-xs font-mono font-medium text-slate-400 mt-0.5">
                            Flight {flight.id}
                        </p>
                    </div>
                </div>

                {/* Schedule & Flight Times */}
                <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-7">
                    <div className="text-left">
                        <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            {formatTime(flight.departure.dateTime)}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {flight.departure.airportCode}
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-1">
                        <span className="text-xs font-medium text-slate-500">
                            {formatDuration(flight.durationMinutes)}
                        </span>

                        <div className="relative my-1.5 flex items-center justify-center w-24 sm:w-28">
                            <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                            <PlaneTakeoff className="h-3.5 w-3.5 text-[#14789C] absolute -top-1.5" />
                        </div>

                        <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                flight.stops === 0
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                    : "bg-amber-50 text-amber-700 border border-amber-200/60"
                            }`}
                        >
                            {flight.stops === 0
                                ? "Non-stop"
                                : `${flight.stops} stop`}
                        </span>
                    </div>

                    <div className="text-right">
                        <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            {formatTime(flight.arrival.dateTime)}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {flight.arrival.airportCode}
                        </p>
                    </div>
                </div>

                {/* Price & Booking Action */}
                <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#14789C] tracking-tight">
                            ₹{flight.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 md:text-right">
                            per passenger
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] active:bg-[#0c4e66] text-white px-4 py-2 text-xs font-semibold shadow-sm shadow-[#14789C]/25 transition-all duration-150 md:mt-2"
                    >
                        Select Flight
                    </button>
                </div>
            </div>
        </article>
    );
}

function ResultsSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
                >
                    <div className="space-y-4">
                        <div className="h-5 w-32 rounded-lg bg-slate-200" />
                        <div className="h-8 w-full rounded-lg bg-slate-200" />
                        <div className="h-4 w-24 rounded-lg bg-slate-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function FlightResults({
    data,
    isLoading,
    isFetching,
    isError,
    filters,
    onFiltersChange,
    onRetry,
}: FlightResultsProps) {
    const [sortBy, setSortBy] =
        useState<SortOption>("price-low");

    const [showMobileFilters, setShowMobileFilters] =
        useState(false);

    const flights = data?.results ?? [];

    const sortedFlights = useMemo(() => {
        const result = [...flights];

        switch (sortBy) {
            case "price-low":
                return result.sort(
                    (a, b) => a.price - b.price
                );

            case "price-high":
                return result.sort(
                    (a, b) => b.price - a.price
                );

            case "duration":
                return result.sort(
                    (a, b) =>
                        a.durationMinutes -
                        b.durationMinutes
                );

            default:
                return result;
        }
    }, [flights, sortBy]);

    if (isLoading) {
        return (
            <div className="mt-8">
                <ResultsSkeleton />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-3">
                    <AlertCircle className="h-6 w-6" />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                    Unable to load flights
                </h2>

                <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                    Something went wrong while retrieving flight options from the server.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-5 py-2.5 text-sm font-semibold shadow-sm shadow-[#14789C]/25 transition"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Try Again</span>
                </button>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <section className="mt-8">
            {/* Header: Results count, route & sorting */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        <span className="text-[#14789C]">
                            {data.meta.total}
                        </span>{" "}
                        {data.meta.total === 1 ? "flight" : "flights"} found
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">
                            {data.departure.city} ({data.departure.code})
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">
                            {data.arrival.city} ({data.arrival.code})
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setShowMobileFilters(
                                (current) => !current
                            )
                        }
                        className="inline-flex md:hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-xs hover:border-[#14789C]/40 hover:text-[#14789C] transition-colors"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>
                            {showMobileFilters
                                ? "Hide Filters"
                                : "Filters"}
                        </span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Sort:
                        </span>
                        <select
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(
                                    event.target.value as SortOption
                                )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-xs outline-none focus:border-[#14789C] focus:ring-2 focus:ring-[#14789C]/15 transition-colors"
                        >
                            <option value="price-low">
                                Price: Low to High
                            </option>
                            <option value="price-high">
                                Price: High to Low
                            </option>
                            <option value="duration">
                                Duration: Shortest
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Results Grid with Sidebar */}
            <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
                <aside
                    className={
                        showMobileFilters
                            ? "block"
                            : "hidden md:block"
                    }
                >
                    <FlightFilters
                        filters={filters}
                        airlines={data.meta.facets.airlines}
                        stops={data.meta.facets.stops}
                        onChange={onFiltersChange}
                    />
                </aside>

                <div className="relative space-y-4">
                    {/* Live Background Refetch Notice */}
                    {isFetching && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-[#14789C]/20 bg-[#14789C]/5 px-4 py-3 text-sm font-medium text-[#14789C]">
                            <Loader2 className="h-4 w-4 animate-spin text-[#14789C]" />
                            <span>Updating flight results...</span>
                        </div>
                    )}

                    {sortedFlights.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-10 text-center shadow-xs">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                                <SlidersHorizontal className="h-5 w-5" />
                            </div>

                            <h3 className="font-bold text-slate-900 text-base">
                                No flights match your filters
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Try resetting one or more active filters to view available options.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    onFiltersChange({
                                        stops: [],
                                        airlines: [],
                                    })
                                }
                                className="mt-4 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-5 py-2.5 text-sm font-semibold shadow-sm shadow-[#14789C]/25 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        sortedFlights.map((flight) => (
                            <FlightCard
                                key={flight.id}
                                flight={flight}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}