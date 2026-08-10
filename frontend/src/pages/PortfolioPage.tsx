 import { useState } from "react";

import {
  ArrowLeft,
  Building2,
  Plus,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import PortfolioSummary from "@/components/portfolio/PortfolioSummary";
import PortfolioAnalytics from "@/components/portfolio/PortfolioAnalytics";
import PortfolioCharts from "@/components/portfolio/PortfolioCharts";
import PortfolioAllocation from "@/components/portfolio/PortfolioAllocation";
import PortfolioInsights from "@/components/portfolio/PortfolioInsights";

import PortfolioCard from "@/components/portfolio/PortfolioCard";
import AddInvestmentModal from "@/components/portfolio/AddInvestmentModal";
import EditInvestmentModal from "@/components/portfolio/EditInvestmentModal";

import { usePortfolio } from "@/context/PortfolioContext";

import type {
  PortfolioInvestment,
} from "@/types/portfolio";

export default function PortfolioPage() {
  const {
    investments,
    loading,
    error,
    refreshPortfolio,
    removeInvestment,
  } = usePortfolio();

  // =========================================================
  // Add Investment Modal
  // =========================================================

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  // =========================================================
  // Edit Investment
  // =========================================================

  const [
    selectedInvestment,
    setSelectedInvestment,
  ] = useState<PortfolioInvestment | null>(
    null
  );

  // =========================================================
  // Delete Loading
  // =========================================================

  const [
    deletingInvestmentId,
    setDeletingInvestmentId,
  ] = useState<string | null>(null);

  // =========================================================
  // Edit Handler
  // =========================================================

  const handleEdit = (
    investment: PortfolioInvestment
  ) => {
    setSelectedInvestment(investment);
  };

  // =========================================================
  // Delete Handler
  // =========================================================

  const handleDelete = async (
    investment: PortfolioInvestment
  ) => {
    try {
      setDeletingInvestmentId(
        investment._id
      );

      await removeInvestment(
        investment._id
      );
    } catch (deleteError) {
      console.error(
        "Failed to delete investment:",
        deleteError
      );
    } finally {
      setDeletingInvestmentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">

          {/* Back to Dashboard */}

          <Link
            to="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-100 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to Dashboard
          </Link>

          {/* Hero Content */}

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              {/* Label */}

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <TrendingUp size={28} />
                </div>

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Investment Intelligence
                </span>

              </div>

              {/* Title */}

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                My Investment Portfolio
              </h1>

              {/* Description */}

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 md:text-lg">
                Track your properties, monitor
                portfolio growth, understand your
                returns, and make smarter real estate
                investment decisions.
              </p>

            </div>

            {/* Add Investment */}

            <button
              type="button"
              onClick={() =>
                setShowAddModal(true)
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <Plus size={20} />

              Add Investment
            </button>

          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">

        {/* =================================================== */}
        {/* PORTFOLIO OVERVIEW */}
        {/* =================================================== */}

        <section>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Portfolio Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A real-time view of your investment
                performance.
              </p>

            </div>

            {/* Refresh */}

            <button
              type="button"
              onClick={refreshPortfolio}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>

          {/* Summary Cards */}

          <PortfolioSummary />

        </section>

        {/* =================================================== */}
        {/* PORTFOLIO ANALYTICS */}
        {/* =================================================== */}

        <section className="mt-10">
          <PortfolioAnalytics />
        </section>

        {/* =================================================== */}
        {/* PORTFOLIO PERFORMANCE CHARTS */}
        {/* =================================================== */}

        <section className="mt-10">
          <PortfolioCharts />
        </section>

        {/* =================================================== */}
        {/* PORTFOLIO ALLOCATION */}
        {/* =================================================== */}

        <section className="mt-10">
          <PortfolioAllocation />
        </section>

        {/* =================================================== */}
        {/* AI PORTFOLIO INSIGHTS */}
        {/* =================================================== */}

        <section className="mt-10">
          <PortfolioInsights />
        </section>

        {/* =================================================== */}
        {/* ERROR */}
        {/* =================================================== */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">

            <p className="font-semibold">
              Unable to load portfolio
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>
        )}

        {/* =================================================== */}
        {/* INVESTMENTS */}
        {/* =================================================== */}

        <section className="mt-12">

          {/* Header */}

          <div className="mb-6 flex items-end justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                My Investments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Properties currently included in
                your investment portfolio.
              </p>

            </div>

            {/* Count */}

            {investments.length > 0 && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {investments.length}{" "}

                {investments.length === 1
                  ? "Investment"
                  : "Investments"}
              </span>
            )}

          </div>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading &&
          investments.length === 0 ? (

            <div className="grid gap-6 lg:grid-cols-2">

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-3xl bg-white shadow-sm"
                />
              ))}

            </div>

          ) : investments.length === 0 ? (

            /* ================================================= */
            /* EMPTY STATE */
            /* ================================================= */

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">

                <Building2
                  size={30}
                  className="text-blue-600"
                />

              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Your portfolio is empty
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Start tracking your real estate
                investments by adding your first
                property to the portfolio.
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(true)
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />

                Add Your First Investment
              </button>

            </div>

          ) : (

            /* ================================================= */
            /* INVESTMENT CARDS */
            /* ================================================= */

            <div className="grid gap-6 lg:grid-cols-2">

              {investments.map(
                (investment) => {

                  const isDeleting =
                    deletingInvestmentId ===
                    investment._id;

                  return (
                    <div
                      key={investment._id}
                      className="relative"
                    >

                      {/* Delete Overlay */}

                      {isDeleting && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/75 backdrop-blur-sm">

                          <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-xl">

                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" />

                            <p className="mt-3 text-sm font-semibold text-slate-700">
                              Deleting investment...
                            </p>

                          </div>

                        </div>
                      )}

                      <PortfolioCard
                        investment={
                          investment
                        }
                        onEdit={
                          handleEdit
                        }
                        onDelete={
                          handleDelete
                        }
                      />

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>

      </main>

      {/* ===================================================== */}
      {/* ADD INVESTMENT MODAL */}
      {/* ===================================================== */}

      <AddInvestmentModal
        open={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
      />

      {/* ===================================================== */}
      {/* EDIT INVESTMENT MODAL */}
      {/* ===================================================== */}

      <EditInvestmentModal
        open={
          selectedInvestment !== null
        }
        investment={
          selectedInvestment
        }
        onClose={() =>
          setSelectedInvestment(null)
        }
      />

    </div>
  );
}