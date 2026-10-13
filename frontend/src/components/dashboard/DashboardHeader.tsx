 import { useAuth } from "@/context/AuthContext";
import { Search, ArrowUpRight } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useAuth();

  const firstName =
    user?.name?.split(" ")[0] || "User";

  return (
    <div className="pi-card-static relative overflow-hidden p-6 md:p-8">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-brass-100/40 blur-3xl" />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

        {/* =================================================
            Left — Welcome
        ================================================= */}
        <div className="min-w-0">

          {/* Small label */}
          <div className="pi-section-label">
            PropIntel AI Dashboard
          </div>

          {/* Heading */}
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Welcome back, {firstName}
            <span className="ml-2 inline-block">
              👋
            </span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
            Manage your properties, AI reports and
            investment insights from one intelligent
            workspace.
          </p>

          {/* Small status */}
          <div className="mt-5 flex flex-wrap items-center gap-3">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Dashboard Active
            </div>

            {user?.isVerified && (
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                Verified Account
                <ArrowUpRight size={13} />
              </div>
            )}

          </div>
        </div>

        {/* =================================================
            Right — Search + Profile
        ================================================= */}
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:w-auto">

          {/* Search */}
          <div className="relative w-full sm:w-64">

            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search properties..."
              className="pi-input w-full pl-10 pr-4"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-2 pr-4 shadow-sm backdrop-blur-sm">

            <img
              src={
                user?.profileImage ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(
                    user?.name || "User"
                  )
              }
              alt="Profile"
              className="h-11 w-11 rounded-xl border border-slate-200 object-cover"
            />

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-ink">
                {user?.name || "User"}
              </p>

              <p className="max-w-[150px] truncate text-xs text-slate-500">
                {user?.email || "PropIntel User"}
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}