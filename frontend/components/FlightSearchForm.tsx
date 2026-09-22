"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AirportAutocomplete from "./AirportAutocomplete";

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

type FlightSearchFormValues = z.infer<
    typeof flightSearchSchema
>;

interface FlightSearchFormProps {
    onSearch: (payload: FlightSearchRequest) => void;
}

export default function FlightSearchForm({
    onSearch,
}: FlightSearchFormProps) {
    const [departureAirport, setDepartureAirport] =
        useState<Airport | null>(null);

    const [arrivalAirport, setArrivalAirport] =
        useState<Airport | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
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
            className="rounded-2xl border bg-white p-6 shadow-sm"
        >
            <div className="mb-6 flex gap-6">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        value="oneWay"
                        {...register("tripType")}
                    />
                    One Way
                </label>

                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        value="return"
                        {...register("tripType")}
                    />
                    Return
                </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <AirportAutocomplete
                    label="From"
                    placeholder="Departure airport"
                    selectedAirport={departureAirport}
                    type="departure"
                    onSelect={(airport) => {
                        setDepartureAirport(airport);

                        if (
                            arrivalAirport?.id === airport.id
                        ) {
                            setArrivalAirport(null);
                        }
                    }}
                />

                <AirportAutocomplete
                    label="To"
                    placeholder="Arrival airport"
                    selectedAirport={arrivalAirport}
                    type="arrival"
                    departureAirportId={
                        departureAirport?.id ?? null
                    }
                    onSelect={setArrivalAirport}
                />

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Departure
                    </label>

                    <input
                        type="date"
                        {...register("departureDate")}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.departureDate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.departureDate.message}
                        </p>
                    )}
                </div>

                {tripType === "return" && (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Return
                        </label>

                        <input
                            type="date"
                            {...register("returnDate")}
                            className="w-full rounded-xl border px-4 py-3"
                        />
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Adults
                    </label>

                    <input
                        type="number"
                        min={1}
                        {...register("adult", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.adult && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.adult.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Children
                    </label>

                    <input
                        type="number"
                        min={0}
                        {...register("child", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.child && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.child.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Infants
                    </label>

                    <input
                        type="number"
                        min={0}
                        {...register("infant", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    {errors.infant && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.infant.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Cabin Class
                    </label>

                    <select
                        {...register("cabinClass")}
                        className="w-full rounded-xl border px-4 py-3"
                    >
                        <option value="ECONOMY">
                            Economy
                        </option>

                        <option value="PREMIUM_ECONOMY">
                            Premium Economy
                        </option>

                        <option value="BUSINESS">
                            Business
                        </option>

                        <option value="FIRST">
                            First
                        </option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={
                    !departureAirport ||
                    !arrivalAirport
                }
                className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                Search Flights
            </button>
        </form>
    );
}