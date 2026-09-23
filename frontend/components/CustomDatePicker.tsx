"use client";

import { useEffect, useRef, useState } from "react";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

interface CustomDatePickerProps {
    label: string;
    value: string; // "YYYY-MM-DD"
    onChange: (dateStr: string) => void;
    minDate?: string; // "YYYY-MM-DD"
    placeholder?: string;
    error?: string;
    onClear?: () => void;
    align?: "left" | "right";
}

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseDate(str: string): { year: number; month: number; day: number } | null {
    if (!str) return null;
    const parts = str.split("-");
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return { year, month, day };
}

function formatDateString(year: number, month: number, day: number): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export default function CustomDatePicker({
    label,
    value,
    onChange,
    minDate,
    placeholder = "Select date",
    error,
    onClear,
    align = "left",
}: CustomDatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Current viewing month and year in the calendar
    const parsedInitial = parseDate(value) || parseDate(minDate || "") || {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
    };

    const [viewYear, setViewYear] = useState(parsedInitial.year);
    const [viewMonth, setViewMonth] = useState(parsedInitial.month);

    // Update viewing month when value or minDate changes
    useEffect(() => {
        const parsed = parseDate(value);
        if (parsed) {
            setViewYear(parsed.year);
            setViewMonth(parsed.month);
        }
    }, [value]);

    // Close calendar on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Month navigation handlers
    function handlePrevMonth() {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y) => y - 1);
        } else {
            setViewMonth((m) => m - 1);
        }
    }

    function handleNextMonth() {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y) => y + 1);
        } else {
            setViewMonth((m) => m + 1);
        }
    }

    // Check if previous month navigation should be disabled based on minDate
    const parsedMin = parseDate(minDate || "");
    const isPrevMonthDisabled = parsedMin
        ? viewYear < parsedMin.year ||
          (viewYear === parsedMin.year && viewMonth <= parsedMin.month)
        : false;

    // Calculate calendar grid days
    const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Check if a day is today
    const now = new Date();
    const todayStr = formatDateString(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    function handleSelectDate(day: number) {
        const selected = formatDateString(viewYear, viewMonth, day);
        onChange(selected);
        setIsOpen(false);
    }

    function handleQuickSelect(daysFromToday: number) {
        const d = new Date();
        d.setDate(d.getDate() + daysFromToday);
        const dateStr = formatDateString(
            d.getFullYear(),
            d.getMonth(),
            d.getDate()
        );
        if (!minDate || dateStr >= minDate) {
            onChange(dateStr);
            setIsOpen(false);
        }
    }

    // Display formatted text inside input
    const parsedVal = parseDate(value);
    let displayMain = placeholder;
    let displaySub: string | null = null;

    if (parsedVal) {
        const d = new Date(parsedVal.year, parsedVal.month, parsedVal.day);
        const dayOfWeek = new Intl.DateTimeFormat("en-IN", {
            weekday: "short",
        }).format(d);
        const monthShort = new Intl.DateTimeFormat("en-IN", {
            month: "short",
        }).format(d);
        displayMain = `${parsedVal.day} ${monthShort} ${parsedVal.year}`;
        displaySub = dayOfWeek;
    }

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Standardized Header */}
            <div className="flex items-center justify-between mb-1.5 h-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                </label>
                {displaySub && (
                    <span className="text-[11px] font-semibold text-[#14789C] bg-[#14789C]/10 px-2 py-0.5 rounded-full">
                        {displaySub}
                    </span>
                )}
            </div>

            {/* Input Trigger Button */}
            <div className="relative group">
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={`h-[50px] w-full rounded-2xl border bg-white py-2 pl-11 pr-10 text-left transition-all duration-200 shadow-xs flex items-center justify-between ${
                        isOpen
                            ? "border-[#14789C] ring-4 ring-[#14789C]/15"
                            : error
                            ? "border-red-300 hover:border-red-400"
                            : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14789C] transition-colors">
                        <CalendarIcon className="h-5 w-5" />
                    </div>

                    <div className="truncate">
                        {parsedVal ? (
                            <span className="text-sm font-semibold text-slate-900">
                                {displayMain}
                            </span>
                        ) : (
                            <span className="text-sm font-normal text-slate-400">
                                {placeholder}
                            </span>
                        )}
                    </div>
                </button>

                {value && onClear && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClear();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                        aria-label={`Clear ${label}`}
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>

            {/* Standardized Helper / Error slot */}
            <div className="min-h-[20px] mt-1.5">
                {error && (
                    <p className="text-xs font-medium text-red-600">{error}</p>
                )}
            </div>

            {/* Interactive Floating Calendar Popover */}
            {isOpen && (
                <div
                    className={`absolute ${
                        align === "right" ? "right-0" : "left-0"
                    } z-50 mt-1 w-80 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95 duration-150`}
                >
                    {/* Calendar Month & Year Nav */}
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-800">
                            {MONTH_NAMES[viewMonth]} {viewYear}
                        </h4>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                disabled={isPrevMonthDisabled}
                                onClick={handlePrevMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                                aria-label="Previous month"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNextMonth}
                                className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                                aria-label="Next month"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-slate-400">
                        {WEEKDAY_NAMES.map((w) => (
                            <div key={w} className="py-1">
                                {w}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Empty spacer days before first day */}
                        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                            <div key={`empty-${idx}`} className="h-9 w-9" />
                        ))}

                        {/* Month Days */}
                        {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const day = idx + 1;
                            const dateStr = formatDateString(
                                viewYear,
                                viewMonth,
                                day
                            );
                            const isSelected = value === dateStr;
                            const isToday = todayStr === dateStr;
                            const isDisabled = Boolean(
                                minDate && dateStr < minDate
                            );

                            return (
                                <button
                                    key={dateStr}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => handleSelectDate(day)}
                                    className={`relative flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                                        isSelected
                                            ? "bg-[#14789C] text-white shadow-md shadow-[#14789C]/25"
                                            : isDisabled
                                            ? "text-slate-300 cursor-not-allowed"
                                            : "text-slate-700 hover:bg-[#14789C]/10 hover:text-[#14789C]"
                                    }`}
                                >
                                    {day}
                                    {isToday && !isSelected && (
                                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#14789C]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Select Actions */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => handleQuickSelect(0)}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700 hover:bg-[#14789C]/10 hover:text-[#14789C] transition"
                            >
                                Today
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickSelect(1)}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700 hover:bg-[#14789C]/10 hover:text-[#14789C] transition"
                            >
                                Tomorrow
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="font-semibold text-[#14789C] hover:text-[#0f5e7a] transition px-2 py-1"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
