"use client";

import Image from "next/image";
import {
  Palmtree,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plane,
  Building,
  Utensils,
  Car,
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import WhyChooseUs from "@/components/WhyChooseUs";

const holidayPackages = [
  {
    title: "Enchanting Kashmir & Dal Lake",
    duration: "5 Nights / 6 Days",
    destination: "Srinagar • Gulmarg • Pahalgam",
    price: "₹19,499",
    image: "/images/dest-kashmir.jpg",
    badge: "Bestseller",
    inclusions: ["Flights Included", "Houseboat Stay", "Private Shikara", "Breakfast & Dinner"],
  },
  {
    title: "Dazzling Dubai & Desert Safari",
    duration: "5 Nights / 6 Days",
    destination: "Dubai • Abu Dhabi",
    price: "₹42,999",
    image: "/images/dest-dubai.jpg",
    badge: "International Tour",
    inclusions: ["Roundtrip Airfare", "4-Star Hotel", "Desert Safari & BBQ", "Burj Khalifa At The Top"],
  },
  {
    title: "Vibrant Goa Beach & Cruise Retreat",
    duration: "3 Nights / 4 Days",
    destination: "North & South Goa",
    price: "₹11,999",
    image: "/images/dest-goa.jpg",
    badge: "Weekend Special",
    inclusions: ["Flights Included", "Resort with Pool", "Mandovi River Cruise", "Airport Transfers"],
  },
];

export default function HolidaysPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Atmosphere Section */}
      <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-28 sm:pt-14 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/dest-kashmir.jpg"
            alt="Scenic Holiday"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#14789C]/80 via-slate-900/85 to-[#FAF9F6]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F9DDAF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#784d12] shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#784d12]" />
              <span>All-Inclusive Holiday Packages</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Curated Vacations & <span className="text-[#F9DDAF]">Unforgettable Trips</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto">
              Handcrafted domestic and international holiday itineraries with roundtrip flights, luxury accommodations, guided excursions, and airport transfers.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Flights & Hotels Included
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Customizable Itineraries
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Dedicated Tour Manager
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* Featured Tour Packages */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
                Trending Holidays
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Holiday Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore handpicked vacation experiences designed for couples, families, and group travelers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {holidayPackages.map((pkg) => (
              <div
                key={pkg.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#14789C]/30"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FAF9F6]/95 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-[#14789C] shadow-xs">
                    {pkg.badge}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-flex items-center gap-1 text-xs text-[#F9DDAF] font-semibold mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      {pkg.duration}
                    </span>
                    <p className="text-lg font-bold leading-tight drop-shadow-xs">
                      {pkg.title}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="h-3.5 w-3.5 text-[#14789C]" />
                      {pkg.destination}
                    </p>

                    <div className="space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Package Inclusions:
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {pkg.inclusions.map((inc) => (
                          <li key={inc} className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#14789C]" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400">Starting from</p>
                      <p className="text-xl font-extrabold text-[#14789C]">
                        {pkg.price}
                      </p>
                      <p className="text-[10px] text-slate-400">Per person on twin sharing</p>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PromoBanner />
        <WhyChooseUs
          title="The Dev Holidays Vacation Promise"
          subtitle="Transparent itineraries, certified local tour leaders, and round-the-clock on-ground emergency support."
        />
      </div>
    </main>
  );
}
