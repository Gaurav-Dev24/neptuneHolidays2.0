"use client";

import { useState } from "react";
import {
    Plane,
    Clock,
    ArrowRight,
    Luggage,
    ShieldCheck,
    Sparkles,
    AlertCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

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
        hour12: true,
    }).format(new Date(dateTime));
}

function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

// Airline brand badge styling helper
function getAirlineBadgeStyle(code: string) {
    switch (code) {
        case "6E":
            return "bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-500/10";
        case "AI":
            return "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/10";
        case "UK":
            return "bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/10";
        case "SG":
            return "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10";
        default:
            return "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/10";
    }
}

export default function FlightResults({
    flights,
    isLoading,
    isError,
}: FlightResultsProps) {
    const [expandedFlightId, setExpandedFlightId] = useState<string | null>(
        null
    );

    function toggleDetails(flightId: string) {
        setExpandedFlightId((prev) => (prev === flightId ? null : flightId));
    }

    // Loading State Skeleton
    if (isLoading) {
        return (
            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-5 w-36 rounded-md bg-slate-200 animate-pulse" />
                    <div className="h-5 w-24 rounded-md bg-slate-200 animate-pulse" />
                </div>

                {[1, 2, 3].map((idx) => (
                    <div
                        key={idx}
                        className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm animate-pulse"
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                                <div className="space-y-2">
                                    <div className="h-4 w-28 rounded bg-slate-200" />
                                    <div className="h-3 w-16 rounded bg-slate-100" />
                                </div>
                            </div>

                            <div className="flex flex-1 items-center justify-center gap-8 max-w-md">
                                <div className="h-7 w-16 rounded bg-slate-200" />
                                <div className="h-2 w-32 rounded bg-slate-200" />
                                <div className="h-7 w-16 rounded bg-slate-200" />
                            </div>

                            <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2">
                                <div className="h-7 w-24 rounded bg-slate-200" />
                                <div className="h-9 w-28 rounded-xl bg-slate-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="mt-8 rounded-3xl border border-rose-100 bg-rose-50/60 p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-3">
                    <AlertCircle className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-rose-900">
                    Unable to load flight results
                </h3>
                <p className="mt-1 text-sm text-rose-600 max-w-md mx-auto">
                    There was an issue connecting to the server. Please check
                    your connection and try again.
                </p>
            </div>
        );
    }

    // Empty State
    if (flights.length === 0) {
        return (
            <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-xl shadow-slate-200/40">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
                    <Plane className="h-8 w-8 -rotate-45 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                    No flights found for your search
                </h3>
                <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
                    We couldn't find any flights matching your selected date and
                    route. Try searching for a different date or another airport.
                </p>
            </div>
        );
    }

    return (
        <section className="relative z-10 mt-8 space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between px-1">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                        Available Flights
                    </h2>
                    <p className="text-xs text-slate-500">
                        Showing {flights.length}{" "}
                        {flights.length === 1 ? "flight" : "flights"} matching
                        your criteria
                    </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Prices include taxes & fees
                </span>
            </div>

            {/* Flight Cards */}
            <div className="space-y-4">
                {flights.map((flight) => {
                    const isExpanded = expandedFlightId === flight.id;
                    const badgeClass = getAirlineBadgeStyle(
                        flight.airline.code
                    );

                    return (
                        <article
                            key={flight.id}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200/80 hover:shadow-xl hover:shadow-slate-200/60"
                        >
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                {/* Airline Information */}
                                <div className="flex items-center gap-3.5 min-w-[200px]">
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-sm tracking-wider shadow-xs ${badgeClass}`}
                                    >
                                        {flight.airline.code}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                                            {flight.airline.name}
                                        </h3>
                                        <p className="text-xs font-medium text-slate-400 mt-0.5">
                                            Flight {flight.airline.code}-
                                            {flight.id}
                                        </p>
                                    </div>
                                </div>

                                {/* Flight Timing & Journey Bar */}
                                <div className="flex flex-1 items-center justify-between sm:justify-center sm:gap-8 max-w-xl">
                                    {/* Departure Column */}
                                    <div className="text-left">
                                        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                                            {formatTime(
                                                flight.departure.dateTime
                                            )}
                                        </p>
                                        <p className="text-xs font-bold text-blue-600 mt-0.5 tracking-wider">
                                            {flight.departure.airportCode}
                                        </p>
                                    </div>

                                    {/* Duration & Route Visualizer */}
                                    <div className="flex flex-col items-center px-4 flex-1 max-w-[200px]">
                                        <span className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-slate-400" />
                                            {formatDuration(
                                                flight.durationMinutes
                                            )}
                                        </span>

                                        {/* Styled Flight Line with Plane */}
                                        <div className="relative w-full flex items-center my-1 h-4">
                                            <div className="h-2 w-2 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                                            <div className="h-[2px] flex-1 bg-slate-200" />
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1.5 flex items-center justify-center">
                                                <Plane className="h-4 w-4 text-blue-600 rotate-45" />
                                            </div>
                                            <div className="h-2 w-2 rounded-full border-2 border-blue-600 bg-blue-600 shrink-0" />
                                        </div>

                                        {/* Stops Pill Badge */}
                                        <span
                                            className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                flight.stops === 0
                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                                            }`}
                                        >
                                            {flight.stops === 0
                                                ? "Non-stop"
                                                : `${flight.stops} Stop`}
                                        </span>
                                    </div>

                                    {/* Arrival Column */}
                                    <div className="text-right">
                                        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                                            {formatTime(
                                                flight.arrival.dateTime
                                            )}
                                        </p>
                                        <p className="text-xs font-bold text-blue-600 mt-0.5 tracking-wider">
                                            {flight.arrival.airportCode}
                                        </p>
                                    </div>
                                </div>

                                {/* Price & Action Button */}
                                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
                                    <div className="text-left lg:text-right">
                                        <p className="text-2xl font-black tracking-tight text-slate-900">
                                            ₹
                                            {flight.price.toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>
                                        <p className="text-xs font-medium text-slate-400">
                                            per passenger
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleDetails(flight.id)
                                            }
                                            className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                                        >
                                            <span>Details</span>
                                            {isExpanded ? (
                                                <ChevronUp className="h-3.5 w-3.5" />
                                            ) : (
                                                <ChevronDown className="h-3.5 w-3.5" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:shadow-md hover:shadow-blue-500/35 active:scale-95"
                                        >
                                            <span>Book</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Flight Details Drawer */}
                            {isExpanded && (
                                <div className="mt-5 border-t border-slate-100 pt-5 animate-in fade-in-50 duration-150">
                                    <div className="grid gap-3 sm:grid-cols-3 text-xs">
                                        <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5">
                                            <Luggage className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    Baggage Allowance
                                                </p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    Cabin: 7 kg included
                                                    <br />
                                                    Check-in: 15 kg included
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5">
                                            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    Cancellation & Changes
                                                </p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    Partially refundable
                                                    <br />
                                                    Date changes with airline fee
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5">
                                            <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    Flight Perks
                                                </p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    Standard economy seats
                                                    <br />
                                                    USB charging available
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}