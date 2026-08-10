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
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
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
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Failed to load Dashboard
            </h2>

            <p className="mt-3 text-gray-600">
              Something went wrong while loading your dashboard.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
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
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">

        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <DashboardHeader />

        {/* ================================================= */}
        {/* Statistics */}
        {/* ================================================= */}

        <section className="mt-8">
          <DashboardStats stats={data.stats} />
        </section>

        {/* ================================================= */}
        {/* Quick Actions */}
        {/* ================================================= */}

        <section className="mt-8">
          <QuickActions />
        </section>

        {/* ================================================= */}
        {/* Investment Portfolio */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Investment Intelligence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your real estate investments, portfolio
              performance and AI-powered insights.
            </p>
          </div>

          <PortfolioButton />

        </section>

        {/* ================================================= */}
        {/* Activity & Favorites */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="grid gap-6 lg:grid-cols-2">

            <RecentActivity
              activities={data.activities}
            />

            <FavoritePreview
              favorites={data.favorites}
            />

          </div>

        </section>

        {/* ================================================= */}
        {/* Recently Viewed */}
        {/* ================================================= */}

        <section className="mt-10">

          <RecentlyViewedPreview
            recentlyViewed={data.recentlyViewed}
          />

        </section>

      </div>
    </div>
  );
}