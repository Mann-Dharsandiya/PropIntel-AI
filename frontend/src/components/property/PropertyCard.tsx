 import { Link } from "react-router-dom";
import { Property } from "@/api/property";
import FavoriteButton from "./FavoriteButton";

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
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative overflow-hidden">

        <Link to={`/properties/${property._id}`}>
          <img
            src={
              property.images.length
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
        </Link>

        <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
          Available
        </span>

        <span className="absolute right-16 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
          {property.propertyType}
        </span>

        <div className="absolute right-4 top-4 z-20">
          <FavoriteButton propertyId={property._id} />
        </div>

      </div>

      <Link to={`/properties/${property._id}`}>

        <div className="p-5">

          <h2 className="mb-2 line-clamp-1 text-xl font-bold">
            {property.title}
          </h2>

          <p className="mb-3 text-sm text-gray-500">
            📍 {property.city}, {property.state}
          </p>

          <h3 className="mb-4 text-2xl font-bold text-blue-600">
            ₹ {property.price.toLocaleString()}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm text-gray-600">
            {property.description}
          </p>

          <div className="mb-5 grid grid-cols-3 rounded-xl bg-gray-50 p-3 text-center">

            <div>
              <div className="text-lg">🛏</div>
              <p>{property.bedrooms}</p>
            </div>

            <div>
              <div className="text-lg">🛁</div>
              <p>{property.bathrooms}</p>
            </div>

            <div>
              <div className="text-lg">📐</div>
              <p>{property.area}</p>
            </div>

          </div>

          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            View Details →
          </button>

        </div>

      </Link>

    </div>
  );
}