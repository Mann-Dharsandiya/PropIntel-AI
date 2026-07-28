 import { Heart, Eye } from "lucide-react";
import { DashboardStats as Stats } from "@/api/dashboard";

interface Props {
  stats: Stats;
}

const cards = [
  {
    key: "favorites",
    title: "Saved Properties",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    key: "recentlyViewed",
    title: "Recently Viewed",
    icon: Eye,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
] as const;

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {stats[card.key]}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}