interface Props {
  propertyType: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;

  onPropertyTypeChange: (value: string) => void;
  onBedroomsChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onMinAreaChange: (value: string) => void;
  onMaxAreaChange: (value: string) => void;

  onClear: () => void;
}

export default function PropertyFilters({
  propertyType,
  bedrooms,
  minPrice,
  maxPrice,
  minArea,
  maxArea,

  onPropertyTypeChange,
  onBedroomsChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinAreaChange,
  onMaxAreaChange,

  onClear,
}: Props) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          🎯 Smart Filters
        </h2>

        <button
          onClick={onClear}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Clear
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        <select
          value={propertyType}
          onChange={(e) =>
            onPropertyTypeChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        >
          <option value="">
            All Property Types
          </option>

          <option>
            Apartment
          </option>

          <option>
            House
          </option>

          <option>
            Villa
          </option>

          <option>
            Commercial
          </option>

        </select>

        <select
          value={bedrooms}
          onChange={(e) =>
            onBedroomsChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        >
          <option value="">
            All Bedrooms
          </option>

          <option value="1">
            1 BHK
          </option>

          <option value="2">
            2 BHK
          </option>

          <option value="3">
            3 BHK
          </option>

          <option value="4">
            4+ BHK
          </option>

        </select>

        <input
          type="number"
          placeholder="Minimum Price"
          value={minPrice}
          onChange={(e) =>
            onMinPriceChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          placeholder="Maximum Price"
          value={maxPrice}
          onChange={(e) =>
            onMaxPriceChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          placeholder="Minimum Area"
          value={minArea}
          onChange={(e) =>
            onMinAreaChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          placeholder="Maximum Area"
          value={maxArea}
          onChange={(e) =>
            onMaxAreaChange(
              e.target.value
            )
          }
          className="rounded-lg border p-3"
        />

      </div>

    </div>
  );
}