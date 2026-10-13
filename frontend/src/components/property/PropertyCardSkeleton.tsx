 export default function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* ==================================================
          IMAGE SKELETON
      ================================================== */}
      <div className="relative h-56 w-full animate-pulse bg-slate-200">

        {/* Availability badge */}
        <div className="absolute left-4 top-4 h-7 w-24 rounded-full bg-slate-300" />

        {/* Property type badge */}
        <div className="absolute right-4 top-4 h-7 w-24 rounded-full bg-slate-300" />

        {/* Favorite button */}
        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-slate-300" />

      </div>

      {/* ==================================================
          CONTENT SKELETON
      ================================================== */}
      <div className="animate-pulse p-5">

        {/* Title */}
        <div className="h-5 w-3/4 rounded-md bg-slate-200" />

        {/* Location */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-slate-200" />
          <div className="h-3.5 w-1/2 rounded bg-slate-200" />
        </div>

        {/* Price */}
        <div className="mt-5 h-6 w-36 rounded-md bg-slate-200" />

        {/* Description */}
        <div className="mt-3 space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-100" />
          <div className="h-3.5 w-4/5 rounded bg-slate-100" />
        </div>

        {/* ==================================================
            STATS
        ================================================== */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

          {/* Beds */}
          <div className="flex flex-col items-center px-2 py-3">
            <div className="h-4 w-4 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-6 rounded bg-slate-200" />
            <div className="mt-1 h-2.5 w-8 rounded bg-slate-100" />
          </div>

          {/* Baths */}
          <div className="flex flex-col items-center px-2 py-3">
            <div className="h-4 w-4 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-6 rounded bg-slate-200" />
            <div className="mt-1 h-2.5 w-8 rounded bg-slate-100" />
          </div>

          {/* Area */}
          <div className="flex flex-col items-center px-2 py-3">
            <div className="h-4 w-4 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-12 rounded bg-slate-200" />
            <div className="mt-1 h-2.5 w-10 rounded bg-slate-100" />
          </div>

        </div>

        {/* ==================================================
            VIEW DETAILS
        ================================================== */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

          <div className="h-3.5 w-24 rounded bg-slate-200" />

          <div className="h-8 w-8 rounded-full bg-slate-200" />

        </div>

      </div>
    </div>
  );
}