import {
  Heart,
  History,
  BarChart3,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Saved Properties",
    value: 0,
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Comparisons",
    value: 0,
    icon: BarChart3,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI Reports",
    value: 0,
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Recently Viewed",
    value: 0,
    icon: History,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}