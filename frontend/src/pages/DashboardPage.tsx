 import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "@/api/dashboard";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FavoritePreview from "@/components/dashboard/FavoritePreview";
import RecentlyViewedPreview from "@/components/dashboard/RecentlyViewedPreview";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Failed to load Dashboard
            </h2>

            <p className="mt-3 text-gray-600">
              Something went wrong while loading your dashboard.
            </p>

            <button
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">

        {/* Header */}
        <DashboardHeader />

        {/* Statistics */}
        <DashboardStats stats={data.stats} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Activity & Favorites */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity
            activities={data.activities}
          />

          <FavoritePreview
            favorites={data.favorites}
          />
        </div>

        {/* Recently Viewed */}
        <RecentlyViewedPreview
          recentlyViewed={data.recentlyViewed}
        />

      </div>
    </div>
  );
}