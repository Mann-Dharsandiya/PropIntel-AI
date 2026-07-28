import { Link } from "react-router-dom";
import {
  Search,
  Brain,
  BarChart3,
  Home,
} from "lucide-react";

const actions = [
  {
    title: "Browse Properties",
    icon: Home,
    link: "/properties",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Predict Price",
    icon: Brain,
    link: "/predict-price",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "AI Recommendation",
    icon: Search,
    link: "/recommendation",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Compare Localities",
    icon: BarChart3,
    link: "/compare-localities",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition p-6"
            >
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <span className="mt-4 text-center font-medium">
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}