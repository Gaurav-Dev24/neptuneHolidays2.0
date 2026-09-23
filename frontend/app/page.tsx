"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";

import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";
import PromoBanner from "@/components/PromoBanner";
import TrendingDestinations from "@/components/TrendingDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";

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

  function handleSearch(payload: FlightSearchRequest) {
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
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Atmosphere Section with Cinematic Flight Image */}
      <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-32 sm:pt-14 text-white">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-flight-banner.jpg"
            alt="Scenic flight over clouds"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#14789C]/80 via-slate-900/85 to-[#FAF9F6]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F9DDAF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#784d12] shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#784d12]" />
              <span>Official Airline Booking Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Where Will You <span className="text-[#F9DDAF]">Fly Next</span>?
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto">
              Compare real-time schedules, unlock special airline fares, and book domestic & international flights with zero convenience fee.
            </p>

            {/* Quick Trust Highlights */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                IATA Accredited
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Instant PNR Generation
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                24/7 Travel Desk
              </span>
            </div>
          </div>

          {/* Elevated Interactive Flight Search Form */}
          <div className="mx-auto max-w-6xl">
            <FlightSearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Container for Results & Production Features */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {/* Flight Search Results Section */}
        {searchPayload && (
          <div className="mb-16">
            <FlightResults
              data={data}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              filters={filters}
              onFiltersChange={setFilters}
              onRetry={() => refetch()}
            />
          </div>
        )}

        {/* Special Promo Coupon Strip */}
        <PromoBanner />

        {/* Featured Trending Destinations Deals */}
        <TrendingDestinations />

        {/* Why Choose Dev Holidays Section */}
        <WhyChooseUs />
      </div>
    </main>
  );
}