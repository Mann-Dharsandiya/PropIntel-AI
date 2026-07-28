import { ReactNode } from "react";
import { Building2, ShieldCheck, TrendingUp } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-20">

        <div className="max-w-xl">

          <h1 className="text-5xl font-bold mb-6">
            PropIntel AI
          </h1>

          <p className="text-xl text-blue-100 leading-8">
            AI Powered Real Estate Intelligence Platform
            helping buyers, sellers and investors make
            smarter property decisions.
          </p>

          <div className="mt-16 space-y-8">

            <div className="flex gap-5">
              <ShieldCheck size={36} />
              <div>
                <h3 className="font-semibold text-xl">
                  Secure Platform
                </h3>

                <p className="text-blue-100">
                  JWT Authentication with encrypted passwords.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <TrendingUp size={36} />

              <div>
                <h3 className="font-semibold text-xl">
                  AI Property Prediction
                </h3>

                <p className="text-blue-100">
                  Get instant property value prediction using ML.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <Building2 size={36} />

              <div>
                <h3 className="font-semibold text-xl">
                  Compare Localities
                </h3>

                <p className="text-blue-100">
                  Compare investment opportunities with AI.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex justify-center items-center p-8">

        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">

          <h2 className="text-4xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
}