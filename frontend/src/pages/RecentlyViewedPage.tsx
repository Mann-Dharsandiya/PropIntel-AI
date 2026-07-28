import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";
import { Link } from "react-router-dom";

import { getRecentlyViewed } from "@/api/recentlyViewed";

export default function RecentlyViewedPage() {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentlyViewed"],
    queryFn: getRecentlyViewed,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        Loading recently viewed...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        Failed to load recently viewed properties.
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <History
          size={70}
          className="mx-auto text-gray-400"
        />

        <h2 className="text-3xl font-bold mt-6">
          No Recently Viewed Properties
        </h2>

        <p className="text-gray-500 mt-4">
          Properties you open will appear here.
        </p>

        <Link
          to="/properties"
          className="inline-block mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Recently Viewed
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const property = item.property;

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow overflow-hidden"
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
                <h2 className="text-xl font-semibold">
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
                  className="block mt-5 bg-blue-600 text-white text-center py-3 rounded-xl"
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