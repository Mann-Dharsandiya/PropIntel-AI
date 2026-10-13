 import { useEffect, useState } from "react";

import {
  getProperties,
  Property,
  PropertyFilters,
  Pagination,
} from "@/api/property";

import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import PropertyCardSkeleton from "@/components/property/PropertyCardSkeleton";

export default function PropertyListPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filters, setFilters] =
    useState<PropertyFilters>({
      page: 1,
      limit: 6,
    });

  // =========================================================
  // Load Properties
  // =========================================================
  async function loadProperties(
    newFilters: PropertyFilters = filters
  ) {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProperties(newFilters);

      setProperties(data.properties);
      setPagination(data.pagination);
      setFilters(newFilters);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // Initial Load
  // =========================================================
  useEffect(() => {
    loadProperties(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================================================
  // Search / Filters
  // =========================================================
  function handleSearch(
    searchFilters: PropertyFilters
  ) {
    loadProperties({
      ...searchFilters,
      page: 1,
      limit: 6,
    });
  }

  // =========================================================
  // Pagination
  // =========================================================
  function changePage(page: number) {
    loadProperties({
      ...filters,
      page,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // Reset Filters
  // =========================================================
  function resetFilters() {
    const defaultFilters: PropertyFilters = {
      page: 1,
      limit: 6,
    };

    loadProperties(defaultFilters);
  }

  // =========================================================
  // ERROR STATE
  // =========================================================
  if (error) {
    return (
      <main className="pi-page min-h-[calc(100vh-80px)]">
        <div className="pi-container flex min-h-[600px] items-center justify-center py-12">

          <div className="pi-card w-full max-w-xl p-8 text-center md:p-10">

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-2xl">
              ⚠️
            </div>

            {/* Label */}
            <div className="mt-6 pi-section-label">
              Property Intelligence
            </div>

            {/* Heading */}
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Something went wrong
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              {error}
            </p>

            {/* Retry */}
            <button
              type="button"
              onClick={() =>
                loadProperties(filters)
              }
              className="pi-btn pi-btn-primary mt-7"
            >
              Try Again
            </button>

          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <main className="pi-page min-h-[calc(100vh-80px)]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-brass-100/30 blur-3xl" />

        <div className="pi-container relative py-9 md:py-12">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            {/* =================================================
                Header Content
            ================================================= */}
            <div>

              <div className="pi-section-label">
                Property Intelligence
              </div>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Available Properties
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Discover properties using intelligent filters
                and data-driven property insights.
              </p>

            </div>

            {/* =================================================
                Property Count
            ================================================= */}
            {pagination && !loading && (
              <div className="flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm">

                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm" />

                <span className="text-xs font-semibold text-slate-600">
                  {pagination.total}{" "}
                  {pagination.total === 1
                    ? "property"
                    : "properties"}{" "}
                  available
                </span>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="pi-container py-8 md:py-10">

        {/* ===================================================
            FILTERS
        =================================================== */}
        <div className="mb-8">

          <div className="mb-4 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Refine Search
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          <PropertyFilter
            onSearch={handleSearch}
          />

        </div>

        {/* ===================================================
            RESULT SUMMARY
        =================================================== */}
        {pagination && !loading && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-500">

              Showing{" "}

              <span className="font-semibold text-ink">
                {properties.length}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-ink">
                {pagination.total}
              </span>{" "}

              properties

            </p>

            <div className="flex items-center gap-2">

              <span className="text-xs text-slate-400">
                Page
              </span>

              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {pagination.page}
              </span>

              <span className="text-xs text-slate-400">
                of
              </span>

              <span className="text-xs font-semibold text-slate-600">
                {pagination.pages}
              </span>

            </div>

          </div>
        )}

        {/* ===================================================
            LOADING
        =================================================== */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map(
              (_, index) => (
                <PropertyCardSkeleton
                  key={index}
                />
              )
            )}

          </div>

        ) : properties.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */
          <div className="pi-card flex min-h-[460px] flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-4xl shadow-sm">
              🏠
            </div>

            <div className="mt-7 pi-section-label">
              Property Search
            </div>

            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              No Properties Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find any properties matching
              your current search criteria.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="pi-btn pi-btn-primary mt-7"
            >
              Reset Filters
            </button>

          </div>

        ) : (

          /* =================================================
             PROPERTY RESULTS
          ================================================= */
          <>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {properties.map(
                (property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                )
              )}

            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}
            {pagination &&
              pagination.pages > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

                  {/* Previous */}
                  <button
                    type="button"
                    disabled={
                      pagination.page === 1
                    }
                    onClick={() =>
                      changePage(
                        pagination.page - 1
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    ← Previous
                  </button>

                  {/* First Page */}
                  {pagination.page > 3 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          changePage(1)
                        }
                        className="min-w-[42px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                      >
                        1
                      </button>

                      {pagination.page > 4 && (
                        <span className="px-1 text-slate-400">
                          ...
                        </span>
                      )}
                    </>
                  )}

                  {/* Middle Pages */}
                  {Array.from(
                    {
                      length:
                        pagination.pages,
                    },
                    (_, i) => i + 1
                  )
                    .filter(
                      (page) =>
                        page >=
                          pagination.page - 2 &&
                        page <=
                          pagination.page + 2
                    )
                    .map((page) => (
                      <button
                        type="button"
                        key={page}
                        onClick={() =>
                          changePage(page)
                        }
                        className={`min-w-[42px] rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                          page ===
                          pagination.page
                            ? "bg-blueprint-800 text-white shadow-md shadow-blueprint-800/20"
                            : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                  {/* Last Page */}
                  {pagination.page <
                    pagination.pages - 2 && (
                    <>
                      {pagination.page <
                        pagination.pages - 3 && (
                        <span className="px-1 text-slate-400">
                          ...
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          changePage(
                            pagination.pages
                          )
                        }
                        className="min-w-[42px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
                      >
                        {pagination.pages}
                      </button>
                    </>
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    disabled={
                      pagination.page ===
                      pagination.pages
                    }
                    onClick={() =>
                      changePage(
                        pagination.page + 1
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    Next →
                  </button>

                </div>
              )}

          </>
        )}

      </section>
    </main>
  );
}