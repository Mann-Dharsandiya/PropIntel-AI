 // frontend/src/components/auth/RegisterForm.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import PasswordStrength from "./PasswordStrength";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(
        2,
        "Name must contain at least 2 characters"
      ),

    email: z
      .string()
      .trim()
      .email("Enter a valid email"),

    phone: z
      .string()
      .trim()
      .regex(
        /^\+?[0-9]{10,15}$/,
        "Enter a valid phone number"
      ),

    role: z.enum([
      "buyer",
      "seller",
    ]),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Must contain one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Must contain one lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Must contain one number"
      )
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword",
      ],
      message:
        "Passwords do not match",
    }
  );

type RegisterFormData =
  z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register: registerUser,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      role: "buyer",
    },
  });

  const password =
    watch("password");

  async function onSubmit(
    data: RegisterFormData
  ) {
    try {
      setLoading(true);

      const cleanedPhone =
        data.phone.replace(
          /[\s-]/g,
          ""
        );

      await registerUser({
        name: data.name.trim(),

        email: data.email
          .trim()
          .toLowerCase(),

        phone: cleanedPhone,

        password: data.password,

        role: data.role,
      });

      toast.success(
        "Registration Successful 🎉"
      );

      navigate("/dashboard");
    } catch (err: any) {
      console.error(
        "Registration error:",
        err
      );

      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(
        onSubmit
      )}
    >
      {/* NAME */}

      <div>
        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          {...register("name")}
          type="text"
          autoComplete="name"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@gmail.com"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* PHONE */}

      <div>
        <label className="block mb-2 font-medium">
          Phone Number
        </label>

        <input
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+919876543210"
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* ROLE */}

      <div>
        <label className="block mb-2 font-medium">
          Register As
        </label>

        <select
          {...register("role")}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="buyer">
            Buyer
          </option>

          <option value="seller">
            Seller
          </option>
        </select>
      </div>

      {/* PASSWORD */}

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <div className="relative">
          <input
            {...register("password")}
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a strong password"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <PasswordStrength
          password={
            password || ""
          }
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}

      <div>
        <label className="block mb-2 font-medium">
          Confirm Password
        </label>

        <div className="relative">
          <input
            {...register(
              "confirmPassword"
            )}
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors
                .confirmPassword
                .message
            }
          </p>
        )}
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition"
      >
        {loading ? (
          <>
            <Loader2
              className="animate-spin"
              size={20}
            />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus size={20} />
            Create Account
          </>
        )}
      </button>

      {/* LOGIN */}

      <div className="text-center text-gray-600">
        Already have an account?

        <Link
          to="/login"
          className="text-blue-600 font-semibold ml-2 hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}