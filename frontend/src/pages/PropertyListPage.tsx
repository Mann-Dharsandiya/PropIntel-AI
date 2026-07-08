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

  async function loadProperties(
    newFilters: PropertyFilters = filters
  ) {
    try {
      setLoading(true);
      setError("");

      const data = await getProperties(newFilters);

      setProperties(data.properties);
      setPagination(data.pagination);
      setFilters(newFilters);
    } catch (err) {
      console.error(err);
      setError("Unable to load properties.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties(filters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(
    searchFilters: PropertyFilters
  ) {
    loadProperties({
      ...searchFilters,
      page: 1,
      limit: 6,
    });
  }

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

  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center">

        <div className="mb-6 text-7xl">
          ⚠️
        </div>

        <h2 className="text-3xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

        <button
          onClick={() => loadProperties(filters)}
          className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="mb-6 text-4xl font-bold">
        Available Properties
      </h1>

      <PropertyFilter
        onSearch={handleSearch}
      />

      {pagination && !loading && (
        <div className="mb-5 mt-5 flex items-center justify-between text-sm text-gray-500">

          <span>
            Showing{" "}
            <strong>
              {properties.length}
            </strong>{" "}
            of{" "}
            <strong>
              {pagination.total}
            </strong>{" "}
            properties
          </span>

          <span>
            Page{" "}
            <strong>
              {pagination.page}
            </strong>{" "}
            of{" "}
            <strong>
              {pagination.pages}
            </strong>
          </span>

        </div>
      )}

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {Array.from({
            length: 6,
          }).map((_, index) => (
            <PropertyCardSkeleton
              key={index}
            />
          ))}

        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-gray-50 py-20 text-center">

          <div className="mb-6 text-7xl">
            🏠
          </div>

          <h2 className="text-3xl font-bold">
            No Properties Found
          </h2>

          <p className="mt-3 text-gray-500">
            We couldn't find any
            properties matching your
            search.
          </p>

          <button
            onClick={() =>
              loadProperties({
                page: 1,
                limit: 6,
              })
            }
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Reset Filters
          </button>

        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {properties.map(
              (property) => (
                <PropertyCard
                  key={property._id}
                  property={
                    property
                  }
                />
              )
            )}

          </div>

          {pagination &&
            pagination.pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">

                <button
                  disabled={
                    pagination.page ===
                    1
                  }
                  onClick={() =>
                    changePage(
                      pagination.page -
                        1
                    )
                  }
                  className="rounded-lg border bg-white px-4 py-2 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ← Previous
                </button>

                {Array.from(
                  {
                    length:
                      pagination.pages,
                  },
                  (_, index) => (
                    <button
                      key={
                        index + 1
                      }
                      onClick={() =>
                        changePage(
                          index + 1
                        )
                      }
                      className={`rounded-lg px-4 py-2 transition ${
                        pagination.page ===
                        index + 1
                          ? "bg-blue-600 text-white shadow"
                          : "border bg-white hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={
                    pagination.page ===
                    pagination.pages
                  }
                  onClick={() =>
                    changePage(
                      pagination.page +
                        1
                    )
                  }
                  className="rounded-lg border bg-white px-4 py-2 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next →
                </button>

              </div>
            )}
        </>
      )}
    </div>
  );
}