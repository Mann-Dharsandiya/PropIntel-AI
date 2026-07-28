 import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { apiClient } from "@/api/axios";

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  async function onSubmit(data: ForgotFormData) {
    try {
      setLoading(true);

      const res = await apiClient.post(
        "/auth/forgot-password",
        data
      );

      toast.success(
        res.data.message ||
          "Password reset email sent successfully."
      );

      reset();
    } catch (err: any) {
      toast.error(
        err.message ||
          "Failed to send reset email."
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
          Email Address
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Sending...
          </>
        ) : (
          <>
            <Mail size={20} />
            Send Reset Link
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