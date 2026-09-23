"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PlaneTakeoff, PlaneLanding, MapPin, X, Loader2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useAirportSearch } from "@/lib/use-airport-search";
import { useArrivalAirports } from "@/lib/use-arrival-airports";

import type { Airport } from "@/lib/airport-api";

interface AirportAutocompleteProps {
    label: string;
    placeholder: string;
    selectedAirport: Airport | null;
    onSelect: (airport: Airport) => void;
    onClear?: () => void;
    type: "departure" | "arrival";
    departureAirportId?: string | null;
}

export default function AirportAutocomplete({
    label,
    placeholder,
    selectedAirport,
    onSelect,
    onClear,
    type,
    departureAirportId = null,
}: AirportAutocompleteProps) {
    const [keyword, setKeyword] = useState(
        selectedAirport
            ? `${selectedAirport.city} (${selectedAirport.code})`
            : ""
    );

    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedKeyword = useDebounce(keyword, 300);

    const departureQuery = useAirportSearch(
        type === "departure" ? debouncedKeyword : ""
    );

    const arrivalQuery = useArrivalAirports(
        type === "arrival"
            ? departureAirportId
            : null
    );

    const airports =
        type === "departure"
            ? departureQuery.data ?? []
            : arrivalQuery.data ?? [];

    const isLoading =
        type === "departure"
            ? departureQuery.isLoading
            : arrivalQuery.isLoading;

    const isError =
        type === "departure"
            ? departureQuery.isError
            : arrivalQuery.isError;

    // Synchronize keyword when selectedAirport changes externally (e.g. airport swap or reset)
    useEffect(() => {
        if (selectedAirport) {
            setKeyword(`${selectedAirport.city} (${selectedAirport.code})`);
        } else {
            setKeyword("");
        }
    }, [selectedAirport]);

    const filteredAirports = useMemo(() => {
        if (type === "departure") {
            return airports;
        }

        const search = debouncedKeyword
            .trim()
            .toLowerCase();

        if (!search) {
            return airports;
        }

        return airports.filter((airport) => {
            return (
                airport.name.toLowerCase().includes(search) ||
                airport.code.toLowerCase().includes(search) ||
                airport.city.toLowerCase().includes(search)
            );
        });
    }, [airports, debouncedKeyword, type]);

    const canShowResults =
        type === "departure"
            ? debouncedKeyword.length >= 2
            : Boolean(departureAirportId) &&
            debouncedKeyword.length >= 2;

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target as Node
                )
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    function handleChange(value: string) {
        setKeyword(value);
        setIsOpen(true);
    }

    function handleSelect(airport: Airport) {
        setKeyword(
            `${airport.city} (${airport.code})`
        );

        setIsOpen(false);

        onSelect(airport);
    }

    function handleClear() {
        setKeyword("");
        setIsOpen(false);
        if (onClear) {
            onClear();
        }
    }

    const isDisabled = type === "arrival" && !departureAirportId;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            <div className="flex items-center justify-between mb-1.5 h-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                </label>
                {selectedAirport && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#14789C]/10 px-2 py-0.5 text-[11px] font-semibold text-[#14789C]">
                        {selectedAirport.code}
                    </span>
                )}
            </div>

            <div className="relative group">
                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14789C] transition-colors">
                    {type === "departure" ? (
                        <PlaneTakeoff className="h-5 w-5" />
                    ) : (
                        <PlaneLanding className="h-5 w-5" />
                    )}
                </div>

                <input
                    type="text"
                    value={keyword}
                    onChange={(event) =>
                        handleChange(event.target.value)
                    }
                    onFocus={() => setIsOpen(true)}
                    placeholder={isDisabled ? "Select departure first" : placeholder}
                    autoComplete="off"
                    disabled={isDisabled}
                    className="h-[50px] w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#14789C] focus:ring-4 focus:ring-[#14789C]/15 disabled:cursor-not-allowed disabled:bg-slate-100/80 disabled:text-slate-400 shadow-xs"
                />

                {keyword && !isDisabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        aria-label={`Clear ${label}`}
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            <div className="min-h-[20px] mt-1.5">
                {type === "arrival" && !departureAirportId && (
                    <p className="text-xs text-amber-600/90 font-medium">
                        Select departure airport first
                    </p>
                )}
            </div>

            {isOpen && canShowResults && (
                <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-100 bg-white p-1.5 shadow-2xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 duration-150">
                    {isLoading && (
                        <div className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin text-[#14789C]" />
                            <span>Searching airports...</span>
                        </div>
                    )}

                    {isError && (
                        <div className="px-4 py-3 text-sm text-red-600 bg-red-50/50 rounded-xl">
                            Unable to load airports. Please try again.
                        </div>
                    )}

                    {!isLoading &&
                        !isError &&
                        filteredAirports.length === 0 && (
                            <div className="px-4 py-6 text-center text-sm text-slate-500">
                                <MapPin className="mx-auto h-6 w-6 text-slate-300 mb-1" />
                                No matching airports found
                            </div>
                        )}

                    {!isLoading &&
                        !isError &&
                        filteredAirports.map((airport) => (
                            <button
                                key={airport.id}
                                type="button"
                                onClick={() =>
                                    handleSelect(airport)
                                }
                                className="group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors hover:bg-[#14789C]/5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#14789C]/10 group-hover:text-[#14789C] transition-colors">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#14789C]">
                                            {airport.city}
                                        </div>
                                        <div className="text-xs text-slate-500 line-clamp-1">
                                            {airport.name}
                                        </div>
                                    </div>
                                </div>

                                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold tracking-wider text-slate-700 group-hover:bg-[#14789C] group-hover:text-white transition-colors">
                                    {airport.code}
                                </span>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}