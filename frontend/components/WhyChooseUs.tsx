import { Zap, Tag, ShieldCheck, Headphones } from "lucide-react";

export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: Zap,
    title: "Instant E-Ticketing",
    description:
      "Get real-time airline PNRs and confirmed e-tickets delivered directly to your inbox and WhatsApp within seconds.",
  },
  {
    icon: Tag,
    title: "Best Fare Guarantee",
    description:
      "Direct API integrations with 500+ global and domestic airlines ensure zero markup and guaranteed lowest rates.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Hidden Convenience Fees",
    description:
      "What you see is what you pay. Transparent pricing with full breakdown of airline taxes and fuel surcharges.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Concierge",
    description:
      "Round-the-clock priority flight support for cancellations, date changes, seat selections, and airport assistance.",
  },
];

interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
}

export default function WhyChooseUs({
  title = "Why Travelers Trust Dev Holidays",
  subtitle = "Combining world-class airline partnerships with reliable local technology for effortless bookings.",
  features = defaultFeatures,
}: WhyChooseUsProps) {
  return (
    <section className="mb-20 rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-xs">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#14789C]">
          The Dev Holidays Difference
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 p-4 rounded-2xl hover:bg-[#FAF9F6] transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14789C]/10 text-[#14789C]">
                <Icon className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
