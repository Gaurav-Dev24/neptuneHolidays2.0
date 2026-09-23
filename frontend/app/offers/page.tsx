"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Percent,
  Tag,
  Copy,
  Check,
  CreditCard,
  Plane,
  Hotel,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";

const activeCoupons = [
  {
    code: "FLYDEV15",
    discount: "15% OFF",
    category: "Flights",
    title: "Flat 15% Instant Savings on Domestic Flights",
    description: "Valid on all direct and connecting flights operated by IndiGo, Air India, and SpiceJet.",
    minSpend: "Min booking: ₹3,500",
    validTill: "Valid till 31 Oct 2026",
    badge: "Trending",
  },
  {
    code: "HOTELDEV20",
    discount: "20% OFF",
    category: "Hotels",
    title: "Up to 20% OFF on Luxury Resorts & Stays",
    description: "Applicable on premium 4-star and 5-star properties across Goa, Dubai, and Kashmir.",
    minSpend: "Min booking: ₹6,000",
    validTill: "Valid till 15 Nov 2026",
    badge: "Exclusive",
  },
  {
    code: "HDFCTRAVEL",
    discount: "₹2,500 OFF",
    category: "Bank Offer",
    title: "Instant Discount with HDFC Bank Credit Cards",
    description: "Extra flat discount on international flights and packages with flexible 3/6-month no-cost EMI.",
    minSpend: "Min booking: ₹15,000",
    validTill: "Valid on Fridays & Saturdays",
    badge: "Bank Partner",
  },
  {
    code: "KASHMIRDEV",
    discount: "₹3,000 OFF",
    category: "Holidays",
    title: "Flat ₹3,000 OFF on Complete Kashmir Holiday Packages",
    description: "Includes roundtrip airfare, 4-star hotel stay, private Dal Lake shikara, and daily breakfast.",
    minSpend: "Min booking: ₹18,000",
    validTill: "Valid till 30 Nov 2026",
    badge: "Seasonal",
  },
  {
    code: "ICICIFLIGHT",
    discount: "12% OFF",
    category: "Bank Offer",
    title: "Special Savings for ICICI Bank Cardholders",
    description: "Zero convenience fees plus flat 12% instant reduction on business and economy airline seats.",
    minSpend: "Min booking: ₹5,000",
    validTill: "Valid till 31 Dec 2026",
    badge: "Bank Partner",
  },
  {
    code: "DUBAIWEEKEND",
    discount: "₹4,500 OFF",
    category: "International",
    title: "Save on Dubai Winter & Shopping Festival Packages",
    description: "Enjoy special airfare discounts and complimentary desert safari on select Dubai departures.",
    minSpend: "Min booking: ₹35,000",
    validTill: "Valid till 31 Jan 2027",
    badge: "Bestseller",
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Flights", "Hotels", "Bank Offer", "Holidays", "International"];

  const filtered =
    filter === "All"
      ? activeCoupons
      : activeCoupons.filter((c) => c.category === filter);

  function handleCopy(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Atmosphere Section */}
      <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-28 sm:pt-14 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/hero-flight-banner.jpg"
            alt="Travel Offers"
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
              <span>Verified Discount Codes & Bank Partnerships</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Exclusive Travel Deals & <span className="text-[#F9DDAF]">Promo Codes</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto">
              Unlock huge savings on domestic & international flights, luxury hotel stays, and curated holiday packages with our verified coupon codes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${
                  filter === cat
                    ? "bg-[#F9DDAF] text-[#784d12] shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filtered.map((item) => {
            const isCopied = copiedCode === item.code;
            return (
              <div
                key={item.code}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-xl hover:border-[#14789C]/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-[#14789C]/10 px-3 py-1 text-xs font-bold text-[#14789C]">
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-2xl font-black text-[#14789C]">
                      {item.discount}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-col gap-1 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                    <span>{item.minSpend}</span>
                    <span className="flex items-center gap-1 text-amber-600/90 font-medium">
                      <Clock className="h-3 w-3" />
                      {item.validTill}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="rounded-xl border border-dashed border-[#14789C]/40 bg-[#14789C]/5 px-3 py-1.5 font-mono text-xs font-bold text-[#14789C]">
                    {item.code}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.code)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-4 py-2 text-xs font-bold transition shadow-sm"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <WhyChooseUs
          title="Book with Confidence at Dev Holidays"
          subtitle="All coupons and promotional fares are 100% verified directly with airline reservation systems."
        />
      </div>
    </main>
  );
}
