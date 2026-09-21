"use client";

import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { useAirportSearch } from "@/lib/use-airport-search";

export default function Home() {
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 300);

  const {
    data: airports = [],
    isLoading,
    isError,
    error,
  } = useAirportSearch(debouncedKeyword);

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Neptune Holidays
      </h1>

      <div className="max-w-md">
        <label
          htmlFor="departure-airport"
          className="mb-2 block text-sm font-medium"
        >
          Departure Airport
        </label>

        <input
          id="departure-airport"
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search airport..."
          autoComplete="off"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />

        {keyword.length > 0 && keyword.length < 2 && (
          <p className="mt-2 text-sm">
            Enter at least 2 characters.
          </p>
        )}

        {isLoading && debouncedKeyword.length >= 2 && (
          <p className="mt-3 text-sm">
            Searching airports...
          </p>
        )}

        {isError && (
          <p className="mt-3 text-sm text-red-600">
            {error instanceof Error
              ? error.message
              : "Unable to search airports."}
          </p>
        )}

        {!isLoading && airports.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-lg border">
            {airports.map((airport) => (
              <button
                key={airport.id}
                type="button"
                className="block w-full px-4 py-3 text-left hover:bg-gray-100"
              >
                <div className="font-medium">
                  {airport.city} ({airport.code})
                </div>

                <div className="text-sm">
                  {airport.name}
                </div>
              </button>
            ))}
          </div>
        )}

        {!isLoading &&
          debouncedKeyword.length >= 2 &&
          airports.length === 0 &&
          !isError && (
            <p className="mt-3 text-sm">
              No airports found.
            </p>
          )}
      </div>
    </main>
  );
}