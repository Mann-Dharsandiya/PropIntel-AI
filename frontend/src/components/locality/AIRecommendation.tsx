import {
  Brain,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Building2,
  MapPinned,
  CircleDollarSign,
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

interface AIRecommendationProps {
  first: LocalityData;
  second: LocalityData;
}

export default function AIRecommendation({
  first,
  second,
}: AIRecommendationProps) {
  const recommended =
    first.investmentScore >= second.investmentScore
      ? first
      : second;

  const other =
    recommended.locality === first.locality
      ? second
      : first;

  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 p-8 text-white shadow-2xl">

      <div className="mb-10 flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">

          <Brain className="h-9 w-9" />

        </div>

        <div>

          <h2 className="text-3xl font-black">

            AI Investment Recommendation

          </h2>

          <p className="text-indigo-100">

            Generated using locality analytics and market indicators.

          </p>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

          <div className="mb-5 flex items-center gap-3">

            <Sparkles className="h-7 w-7 text-yellow-300" />

            <h3 className="text-2xl font-bold">

              Recommended Locality

            </h3>

          </div>

          <h2 className="text-5xl font-black">

            {recommended.locality}

          </h2>

          <p className="mt-3 flex items-center gap-2 text-lg text-indigo-100">

            <MapPinned className="h-5 w-5" />

            {recommended.city}

          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

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

              <CircleDollarSign className="mb-3 h-7 w-7 text-yellow-300" />

              <p className="text-sm text-indigo-100">

                Avg Price

              </p>

              <h3 className="mt-2 text-2xl font-black">

                ₹{recommended.averagePrice.toLocaleString()}

              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

          <h3 className="mb-6 text-2xl font-bold">

            Why AI Chose This Area

          </h3>

          <div className="space-y-5">

            <div className="flex gap-3">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-300" />

              <p>

                Higher investment score than{" "}
                <strong>{other.locality}</strong>.

              </p>

            </div>

            <div className="flex gap-3">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-300" />

              <p>

                Better expected appreciation potential.

              </p>

            </div>

            <div className="flex gap-3">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-300" />

              <p>

                Strong infrastructure and public connectivity.

              </p>

            </div>

            <div className="flex gap-3">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-300" />

              <p>

                Attractive rental demand for investors.

              </p>

            </div>

            <div className="flex gap-3">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-300" />

              <p>

                Better long-term growth potential.

              </p>

            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-6">

              <div className="flex items-center gap-3">

                <Building2 className="h-7 w-7 text-cyan-300" />

                <h4 className="text-xl font-bold">

                  AI Verdict

                </h4>

              </div>

              <p className="mt-4 leading-8 text-indigo-100">

                Based on investment score, market growth,
                infrastructure, metro connectivity,
                schools, hospitals, shopping score,
                rental demand and future growth,
                <strong> {recommended.locality}</strong> is
                currently the stronger investment destination
                among the selected localities.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}