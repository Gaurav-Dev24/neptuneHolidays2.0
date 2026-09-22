"use client";

import { useState } from "react";

import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";

import {
  type FlightSearchRequest,
} from "@/lib/flight-api";

import { useFlightSearch } from "@/lib/use-flight-search";

export default function Home() {
  const [searchPayload, setSearchPayload] =
    useState<FlightSearchRequest | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useFlightSearch(searchPayload);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
            Neptune Holidays
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Find your next flight
          </h1>

          <p className="mt-2 text-gray-600">
            Search flights using the local Neptune API.
          </p>
        </div>

        <FlightSearchForm
          onSearch={setSearchPayload}
        />

        {searchPayload && (
          <FlightResults
            flights={data?.results ?? []}
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </div>
    </main>
  );
}