 import { useState } from "react";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  Brain,
  Calendar,
  Download,
  FileText,
  MapPin,
  RefreshCw,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import {
  generatePortfolioReport,
  getReportHistory,
  getInvestmentOpportunities,
  downloadReportPdf,
} from "@/api/reports";

import ReportCard from "@/components/reports/ReportCard";

import type {
  ReportHistoryItem,
} from "@/types/reports";

export default function ReportsPage() {
  // =========================================================
  // State
  // =========================================================

  const [downloadingId, setDownloadingId] =
    useState<string | null>(null);

  const [selectedReport, setSelectedReport] =
    useState<ReportHistoryItem | null>(null);

  // =========================================================
  // Report History
  // =========================================================

  const {
    data: history,
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ["ai-report-history"],
    queryFn: getReportHistory,
  });

  // =========================================================
  // Investment Opportunities
  // =========================================================

  const {
    data: opportunities,
    isLoading: opportunitiesLoading,
  } = useQuery({
    queryKey: ["investment-opportunities"],
    queryFn: getInvestmentOpportunities,
  });

  // =========================================================
  // Generate Portfolio Report
  // =========================================================

  const generateMutation = useMutation({
    mutationFn: generatePortfolioReport,

    onSuccess: () => {
      refetchHistory();
    },
  });

  // =========================================================
  // Download Report
  // =========================================================

  async function handleDownload(
    reportId: string
  ) {
    try {
      setDownloadingId(reportId);

      await downloadReportPdf(reportId);
    } catch (error) {
      console.error(
        "Report PDF download failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to download report."
      );
    } finally {
      setDownloadingId(null);
    }
  }

  // =========================================================
  // Open Report
  // =========================================================

  function handleView(reportId: string) {
    const report =
      history?.reports.find(
        (item) => item._id === reportId
      );

    if (!report) {
      return;
    }

    setSelectedReport(report);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // Currency Formatter
  // =========================================================

  function formatCurrency(
    value: number
  ) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  // =========================================================
  // Close Selected Report
  // =========================================================

  function closeReport() {
    setSelectedReport(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // Page
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="mx-auto max-w-7xl px-6 py-14">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Hero Text */}

            <div>

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">

                  <Sparkles size={28} />

                </div>

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  AI Intelligence
                </span>

              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                AI Reports
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg">
                Generate intelligent real estate reports,
                understand your investments, discover
                opportunities and make data-driven
                property decisions.
              </p>

            </div>

            {/* Generate Button */}

            <button
              type="button"
              onClick={() =>
                generateMutation.mutate()
              }
              disabled={
                generateMutation.isPending
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {generateMutation.isPending ? (
                <RefreshCw
                  size={19}
                  className="animate-spin"
                />
              ) : (
                <Brain size={19} />
              )}

              {generateMutation.isPending
                ? "Generating..."
                : "Generate Portfolio Report"}

            </button>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">

        {/* =================================================== */}
        {/* SELECTED REPORT DETAILS */}
        {/* =================================================== */}

        {selectedReport && (
          <section className="mb-10">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

              {/* Report Header */}

              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-8 text-white md:px-10">

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                  <div className="min-w-0">

                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-100">

                      <Brain size={18} />

                      AI Intelligence Report

                    </div>

                    <h2 className="text-2xl font-bold md:text-4xl">
                      {selectedReport.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-blue-100">

                      <span className="rounded-full bg-white/10 px-3 py-1">
                        {selectedReport.reportType ===
                        "portfolio"
                          ? "Portfolio Report"
                          : "Property Report"}
                      </span>

                      <span>
                        Generated{" "}
                        {new Date(
                          selectedReport.createdAt
                        ).toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                  {/* Close Button */}

                  <button
                    type="button"
                    onClick={closeReport}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
                  >

                    <X size={17} />

                    Close Report

                  </button>

                </div>

              </div>

              {/* Report Body */}

              <div className="p-6 md:p-10">

                {/* Summary */}

                <div>

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                      <FileText size={21} />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-slate-900">
                        AI Report Summary
                      </h3>

                      <p className="text-sm text-slate-500">
                        AI-generated analysis based on
                        your available property data.
                      </p>

                    </div>

                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">

                    <p className="whitespace-pre-line text-base leading-8 text-slate-700">
                      {selectedReport.summary}
                    </p>

                  </div>

                </div>

                {/* Report Information */}

                <div className="mt-8 grid gap-4 md:grid-cols-3">

                  {/* Type */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                        <FileText size={18} />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Report Type
                        </p>

                        <p className="mt-1 font-bold capitalize text-slate-900">
                          {selectedReport.reportType}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Date */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

                        <Calendar size={18} />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Generated On
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          {new Date(
                            selectedReport.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Generated By */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">

                        <Sparkles size={18} />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Generated By
                        </p>

                        <p className="mt-1 font-bold text-slate-900">
                          PropIntel AI
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* AI Insight Section */}

                <div className="mt-8">

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

                      <Brain size={21} />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-slate-900">
                        AI Investment Insight
                      </h3>

                      <p className="text-sm text-slate-500">
                        Key intelligence extracted from
                        this report.
                      </p>

                    </div>

                  </div>

                  <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-6">

                    <p className="whitespace-pre-line leading-8 text-slate-700">
                      {selectedReport.summary}
                    </p>

                  </div>

                </div>

                {/* Actions */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        selectedReport._id
                      )
                    }
                    disabled={
                      downloadingId ===
                      selectedReport._id
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <Download size={18} />

                    {downloadingId ===
                    selectedReport._id
                      ? "Downloading..."
                      : "Download PDF"}

                  </button>

                  <button
                    type="button"
                    onClick={closeReport}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >

                    <X size={18} />

                    Back to Reports

                  </button>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* =================================================== */}
        {/* SUCCESS MESSAGE */}
        {/* =================================================== */}

        {generateMutation.isSuccess && (
          <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                ✓
              </div>

              <div>

                <h3 className="font-bold">
                  AI Report Generated
                </h3>

                <p className="mt-1 text-sm">
                  Your latest portfolio report has
                  been saved to your report history.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* =================================================== */}
        {/* ERROR MESSAGE */}
        {/* =================================================== */}

        {generateMutation.isError && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

            <h3 className="font-bold">
              Unable to Generate Report
            </h3>

            <p className="mt-1 text-sm">
              {generateMutation.error instanceof Error
                ? generateMutation.error.message
                : "Something went wrong."}
            </p>

          </div>
        )}

        {/* =================================================== */}
        {/* REPORT HISTORY */}
        {/* =================================================== */}

        <section>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <FileText
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-2xl font-bold text-slate-900">
                  My AI Reports
                </h2>

              </div>

              <p className="mt-2 text-sm text-slate-500">
                Previously generated investment and
                property intelligence reports.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                refetchHistory()
              }
              className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 sm:self-auto"
            >

              <RefreshCw size={16} />

              Refresh

            </button>

          </div>

          {/* Loading */}

          {historyLoading ? (

            <div className="grid gap-6 md:grid-cols-2">

              {[1, 2].map((item) => (

                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-white"
                />

              ))}

            </div>

          ) : !history ||
            history.reports.length === 0 ? (

            /* Empty State */

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">

                <FileText size={28} />

              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No AI reports yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Generate your first portfolio report to
                receive AI-powered insights and
                recommendations.
              </p>

              <button
                type="button"
                onClick={() =>
                  generateMutation.mutate()
                }
                disabled={
                  generateMutation.isPending
                }
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                Generate First Report
              </button>

            </div>

          ) : (

            /* Reports */

            <div className="grid gap-6 md:grid-cols-2">

              {history.reports.map(
                (report) => (

                  <ReportCard
                    key={report._id}
                    report={report}
                    onView={handleView}
                    onDownload={handleDownload}
                    downloading={
                      downloadingId ===
                      report._id
                    }
                  />

                )
              )}

            </div>

          )}

        </section>

        {/* =================================================== */}
        {/* INVESTMENT OPPORTUNITIES */}
        {/* =================================================== */}

        <section className="mt-14">

          <div className="mb-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={24}
                className="text-green-600"
              />

              <h2 className="text-2xl font-bold text-slate-900">
                Investment Opportunities
              </h2>

            </div>

            <p className="mt-2 text-sm text-slate-500">
              AI-ranked properties and localities based
              on investment potential.
            </p>

          </div>

          {opportunitiesLoading ? (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl bg-white"
                />

              ))}

            </div>

          ) : opportunities &&
            opportunities.topProperties.length > 0 ? (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {opportunities.topProperties
                .slice(0, 6)
                .map((property) => (

                  <div
                    key={property.propertyId}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* Property Header */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {property.propertyType}
                        </p>

                        <h3 className="mt-1 line-clamp-2 font-bold text-slate-900">
                          {property.title}
                        </h3>

                        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">

                          <MapPin size={14} />

                          {property.locality},{" "}
                          {property.city}

                        </p>

                      </div>

                      <div className="shrink-0 rounded-xl bg-green-50 px-3 py-2 text-center">

                        <p className="text-xs text-green-600">
                          Score
                        </p>

                        <p className="font-bold text-green-700">
                          {property.opportunityScore}
                        </p>

                      </div>

                    </div>

                    {/* Metrics */}

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-slate-50 p-3">

                        <p className="text-xs text-slate-400">
                          Price
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {formatCurrency(
                            property.price
                          )}
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">

                        <p className="text-xs text-slate-400">
                          AI Score
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {property.aiScore}/10
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">

                        <p className="text-xs text-slate-400">
                          Rental Yield
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {property.rentalYield}%
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">

                        <p className="text-xs text-slate-400">
                          Appreciation
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {property.appreciation}%
                        </p>

                      </div>

                    </div>

                    {/* Rating */}

                    <div className="mt-5">

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-xs font-medium text-slate-500">
                          Rating
                        </span>

                        <span className="text-xs font-bold capitalize text-slate-700">
                          {property.rating}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${Math.min(
                              property.opportunityScore,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* Reasons */}

                    {property.reasons &&
                      property.reasons.length > 0 && (

                        <div className="mt-5">

                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Why consider it
                          </p>

                          <ul className="space-y-1">

                            {property.reasons
                              .slice(0, 3)
                              .map(
                                (
                                  reason,
                                  index
                                ) => (

                                  <li
                                    key={index}
                                    className="text-xs leading-5 text-slate-600"
                                  >
                                    • {reason}
                                  </li>

                                )
                              )}

                          </ul>

                        </div>

                      )}

                  </div>

                ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No investment opportunities are
              available right now.
            </div>

          )}

        </section>

        {/* =================================================== */}
        {/* TOP LOCALITIES */}
        {/* =================================================== */}

        {opportunities &&
          opportunities.topLocalities.length > 0 && (

            <section className="mt-14">

              <div className="mb-6">

                <div className="flex items-center gap-3">

                  <MapPin
                    size={24}
                    className="text-purple-600"
                  />

                  <h2 className="text-2xl font-bold text-slate-900">
                    Top Investment Localities
                  </h2>

                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Localities ranked using AI investment
                  opportunity scoring.
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {opportunities.topLocalities
                  .slice(0, 6)
                  .map((locality) => (

                    <div
                      key={`${locality.city}-${locality.locality}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <h3 className="font-bold text-slate-900">
                            {locality.locality}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {locality.city}
                          </p>

                        </div>

                        <div className="rounded-xl bg-purple-50 px-3 py-2 text-center">

                          <p className="text-xs text-purple-500">
                            Score
                          </p>

                          <p className="font-bold text-purple-700">
                            {locality.opportunityScore}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">

                        <div>

                          <p className="text-xs text-slate-400">
                            Avg Price
                          </p>

                          <p className="mt-1 font-semibold">
                            {formatCurrency(
                              locality.averagePrice
                            )}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-slate-400">
                            Properties
                          </p>

                          <p className="mt-1 font-semibold">
                            {locality.propertyCount}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-slate-400">
                            Rental Yield
                          </p>

                          <p className="mt-1 font-semibold">
                            {
                              locality.averageRentalYield
                            }%
                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-slate-400">
                            Appreciation
                          </p>

                          <p className="mt-1 font-semibold">
                            {
                              locality.averageAppreciation
                            }%
                          </p>

                        </div>

                      </div>

                      <div className="mt-5">

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-xs text-slate-400">
                            Investment Rating
                          </span>

                          <span className="text-xs font-bold capitalize text-slate-700">
                            {locality.rating}
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{
                              width: `${Math.min(
                                locality.opportunityScore,
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  ))}

              </div>

            </section>

          )}

      </main>

    </div>
  );
}