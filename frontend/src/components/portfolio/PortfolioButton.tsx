import {
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import { Link } from "react-router-dom";

interface PortfolioButtonProps {
  variant?: "card" | "compact";
}

export default function PortfolioButton({
  variant = "card",
}: PortfolioButtonProps) {
  if (variant === "compact") {
    return (
      <Link
        to="/portfolio"
        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <BriefcaseBusiness size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">
            Investment Portfolio
          </p>

          <p className="text-xs text-slate-500">
            Manage your real estate investments
          </p>
        </div>

        <ArrowRight
          size={18}
          className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
        />
      </Link>
    );
  }

  return (
    <Link
      to="/portfolio"
      className="group block"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
              <BriefcaseBusiness size={27} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                My Investment Portfolio
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Track your properties, returns and
                investment growth.
              </p>
            </div>

          </div>

          <ArrowRight
            size={21}
            className="mt-1 shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
          />

        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Properties
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              Portfolio
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Performance
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              Analytics
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              AI
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              Insights
            </p>
          </div>

        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
          Open Investment Portfolio

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>

      </div>
    </Link>
  );
}