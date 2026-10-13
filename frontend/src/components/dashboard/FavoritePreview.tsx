 import { Heart, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardFavorite } from "@/api/dashboard";

interface Props {
  favorites: DashboardFavorite[];
}

export default function FavoritePreview({
  favorites,
}: Props) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-card-hover md:p-6">

      {/* =====================================================
          Header
      ===================================================== */}
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100 bg-rose-50">
            <Heart
              size={19}
              strokeWidth={1.8}
              className="fill-rose-500 text-rose-500"
            />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              Favorite Properties
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Your saved properties
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
            {favorites.length} Saved
          </span>
        )}

      </div>

      {/* =====================================================
          Empty State
      ===================================================== */}
      {favorites.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50">
            <Heart
              size={29}
              strokeWidth={1.6}
              className="text-rose-300"
            />
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-600">
            No favorite properties yet
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Save properties you like and access them quickly from your dashboard.
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
           Favorite List
        =================================================== */
        <div className="space-y-3">

          {favorites.map((property) => (
            <Link
              key={property._id}
              to={`/properties/${property._id}`}
              className="group relative block overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-100 hover:bg-rose-50/30 hover:shadow-sm"
            >

              <div className="flex items-center justify-between gap-4">

                {/* =================================================
                    Property Information
                ================================================= */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Heart
                        size={17}
                        strokeWidth={1.8}
                        className="fill-rose-500 text-rose-500"
                      />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-sm font-semibold text-ink md:text-base">
                        {property.title}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 md:text-sm">
                        <MapPin
                          size={14}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="truncate">
                          {property.city}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* =================================================
                    Price + Arrow
                ================================================= */}
                <div className="flex shrink-0 items-center gap-3">

                  <div className="text-right">

                    <p className="text-xs text-slate-400">
                      Price
                    </p>

                    <p className="mt-0.5 font-display text-sm font-bold text-blueprint-700 md:text-base">
                      ₹
                      {property.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                  <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-300 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blueprint-700 sm:flex">
                    <ArrowUpRight size={17} />
                  </div>

                </div>

              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-400 to-brass-500 transition-all duration-500 group-hover:w-full" />

            </Link>
          ))}

        </div>
      )}

    </div>
  );
}