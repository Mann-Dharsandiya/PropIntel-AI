import { Link } from "react-router-dom";

import { LocalityProperty } from "@/api/localityProperties";

interface Props {
  property: LocalityProperty;
}

export default function LocalityPropertyCard({
  property,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={
          property.images?.[0] ||
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
        }
        alt={property.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">
          {property.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          📍 {property.locality}, {property.city}
        </p>

        <p className="mt-4 text-3xl font-bold text-indigo-600">
          ₹
          {property.price.toLocaleString(
            "en-IN"
          )}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-gray-100 p-3">
            <p className="text-xs text-gray-500">
              Bedrooms
            </p>

            <p className="mt-1 font-bold">
              {property.bedrooms}
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-3">
            <p className="text-xs text-gray-500">
              Bathrooms
            </p>

            <p className="mt-1 font-bold">
              {property.bathrooms}
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 p-3">
            <p className="text-xs text-gray-500">
              Area
            </p>

            <p className="mt-1 font-bold">
              {property.area} sq.ft
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-700">
            👤 {property.owner.name}
          </p>

          <p className="text-sm text-gray-500">
            📞 {property.owner.phone}
          </p>
        </div>

        <Link
          to={`/properties/${property._id}`}
          className="mt-6 block rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
        >
          View Property
        </Link>
      </div>
    </div>
  );
}