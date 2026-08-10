import { useEffect, useState } from "react";

import {
  Brain,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Wallet,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import {
  getPortfolioInsights,
} from "@/api/portfolioInsightsApi";

import type {
  PortfolioInsightsData,
  PortfolioInsight,
} from "@/types/portfolioInsights";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInsightIcon(
  type: PortfolioInsight["type"]
) {
  switch (type) {
    case "positive":
      return (
        <CheckCircle2
          size={22}
          className="text-green-600"
        />
      );

    case "warning":
      return (
        <AlertTriangle
          size={22}
          className="text-orange-500"
        />
      );

    case "negative":
      return (
        <AlertTriangle
          size={22}
          className="text-red-500"
        />
      );

    default:
      return (
        <TrendingUp
          size={22}
          className="text-blue-600"
        />
      );
  }
}

function getInsightBackground(
  type: PortfolioInsight["type"]
) {
  switch (type) {
    case "positive":
      return "border-green-100 bg-green-50";

    case "warning":
      return "border-orange-100 bg-orange-50";

    case "negative":
      return "border-red-100 bg-red-50";

    default:
      return "border-blue-100 bg-blue-50";
  }
}

function getHealthColor(
  health: PortfolioInsightsData["health"]
) {
  switch (health) {
    case "excellent":
      return "text-green-600";

    case "good":
      return "text-emerald-600";

    case "moderate":
      return "text-orange-500";

    case "poor":
      return "text-red-600";

    default:
      return "text-slate-600";
  }
}

function getHealthBackground(
  health: PortfolioInsightsData["health"]
) {
  switch (health) {
    case "excellent":
      return "bg-green-50 border-green-200";

    case "good":
      return "bg-emerald-50 border-emerald-200";

    case "moderate":
      return "bg-orange-50 border-orange-200";

    case "poor":
      return "bg-red-50 border-red-200";

    default:
      return "bg-slate-50 border-slate-200";
  }
}

export default function PortfolioInsights() {
  const [data, setData] =
    useState<PortfolioInsightsData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const result =
        await getPortfolioInsights();

      setData(result);
    } catch (err: any) {
      console.error(
        "Portfolio insights error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load AI portfolio insights."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  if (loading) {
    return (
      <section className="mt-12">
        <div className="mb-6">
          <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-3xl bg-white shadow-sm"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-12">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle
              size={24}
              className="mt-1 text-red-600"
            />

            <div className="flex-1">
              <h3 className="font-bold text-red-800">
                Unable to load AI insights
              </h3>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={loadInsights}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-2.5">
              <Brain
                size={22}
                className="text-purple-600"
              />
            </div>

            <span className="text-sm font-bold uppercase tracking-wider text-purple-600">
              AI Intelligence
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            AI Portfolio Insights
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            AI-powered analysis of your investment
            performance, rental income and portfolio
            risk.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInsights}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh Insights
        </button>
      </div>

      {/* Health + Metrics */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Health */}
        <div
          className={`rounded-3xl border p-6 ${getHealthBackground(
            data.health
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <ShieldCheck
                size={24}
                className={getHealthColor(
                  data.health
                )}
              />
            </div>

            <span
              className={`text-sm font-bold uppercase ${getHealthColor(
                data.health
              )}`}
            >
              {data.health}
            </span>
          </div>

          <p className="mt-6 text-sm font-medium text-slate-500">
            Portfolio Health
          </p>

          <div className="mt-1 flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-900">
              {data.healthScore}
            </span>

            <span className="mb-1 text-sm text-slate-500">
              / 100
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all"
              style={{
                width: `${Math.min(
                  data.healthScore,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* ROI */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <TrendingUp
              size={22}
              className="text-blue-600"
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Portfolio ROI
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {data.roi.toFixed(2)}%
          </p>

          <p className="mt-2 text-sm text-green-600">
            {formatCurrency(data.totalProfit)} gain
          </p>
        </div>

        {/* Rental Yield */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
            <Wallet
              size={22}
              className="text-green-600"
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Rental Yield
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {data.rentalYield.toFixed(2)}%
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {formatCurrency(
              data.monthlyRentalIncome
            )}
            /month
          </p>
        </div>

        {/* LTV */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
            <Lightbulb
              size={22}
              className="text-orange-500"
            />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Loan-to-Value
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {data.loanToValue.toFixed(1)}%
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Across {data.totalProperties} properties
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-2">
            <Brain
              size={20}
              className="text-purple-600"
            />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            AI Analysis
          </h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {data.insights.map(
            (insight) => (
              <div
                key={insight.id}
                className={`rounded-3xl border p-6 ${getInsightBackground(
                  insight.type
                )}`}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white p-2.5 shadow-sm">
                    {getInsightIcon(
                      insight.type
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-lg font-bold text-slate-900">
                        {insight.title}
                      </h4>

                      <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                        {insight.metric}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {insight.message}
                    </p>

                    <div className="mt-5 rounded-2xl bg-white/80 p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb
                          size={18}
                          className="mt-0.5 shrink-0 text-purple-600"
                        />

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                            AI Recommendation
                          </p>

                          <p className="mt-1 text-sm leading-5 text-slate-700">
                            {
                              insight.recommendation
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Portfolio Snapshot */}
      <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">
          Portfolio Snapshot
        </h3>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Total Investment
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatCurrency(
                data.totalInvestment
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Value
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatCurrency(
                data.currentValue
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Annual Rental Income
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatCurrency(
                data.annualRentalIncome
              )}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Properties
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {data.totalProperties}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-right text-xs text-slate-400">
        AI analysis generated{" "}
        {new Date(
          data.generatedAt
        ).toLocaleString("en-IN")}
      </p>
    </section>
  );
}