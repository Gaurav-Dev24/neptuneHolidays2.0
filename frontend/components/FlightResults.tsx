"use client";

import { useMemo, useState } from "react";

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
        <article className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-semibold">
                        {flight.airline.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {flight.airline.code} • {flight.id}
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <div>
                        <p className="text-xl font-semibold">
                            {formatTime(
                                flight.departure.dateTime
                            )}
                        </p>

                        <p className="text-sm">
                            {flight.departure.airportCode}
                        </p>
                    </div>

                    <div className="text-center text-xs text-gray-500">
                        <p>
                            {formatDuration(
                                flight.durationMinutes
                            )}
                        </p>

                        <div className="my-1 h-px w-20 bg-gray-300" />

                        <p>
                            {flight.stops === 0
                                ? "Non-stop"
                                : `${flight.stops} stop`}
                        </p>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">
                            {formatTime(
                                flight.arrival.dateTime
                            )}
                        </p>

                        <p className="text-sm">
                            {flight.arrival.airportCode}
                        </p>
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-xl font-bold">
                        ₹
                        {flight.price.toLocaleString(
                            "en-IN"
                        )}
                    </p>

                    <p className="text-sm text-gray-500">
                        per passenger
                    </p>
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
                    className="animate-pulse rounded-2xl border bg-white p-5"
                >
                    <div className="space-y-4">
                        <div className="h-5 w-32 rounded bg-gray-200" />
                        <div className="h-8 w-full rounded bg-gray-200" />
                        <div className="h-4 w-24 rounded bg-gray-200" />
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
            <div className="mt-6">
                <ResultsSkeleton />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
                <h2 className="text-lg font-semibold">
                    Unable to load flights
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Something went wrong while loading
                    your results.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <section className="mt-8">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        {data.meta.total} flights found
                    </h2>

                    <p className="text-sm text-gray-500">
                        {data.departure.city} (
                        {data.departure.code}) →{" "}
                        {data.arrival.city} (
                        {data.arrival.code})
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setShowMobileFilters(
                                (current) => !current
                            )
                        }
                        className="rounded-xl border bg-white px-4 py-2 text-sm font-medium md:hidden"
                    >
                        {showMobileFilters
                            ? "Hide Filters"
                            : "Filters"}
                    </button>

                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(
                                event.target.value as SortOption
                            )
                        }
                        className="rounded-xl border bg-white px-4 py-2 text-sm"
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
                    {isFetching && (
                        <div className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-500">
                            Updating flight results...
                        </div>
                    )}

                    {sortedFlights.length === 0 ? (
                        <div className="rounded-2xl border bg-white p-8 text-center">
                            <h3 className="font-semibold">
                                No flights match your filters
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try removing one or more filters.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    onFiltersChange({
                                        stops: [],
                                        airlines: [],
                                    })
                                }
                                className="mt-4 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white"
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