 import {
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  Pencil,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

interface Props {
  onEdit: () => void;
}

export default function ProfileHeader({
  onEdit,
}: Props) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex flex-col md:flex-row items-center gap-8">

        <div className="relative">

          <img
            src={
              user.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}&background=2563eb&color=fff&size=256`
            }
            alt={user.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />

          <button
            className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700"
          >
            <Camera size={18} />
          </button>

        </div>

        <div className="flex-1">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div>

              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <p className="text-gray-500 capitalize mt-2">
                {user.role}
              </p>

            </div>

            <button
              onClick={onEdit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >
              <Pencil size={18} />
              Edit Profile
            </button>

          </div>

          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <span>{user.phone || "-"}</span>
            </div>

            <div className="flex items-center gap-3">

              <ShieldCheck
                className={
                  user.isVerified
                    ? "text-green-600"
                    : "text-yellow-500"
                }
              />

              <span>
                {user.isVerified
                  ? "Verified Account"
                  : "Email Not Verified"}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}