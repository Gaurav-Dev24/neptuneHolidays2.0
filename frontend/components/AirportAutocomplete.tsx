"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { useAirportSearch } from "@/lib/use-airport-search";
import { useArrivalAirports } from "@/lib/use-arrival-airports";

import type { Airport } from "@/lib/airport-api";

interface AirportAutocompleteProps {
    label: string;
    placeholder: string;
    selectedAirport: Airport | null;
    onSelect: (airport: Airport) => void;
    type: "departure" | "arrival";
    departureAirportId?: string | null;
}

export default function AirportAutocomplete({
    label,
    placeholder,
    selectedAirport,
    onSelect,
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
    }

    return (
        <div
            ref={containerRef}
            className="relative"
        >
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative">
                <input
                    type="text"
                    value={keyword}
                    onChange={(event) =>
                        handleChange(event.target.value)
                    }
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    autoComplete="off"
                    disabled={
                        type === "arrival" &&
                        !departureAirportId
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 outline-none transition focus:border-black disabled:bg-gray-100"
                />

                {keyword && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        aria-label={`Clear ${label}`}
                    >
                        ×
                    </button>
                )}
            </div>

            {type === "arrival" &&
                !departureAirportId && (
                    <p className="mt-1 text-xs text-gray-500">
                        Select your departure airport first.
                    </p>
                )}

            {isOpen && canShowResults && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-lg">
                    {isLoading && (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            Searching airports...
                        </div>
                    )}

                    {isError && (
                        <div className="px-4 py-3 text-sm text-red-600">
                            Unable to load airports.
                        </div>
                    )}

                    {!isLoading &&
                        !isError &&
                        filteredAirports.length === 0 && (
                            <div className="px-4 py-3 text-sm text-gray-500">
                                No airports found.
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
                                className="block w-full px-4 py-3 text-left transition hover:bg-gray-50"
                            >
                                <div className="font-medium">
                                    {airport.city} ({airport.code})
                                </div>

                                <div className="text-sm text-gray-500">
                                    {airport.name}
                                </div>
                            </button>
                        ))}
                </div>
            )}

            {selectedAirport && (
                <p className="mt-1 text-xs text-green-600">
                    Selected: {selectedAirport.code}
                </p>
            )}
        </div>
    );
}