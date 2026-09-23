"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Hotel,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  CheckCircle2,
  Sparkles,
  Wifi,
  Coffee,
  Waves,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import WhyChooseUs from "@/components/WhyChooseUs";

const featuredHotels = [
  {
    name: "Taj Exotica Resort & Spa",
    city: "Benaulim, Goa",
    rating: 4.9,
    reviews: 1240,
    price: "₹14,500",
    image: "/images/dest-goa.jpg",
    badge: "5-Star Luxury",
    amenities: ["Private Beach", "Spa & Wellness", "Free Breakfast"],
  },
  {
    name: "Atlantis The Palm",
    city: "Palm Jumeirah, Dubai",
    rating: 4.8,
    reviews: 3420,
    price: "₹28,999",
    image: "/images/dest-dubai.jpg",
    badge: "Iconic Resort",
    amenities: ["Aquaventure Access", "Michelin Dining", "Private Balcony"],
  },
  {
    name: "The Khyber Himalayan Resort",
    city: "Gulmarg, Kashmir",
    rating: 4.9,
    reviews: 980,
    price: "₹18,200",
    image: "/images/dest-kashmir.jpg",
    badge: "Mountain Retreat",
    amenities: ["Heated Pool", "Ski Lift Proximity", "Mountain View"],
  },
];

export default function HotelsPage() {
  const [destination, setDestination] = useState("Goa");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Atmosphere Section */}
      <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-28 sm:pt-14 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/dest-dubai.jpg"
            alt="Luxury Hotel"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#14789C]/80 via-slate-900/85 to-[#FAF9F6]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F9DDAF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#784d12] shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#784d12]" />
              <span>Verified Hotel Deals & Resorts</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Book Luxury Stays & <span className="text-[#F9DDAF]">Boutique Hotels</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto">
              Choose from 250,000+ handpicked hotels, beachfront villas, and heritage stays with guaranteed best prices and instant confirmation.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Zero Booking Fees
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Free Cancellation on Select Rooms
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Pay At Hotel Available
              </span>
            </div>
          </div>

          {/* Hotel Search Widget */}
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Destination */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#14789C]/50 transition">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  City or Property
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#14789C] shrink-0" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter city or hotel name"
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#14789C]/50 transition">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Check-In
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#14789C] shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    Tomorrow, 25 Sep
                  </span>
                </div>
              </div>

              {/* Check-out */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#14789C]/50 transition">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Check-Out
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#14789C] shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    28 Sep (3 Nights)
                  </span>
                </div>
              </div>

              {/* Guests */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 hover:border-[#14789C]/50 transition">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Rooms & Guests
                </label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#14789C] shrink-0" />
                  <input
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-[#14789C]" />
                <span>Over 1,200 hotels inspected & certified for sanitation and service</span>
              </div>

              <button
                type="button"
                className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 rounded-2xl bg-[#14789C] hover:bg-[#0f5e7a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14789C]/25 transition"
              >
                <Search className="h-4 w-4" />
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* Featured Hotels */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
                Premier Stays
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Stays & Luxury Resorts
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Top rated accommodations loved by travelers for extraordinary hospitality.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredHotels.map((hotel) => (
              <div
                key={hotel.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#14789C]/30"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FAF9F6]/95 backdrop-blur-xs px-3 py-1 text-[11px] font-bold text-[#14789C] shadow-xs">
                    {hotel.badge}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-bold leading-tight drop-shadow-xs">
                      {hotel.name}
                    </p>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {hotel.city}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-1 rounded-md bg-[#14789C] px-2 py-0.5 text-xs font-bold text-white">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{hotel.rating}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-400">Per night from</p>
                      <p className="text-xl font-extrabold text-[#14789C]">
                        {hotel.price}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold">
                        + Free Breakfast
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
                    >
                      <span>Book Stay</span>
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
          title="Why Book Your Stay with Dev Holidays"
          subtitle="Direct partnerships with major hospitality chains, 100% verified properties, and 24/7 on-trip concierge."
        />
      </div>
    </main>
  );
}
