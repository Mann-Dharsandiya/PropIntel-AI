 import { Link } from "react-router-dom";
import {
  Search,
  Brain,
  BarChart3,
  Home,
  ArrowUpRight,
} from "lucide-react";

const actions = [
  {
    title: "Browse Properties",
    description: "Explore available properties",
    icon: Home,
    link: "/properties",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-100",
  },
  {
    title: "Predict Price",
    description: "Get an AI price estimate",
    icon: Brain,
    link: "/predict-price",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-100",
  },
  {
    title: "AI Recommendation",
    description: "Find properties for you",
    icon: Search,
    link: "/recommendation",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-100",
  },
  {
    title: "Compare Localities",
    description: "Analyze different locations",
    icon: BarChart3,
    link: "/compare-localities",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-100",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.title}
            to={action.link}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card-hover md:p-6"
          >
            {/* Hover background */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-slate-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative">
              {/* Icon + Arrow */}
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${action.iconBg} ${action.iconBorder} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                    className={action.iconColor}
                  />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-600"
                />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-sm font-bold text-ink md:text-base">
                {action.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-xs leading-5 text-slate-500 md:text-sm">
                {action.description}
              </p>
            </div>

            {/* Bottom hover accent */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blueprint-700 to-brass-500 transition-all duration-500 group-hover:w-full" />
          </Link>
        );
      })}
    </div>
  );
}