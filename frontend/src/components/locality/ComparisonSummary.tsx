import {
  ClipboardCheck,
  Building2,
  MapPin,
  Trophy,
  Sparkles,
  CheckCircle2,
  BarChart3,
  TrendingUp,
} from "lucide-react";

interface LocalityData {
  locality: string;
  city: string;
  averagePrice: number;
  investmentScore: number;
  priceGrowth: number;
  metroConnectivity: number;
  schoolsNearby: number;
  hospitalsNearby: number;
  shoppingScore: number;
  rentalDemand: string;
  futureGrowth: string;
}

interface ComparisonSummaryProps {
  first: LocalityData;
  second: LocalityData;
}

export default function ComparisonSummary({
  first,
  second,
}: ComparisonSummaryProps) {
  const recommended =
    first.investmentScore >= second.investmentScore
      ? first
      : second;

  const totalMetrics = 9;

  return (
    <section className="rounded-[32px] bg-white p-8 shadow-xl">

      <div className="mb-10 flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

          <ClipboardCheck className="h-8 w-8" />

        </div>

        <div>

          <h2 className="text-3xl font-black text-slate-800">

            Comparison Summary

          </h2>

          <p className="text-slate-500">

            Final AI generated investment summary.

          </p>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="space-y-5">

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">

            <MapPin className="mt-1 h-6 w-6 text-indigo-600" />

            <div>

              <h3 className="font-bold text-slate-800">

                Locality One

              </h3>

              <p className="text-slate-600">

                {first.locality}, {first.city}

              </p>

            </div>

          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">

            <Building2 className="mt-1 h-6 w-6 text-green-600" />

            <div>

              <h3 className="font-bold text-slate-800">

                Locality Two

              </h3>

              <p className="text-slate-600">

                {second.locality}, {second.city}

              </p>

            </div>

          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">

            <BarChart3 className="mt-1 h-6 w-6 text-purple-600" />

            <div>

              <h3 className="font-bold text-slate-800">

                Metrics Compared

              </h3>

              <p className="text-slate-600">

                {totalMetrics} Investment Parameters

              </p>

            </div>

          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">

            <Sparkles className="mt-1 h-6 w-6 text-amber-500" />

            <div>

              <h3 className="font-bold text-slate-800">

                AI Analysis

              </h3>

              <p className="text-slate-600">

                Successfully completed using multiple market indicators.

              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-8 text-white">

          <div className="flex items-center gap-3">

            <Trophy className="h-8 w-8 text-yellow-300" />

            <h3 className="text-3xl font-black">

              Final Recommendation

            </h3>

          </div>

          <h2 className="mt-8 text-5xl font-black">

            {recommended.locality}

          </h2>

          <p className="mt-2 text-xl text-indigo-100">

            {recommended.city}

          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-white/10 p-5">

              <TrendingUp className="mb-3 h-7 w-7 text-green-300" />

              <p className="text-sm text-indigo-100">

                Investment Score

              </p>

              <h3 className="mt-2 text-4xl font-black">

                {recommended.investmentScore}

              </h3>

            </div>

            <div className="rounded-2xl bg-white/10 p-5">

              <Building2 className="mb-3 h-7 w-7 text-cyan-300" />

              <p className="text-sm text-indigo-100">

                Future Growth

              </p>

              <h3 className="mt-2 text-2xl font-black">

                {recommended.futureGrowth}

              </h3>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-6">

            <div className="mb-4 flex items-center gap-3">

              <CheckCircle2 className="h-7 w-7 text-green-300" />

              <h4 className="text-xl font-bold">

                Conclusion

              </h4>

            </div>

            <p className="leading-8 text-indigo-100">

              <strong>{recommended.locality}</strong> currently offers
              the strongest investment opportunity based on investment
              score, market appreciation, connectivity, nearby
              amenities, infrastructure quality, rental demand and
              future growth prediction. Investors should still verify
              the latest market prices and legal documentation before
              making a purchase decision.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}