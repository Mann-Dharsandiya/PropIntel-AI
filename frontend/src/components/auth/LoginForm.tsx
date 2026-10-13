 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  LogIn,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    ),

  remember: z.boolean().optional(),
});

type LoginFormData =
  z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      remember: true,
    },
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      setLoading(true);

      await login({
        email: data.email,
        password: data.password,
      });

      toast.success(
        "Welcome Back 👋"
      );

      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";

      toast.error(message);

      if (
        message
          .toLowerCase()
          .includes("verify")
      ) {
        navigate(
          `/resend-verification?email=${encodeURIComponent(
            data.email
          )}`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Email Address
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            {...register("password")}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-300 p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("remember")}
            className="rounded"
          />

          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            Logging In...
          </>
        ) : (
          <>
            <LogIn size={20} />

            Login
          </>
        )}
      </button>

      {/* Register */}
      <div className="text-center text-gray-600">
        Don't have an account?

        <Link
          to="/register"
          className="ml-2 font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </div>
    </form>
  );
}