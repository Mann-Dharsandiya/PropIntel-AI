 import { Clock } from "lucide-react";
import { DashboardActivity } from "@/api/dashboard";

interface Props {
  activities: DashboardActivity[];
}

export default function RecentActivity({
  activities,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

        <Clock
          size={22}
          className="text-blue-600"
        />
      </div>

      {activities.length === 0 ? (
        <div className="py-12 text-center">
          <Clock
            size={48}
            className="mx-auto text-gray-300"
          />

          <p className="mt-4 text-gray-500">
            No recent activity found.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Clock
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}