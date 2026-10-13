 import {
  History,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardRecentlyViewed } from "@/api/dashboard";

interface Props {
  recentlyViewed: DashboardRecentlyViewed[];
}

export default function RecentlyViewedPreview({
  recentlyViewed,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-card-hover md:p-6">

      {/* =====================================================
          Header
      ===================================================== */}
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
            <History
              size={19}
              strokeWidth={1.8}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              Recently Viewed
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Properties you've explored
            </p>
          </div>
        </div>

        {recentlyViewed.length > 0 && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {recentlyViewed.length} Viewed
          </span>
        )}

      </div>

      {/* =====================================================
          Empty State
      ===================================================== */}
      {recentlyViewed.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
            <History
              size={29}
              strokeWidth={1.6}
              className="text-blue-300"
            />
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-600">
            No recently viewed properties
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Properties you explore will appear here for quick access.
          </p>

          <Link
            to="/properties"
            className="pi-btn pi-btn-primary mt-5"
          >
            Browse Properties
          </Link>

        </div>
      ) : (
        /* ===================================================
           Recently Viewed List
        =================================================== */
        <div className="grid gap-3 md:grid-cols-2">

          {recentlyViewed.map((item) => (
            <Link
              key={item._id}
              to={`/properties/${item.property._id}`}
              className="group relative block overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-sm"
            >

              <div className="flex items-start justify-between gap-4">

                {/* =================================================
                    Property Information
                ================================================= */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <History
                        size={17}
                        strokeWidth={1.8}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-ink md:text-base">
                        {item.property.title}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 md:text-sm">
                        <MapPin
                          size={14}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate">
                          {item.property.city}
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Viewed Time */}
                  <div className="mt-4 flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                    <p className="text-xs text-slate-400">
                      Viewed{" "}
                      {new Date(
                        item.viewedAt
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    Price + Arrow
                ================================================= */}
                <div className="flex shrink-0 flex-col items-end gap-3">

                  <p className="font-display text-sm font-bold text-blueprint-700 md:text-base">
                    ₹
                    {item.property.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-300 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blueprint-700">
                    <ArrowUpRight size={16} />
                  </div>

                </div>

              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blueprint-700 to-brass-500 transition-all duration-500 group-hover:w-full" />

            </Link>
          ))}

        </div>
      )}

    </div>
  );
}