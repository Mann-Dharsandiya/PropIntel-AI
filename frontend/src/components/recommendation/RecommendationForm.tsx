import { useState } from "react";

import {
  getRecommendations,
  RecommendationProperty,
} from "@/api/recommendation";

interface Props {
  onRecommendations: (
    properties: RecommendationProperty[]
  ) => void;

  onLoading: (
    loading: boolean
  ) => void;
}

export default function RecommendationForm({
  onRecommendations,
  onLoading,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      budget: 10000000,

      city: "",

      propertyType: "Apartment",

      bedrooms: 3,

      bathrooms: 2,

      minArea: 1500,
    });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "city" ||
        name === "propertyType"
          ? value
          : Number(value),
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      onLoading(true);

      const properties =
        await getRecommendations(
          formData
        );

      onRecommendations(properties);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to fetch recommendations."
      );

    } finally {

      setLoading(false);

      onLoading(false);
    }
  }
    return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        🤖 AI Property Recommendation
      </h2>

      <div className="space-y-5">

        {/* Budget */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Budget (₹)
          </label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* City */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City
          </label>

          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Property Type */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Property Type
          </label>

          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
            <option>Commercial</option>
            <option>Plot</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* Bedrooms */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bedrooms
            </label>

            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Bathrooms */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Bathrooms
            </label>

            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

        </div>

        {/* Minimum Area */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Minimum Area (sq.ft)
          </label>

          <input
            type="number"
            name="minArea"
            value={formData.minArea}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading
            ? "🤖 Finding Properties..."
            : "🏡 Find Best Properties"}
        </button>

      </div>
    </form>
  );
}