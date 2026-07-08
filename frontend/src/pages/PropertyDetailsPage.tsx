 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProperty, Property } from "@/api/property";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperty() {
      try {
        if (!id) return;

        const data = await getProperty(id);

        setProperty(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load property."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading Property...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">

        <div className="mb-5 text-7xl">
          ⚠️
        </div>

        <h2 className="text-3xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Go Back
        </button>

      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-20 text-center">
        Property not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 rounded-lg border px-5 py-2 transition hover:bg-gray-100"
      >
        ← Back to Listings
      </button>

      {/* Hero Image */}

      <div className="overflow-hidden rounded-3xl shadow-xl">

        <img
          src={property.images[0]}
          alt={property.title}
          className="h-[500px] w-full object-cover"
        />

      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
          Available
        </span>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          {property.propertyType}
        </span>

      </div>

      <h1 className="mt-5 text-4xl font-bold">
        {property.title}
      </h1>

      <p className="mt-4 text-4xl font-bold text-blue-600">
        ₹ {property.price.toLocaleString()}
      </p>

      <p className="mt-3 text-lg text-gray-600">
        📍 {property.address},
        {" "}
        {property.city},
        {" "}
        {property.state},
        {" "}
        {property.country}
      </p>

      {/* Features */}

      <div className="mt-10 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-gray-100 p-6 text-center">

          <div className="text-4xl">
            🛏
          </div>

          <h3 className="mt-3 font-semibold">
            Bedrooms
          </h3>

          <p className="mt-2 text-2xl font-bold">
            {property.bedrooms}
          </p>

        </div>

        <div className="rounded-2xl bg-gray-100 p-6 text-center">

          <div className="text-4xl">
            🛁
          </div>

          <h3 className="mt-3 font-semibold">
            Bathrooms
          </h3>

          <p className="mt-2 text-2xl font-bold">
            {property.bathrooms}
          </p>

        </div>

        <div className="rounded-2xl bg-gray-100 p-6 text-center">

          <div className="text-4xl">
            📐
          </div>

          <h3 className="mt-3 font-semibold">
            Area
          </h3>

          <p className="mt-2 text-2xl font-bold">
            {property.area} sqft
          </p>

        </div>

      </div>

      {/* Description */}

      <div className="mt-10 rounded-2xl border p-8 shadow">

        <h2 className="mb-4 text-3xl font-bold">
          Description
        </h2>

        <p className="leading-8 text-gray-700">
          {property.description}
        </p>

      </div>

      {/* Owner */}

      {property.owner && (
        <div className="mt-10 rounded-2xl border p-8 shadow">

          <h2 className="mb-6 text-3xl font-bold">
            Property Owner
          </h2>

          <div className="space-y-3">

            <p>
              👤{" "}
              <strong>Name:</strong>{" "}
              {property.owner.name}
            </p>

            <p>
              📧{" "}
              <strong>Email:</strong>{" "}
              {property.owner.email}
            </p>

            <p>
              📞{" "}
              <strong>Phone:</strong>{" "}
              {property.owner.phone}
            </p>

          </div>

          <div className="mt-8 flex gap-4">

            <a
              href={`mailto:${property.owner.email}`}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Email Owner
            </a>

            <a
              href={`tel:${property.owner.phone}`}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Call Owner
            </a>

          </div>

        </div>
      )}

    </div>
  );
}