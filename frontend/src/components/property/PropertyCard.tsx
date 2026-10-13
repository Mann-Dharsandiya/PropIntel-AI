 import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
} from "lucide-react";

import { Property } from "@/api/property";
import FavoriteButton from "./FavoriteButton";

interface PropertyCardProps {
  property: Property;
}

function getFallbackImage(type: string) {
  switch (type) {
    case "Apartment":
      return "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80";

    case "Villa":
      return "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";

    case "House":
      return "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80";

    case "Plot":
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

    case "Commercial":
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

    default:
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";
  }
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const image =
    property.images?.length
      ? property.images[0]
      : getFallbackImage(property.propertyType);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">

      {/* ==================================================
          IMAGE
      ================================================== */}
      <div className="relative overflow-hidden">

        <Link
          to={`/properties/${property._id}`}
          className="block"
        >
          <img
            src={image}
            alt={property.title}
            onError={(e) => {
              e.currentTarget.src = getFallbackImage(
                property.propertyType
              );
            }}
            className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/5" />

        {/* Top badges */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">

          {/* Availability */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            Available
          </span>

          {/* Property type */}
          <span className="rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800 shadow-sm backdrop-blur-md">
            {property.propertyType}
          </span>

        </div>

        {/* Favorite */}
        <div className="absolute bottom-4 right-4 z-20">

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105">

            <FavoriteButton
              propertyId={property._id}
            />

          </div>

        </div>

      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}
      <div className="p-5">

        <Link
          to={`/properties/${property._id}`}
          className="block"
        >

          {/* Title */}
          <h2 className="line-clamp-1 font-display text-lg font-bold tracking-tight text-ink transition-colors duration-200 group-hover:text-brass-600">
            {property.title}
          </h2>

          {/* Location */}
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">

            <MapPin
              size={14}
              strokeWidth={2}
              className="shrink-0 text-brass-500"
            />

            <span className="line-clamp-1">
              {property.city}, {property.state}
            </span>

          </p>

          {/* Price */}
          <div className="mt-4">

            <span className="font-display text-xl font-bold tracking-tight text-ink">
              ₹{property.price.toLocaleString("en-IN")}
            </span>

          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-500">
            {property.description}
          </p>

          {/* ==================================================
              PROPERTY STATS
          ================================================== */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80">

            {/* Bedrooms */}
            <div className="px-2 py-3 text-center transition-colors duration-200 group-hover:bg-white">

              <BedDouble
                size={17}
                strokeWidth={1.8}
                className="mx-auto text-slate-400"
              />

              <p className="mt-1 text-sm font-bold text-ink">
                {property.bedrooms}
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Beds
              </p>

            </div>

            {/* Bathrooms */}
            <div className="px-2 py-3 text-center transition-colors duration-200 group-hover:bg-white">

              <Bath
                size={17}
                strokeWidth={1.8}
                className="mx-auto text-slate-400"
              />

              <p className="mt-1 text-sm font-bold text-ink">
                {property.bathrooms}
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Baths
              </p>

            </div>

            {/* Area */}
            <div className="px-2 py-3 text-center transition-colors duration-200 group-hover:bg-white">

              <Ruler
                size={17}
                strokeWidth={1.8}
                className="mx-auto text-slate-400"
              />

              <p className="mt-1 truncate text-sm font-bold text-ink">
                {property.area}
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Sq.Ft
              </p>

            </div>

          </div>

          {/* ==================================================
              VIEW DETAILS
          ================================================== */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

            <span className="text-xs font-semibold text-slate-500 transition-colors group-hover:text-slate-700">
              View property
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brass-500">

              <ArrowUpRight
                size={15}
                strokeWidth={2}
              />

            </span>

          </div>

        </Link>

      </div>

    </article>
  );
}