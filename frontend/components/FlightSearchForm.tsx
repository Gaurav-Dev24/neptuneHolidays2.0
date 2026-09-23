"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowLeftRight,
    Calendar,
    Users,
    Search,
    Plus,
    Minus,
    ChevronDown,
    Armchair,
    Check,
    PlaneTakeoff,
    Sparkles,
} from "lucide-react";

import AirportAutocomplete from "./AirportAutocomplete";
import CustomDatePicker from "./CustomDatePicker";

import type { Airport } from "@/lib/airport-api";
import type {
    CabinClass,
    FlightSearchRequest,
    TripType,
} from "@/lib/flight-api";

const flightSearchSchema = z.object({
    departureDate: z
        .string()
        .min(1, "Departure date is required"),

    returnDate: z.string().optional(),

    tripType: z.enum(["oneWay", "return"]),

    adult: z
        .number()
        .int()
        .min(1, "At least 1 adult is required"),

    child: z
        .number()
        .int()
        .min(0),

    infant: z
        .number()
        .int()
        .min(0),

    cabinClass: z.enum([
        "ECONOMY",
        "PREMIUM_ECONOMY",
        "BUSINESS",
        "FIRST",
    ]),
});

type FlightSearchFormValues = z.infer<typeof flightSearchSchema>;

interface FlightSearchFormProps {
    onSearch: (payload: FlightSearchRequest) => void;
}

const CABIN_CLASS_LABELS: Record<CabinClass, string> = {
    ECONOMY: "Economy",
    PREMIUM_ECONOMY: "Premium Economy",
    BUSINESS: "Business",
    FIRST: "First Class",
};

export default function FlightSearchForm({
    onSearch,
}: FlightSearchFormProps) {
    const [departureAirport, setDepartureAirport] =
        useState<Airport | null>(null);

    const [arrivalAirport, setArrivalAirport] =
        useState<Airport | null>(null);

    const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] =
        useState(false);

    const passengerDropdownRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FlightSearchFormValues>({
        resolver: zodResolver(flightSearchSchema),
        defaultValues: {
            tripType: "oneWay",
            adult: 1,
            child: 0,
            infant: 0,
            cabinClass: "ECONOMY",
            departureDate: "",
            returnDate: "",
        },
    });

    const tripType = watch("tripType");
    const adultCount = watch("adult");
    const childCount = watch("child");
    const infantCount = watch("infant");
    const cabinClass = watch("cabinClass");
    const departureDate = watch("departureDate");
    const returnDate = watch("returnDate");

    const totalPassengers = adultCount + childCount + infantCount;

    // Today's date string for input min attribute
    const today = new Date().toISOString().split("T")[0];

    // Close passenger dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                passengerDropdownRef.current &&
                !passengerDropdownRef.current.contains(event.target as Node)
            ) {
                setIsPassengerDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Swap departure and arrival airports
    function handleSwapAirports() {
        if (!departureAirport && !arrivalAirport) return;
        const temp = departureAirport;
        setDepartureAirport(arrivalAirport);
        setArrivalAirport(temp);
    }

    // Format human readable date preview
    function formatDatePreview(dateStr: string) {
        if (!dateStr) return null;
        try {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }).format(date);
        } catch {
            return null;
        }
    }

    function onSubmit(values: FlightSearchFormValues) {
        if (!departureAirport || !arrivalAirport) {
            return;
        }

        const payload: FlightSearchRequest = {
            departureAirportId: departureAirport.id,
            arrivalAirportId: arrivalAirport.id,
            departureDate: values.departureDate,
            returnDate:
                values.tripType === "return"
                    ? values.returnDate
                    : "",

            tripType: values.tripType,

            passengers: {
                adult: values.adult,
                child: values.child,
                infant: values.infant,
            },

            cabinClass: values.cabinClass,

            flexibleDates: false,

            directFlightsOnly: false,

            filters: {
                stops: [],
                airlines: [],
            },
        };

        onSearch(payload);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-30 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-8"
        >
            {/* Registered hidden inputs for React Hook Form */}
            <input type="hidden" {...register("tripType")} />
            <input
                type="hidden"
                {...register("adult", { valueAsNumber: true })}
            />
            <input
                type="hidden"
                {...register("child", { valueAsNumber: true })}
            />
            <input
                type="hidden"
                {...register("infant", { valueAsNumber: true })}
            />
            <input type="hidden" {...register("cabinClass")} />

            {/* Top Bar: Trip Type Pills & Passenger/Class Selector */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                {/* Trip Type Segmented Control */}
                <div className="flex items-center rounded-2xl bg-slate-100 p-1 text-sm font-medium">
                    <button
                        type="button"
                        onClick={() =>
                            setValue("tripType", "oneWay", {
                                shouldValidate: true,
                            })
                        }
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 ${tripType === "oneWay"
                            ? "bg-white text-[#14789C] shadow-sm font-semibold"
                            : "text-slate-600 hover:text-[#14789C]"
                            }`}
                    >
                        <PlaneTakeoff className="h-4 w-4" />
                        <span>One Way</span>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setValue("tripType", "return", {
                                shouldValidate: true,
                            })
                        }
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 ${tripType === "return"
                            ? "bg-white text-[#14789C] shadow-sm font-semibold"
                            : "text-slate-600 hover:text-[#14789C]"
                            }`}
                    >
                        <ArrowLeftRight className="h-4 w-4" />
                        <span>Round Trip</span>
                    </button>
                </div>

                {/* Passenger & Cabin Class Dropdown Trigger */}
                <div
                    ref={passengerDropdownRef}
                    className="relative"
                >
                    <button
                        type="button"
                        onClick={() =>
                            setIsPassengerDropdownOpen(
                                (prev) => !prev
                            )
                        }
                        className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs hover:border-[#14789C]/30 hover:bg-[#FAF9F6] transition"
                    >
                        <Users className="h-4 w-4 text-[#14789C]" />
                        <span>
                            {totalPassengers}{" "}
                            {totalPassengers === 1
                                ? "Passenger"
                                : "Passengers"}
                            , {CABIN_CLASS_LABELS[cabinClass]}
                        </span>
                        <ChevronDown
                            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isPassengerDropdownOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />
                    </button>

                    {/* Passenger & Cabin Class Floating Panel */}
                    {isPassengerDropdownOpen && (
                        <div className="absolute right-0 z-40 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-100 bg-white p-5 shadow-2xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 duration-150">
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Passengers
                            </h4>

                            <div className="space-y-4">
                                {/* Adults */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Adults
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Age 12+ years
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            disabled={adultCount <= 1}
                                            onClick={() =>
                                                setValue(
                                                    "adult",
                                                    Math.max(1, adultCount - 1),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-5 text-center text-sm font-semibold text-slate-900">
                                            {adultCount}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={adultCount >= 9}
                                            onClick={() =>
                                                setValue(
                                                    "adult",
                                                    Math.min(9, adultCount + 1),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Children
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Age 2 - 11 years
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            disabled={childCount <= 0}
                                            onClick={() =>
                                                setValue(
                                                    "child",
                                                    Math.max(0, childCount - 1),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-5 text-center text-sm font-semibold text-slate-900">
                                            {childCount}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={childCount >= 9}
                                            onClick={() =>
                                                setValue(
                                                    "child",
                                                    Math.min(9, childCount + 1),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Infants */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Infants
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Under 2 years
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            disabled={infantCount <= 0}
                                            onClick={() =>
                                                setValue(
                                                    "infant",
                                                    Math.max(0, infantCount - 1),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Minus className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="w-5 text-center text-sm font-semibold text-slate-900">
                                            {infantCount}
                                        </span>
                                        <button
                                            type="button"
                                            disabled={infantCount >= adultCount}
                                            onClick={() =>
                                                setValue(
                                                    "infant",
                                                    Math.min(
                                                        adultCount,
                                                        infantCount + 1
                                                    ),
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Cabin Class Selection */}
                            <div className="mt-6 border-t border-slate-100 pt-4">
                                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Cabin Class
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {(
                                        [
                                            "ECONOMY",
                                            "PREMIUM_ECONOMY",
                                            "BUSINESS",
                                            "FIRST",
                                        ] as CabinClass[]
                                    ).map((cls) => (
                                        <button
                                            key={cls}
                                            type="button"
                                            onClick={() =>
                                                setValue(
                                                    "cabinClass",
                                                    cls,
                                                    { shouldValidate: true }
                                                )
                                            }
                                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${cabinClass === cls
                                                ? "bg-[#14789C]/10 text-[#14789C] ring-1 ring-[#14789C]/30"
                                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                                }`}
                                        >
                                            <span>{CABIN_CLASS_LABELS[cls]}</span>
                                            {cabinClass === cls && (
                                                <Check className="h-3.5 w-3.5 text-[#14789C]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsPassengerDropdownOpen(false)
                                }
                                className="mt-5 w-full rounded-xl bg-[#14789C] hover:bg-[#0f5e7a] py-2.5 text-xs font-semibold text-white shadow-sm shadow-[#14789C]/25 transition"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Airport & Date Selection Grid */}
            <div className="grid gap-4 md:grid-cols-12 items-start">
                {/* From (Departure Airport) */}
                <div className="md:col-span-4">
                    <AirportAutocomplete
                        label="From"
                        placeholder="Departure airport or city"
                        selectedAirport={departureAirport}
                        type="departure"
                        onSelect={(airport) => {
                            setDepartureAirport(airport);
                            if (arrivalAirport?.id === airport.id) {
                                setArrivalAirport(null);
                            }
                        }}
                        onClear={() => setDepartureAirport(null)}
                    />
                </div>

                {/* Swap Airport Button */}
                <div className="flex flex-col items-center justify-start md:col-span-1">
                    <div className="hidden md:block h-5 mb-1.5" aria-hidden="true" />
                    <div className="flex h-[50px] items-center justify-center">
                        <button
                            type="button"
                            onClick={handleSwapAirports}
                            title="Swap airports"
                            className="group flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-xs transition hover:border-[#14789C]/40 hover:bg-[#14789C]/10 hover:text-[#14789C] active:scale-95"
                        >
                            <ArrowLeftRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                    </div>
                    <div className="min-h-[20px] mt-1.5 hidden md:block" aria-hidden="true" />
                </div>

                {/* To (Arrival Airport) */}
                <div className="md:col-span-4">
                    <AirportAutocomplete
                        label="To"
                        placeholder="Arrival airport or city"
                        selectedAirport={arrivalAirport}
                        type="arrival"
                        departureAirportId={departureAirport?.id ?? null}
                        onSelect={setArrivalAirport}
                        onClear={() => setArrivalAirport(null)}
                    />
                </div>

                {/* Departure Date */}
                <div
                    className={
                        tripType === "return"
                            ? "md:col-span-3"
                            : "md:col-span-3"
                    }
                >
                    <input type="hidden" {...register("departureDate")} />
                    <CustomDatePicker
                        label="Departure Date"
                        value={departureDate}
                        onChange={(dateStr) =>
                            setValue("departureDate", dateStr, {
                                shouldValidate: true,
                            })
                        }
                        minDate={today}
                        placeholder="Select departure date"
                        error={errors.departureDate?.message}
                        align="right"
                        position="bottom"
                        popoverClassName="sm:right-[210px]"
                    />
                </div>

                {/* Return Date (When Trip Type is Return) */}
                {tripType === "return" && (
                    <div className="md:col-span-12 lg:col-span-4 mt-2 md:mt-0">
                        <input type="hidden" {...register("returnDate")} />
                        <CustomDatePicker
                            label="Return Date"
                            value={returnDate ?? ""}
                            onChange={(dateStr) =>
                                setValue("returnDate", dateStr, {
                                    shouldValidate: true,
                                })
                            }
                            minDate={departureDate || today}
                            placeholder="Select return date"
                            error={errors.returnDate?.message}
                            align="right"
                            position="bottom"
                            popoverClassName="sm:right-[210px]"
                            onClear={() =>
                                setValue("returnDate", "", {
                                    shouldValidate: true,
                                })
                            }
                        />
                    </div>
                )}
            </div>

            {/* Validation Error Notices for Passengers */}
            {(errors.adult || errors.child || errors.infant) && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-600">
                    {errors.adult?.message ||
                        errors.child?.message ||
                        errors.infant?.message}
                </div>
            )}

            {/* Bottom Actions: Search Button & Helper */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Sparkles className="h-4 w-4 text-[#14789C] shrink-0" />
                    <span>
                        {!departureAirport || !arrivalAirport
                            ? "Select departure and destination airports to view available flights"
                            : `Searching routes from ${departureAirport.city} (${departureAirport.code}) to ${arrivalAirport.city} (${arrivalAirport.code})`}
                    </span>
                </div>

                <button
                    type="submit"
                    disabled={!departureAirport || !arrivalAirport}
                    className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2 rounded-2xl bg-[#14789C] hover:bg-[#0f5e7a] active:bg-[#0c4e66] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14789C]/25 transition-all duration-200 hover:shadow-[#14789C]/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none border border-[#14789C]"
                >
                    <Search className="h-4 w-4" />
                    <span>Search Flights</span>
                </button>
            </div>
        </form>
    );
}