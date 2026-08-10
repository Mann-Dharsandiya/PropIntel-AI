import {
  TrendingUp,
  Wallet,
  IndianRupee,
  Percent,
  Home,
  BarChart3,
} from "lucide-react";

import { usePortfolio } from "@/context/PortfolioContext";

import type { PortfolioInvestment } from "@/types/portfolio";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getNumber = (
  value: unknown
): number => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue)
    ? numberValue
    : 0;
};

export default function PortfolioAnalytics() {
  const {
    investments,
  } = usePortfolio();

  // =========================
  // Portfolio Calculations
  // =========================

  const totalInvested =
    investments.reduce(
      (total, investment) =>
        total +
        getNumber(
          investment.purchasePrice
        ),
      0
    );

  const currentValue =
    investments.reduce(
      (total, investment) =>
        total +
        getNumber(
          investment.currentValue
        ),
      0
    );

  const totalProfit =
    currentValue - totalInvested;

  const overallROI =
    totalInvested > 0
      ? (totalProfit /
          totalInvested) *
        100
      : 0;

  const monthlyRent =
    investments.reduce(
      (total, investment) =>
        total +
        getNumber(
          investment.monthlyRent
        ),
      0
    );

  const yearlyRent =
    monthlyRent * 12;

  // =========================
  // Chart Helpers
  // =========================

  const maxValue = Math.max(
    totalInvested,
    currentValue,
    1
  );

  const investedPercentage =
    (totalInvested / maxValue) *
    100;

  const currentValuePercentage =
    (currentValue / maxValue) *
    100;

  return (
    <section className="mt-12">

      {/* ========================= */}
      {/* Section Header */}
      {/* ========================= */}

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
            <BarChart3
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Portfolio Analytics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Understand your investment performance
              and portfolio growth.
            </p>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Analytics Cards */}
      {/* ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Invested */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
              <Wallet
                size={21}
                className="text-blue-600"
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Invested
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Invested
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(
              totalInvested
            )}
          </p>

        </div>

        {/* Current Value */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50">
              <Home
                size={21}
                className="text-purple-600"
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Current Portfolio Value
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(
              currentValue
            )}
          </p>

        </div>

        {/* Profit */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                totalProfit >= 0
                  ? "bg-emerald-50"
                  : "bg-red-50"
              }`}
            >
              <TrendingUp
                size={21}
                className={
                  totalProfit >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Profit
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Profit
          </p>

          <p
            className={`mt-1 text-2xl font-bold ${
              totalProfit >= 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {formatCurrency(
              totalProfit
            )}
          </p>

        </div>

        {/* ROI */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                overallROI >= 0
                  ? "bg-amber-50"
                  : "bg-red-50"
              }`}
            >
              <Percent
                size={21}
                className={
                  overallROI >= 0
                    ? "text-amber-600"
                    : "text-red-600"
                }
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              ROI
            </span>

          </div>

          <p className="mt-5 text-sm text-slate-500">
            Overall ROI
          </p>

          <p
            className={`mt-1 text-2xl font-bold ${
              overallROI >= 0
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {overallROI.toFixed(2)}%
          </p>

        </div>

      </div>

      {/* ========================= */}
      {/* Portfolio Value Comparison */}
      {/* ========================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Value Chart */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Portfolio Growth
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Invested value vs current value
              </p>
            </div>

            <TrendingUp
              size={22}
              className="text-indigo-600"
            />

          </div>

          <div className="mt-8 space-y-7">

            {/* Invested */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                  Total Invested
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(
                    totalInvested
                  )}
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-700"
                  style={{
                    width: `${investedPercentage}%`,
                  }}
                />

              </div>

            </div>

            {/* Current */}
            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                  Current Value
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(
                    currentValue
                  )}
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                  style={{
                    width: `${currentValuePercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* Growth */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-slate-500">
                Portfolio Growth
              </span>

              <span
                className={`text-lg font-bold ${
                  totalProfit >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {totalProfit >= 0
                  ? "+"
                  : ""}
                {formatCurrency(
                  totalProfit
                )}
              </span>

            </div>

          </div>

        </div>

        {/* Rental Income */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-bold text-slate-900">
                Rental Income
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Income generated by your properties
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">

              <IndianRupee
                size={21}
                className="text-emerald-600"
              />

            </div>

          </div>

          <div className="mt-8">

            <p className="text-sm text-slate-500">
              Monthly Rental Income
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {formatCurrency(
                monthlyRent
              )}
            </p>

          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">

            <p className="text-sm text-slate-500">
              Estimated Annual Rental Income
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {formatCurrency(
                yearlyRent
              )}
            </p>

          </div>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">

            <p className="text-sm leading-relaxed text-emerald-800">
              Your portfolio currently generates approximately{" "}
              <strong>
                {formatCurrency(
                  monthlyRent
                )}
              </strong>{" "}
              per month in rental income.
            </p>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Property Performance */}
      {/* ========================= */}

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold text-slate-900">
              Property Performance
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Performance breakdown for each investment.
            </p>

          </div>

          <BarChart3
            size={22}
            className="text-indigo-600"
          />

        </div>

        {investments.length === 0 ? (

          <div className="rounded-2xl bg-slate-50 p-8 text-center">

            <p className="text-sm text-slate-500">
              Add investments to see property
              performance.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {investments.map(
              (
                investment
              ) => {

                const purchase =
                  getNumber(
                    investment.purchasePrice
                  );

                const current =
                  getNumber(
                    investment.currentValue
                  );

                const profit =
                  current - purchase;

                const roi =
                  purchase > 0
                    ? (profit /
                        purchase) *
                      100
                    : 0;

                return (
                  <div
                    key={
                      investment._id
                    }
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      {/* Property */}
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

                          <Home
                            size={19}
                            className="text-indigo-600"
                          />

                        </div>

                        <div>

                          <h4 className="font-semibold text-slate-900">
                            {investment.propertyName}
                          </h4>

                          <p className="text-xs text-slate-500">
                            {investment.city ||
                              "Property"}
                          </p>

                        </div>

                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">

                        <div>
                          <p className="text-xs text-slate-400">
                            Invested
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {formatCurrency(
                              purchase
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Current
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {formatCurrency(
                              current
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Profit
                          </p>

                          <p
                            className={`mt-1 text-sm font-semibold ${
                              profit >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {formatCurrency(
                              profit
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            ROI
                          </p>

                          <p
                            className={`mt-1 text-sm font-semibold ${
                              roi >= 0
                                ? "text-indigo-600"
                                : "text-red-600"
                            }`}
                          >
                            {roi.toFixed(
                              2
                            )}
                            %
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </section>
  );
}