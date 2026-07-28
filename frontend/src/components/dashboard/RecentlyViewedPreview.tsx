import { History, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardRecentlyViewed } from "@/api/dashboard";

interface Props {
  recentlyViewed: DashboardRecentlyViewed[];
}

export default function RecentlyViewedPreview({
  recentlyViewed,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recently Viewed
        </h2>

        <History
          size={22}
          className="text-blue-600"
        />
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="py-12 text-center">
          <History
            size={48}
            className="mx-auto text-gray-300"
          />

          <p className="mt-4 text-gray-500">
            You haven't viewed any properties yet.
          </p>

          <Link
            to="/properties"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {recentlyViewed.map((item) => (
            <Link
              key={item._id}
              to={`/properties/${item.property._id}`}
              className="block rounded-xl border border-gray-200 p-4 transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.property.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={15} />
                    {item.property.city}
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Viewed{" "}
                    {new Date(
                      item.viewedAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    ₹
                    {item.property.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}