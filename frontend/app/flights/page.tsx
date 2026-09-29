"use client";

import { Suspense, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Sparkles, Plane, Loader2 } from "lucide-react";

import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResults from "@/components/FlightResults";
import PromoBanner from "@/components/PromoBanner";
import TrendingDestinations from "@/components/TrendingDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";

import {
    type FlightFilters,
    type FlightSearchRequest,
} from "@/lib/flight-api";
import {
    buildFlightSearchUrl,
    parseFlightSearchParams,
} from "@/lib/flight-url-params";
import { useFlightSearch } from "@/lib/use-flight-search";

function FlightsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Parse URL query parameters into strongly typed search request and filters
    const { request: searchPayload, filters } = useMemo(
        () => parseFlightSearchParams(searchParams),
        [searchParams]
    );

    // Active query runs automatically when searchPayload is valid from URL
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useFlightSearch(searchPayload);

    // Handle new search submission from the form
    function handleSearch(payload: FlightSearchRequest) {
        // Reset filters for a brand new flight route search
        const targetUrl = buildFlightSearchUrl(payload, {
            stops: [],
            airlines: [],
        });
        router.push(targetUrl);
    }

    // Handle filter adjustments (updating URL without jumping scroll or polluting history)
    function handleFiltersChange(updatedFilters: FlightFilters) {
        if (!searchPayload) return;
        const targetUrl = buildFlightSearchUrl(searchPayload, updatedFilters);
        router.replace(targetUrl, { scroll: false });
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            {/* Hero Atmosphere Section with Cinematic Flight Image */}
            <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-32 sm:pt-14 text-white">
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

                    {/* Elevated Interactive Flight Search Form with URL sync */}
                    <div className="mx-auto max-w-6xl">
                        <FlightSearchForm
                            onSearch={handleSearch}
                            initialRequest={searchPayload}
                        />
                    </div>
                </div>
            </section>

            {/* Main Container for Results & Features */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
                {/* When URL params are present, show Flight Results */}
                {searchPayload ? (
                    <div className="mb-16">
                        <FlightResults
                            data={data}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            isError={isError}
                            filters={filters}
                            onFiltersChange={handleFiltersChange}
                            onRetry={() => refetch()}
                        />
                    </div>
                ) : (
                    /* Helpful guide prompt if user lands on /flights without search query */
                    <div className="mb-14 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                            <Plane className="h-7 w-7" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Ready for Takeoff?
                        </h2>
                        <p className="mt-1 text-sm text-slate-600 max-w-md mx-auto">
                            Select your departure city, destination, and travel dates above to search and compare real-time airline schedules.
                        </p>
                    </div>
                )}

                {/* Special Promo Coupon Strip */}
                <PromoBanner />

                {/* Featured Trending Destinations Deals */}
                <TrendingDestinations />

                {/* Why Choose Us Section */}
                <WhyChooseUs />
            </div>
        </main>
    );
}

function FlightsFallback() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-8">
            <Loader2 className="h-10 w-10 animate-spin text-[#14789C] mb-4" />
            <p className="text-slate-600 font-medium">Loading flight search...</p>
        </div>
    );
}

export default function FlightsPage() {
    return (
        <Suspense fallback={<FlightsFallback />}>
            <FlightsContent />
        </Suspense>
    );
}
