import { useState } from "react";

interface Props {
  onSearch: (
    city: string,
    locality: string
  ) => void;

  onLoading: (loading: boolean) => void;
}

const localityOptions: Record<string, string[]> = {
  Mumbai: [
    "Borivali West",
    "Andheri East",
    "Bandra West",
    "Dadar",
  ],

  Pune: [
    "Baner",
    "Hinjewadi",
    "Kharadi",
    "Wakad",
  ],

  Ahmedabad: [
    "Satellite",
    "SG Highway",
    "Bopal",
  ],

  Bengaluru: [
    "Whitefield",
    "Electronic City",
  ],

  Hyderabad: [
    "Gachibowli",
    "Hitech City",
  ],
};

export default function LocalityForm({
  onSearch,
  onLoading,
}: Props) {
  const [city, setCity] =
    useState("Mumbai");

  const [locality, setLocality] =
    useState("Borivali West");

  const handleCityChange = (
    value: string
  ) => {
    setCity(value);

    setLocality(
      localityOptions[value][0]
    );
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onLoading(true);

    try {
      onSearch(city, locality);
    } finally {
      onLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold">
        📍 Locality Intelligence
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City
          </label>

          <select
            value={city}
            onChange={(e) =>
              handleCityChange(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          >
            {Object.keys(
              localityOptions
            ).map((city) => (
              <option
                key={city}
                value={city}
              >
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Locality
          </label>

          <select
            value={locality}
            onChange={(e) =>
              setLocality(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          >
            {localityOptions[
              city
            ].map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          📊 Get Market Intelligence
        </button>

      </div>
    </form>
  );
}