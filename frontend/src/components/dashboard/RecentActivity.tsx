 import { Clock, Activity, ArrowUpRight } from "lucide-react";
import { DashboardActivity } from "@/api/dashboard";

interface Props {
  activities: DashboardActivity[];
}

export default function RecentActivity({
  activities,
}: Props) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-card-hover md:p-6">

      {/* =====================================================
          Header
      ===================================================== */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <Activity
                size={18}
                strokeWidth={1.8}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
                Recent Activity
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Your latest actions
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">
          <Clock
            size={18}
            className="text-slate-500"
          />
        </div>
      </div>

      {/* =====================================================
          Empty State
      ===================================================== */}
      {activities.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Clock
              size={28}
              strokeWidth={1.6}
              className="text-slate-300"
            />
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-600">
            No recent activity
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Your recent property activity will appear here.
          </p>
        </div>
      ) : (
        /* ===================================================
           Activity List
        =================================================== */
        <div className="space-y-3">

          {activities.map((activity, index) => (
            <div
              key={index}
              className="group relative flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50/40 hover:shadow-sm"
            >

              {/* Timeline */}
              <div className="relative flex shrink-0 flex-col items-center">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 transition-transform duration-300 group-hover:scale-105">
                  <Clock
                    size={18}
                    strokeWidth={1.8}
                    className="text-blue-600"
                  />
                </div>

                {/* Connector */}
                {index < activities.length - 1 && (
                  <div className="absolute top-12 h-full w-px bg-slate-200" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                  <h3 className="line-clamp-2 text-sm font-semibold text-ink">
                    {activity.title}
                  </h3>

                  <ArrowUpRight
                    size={16}
                    className="mt-0.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                  />
                </div>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  {activity.description}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <Clock
                    size={13}
                    className="text-slate-400"
                  />

                  <p className="text-xs text-slate-400">
                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-full" />

            </div>
          ))}

        </div>
      )}
    </div>
  );
}