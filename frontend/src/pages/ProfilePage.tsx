 import { useState } from "react";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileCard from "@/components/profile/ProfileCard";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [editOpen, setEditOpen] =
    useState(false);

  const [passwordOpen, setPasswordOpen] =
    useState(false);

  // =========================================================
  // Loading
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 font-medium text-slate-600">
              Loading Profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // No User
  // =========================================================

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="text-4xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Failed to load profile
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please login again to continue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Profile Page
  // =========================================================

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 md:py-10">

          {/* ================================================= */}
          {/* Profile Header */}
          {/* ================================================= */}

          <ProfileHeader
            onEdit={() =>
              setEditOpen(true)
            }
          />

          {/* ================================================= */}
          {/* Profile Statistics */}
          {/* ================================================= */}

          <ProfileStats />

          {/* ================================================= */}
          {/* Investment Portfolio */}
          {/* ================================================= */}

          <section>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Investment Intelligence
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your real estate investments,
                track returns and view AI-powered
                portfolio insights.
              </p>
            </div>

            <Link
              to="/portfolio"
              className="group block"
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <BriefcaseBusiness
                        size={27}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        My Investment Portfolio
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Track properties, portfolio
                        growth, rental income and
                        investment performance.
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={21}
                    className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                  />

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl bg-slate-50 p-4 transition group-hover:bg-blue-50">
                    <p className="text-xs font-medium text-slate-500">
                      Portfolio
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Properties
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 transition group-hover:bg-blue-50">
                    <p className="text-xs font-medium text-slate-500">
                      Performance
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Analytics
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4 transition group-hover:bg-blue-50">
                    <p className="text-xs font-medium text-slate-500">
                      AI
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Insights
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Open Investment Portfolio

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>

              </div>
            </Link>
          </section>

          {/* ================================================= */}
          {/* Profile Information */}
          {/* ================================================= */}

          <div className="grid gap-8 lg:grid-cols-2">

            {/* ================================================= */}
            {/* Personal Information */}
            {/* ================================================= */}

            <ProfileCard title="Personal Information">

              <div className="space-y-4">

                {/* Full Name */}

                <div>
                  <label className="text-sm text-gray-500">
                    Full Name
                  </label>

                  <input
                    disabled
                    value={user.name}
                    className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="text-sm text-gray-500">
                    Email
                  </label>

                  <input
                    disabled
                    value={user.email}
                    className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="text-sm text-gray-500">
                    Phone
                  </label>

                  <input
                    disabled
                    value={user.phone || ""}
                    className="mt-1 w-full rounded-xl border bg-gray-100 p-3"
                  />
                </div>

                {/* Change Password */}

                <button
                  type="button"
                  onClick={() =>
                    setPasswordOpen(true)
                  }
                  className="mt-4 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Change Password
                </button>

              </div>

            </ProfileCard>

            {/* ================================================= */}
            {/* Account Information */}
            {/* ================================================= */}

            <ProfileCard title="Account Information">

              <div className="space-y-5">

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Membership
                  </span>

                  <strong className="text-slate-900">
                    Free
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Email Verification
                  </span>

                  <strong
                    className={
                      user.isVerified
                        ? "text-green-600"
                        : "text-orange-500"
                    }
                  >
                    {user.isVerified
                      ? "Verified"
                      : "Pending"}
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Properties Saved
                  </span>

                  <strong className="text-slate-900">
                    0
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    AI Reports
                  </span>

                  <strong className="text-slate-900">
                    0
                  </strong>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">
                    Comparisons
                  </span>

                  <strong className="text-slate-900">
                    0
                  </strong>
                </div>

              </div>

            </ProfileCard>

          </div>

        </div>
      </div>

      {/* ===================================================== */}
      {/* Edit Profile Modal */}
      {/* ===================================================== */}

      <EditProfileModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
      />

      {/* ===================================================== */}
      {/* Change Password Modal */}
      {/* ===================================================== */}

      <ChangePasswordModal
        open={passwordOpen}
        onClose={() =>
          setPasswordOpen(false)
        }
      />
    </>
  );
}