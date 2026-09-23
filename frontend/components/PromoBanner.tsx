"use client";

import { Percent } from "lucide-react";
import { useState } from "react";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("FLYDEV15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className="mb-16 rounded-3xl bg-gradient-to-r from-[#14789C] via-[#0f5e7a] to-[#0c4e66] p-6 sm:p-8 text-white shadow-xl shadow-[#14789C]/15">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F9DDAF] text-[#784d12] shadow-sm">
            <Percent className="h-7 w-7 stroke-[2.5]" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase mb-1">
              Limited Time Offer
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Get up to 15% OFF on your first domestic booking
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              Use coupon code at checkout for instant fare deduction.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl border-2 border-dashed border-[#F9DDAF] bg-white/10 px-4 py-2 text-center">
            <p className="text-[10px] uppercase font-semibold text-[#F9DDAF]">
              Promo Code
            </p>
            <p className="text-base sm:text-lg font-mono font-bold tracking-wider text-white">
              FLYDEV15
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-2xl bg-[#F9DDAF] hover:bg-[#f3ce92] text-[#784d12] px-5 py-3 text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>
    </section>
  );
}
