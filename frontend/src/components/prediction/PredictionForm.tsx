 import { useState } from "react";
import { predictPrice } from "@/api/ml";

interface Props {
  onPrediction: (price: number) => void;
  onLoading: (loading: boolean) => void;
}

export default function PredictionForm({
  onPrediction,
  onLoading,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    city: "",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    age: 2,
    parking: 1,
    furnished: "Semi Furnished",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "city" ||
        name === "propertyType" ||
        name === "furnished"
          ? value
          : Number(value),
    }));
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      onLoading(true);

      const result = await predictPrice(formData);

      onPrediction(result.predictedPrice);
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
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
        Property Details
      </h2>

      <div className="space-y-5">

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
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

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

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Area (sq.ft)
            </label>

            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Property Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Parking
            </label>

            <input
              type="number"
              name="parking"
              value={formData.parking}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Furnished
            </label>

            <select
              name="furnished"
              value={formData.furnished}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            >
              <option>Furnished</option>
              <option>Semi Furnished</option>
              <option>Unfurnished</option>
            </select>
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "🤖 Predicting..." : "🤖 Predict Price"}
        </button>

      </div>
    </form>
  );
}