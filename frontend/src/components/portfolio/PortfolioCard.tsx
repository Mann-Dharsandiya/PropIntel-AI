import {
  Building2,
  CalendarDays,
  IndianRupee,
  MapPin,
  Pencil,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import type { PortfolioInvestment } from "@/types/portfolio";

interface PortfolioCardProps {
  investment: PortfolioInvestment;
  onEdit: (investment: PortfolioInvestment) => void;
  onDelete: (investment: PortfolioInvestment) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

export default function PortfolioCard({
  investment,
  onEdit,
  onDelete,
}: PortfolioCardProps) {
  const profit =
    investment.currentValue -
    investment.purchasePrice;

  const roi =
    investment.purchasePrice > 0
      ? (profit / investment.purchasePrice) * 100
      : 0;

  const isProfit = profit >= 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="rounded-2xl bg-blue-50 p-3">
              <Building2
                size={26}
                className="text-blue-600"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold text-slate-900">
                {investment.propertyName}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  {investment.city}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {investment.propertyType}
                </span>
              </div>
            </div>
          </div>

          {/* Profit/Loss badge */}
          <div
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
              isProfit
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {isProfit ? (
              <TrendingUp size={15} />
            ) : (
              <TrendingDown size={15} />
            )}

            {roi.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Main values */}
      <div className="grid grid-cols-2 gap-px bg-slate-100">
        <div className="bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Purchase Price
          </p>

          <p className="mt-2 text-lg font-bold text-slate-900">
            {formatCurrency(
              investment.purchasePrice
            )}
          </p>
        </div>

        <div className="bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Current Value
          </p>

          <p className="mt-2 text-lg font-bold text-slate-900">
            {formatCurrency(
              investment.currentValue
            )}
          </p>
        </div>
      </div>

      {/* Financial details */}
      <div className="grid grid-cols-2 gap-4 p-6">
        <div>
          <p className="text-sm text-slate-500">
            {isProfit
              ? "Profit"
              : "Loss"}
          </p>

          <p
            className={`mt-1 text-lg font-bold ${
              isProfit
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {formatCurrency(
              Math.abs(profit)
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Monthly Rent
          </p>

          <p className="mt-1 flex items-center gap-1 text-lg font-bold text-slate-800">
            <IndianRupee size={16} />

            {new Intl.NumberFormat(
              "en-IN",
              {
                maximumFractionDigits: 0,
              }
            ).format(
              investment.monthlyRent
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Loan Amount
          </p>

          <p className="mt-1 text-base font-semibold text-slate-800">
            {formatCurrency(
              investment.loanAmount
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Purchase Date
          </p>

          <p className="mt-1 flex items-center gap-1 text-base font-semibold text-slate-800">
            <CalendarDays size={15} />

            {formatDate(
              investment.purchaseDate
            )}
          </p>
        </div>
      </div>

      {/* Notes */}
      {investment.notes && (
        <div className="mx-6 rounded-2xl bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
            Investment Note
          </p>

          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {investment.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 border-t border-slate-100 p-6">
        <button
          type="button"
          onClick={() =>
            onEdit(investment)
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          <Pencil size={17} />
          Edit
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(investment)
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={17} />
          Delete
        </button>
      </div>
    </div>
  );
}