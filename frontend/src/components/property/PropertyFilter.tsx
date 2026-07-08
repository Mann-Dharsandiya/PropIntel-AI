import { useState } from "react";

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

  return (
    <div className="mb-8 rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Search Properties
      </h2>

      <div className="grid gap-4 md:grid-cols-4">

        <input
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="rounded border p-3"
        />

        <select
          value={propertyType}
          onChange={(e) =>
            setPropertyType(e.target.value)
          }
          className="rounded border p-3"
        >
          <option value="">
            Property Type
          </option>

          <option>Apartment</option>

          <option>House</option>

          <option>Villa</option>

          <option>Commercial</option>

          <option>Plot</option>

        </select>

        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) =>
            setBedrooms(e.target.value)
          }
          className="rounded border p-3"
        />

        <input
          type="number"
          placeholder="Maximum Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
          className="rounded border p-3"
        />

      </div>

      <button
        onClick={() =>
          onSearch({
            city,
            propertyType,
            bedrooms,
            maxPrice,
          })
        }
        className="mt-5 rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
      >
        Search
      </button>

    </div>
  );
}