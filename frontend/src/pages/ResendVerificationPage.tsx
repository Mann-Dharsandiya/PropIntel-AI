import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Loader2 } from "lucide-react";

import { resendVerification } from "@/api/auth";

export default function ResendVerificationPage() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [loading, setLoading] = useState(false);

  async function handleResend() {
    try {
      setLoading(true);

      const response = await resendVerification({
        email,
      });

      toast.success(
        response.message ||
          "Verification email sent successfully."
      );
    } catch (err: any) {
      toast.error(
        err.message ||
          "Failed to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg text-center">

        <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex justify-center items-center mb-6">
          <Mail
            size={40}
            className="text-blue-600"
          />
        </div>

        <h1 className="text-3xl font-bold">
          Resend Verification Email
        </h1>

        <p className="text-gray-500 mt-4">
          Email
        </p>

        <p className="font-semibold text-blue-600 break-all">
          {email}
        </p>

        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 flex justify-center items-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={20}
              />
              Sending...
            </>
          ) : (
            <>
              <Mail size={20} />
              Resend Verification Email
            </>
          )}
        </button>

        <div className="mt-6">
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}