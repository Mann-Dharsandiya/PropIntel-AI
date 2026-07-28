 import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { updateProfile } from "@/api/user";
import { useAuth } from "@/context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  open,
  onClose,
}: Props) {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user, open]);

  if (!open || !user) return null;

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await updateProfile({
        name,
        phone,
        profileImage,
      });

      updateUser(response.data);

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Profile Image URL
            </label>

            <input
              type="text"
              value={profileImage}
              onChange={(e) =>
                setProfileImage(e.target.value)
              }
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border p-3"
            />

          </div>

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}