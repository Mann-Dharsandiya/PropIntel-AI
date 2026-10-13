import { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  BedDouble,
  IndianRupee,
  SlidersHorizontal,
} from "lucide-react";

interface Props {
  onSearch: (filters: {
    city: string;
    propertyType: string;
    bedrooms: string;
    maxPrice: string;
  }) => void;
}

export default function PropertyFilter({
  onSearch,
}: Props) {
  const [city, setCity] = useState("");

  const [propertyType, setPropertyType] =
    useState("");

  const [bedrooms, setBedrooms] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  function handleSearch() {
    onSearch({
      city,
      propertyType,
      bedrooms,
      maxPrice,
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          Header
      ===================================================== */}
      <div className="border-b border-slate-200/70 px-5 py-5 md:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
            <SlidersHorizontal
              size={19}
              strokeWidth={1.8}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              Search Properties
            </h2>

            <p className="mt-0.5 text-xs text-slate-400 md:text-sm">
              Refine your search to find the right property.
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          Filters
      ===================================================== */}
      <div className="p-5 md:p-6">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              City
          ================================================= */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <MapPin
                size={14}
                className="text-slate-400"
              />
              City
            </label>

            <div className="relative">

              <MapPin
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="pi-input w-full pl-10"
              />

            </div>
          </div>

          {/* =================================================
              Property Type
          ================================================= */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Home
                size={14}
                className="text-slate-400"
              />
              Property Type
            </label>

            <div className="relative">

              <Home
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(
                    e.target.value
                  )
                }
                className="pi-input w-full appearance-none pl-10 pr-9"
              >
                <option value="">
                  All property types
                </option>

                <option value="Apartment">
                  Apartment
                </option>

                <option value="House">
                  House
                </option>

                <option value="Villa">
                  Villa
                </option>

                <option value="Commercial">
                  Commercial
                </option>

                <option value="Plot">
                  Plot
                </option>
              </select>

              {/* Select arrow */}
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ▼
              </span>

            </div>
          </div>

          {/* =================================================
              Bedrooms
          ================================================= */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <BedDouble
                size={14}
                className="text-slate-400"
              />
              Bedrooms
            </label>

            <div className="relative">

              <BedDouble
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                placeholder="Any bedrooms"
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(
                    e.target.value
                  )
                }
                className="pi-input w-full pl-10"
              />

            </div>
          </div>

          {/* =================================================
              Maximum Price
          ================================================= */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <IndianRupee
                size={14}
                className="text-slate-400"
              />
              Maximum Price
            </label>

            <div className="relative">

              <IndianRupee
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="number"
                min="0"
                placeholder="No maximum"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value
                  )
                }
                className="pi-input w-full pl-10"
              />

            </div>
          </div>

        </div>

        {/* =====================================================
            Search Button
        ===================================================== */}
        <div className="mt-6 flex justify-end">

          <button
            type="button"
            onClick={handleSearch}
            className="pi-btn pi-btn-primary w-full sm:w-auto"
          >
            <Search size={18} />
            Search Properties
          </button>

        </div>

      </div>
    </div>
  );
}