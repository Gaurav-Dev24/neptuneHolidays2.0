"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface DestinationDeal {
  destination: string;
  tagline: string;
  code: string;
  origin: string;
  fare: string;
  image: string;
  badge: string;
}

const defaultDeals: DestinationDeal[] = [
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

interface TrendingDestinationsProps {
  deals?: DestinationDeal[];
  title?: string;
  subtitle?: string;
}

export default function TrendingDestinations({
  deals = defaultDeals,
  title = "Popular Destinations & Fares",
  subtitle = "Explore the most booked domestic and international holiday spots this season.",
}: TrendingDestinationsProps) {
  return (
    <section className="mb-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
            Handpicked Getaways
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#14789C] hover:text-[#0f5e7a] cursor-pointer"
        >
          <span>View all deals</span>
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {deals.map((deal) => (
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
  );
}
