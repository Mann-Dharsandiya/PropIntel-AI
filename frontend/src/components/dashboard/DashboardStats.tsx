 import { Heart, Eye, ArrowUpRight } from "lucide-react";
import { DashboardStats as Stats } from "@/api/dashboard";

interface Props {
  stats: Stats;
}

const cards = [
  {
    key: "favorites",
    title: "Saved Properties",
    description: "Properties you've saved",
    icon: Heart,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-100",
  },
  {
    key: "recentlyViewed",
    title: "Recently Viewed",
    description: "Properties you've explored",
    icon: Eye,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-100",
  },
] as const;

export default function DashboardStats({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="pi-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover md:p-7"
          >
            {/* Decorative background */}
            <div
              className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${card.iconBg} opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-125`}
            />

            <div className="relative flex items-center justify-between gap-5">

              {/* =================================================
                  Left Content
              ================================================= */}
              <div className="min-w-0">

                {/* Label */}
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-500">
                    {card.title}
                  </p>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                {/* Number */}
                <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                  {stats[card.key]}
                </h2>

                {/* Description */}
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  {card.description}
                </p>

              </div>

              {/* =================================================
                  Icon
              ================================================= */}
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${card.iconBorder} ${card.iconBg} transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}
              >
                <Icon
                  size={28}
                  strokeWidth={1.8}
                  className={card.iconColor}
                />
              </div>

            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blueprint-700 to-brass-500 transition-all duration-500 group-hover:w-full" />
          </div>
        );
      })}

    </div>
  );
}