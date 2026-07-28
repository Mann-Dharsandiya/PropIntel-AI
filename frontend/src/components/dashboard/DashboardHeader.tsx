import { useAuth } from "@/context/AuthContext";
import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your properties, AI reports and investment insights.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button className="relative p-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            <Bell size={20} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <img
            src={
              user?.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.name || "User")
            }
            alt="Profile"
            className="h-12 w-12 rounded-full border object-cover"
          />
        </div>
      </div>
    </div>
  );
}