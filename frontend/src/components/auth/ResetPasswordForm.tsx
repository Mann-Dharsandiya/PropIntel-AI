import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { apiClient } from "@/api/axios";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password is required"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordForm() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  async function onSubmit(data: ResetFormData) {
    try {
      setLoading(true);

      const res = await apiClient.post(
        `/auth/reset-password/${token}`,
        {
          password: data.password,
        }
      );

      toast.success(
        res.data.message ||
          "Password reset successfully."
      );

      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.message ||
          "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          New Password
        </label>

        <div className="relative">
          <input
            type={
              showPassword ? "text" : "password"
            }
            {...register("password")}
            className="w-full rounded-xl border p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            {...register("confirmPassword")}
            className="w-full rounded-xl border p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-3 top-3"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex justify-center items-center gap-2 font-semibold transition"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Resetting...
          </>
        ) : (
          <>
            <Lock size={20} />
            Reset Password
          </>
        )}
      </button>

      <div className="text-center">
        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}