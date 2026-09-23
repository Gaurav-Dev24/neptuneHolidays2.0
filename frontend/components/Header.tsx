"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    PlaneTakeoff,
    Hotel,
    Palmtree,
    FileText,
    Sparkles,
    Luggage,
    PhoneCall,
    Building2,
    User,
    Menu,
    X,
    ChevronDown,
    Globe,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    isExternal?: boolean;
}

const navItems: NavItem[] = [
    {
        label: "Flights",
        href: "/",
        icon: PlaneTakeoff,
    },
    {
        label: "Hotels",
        href: "/hotels",
        icon: Hotel,
    },
    {
        label: "Holidays",
        href: "/holidays",
        icon: Palmtree,
    },
    {
        label: "Visa",
        href: "/visa",
        icon: FileText,
    },
    {
        label: "Offers",
        href: "/offers",
        icon: Sparkles,
        badge: "Hot",
    },
];

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll for subtle elevation and blur
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change or Escape key
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-200 ${
                isScrolled
                    ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-xs border-b border-[#F9DDAF]/40"
                    : "bg-[#FAF9F6] border-b border-slate-200/70"
            }`}
        >
            {/* Top Micro-Bar (Support, Currency, Bookings, B2B) */}
            <div className="hidden lg:block border-b border-slate-200/50 bg-[#FAF9F6]/80 text-xs text-slate-600">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#14789C]/10 text-[#14789C]">
                                <PhoneCall className="h-3 w-3 stroke-[2.2]" />
                            </span>
                            24/7 Support:{" "}
                            <span className="text-slate-900 font-semibold tracking-tight">
                                +91 (0) 120 488 4888
                            </span>
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 font-medium">
                            IATA Accredited & Govt. Recognized
                        </span>
                    </div>

                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            className="flex items-center gap-1 text-slate-600 hover:text-[#14789C] transition-colors"
                        >
                            <Globe className="h-3.5 w-3.5 text-[#14789C]" />
                            <span className="font-medium">INR (₹)</span>
                            <ChevronDown className="h-3 w-3 text-slate-400" />
                        </button>
                        <span className="text-slate-300">|</span>
                        <Link
                            href="/trips"
                            className="flex items-center gap-1.5 text-slate-600 hover:text-[#14789C] transition-colors font-medium"
                        >
                            <Luggage className="h-3.5 w-3.5 text-[#14789C]" />
                            <span>My Bookings</span>
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link
                            href="/b2b"
                            className="font-semibold text-[#14789C] hover:text-[#0f5e7a] transition-colors flex items-center gap-1"
                        >
                            <Building2 className="h-3 w-3" />
                            <span>Partner / B2B Portal</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14789C] rounded-2xl py-1 transition-transform duration-200"
                        aria-label="Dev Holidays Home"
                    >
                        <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/dev-logo.png"
                                alt="Dev Holidays"
                                width={100}
                                height={100}
                                className="h-full w-full object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav
                        aria-label="Main Navigation"
                        className="hidden md:flex items-center gap-1 lg:gap-1.5"
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-[#14789C]/10 text-[#14789C] font-semibold shadow-xs"
                                            : "text-slate-600 hover:text-[#14789C] hover:bg-white/80"
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                            isActive
                                                ? "text-[#14789C] stroke-[2.2] scale-105"
                                                : "text-slate-400 group-hover:text-[#14789C]"
                                        }`}
                                    />
                                    <span>{item.label}</span>

                                    {item.badge && (
                                        <span className="rounded-full bg-[#F9DDAF] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#784d12] border border-[#f3ce92] shadow-xs">
                                            {item.badge}
                                        </span>
                                    )}

                                    {isActive && (
                                        <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#14789C]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            href="/trips"
                            className="hidden sm:inline-flex md:hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#14789C] hover:bg-white rounded-xl transition-colors"
                        >
                            <Luggage className="h-4 w-4 text-[#14789C]" />
                            <span>Trips</span>
                        </Link>

                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] active:bg-[#0c4e66] text-white px-4 py-2 sm:py-2.5 text-sm font-semibold shadow-sm shadow-[#14789C]/25 border border-[#14789C] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14789C] focus-visible:ring-offset-2"
                        >
                            <User className="h-4 w-4" />
                            <span>Sign In</span>
                        </Link>

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation menu"
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-[#14789C]/10 hover:text-[#14789C] hover:border-[#14789C]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14789C] transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay & Drawer */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 top-[65px] z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
                        aria-hidden="true"
                    />

                    {/* Sliding Drawer */}
                    <div className="fixed inset-x-0 top-[65px] z-50 max-h-[calc(100vh-65px)] overflow-y-auto bg-[#FAF9F6] border-b border-[#F9DDAF]/40 shadow-xl md:hidden">
                        <div className="px-4 py-5 space-y-6">
                            {/* Navigation items */}
                            <div className="space-y-1">
                                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Travel Services
                                </p>
                                <div className="mt-2 space-y-1">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive =
                                            item.href === "/"
                                                ? pathname === "/"
                                                : pathname.startsWith(item.href);

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-[#14789C]/10 text-[#14789C] font-semibold"
                                                        : "text-slate-700 hover:bg-white hover:text-[#14789C]"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`p-2 rounded-lg ${
                                                            isActive
                                                                ? "bg-[#14789C] text-white"
                                                                : "bg-white text-slate-600 border border-slate-200/60"
                                                        }`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <span>{item.label}</span>
                                                </div>

                                                {item.badge && (
                                                    <span className="rounded-full bg-[#F9DDAF] px-2 py-0.5 text-xs font-bold text-[#784d12] border border-[#f3ce92]">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Additional Links / Utilities */}
                            <div className="border-t border-slate-200/60 pt-5 space-y-2">
                                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Account & Support
                                </p>
                                <Link
                                    href="/trips"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-white hover:text-[#14789C] transition-colors"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200/60 text-[#14789C]">
                                        <Luggage className="h-4 w-4" />
                                    </div>
                                    <span>My Bookings & Trips</span>
                                </Link>

                                <Link
                                    href="/b2b"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#14789C] hover:bg-white transition-colors"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14789C]/10 text-[#14789C]">
                                        <Building2 className="h-4 w-4" />
                                    </div>
                                    <span className="font-semibold">B2B Agent Portal</span>
                                </Link>

                                <div className="flex items-center justify-between px-3.5 py-2.5 text-sm text-slate-600">
                                    <span className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-[#14789C]" />
                                        <span>Currency</span>
                                    </span>
                                    <span className="font-semibold text-slate-800">
                                        INR (₹)
                                    </span>
                                </div>
                            </div>

                            {/* Contact Box in mobile menu */}
                            <div className="rounded-2xl bg-white p-4 border border-[#F9DDAF]/60 shadow-xs">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14789C]/10 text-[#14789C]">
                                        <PhoneCall className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">
                                            Need Help Booking?
                                        </p>
                                        <p className="text-sm font-bold text-slate-900 tracking-tight">
                                            +91 (0) 120 488 4888
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
