 import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MailCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { verifyEmail } from "@/api/auth";

export default function VerifyEmailPage() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!token) {
        toast.error("Invalid verification link.");
        setLoading(false);
        return;
      }

      try {
        const response = await verifyEmail(token);

        toast.success(
          response.message || "Email verified successfully."
        );

        setVerified(true);

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (err: any) {
        toast.error(
          err.message || "Verification failed."
        );
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

        <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">

          <MailCheck
            className="text-green-600"
            size={40}
          />

        </div>

        <h1 className="text-3xl font-bold">
          Email Verification
        </h1>

        {loading ? (
          <>
            <Loader2
              className="animate-spin mx-auto mt-8"
              size={36}
            />

            <p className="mt-4 text-gray-500">
              Verifying your email...
            </p>
          </>
        ) : verified ? (
          <>
            <p className="mt-6 text-green-600 font-semibold">
              Your email has been verified successfully.
            </p>

            <p className="mt-2 text-gray-500">
              Redirecting to login...
            </p>
          </>
        ) : (
          <>
            <p className="mt-6 text-red-500">
              Verification link is invalid or has expired.
            </p>

            <div className="mt-8">
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

      </div>

    </div>
  );
}