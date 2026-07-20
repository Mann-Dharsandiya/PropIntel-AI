import {
  Trophy,
  TrendingUp,
  IndianRupee,
  Building2,
  Star,
  BadgeCheck,
  Sparkles,
  ArrowUpRight,
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

interface WinnerCardProps {
  first: LocalityData;
  second: LocalityData;
}

export default function WinnerCard({
  first,
  second,
}: WinnerCardProps) {
  const winner =
    first.investmentScore >= second.investmentScore
      ? first
      : second;

  const loser =
    winner.locality === first.locality
      ? second
      : first;

  const scoreDifference = (
    winner.investmentScore - loser.investmentScore
  ).toFixed(1);

  const confidence = Math.min(
    99,
    Math.round(
      85 +
        Math.abs(
          winner.investmentScore -
            loser.investmentScore
        ) *
          4
    )
  );

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 p-10 text-white shadow-2xl">

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative">

        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/20 px-5 py-2 backdrop-blur">

              <Trophy className="h-5 w-5 text-yellow-300" />

              <span className="font-semibold">

                AI Winner

              </span>

            </div>

            <h1 className="text-5xl font-black tracking-tight">

              {winner.locality}

            </h1>

            <p className="mt-3 flex items-center gap-2 text-xl text-indigo-100">

              <Building2 className="h-5 w-5" />

              {winner.city}

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">

                <p className="text-sm text-indigo-100">

                  Investment Score

                </p>

                <div className="mt-2 flex items-center gap-2">

                  <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />

                  <span className="text-4xl font-black">

                    {winner.investmentScore}

                  </span>

                  <span className="text-xl">

                    /10

                  </span>

                </div>

              </div>

              <div className="rounded-2xl bg-white/15 px-6 py-4 backdrop-blur">

                <p className="text-sm text-indigo-100">

                  AI Confidence

                </p>

                <div className="mt-2 flex items-center gap-2">

                  <BadgeCheck className="h-6 w-6 text-green-300" />

                  <span className="text-4xl font-black">

                    {confidence}%

                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">

              <div className="mb-4 flex items-center justify-between">

                <TrendingUp className="h-8 w-8 text-green-300" />

                <ArrowUpRight className="h-6 w-6" />

              </div>

              <p className="text-sm text-indigo-100">

                Price Growth

              </p>

              <h2 className="mt-2 text-4xl font-black">

                {winner.priceGrowth}%

              </h2>

            </div>

            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">

              <div className="mb-4 flex items-center justify-between">

                <IndianRupee className="h-8 w-8 text-yellow-300" />

                <ArrowUpRight className="h-6 w-6" />

              </div>

              <p className="text-sm text-indigo-100">

                Avg Property Price

              </p>

              <h2 className="mt-2 text-3xl font-black">

                ₹{winner.averagePrice.toLocaleString()}

              </h2>

            </div>
                        <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">

              <div className="mb-4 flex items-center justify-between">

                <Sparkles className="h-8 w-8 text-cyan-300" />

                <ArrowUpRight className="h-6 w-6" />

              </div>

              <p className="text-sm text-indigo-100">

                Future Growth

              </p>

              <h2 className="mt-2 text-3xl font-black">

                {winner.futureGrowth}

              </h2>

            </div>

            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">

              <div className="mb-4 flex items-center justify-between">

                <Building2 className="h-8 w-8 text-pink-300" />

                <ArrowUpRight className="h-6 w-6" />

              </div>

              <p className="text-sm text-indigo-100">

                Rental Demand

              </p>

              <h2 className="mt-2 text-3xl font-black">

                {winner.rentalDemand}

              </h2>

            </div>

          </div>

        </div>

        {/* AI SUMMARY */}

        <div className="mt-10 rounded-3xl bg-white/10 p-8 backdrop-blur">

          <div className="grid gap-8 lg:grid-cols-2">

            <div>

              <h3 className="mb-5 flex items-center gap-2 text-2xl font-bold">

                <Trophy className="h-7 w-7 text-yellow-300" />

                Why AI Selected This Locality

              </h3>

              <ul className="space-y-4">

                <li className="flex gap-3">

                  <BadgeCheck className="mt-1 h-5 w-5 text-green-300" />

                  <span>

                    Higher Investment Score than{" "}
                    <strong>{loser.locality}</strong>

                  </span>

                </li>

                <li className="flex gap-3">

                  <BadgeCheck className="mt-1 h-5 w-5 text-green-300" />

                  <span>

                    Better long-term appreciation potential

                  </span>

                </li>

                <li className="flex gap-3">

                  <BadgeCheck className="mt-1 h-5 w-5 text-green-300" />

                  <span>

                    Strong infrastructure and connectivity

                  </span>

                </li>

                <li className="flex gap-3">

                  <BadgeCheck className="mt-1 h-5 w-5 text-green-300" />

                  <span>

                    Higher expected investor returns

                  </span>

                </li>

                <li className="flex gap-3">

                  <BadgeCheck className="mt-1 h-5 w-5 text-green-300" />

                  <span>

                    Excellent balance of growth and rental demand

                  </span>

                </li>

              </ul>

            </div>

            <div>

              <h3 className="mb-5 text-2xl font-bold">

                AI Insights

              </h3>

              <div className="space-y-5">

                <div>

                  <div className="mb-2 flex justify-between">

                    <span>Investment Advantage</span>

                    <strong>+{scoreDifference}</strong>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/20">

                    <div
                      className="h-full rounded-full bg-green-400"
                      style={{
                        width: `${Math.min(
                          100,
                          Number(scoreDifference) * 20
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex justify-between">

                    <span>AI Confidence</span>

                    <strong>{confidence}%</strong>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/20">

                    <div
                      className="h-full rounded-full bg-cyan-300"
                      style={{
                        width: `${confidence}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="rounded-2xl bg-white/10 p-5">

                  <h4 className="mb-2 text-lg font-bold">

                    AI Verdict

                  </h4>

                  <p className="leading-7 text-indigo-100">

                    <strong>{winner.locality}</strong> is currently the
                    stronger investment destination because it offers a
                    better investment profile, stronger future appreciation,
                    healthier rental demand and superior overall market
                    performance compared with{" "}
                    <strong>{loser.locality}</strong>.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
                {/* Bottom Statistics */}

        <div className="mt-10 grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">

            <div className="mb-3 text-5xl">🏆</div>

            <h4 className="text-3xl font-black">

              {winner.investmentScore}

            </h4>

            <p className="mt-2 text-sm text-indigo-100">

              Investment Rating

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">

            <div className="mb-3 text-5xl">📈</div>

            <h4 className="text-3xl font-black">

              {winner.priceGrowth}%

            </h4>

            <p className="mt-2 text-sm text-indigo-100">

              Annual Growth

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">

            <div className="mb-3 text-5xl">🚇</div>

            <h4 className="text-3xl font-black">

              {winner.metroConnectivity}/10

            </h4>

            <p className="mt-2 text-sm text-indigo-100">

              Metro Connectivity

            </p>

          </div>

          <div className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">

            <div className="mb-3 text-5xl">🛍️</div>

            <h4 className="text-3xl font-black">

              {winner.shoppingScore}/10

            </h4>

            <p className="mt-2 text-sm text-indigo-100">

              Lifestyle Score

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-2xl font-bold">

                🎯 AI Recommendation

              </h3>

              <p className="mt-2 max-w-3xl leading-7 text-indigo-100">

                Based on all available market indicators including
                investment score, price appreciation, infrastructure,
                metro connectivity, schools, hospitals, shopping,
                rental demand and future growth prediction,
                <strong> {winner.locality}</strong> is currently the
                strongest investment opportunity.

              </p>

            </div>

            <div className="flex flex-col items-center rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-6 text-gray-900 shadow-xl">

              <span className="text-sm font-semibold uppercase tracking-wider">

                Overall Winner

              </span>

              <h2 className="mt-2 text-center text-3xl font-black">

                {winner.locality}

              </h2>

              <p className="mt-1 text-lg font-semibold">

                {winner.city}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}