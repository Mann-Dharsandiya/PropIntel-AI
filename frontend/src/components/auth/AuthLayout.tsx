 import { ReactNode } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Building2,
  Sparkles,
} from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= AUTH CONTENT ================= */}

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative hidden overflow-hidden bg-[#0b1729] lg:flex">

          {/* Background decoration */}

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-14">

            {/* Logo */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d9a441] bg-[#15243a]">

                  <Building2
                    size={25}
                    className="text-[#d9a441]"
                  />

                </div>

                <div>

                  <h1 className="text-xl font-bold text-white">
                    PropIntel AI
                  </h1>

                  <p className="text-[8px] font-semibold tracking-[0.28em] text-gray-500">
                    REAL ESTATE INTELLIGENCE
                  </p>

                </div>

              </div>

            </div>

            {/* Main Content */}

            <div className="max-w-xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gray-400 px-4 py-2">

                <Sparkles
                  size={15}
                  className="text-[#d9a441]"
                />

                <span className="text-sm font-semibold text-[#d9a441]">
                  AI-Powered Property Intelligence
                </span>

              </div>

              <h2 className="text-5xl font-bold leading-tight text-white">

                Make smarter

                <span className="block text-[#f0bd6b]">
                  real estate decisions.
                </span>

              </h2>

              <p className="mt-7 max-w-lg text-lg leading-8 text-gray-300">

                PropIntel AI brings property intelligence,
                market insights and AI-powered analysis
                together to help buyers, sellers and
                investors make confident decisions.

              </p>

              {/* Features */}

              <div className="mt-10 space-y-7">

                {/* Feature 1 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-[#142238]">

                    <ShieldCheck
                      size={20}
                      className="text-[#d9a441]"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      Secure by design
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      Protected authentication and secure
                      account access.
                    </p>

                  </div>

                </div>

                {/* Feature 2 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-[#142238]">

                    <TrendingUp
                      size={20}
                      className="text-[#d9a441]"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      AI-powered intelligence
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      Property predictions and insights
                      powered by intelligent analysis.
                    </p>

                  </div>

                </div>

                {/* Feature 3 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-[#142238]">

                    <Building2
                      size={20}
                      className="text-[#d9a441]"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      Better property decisions
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      Compare properties and localities using
                      meaningful market intelligence.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom */}

            <div className="text-sm text-gray-500">
              PropIntel AI • Real Estate Intelligence Platform
            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">

          <div className="w-full max-w-xl">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center justify-center lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9a441] bg-[#15243a]">

                  <Building2
                    size={23}
                    className="text-[#d9a441]"
                  />

                </div>

                <div>

                  <h1 className="text-xl font-bold text-[#0b1729]">
                    PropIntel AI
                  </h1>

                  <p className="text-[8px] font-semibold tracking-[0.25em] text-gray-500">
                    REAL ESTATE INTELLIGENCE
                  </p>

                </div>

              </div>

            </div>

            {/* Form Card */}

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">

              {/* Small icon */}

              <div className="mb-7">

                <Sparkles
                  size={20}
                  className="text-[#d9a441]"
                />

              </div>

              {/* Title */}

              <h2 className="text-3xl font-bold text-[#0b1729] sm:text-4xl">

                {title}

              </h2>

              {/* Subtitle */}

              <p className="mt-3 text-gray-500">

                {subtitle}

              </p>

              {/* Form */}

              <div className="mt-8">

                {children}

              </div>

            </div>

            {/* Footer */}

            <div className="mt-6 text-center text-sm text-gray-500">

              <span className="font-medium text-blue-700">
                PropIntel AI
              </span>

              <span className="mx-2">•</span>

              <span>
                Real Estate Intelligence Platform
              </span>

              <span className="ml-2">→</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}