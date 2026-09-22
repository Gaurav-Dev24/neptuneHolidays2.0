"use client";

import type { Flight } from "@/lib/flight-api";

interface FlightResultsProps {
    flights: Flight[];
    isLoading: boolean;
    isError: boolean;
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

export default function FlightResults({
    flights,
    isLoading,
    isError,
}: FlightResultsProps) {
    if (isLoading) {
        return (
            <div className="mt-6 rounded-2xl border p-6">
                Searching flights...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-6 rounded-2xl border border-red-200 p-6 text-red-600">
                Unable to load flights. Please try again.
            </div>
        );
    }

    if (flights.length === 0) {
        return (
            <div className="mt-6 rounded-2xl border p-6">
                No flights found for your search.
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-4">
            {flights.map((flight) => (
                <article
                    key={flight.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                >
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
                                    {formatTime(flight.arrival.dateTime)}
                                </p>

                                <p className="text-sm">
                                    {flight.arrival.airportCode}
                                </p>
                            </div>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-xl font-bold">
                                ₹{flight.price.toLocaleString("en-IN")}
                            </p>

                            <p className="text-sm text-gray-500">
                                per passenger
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}