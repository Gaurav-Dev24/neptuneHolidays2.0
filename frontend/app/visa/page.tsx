"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  UploadCloud,
  FileCheck,
  Headphones,
} from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";

const popularVisas = [
  {
    country: "United Arab Emirates (Dubai)",
    type: "Tourist Visa (30 Days)",
    processing: "24 - 48 Hours",
    price: "₹6,499",
    flag: "🇦🇪",
    badge: "Express Available",
    docs: ["Passport Front & Back", "Passport-size Photo", "Confirmed Return Ticket"],
  },
  {
    country: "Singapore",
    type: "Multiple Entry e-Visa (30 Days)",
    processing: "3 - 4 Working Days",
    price: "₹2,899",
    flag: "🇸🇬",
    badge: "99.4% Approval Rate",
    docs: ["Passport Copy (6 months valid)", "Form 14A", "Bank Statement (Last 3 Months)"],
  },
  {
    country: "Thailand",
    type: "Tourist e-Visa On Arrival",
    processing: "1 - 3 Days",
    price: "₹3,199",
    flag: "🇹🇭",
    badge: "Hassle-Free",
    docs: ["Passport Scan", "Hotel Accommodation Proof", "Flight Itinerary"],
  },
  {
    country: "United Kingdom (UK)",
    type: "Standard Visitor Visa (6 Months)",
    processing: "15 Working Days",
    price: "₹14,990",
    flag: "🇬🇧",
    badge: "Expert Assistance",
    docs: ["Financial Proofs", "Employment Letter", "Complete Itinerary"],
  },
  {
    country: "Schengen (Europe)",
    type: "Short Stay Tourist Visa (90 Days)",
    processing: "15 Working Days",
    price: "₹12,499",
    flag: "🇪🇺",
    badge: "Full File Preparation",
    docs: ["Cover Letter", "Travel Insurance (€30,000+)", "Flight & Hotel Bookings"],
  },
  {
    country: "United States (US B1/B2)",
    type: "Non-Immigrant Visitor Visa (10 Years)",
    processing: "Appointment Dependent",
    price: "₹16,800",
    flag: "🇺🇸",
    badge: "Mock Interview Support",
    docs: ["DS-160 Confirmation", "Appointment Letter", "Financial Sponsorship"],
  },
];

const visaSteps = [
  {
    icon: Search,
    title: "1. Select Destination",
    description: "Choose your destination country and select the appropriate visa type for your trip.",
  },
  {
    icon: UploadCloud,
    title: "2. Upload Documents",
    description: "Upload basic digital copies of your passport and photos through our secure portal.",
  },
  {
    icon: FileCheck,
    title: "3. Expert File Verification",
    description: "Our certified visa specialists review and optimize your file to prevent rejections.",
  },
  {
    icon: CheckCircle2,
    title: "4. Receive Approved Visa",
    description: "Get your electronic visa delivered straight to your email or stamped passport returned.",
  },
];

export default function VisaPage() {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Atmosphere Section */}
      <section className="relative bg-slate-900 pb-20 pt-8 sm:pb-28 sm:pt-14 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/dest-dubai.jpg"
            alt="International Visa"
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
              <span>Certified Embassy Assistance Desk</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Fast, Reliable <span className="text-[#F9DDAF]">Visa Services</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-200/90 max-w-2xl mx-auto">
              Get seamless tourist, transit, and business visa assistance for 60+ countries with expert documentation support and a 99.2% approval track record.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                99.2% Approval Rate
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                End-to-End Document Review
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#F9DDAF]" />
                Direct Embassy Coordination
              </span>
            </div>
          </div>

          {/* Visa Quick Search Box */}
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-5">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 w-full">
                <Globe className="h-5 w-5 text-[#14789C] shrink-0" />
                <input
                  type="text"
                  placeholder="Where are you traveling to? (e.g. Dubai, Singapore, UK)"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-800 focus:outline-none bg-transparent"
                />
              </div>

              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#14789C] hover:bg-[#0f5e7a] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14789C]/25 transition shrink-0"
              >
                <Search className="h-4 w-4" />
                <span>Find Visa</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* Visa Process Steps */}
        <section className="mb-20 rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
              Simple & Transparent
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Visa Processing Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visaSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col items-center text-center space-y-3 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Countries Grid */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
              Most Requested
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Popular Visa Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear fees, required checklist, and expedited turnaround times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularVisas.map((visa) => (
              <div
                key={visa.country}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-xl hover:border-[#14789C]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{visa.flag}</span>
                    <span className="rounded-full bg-[#14789C]/10 px-3 py-1 text-xs font-bold text-[#14789C]">
                      {visa.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{visa.country}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{visa.type}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-600">
                    <Clock className="h-4 w-4 text-[#14789C]" />
                    <span>Processing: {visa.processing}</span>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Key Documents Needed:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {visa.docs.map((doc) => (
                        <li key={doc} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400">All-Inclusive Fee</p>
                    <p className="text-xl font-extrabold text-[#14789C]">{visa.price}</p>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <WhyChooseUs
          title="Why Choose Dev Holidays Visa Services"
          subtitle="Experienced in-house visa officers, transparent fee structure, and end-to-end status tracking."
        />
      </div>
    </main>
  );
}
