import {
  Building2,
  TrendingUp,
  Wallet,
  IndianRupee,
  Home,
  Percent,
} from "lucide-react";

import { usePortfolio } from "@/context/PortfolioContext";

const formatCurrency = (
  value: number
) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PortfolioSummary() {
  const {
    summary,
    loading,
  } = usePortfolio();

  if (loading && !summary) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-slate-100"
            />
          )
        )}
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Building2
          className="mx-auto text-slate-400"
          size={40}
        />

        <h3 className="mt-4 text-lg font-semibold text-slate-800">
          No portfolio data yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Add your first investment to start
          tracking your portfolio.
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Properties",
      value: summary.totalProperties.toString(),
      icon: Building2,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Investment",
      value: formatCurrency(
        summary.totalInvestment
      ),
      icon: Wallet,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Current Value",
      value: formatCurrency(
        summary.currentValue
      ),
      icon: Home,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Profit",
      value: formatCurrency(
        summary.totalProfit
      ),
      icon: TrendingUp,
      iconBg:
        summary.totalProfit >= 0
          ? "bg-emerald-50"
          : "bg-red-50",
      iconColor:
        summary.totalProfit >= 0
          ? "text-emerald-600"
          : "text-red-600",
    },
    {
      title: "Portfolio ROI",
      value: `${summary.roi.toFixed(2)}%`,
      icon: Percent,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Monthly Rent",
      value: formatCurrency(
        summary.monthlyRentalIncome
      ),
      icon: IndianRupee,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`rounded-xl p-3 ${card.iconBg}`}
              >
                <Icon
                  size={22}
                  className={card.iconColor}
                />
              </div>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <p className="mt-1 break-words text-xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}