import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { getFavorites } from "@/api/favorite";

export default function FavoritesPage() {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold">
          Favorite Properties
        </h1>

        <p className="mt-5">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        Failed to load favorites.
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">

        <Heart
          size={70}
          className="mx-auto text-red-400"
        />

        <h2 className="text-3xl font-bold mt-6">
          No Favorite Properties
        </h2>

        <p className="text-gray-500 mt-4">
          Save properties to quickly access them later.
        </p>

        <Link
          to="/properties"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Browse Properties
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Favorite Properties
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {favorites.map((favorite) => {

          const property = favorite.property;

          return (

            <div
              key={favorite._id}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >

              <img
                src={
                  property.images?.[0] ||
                  "https://placehold.co/600x400?text=Property"
                }
                alt={property.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="font-bold text-xl">
                  {property.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {property.city}
                </p>

                <p className="font-bold text-blue-600 mt-3">
                  ₹{property.price.toLocaleString()}
                </p>

                <Link
                  to={`/properties/${property._id}`}
                  className="block mt-5 bg-blue-600 text-center text-white py-3 rounded-xl"
                >
                  View Property
                </Link>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}