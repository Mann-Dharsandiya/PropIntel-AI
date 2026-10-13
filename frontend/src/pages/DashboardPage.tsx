 import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "@/api/dashboard";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FavoritePreview from "@/components/dashboard/FavoritePreview";
import RecentlyViewedPreview from "@/components/dashboard/RecentlyViewedPreview";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import PortfolioButton from "@/components/portfolio/PortfolioButton";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  // =========================================================
  // Loading State
  // =========================================================
  if (isLoading) {
    return (
      <div className="pi-page min-h-screen">
        <div className="pi-container py-8 md:py-10">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  // =========================================================
  // Error State
  // =========================================================
  if (isError || !data) {
    return (
      <div className="pi-page min-h-screen">
        <div className="pi-container flex min-h-[70vh] items-center justify-center">
          <div className="pi-card w-full max-w-md p-8 text-center md:p-10">

            {/* Error Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-2xl">
              ⚠️
            </div>

            {/* Title */}
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
              Failed to Load Dashboard
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Something went wrong while loading your
              dashboard. Please try again.
            </p>

            {/* Retry */}
            <button
              type="button"
              onClick={() => refetch()}
              className="pi-btn pi-btn-primary mt-7 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Dashboard
  // =========================================================
  return (
    <div className="pi-page min-h-screen">

      {/* =====================================================
          Dashboard Container
      ===================================================== */}
      <div className="pi-container py-8 md:py-10 lg:py-12">

        {/* ===================================================
            Dashboard Header
        =================================================== */}
        <section>
          <DashboardHeader />
        </section>

        {/* ===================================================
            Dashboard Statistics
        =================================================== */}
        <section className="mt-8 md:mt-10">
          <DashboardStats stats={data.stats} />
        </section>

        {/* ===================================================
            Quick Actions
        =================================================== */}
        <section className="mt-8 md:mt-10">
          <div className="pi-card-static overflow-hidden">
            <div className="border-b border-slate-200/70 px-5 py-5 md:px-6">
              <div className="pi-section-label">
                Quick Access
              </div>

              <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Access your most-used real estate tools quickly.
              </p>
            </div>

            <div className="p-5 md:p-6">
              <QuickActions />
            </div>
          </div>
        </section>

        {/* ===================================================
            Investment Intelligence
        =================================================== */}
        <section className="mt-8 md:mt-10">

          <div className="pi-card-dark relative overflow-hidden p-6 md:p-8">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brass-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">

              {/* Section Label */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-brass-400/30 bg-brass-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brass-300">
                  Investment Intelligence
                </span>

                <span className="h-px w-10 bg-brass-400/40" />
              </div>

              {/* Heading */}
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Build a smarter property portfolio.
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                Track your real estate investments, portfolio
                performance and AI-powered insights from one place.
              </p>

              {/* Portfolio Button */}
              <div className="mt-6">
                <PortfolioButton />
              </div>

            </div>
          </div>

        </section>

        {/* ===================================================
            Activity + Favorites
        =================================================== */}
        <section className="mt-8 md:mt-10">

          <div className="mb-5">
            <div className="pi-section-label">
              Your Activity
            </div>

            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep track of your latest property activity and saved
              properties.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Recent Activity */}
            <div className="pi-card-static overflow-hidden">
              <RecentActivity
                activities={data.activities}
              />
            </div>

            {/* Favorites */}
            <div className="pi-card-static overflow-hidden">
              <FavoritePreview
                favorites={data.favorites}
              />
            </div>

          </div>
        </section>

        {/* ===================================================
            Recently Viewed
        =================================================== */}
        <section className="mt-8 md:mt-10">

          <div className="pi-card-static overflow-hidden">
            <RecentlyViewedPreview
              recentlyViewed={data.recentlyViewed}
            />
          </div>

        </section>

        {/* ===================================================
            Bottom Spacing
        =================================================== */}
        <div className="h-6 md:h-8" />

      </div>
    </div>
  );
}