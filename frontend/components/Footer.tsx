"use client";

import Image from "next/image";
import Link from "next/link";
import {
    PhoneCall,
    Mail,
    MapPin,
    ShieldCheck,
    CreditCard,
    Award,
    HeartHandshake,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-200/80 bg-white text-slate-600">
            {/* Trust and Values Bar */}
            <div className="border-b border-slate-100 bg-[#FAF9F6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                                <ShieldCheck className="h-6 w-6 stroke-[2]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Secure Bookings
                                </p>
                                <p className="text-xs text-slate-500">
                                    256-bit encrypted checkout
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                                <Award className="h-6 w-6 stroke-[2]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    IATA Accredited
                                </p>
                                <p className="text-xs text-slate-500">
                                    Govt. registered operator
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                                <HeartHandshake className="h-6 w-6 stroke-[2]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Best Fare Promise
                                </p>
                                <p className="text-xs text-slate-500">
                                    No hidden convenience fees
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                                <PhoneCall className="h-6 w-6 stroke-[2]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    24/7 Live Support
                                </p>
                                <p className="text-xs text-slate-500">
                                    Certified travel desk
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="relative h-14 w-14">
                                <Image
                                    src="/dev-logo.png"
                                    alt="Dev Holidays"
                                    width={56}
                                    height={56}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                            Dev Holidays is a premier full-service travel platform providing seamless flight ticketing, luxury hotel accommodations, customized holiday packages, and visa advisory services across 100+ destinations worldwide.
                        </p>
                        <div className="pt-2 text-xs space-y-1.5 text-slate-500">
                            <p className="flex items-center gap-2">
                                <PhoneCall className="h-3.5 w-3.5 text-[#14789C]" />
                                <span>Support Desk: +91 (0) 120 488 4888</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-[#14789C]" />
                                <span>Email: reservations@devholidays.com</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-[#14789C]" />
                                <span>Registered Office: New Delhi • Kolkata • Mumbai</span>
                            </p>
                        </div>
                    </div>

                    {/* Travel Services */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                            Travel Services
                        </p>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-[#14789C] transition-colors">
                                    Flight Search & Deals
                                </Link>
                            </li>
                            <li>
                                <Link href="/hotels" className="hover:text-[#14789C] transition-colors">
                                    Hotels & Resorts
                                </Link>
                            </li>
                            <li>
                                <Link href="/holidays" className="hover:text-[#14789C] transition-colors">
                                    Holiday Tour Packages
                                </Link>
                            </li>
                            <li>
                                <Link href="/visa" className="hover:text-[#14789C] transition-colors">
                                    Visa Advisory & Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/b2b" className="hover:text-[#14789C] transition-colors font-medium text-[#14789C]">
                                    B2B Agent Partner Portal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Routes */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                            Popular Flight Routes
                        </p>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <span className="hover:text-[#14789C] cursor-pointer transition-colors">
                                    Kolkata to Delhi Flights
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-[#14789C] cursor-pointer transition-colors">
                                    Delhi to Mumbai Flights
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-[#14789C] cursor-pointer transition-colors">
                                    Bengaluru to Goa Flights
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-[#14789C] cursor-pointer transition-colors">
                                    Delhi to Dubai Flights
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-[#14789C] cursor-pointer transition-colors">
                                    Mumbai to Bangkok Flights
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Trust & Newsletter */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                            Stay Updated
                        </p>
                        <p className="text-xs text-slate-500 mb-3">
                            Subscribe for exclusive secret flight sales and seasonal holiday discounts.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-200 bg-[#FAF9F6] px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#14789C] focus:ring-2 focus:ring-[#14789C]/15"
                            />
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] text-white py-2 text-xs font-semibold shadow-sm shadow-[#14789C]/25 transition"
                            >
                                Get Flight Offers
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Payment Badges */}
                <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        © {new Date().getFullYear()} Dev Holidays (Neptune Holidays 2.0). All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-[11px]">
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                            <CreditCard className="h-4 w-4 text-[#14789C]" />
                            <span>100% Verified Payment Partners</span>
                        </span>
                        <span>•</span>
                        <span className="hover:text-[#14789C] cursor-pointer">Privacy Policy</span>
                        <span>•</span>
                        <span className="hover:text-[#14789C] cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
