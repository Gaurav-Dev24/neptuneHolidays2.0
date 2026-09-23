"use client";

import { useState } from "react";

import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";

import {
  type FlightFilters,
  type FlightSearchRequest,
} from "@/lib/flight-api";

import { useFlightSearch } from "@/lib/use-flight-search";

const emptyFilters: FlightFilters = {
  stops: [],
  airlines: [],
};

export default function Home() {
  const [searchPayload, setSearchPayload] =
    useState<FlightSearchRequest | null>(null);

  const [filters, setFilters] =
    useState<FlightFilters>(emptyFilters);

  function handleSearch(
    payload: FlightSearchRequest
  ) {
    setFilters(emptyFilters);
    setSearchPayload(payload);
  }

  const requestPayload =
    searchPayload !== null
      ? {
        ...searchPayload,
        filters,
      }
      : null;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useFlightSearch(requestPayload);

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
          onSearch={handleSearch}
        />

        {searchPayload && (
          <FlightResults
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            filters={filters}
            onFiltersChange={setFilters}
            onRetry={() => refetch()}
          />
        )}
      </div>
    </main>
  );
}