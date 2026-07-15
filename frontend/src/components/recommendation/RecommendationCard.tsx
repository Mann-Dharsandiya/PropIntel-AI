 import { Link } from "react-router-dom";

import { RecommendationProperty } from "@/api/recommendation";

interface Props {
  property: RecommendationProperty;
}

export default function RecommendationCard({
  property,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Property Image */}
      <div className="relative">
        <img
          src={
            property.images?.length > 0
              ? property.images[0]
              : "https://placehold.co/800x500?text=Property"
          }
          alt={property.title}
          className="h-56 w-full object-cover"
        />

        {/* Match Score */}
        <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white shadow">
          ⭐ {property.matchScore}%
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-4 p-5">

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {property.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            📍 {property.city}, {property.state}
          </p>
        </div>

        {/* Price */}
        <h3 className="text-3xl font-bold text-indigo-600">
          ₹ {property.price.toLocaleString("en-IN")}
        </h3>

        {/* Property Info */}
        <div className="grid grid-cols-3 gap-3 rounded-xl bg-gray-50 p-4">

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Bedrooms
            </p>

            <p className="mt-1 font-semibold">
              🛏 {property.bedrooms}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Bathrooms
            </p>

            <p className="mt-1 font-semibold">
              🚿 {property.bathrooms}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Area
            </p>

            <p className="mt-1 font-semibold">
              📐 {property.area} sqft
            </p>
          </div>

        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm text-gray-600">
          {property.description}
        </p>

        {/* View Property Button */}
        <Link
          to={`/properties/${property._id}`}
          className="block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition duration-300 hover:bg-indigo-700"
        >
          View Property
        </Link>

      </div>
    </div>
  );
}