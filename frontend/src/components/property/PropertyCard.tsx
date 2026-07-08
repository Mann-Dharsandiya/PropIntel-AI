 import { Link } from "react-router-dom";
import { Property } from "@/api/property";

interface PropertyCardProps {
  property: Property;
}

function getFallbackImage(type: string) {
  switch (type) {
    case "Apartment":
      return "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80";

    case "Villa":
      return "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80";

    case "House":
      return "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80";

    case "Plot":
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

    case "Commercial":
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

    default:
      return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";
  }
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <Link to={`/properties/${property._id}`}>

      <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Image */}
        <div className="relative overflow-hidden">

          <img
            src={
              property.images.length > 0
                ? property.images[0]
                : getFallbackImage(property.propertyType)
            }
            alt={property.title}
            onError={(e) => {
              e.currentTarget.src = getFallbackImage(
                property.propertyType
              );
            }}
            className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Status */}
          <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow">
            Available
          </span>

          {/* Property Type */}
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
            {property.propertyType}
          </span>

        </div>

        {/* Content */}
        <div className="p-5">

          <div className="mb-2 flex items-center justify-between">

            <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
              {property.title}
            </h2>

          </div>

          {/* Location */}
          <p className="mb-3 text-sm text-gray-500">
            📍 {property.city}, {property.state}
          </p>

          {/* Price */}
          <h3 className="mb-4 text-2xl font-bold text-blue-600">
            ₹ {property.price.toLocaleString()}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-600">
            {property.description}
          </p>

          {/* Features */}
          <div className="mb-5 grid grid-cols-3 rounded-xl bg-gray-50 p-3 text-center">

            <div>
              <div className="text-lg">🛏</div>
              <p className="text-sm font-medium">
                {property.bedrooms}
              </p>
            </div>

            <div>
              <div className="text-lg">🛁</div>
              <p className="text-sm font-medium">
                {property.bathrooms}
              </p>
            </div>

            <div>
              <div className="text-lg">📐</div>
              <p className="text-sm font-medium">
                {property.area}
              </p>
            </div>

          </div>

          {/* Button */}
          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
            View Details →
          </button>

        </div>

      </div>

    </Link>
  );
}