 // PART 1/4
// frontend/src/components/profile/ChangePasswordModal.tsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";

import { changePassword } from "@/api/user";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: Props) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const checks = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special:
      /[!@#$%^&*(),.?":{}|<>]/.test(
        newPassword
      ),
  };

  const strength =
  Object.values(checks).filter(Boolean)
    .length;

  const strengthColor = [
    "bg-red-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-600",
  ][strength];

  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][strength];

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (
      currentPassword === newPassword
    ) {
      setError(
        "New password must be different from current password."
      );
      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (strength < 5) {
      setError(
        "Password does not meet security requirements."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await changePassword({
          currentPassword,
          newPassword,
        });

      toast.success(
        response.message ||
          "Password updated successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to change password.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-orange-100 p-3">
              <ShieldCheck className="h-6 w-6 text-orange-600" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Change Password
              </h2>

              <p className="text-sm text-gray-500">
                Keep your account secure.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
        // PART 2/4

          {/* Current Password */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Current Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                placeholder="Enter current password"
                className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(
                    !showCurrent
                  )
                }
                className="absolute right-4 top-3.5"
              >
                {showCurrent ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              New Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                placeholder="Enter new password"
                className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition focus:border-orange-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(
                    !showNew
                  )
                }
                className="absolute right-4 top-3.5"
              >
                {showNew ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>

            </div>

            <div className="mt-4">

              <div className="mb-2 flex justify-between text-sm">

                <span>Password Strength</span>

                <span
                  className={`font-semibold ${
                    strength >= 5
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {strengthText}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                <div
                  className={`h-full transition-all ${strengthColor}`}
                  style={{
                    width: `${(strength / 5) * 100}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">

              <div
                className={
                  checks.length
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ 8+ Characters
              </div>

              <div
                className={
                  checks.upper
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ Uppercase
              </div>

              <div
                className={
                  checks.lower
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ Lowercase
              </div>

              <div
                className={
                  checks.number
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ Number
              </div>

              <div
                className={
                  checks.special
                    ? "text-green-600"
                    : "text-gray-500"
                }
              >
                ✓ Special Character
              </div>

            </div>

          </div>
          // PART 3/4

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                className={`w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition ${
                  confirmPassword &&
                  newPassword !== confirmPassword
                    ? "border-red-500"
                    : "focus:border-orange-500"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
                className="absolute right-4 top-3.5"
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>

            </div>

            {confirmPassword && (
              <p
                className={`mt-2 text-sm ${
                  newPassword === confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {newPassword === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}

          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                strength < 5 ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>
          // PART 4/4

        </form>

      </div>

    </div>
  );
}