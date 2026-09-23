"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PlaneTakeoff,
  ShieldCheck,
  Zap,
  Tag,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Percent,
  Compass,
} from "lucide-react";

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

const trendingDeals = [
  {
    destination: "Goa",
    tagline: "Tropical Beach & Sunset Retreat",
    code: "GOI",
    origin: "Kolkata (CCU)",
    fare: "₹3,499",
    image: "/images/dest-goa.jpg",
    badge: "Trending Beach",
  },
  {
    destination: "Dubai",
    tagline: "Ultra-Modern Skyline & Desert Safari",
    code: "DXB",
    origin: "Delhi (DEL)",
    fare: "₹12,499",
    image: "/images/dest-dubai.jpg",
    badge: "International Deal",
  },
  {
    destination: "Kashmir",
    tagline: "Dal Lake Shikara & Himalayan Snow",
    code: "SXR",
    origin: "Delhi (DEL)",
    fare: "₹4,199",
    image: "/images/dest-kashmir.jpg",
    badge: "Mountain Escape",
  },
];

const whyChooseUs = [
  {
    icon: Zap,
    title: "Instant E-Ticketing",
    description:
      "Get real-time airline PNRs and confirmed e-tickets delivered directly to your inbox and WhatsApp within seconds.",
  },
  {
    icon: Tag,
    title: "Best Fare Guarantee",
    description:
      "Direct API integrations with 500+ global and domestic airlines ensure zero markup and guaranteed lowest rates.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hidden Convenience Fees",
    description:
      "What you see is what you pay. Transparent pricing with full breakdown of airline taxes and fuel surcharges.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Concierge",
    description:
      "Round-the-clock priority flight support for cancellations, date changes, seat selections, and airport assistance.",
  },
];

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
      {/* Hero Atmosphere Section with Cinematic Image */}
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
        <section className="mb-16 rounded-3xl bg-gradient-to-r from-[#14789C] via-[#0f5e7a] to-[#0c4e66] p-6 sm:p-8 text-white shadow-xl shadow-[#14789C]/15">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F9DDAF] text-[#784d12] shadow-sm">
                <Percent className="h-7 w-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase mb-1">
                  Limited Time Offer
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Get up to 15% OFF on your first domestic booking
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                  Use coupon code at checkout for instant fare deduction.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border-2 border-dashed border-[#F9DDAF] bg-white/10 px-4 py-2 text-center">
                <p className="text-[10px] uppercase font-semibold text-[#F9DDAF]">
                  Promo Code
                </p>
                <p className="text-base sm:text-lg font-mono font-bold tracking-wider text-white">
                  FLYDEV15
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("FLYDEV15");
                  alert("Coupon code FLYDEV15 copied to clipboard!");
                }}
                className="rounded-2xl bg-[#F9DDAF] hover:bg-[#f3ce92] text-[#784d12] px-5 py-3 text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
              >
                Copy Code
              </button>
            </div>
          </div>
        </section>

        {/* Featured Trending Destinations Deals */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
                Handpicked Getaways
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Popular Destinations & Fares
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore the most booked domestic and international holiday spots this season.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#14789C] hover:text-[#0f5e7a] cursor-pointer">
              <span>View all deals</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trendingDeals.map((deal) => (
              <div
                key={deal.destination}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#14789C]/30"
              >
                {/* Image Container with Zoom effect */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.destination}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-[#FAF9F6]/95 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-[#14789C] shadow-xs">
                    {deal.badge}
                  </span>

                  {/* Destination Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-slate-300">
                      Flights to {deal.destination} ({deal.code})
                    </p>
                    <p className="text-lg font-bold leading-tight drop-shadow-xs">
                      {deal.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Content & Pricing */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p className="text-2xl font-extrabold text-[#14789C]">
                      {deal.fare}
                    </p>
                    <p className="text-[10px] text-slate-400">One-way per person</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-100 group-hover:bg-[#14789C] group-hover:text-white px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Dev Holidays Section */}
        <section className="mb-20 rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
              The Dev Holidays Difference
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Why Travelers Trust Dev Holidays
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Combining world-class airline partnerships with reliable local technology for effortless bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 p-4 rounded-2xl hover:bg-[#FAF9F6] transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}