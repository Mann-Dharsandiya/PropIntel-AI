 import { useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileCard from "@/components/profile/ProfileCard";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Failed to load profile.
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-7xl mx-auto space-y-8">

          <ProfileHeader onEdit={() => setEditOpen(true)} />

          <ProfileStats />

          <div className="grid lg:grid-cols-2 gap-8">

            <ProfileCard title="Personal Information">

              <div className="space-y-4">

                <div>
                  <label className="text-sm text-gray-500">
                    Full Name
                  </label>

                  <input
                    disabled
                    value={user.name}
                    className="w-full mt-1 border rounded-xl p-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Email
                  </label>

                  <input
                    disabled
                    value={user.email}
                    className="w-full mt-1 border rounded-xl p-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Phone
                  </label>

                  <input
                    disabled
                    value={user.phone || ""}
                    className="w-full mt-1 border rounded-xl p-3 bg-gray-100"
                  />
                </div>

                <button
                  onClick={() => setPasswordOpen(true)}
                  className="mt-4 rounded-xl bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
                >
                  Change Password
                </button>

              </div>

            </ProfileCard>

            <ProfileCard title="Account Information">

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>Membership</span>
                  <strong>Free</strong>
                </div>

                <div className="flex justify-between">
                  <span>Email Verification</span>
                  <strong>
                    {user.isVerified ? "Verified" : "Pending"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Properties Saved</span>
                  <strong>0</strong>
                </div>

                <div className="flex justify-between">
                  <span>AI Reports</span>
                  <strong>0</strong>
                </div>

                <div className="flex justify-between">
                  <span>Comparisons</span>
                  <strong>0</strong>
                </div>

              </div>

            </ProfileCard>

          </div>

        </div>

      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      <ChangePasswordModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </>
  );
}