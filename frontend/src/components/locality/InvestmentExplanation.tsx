 import {
  Brain,
  BadgeCheck,
  TrendingUp,
  Building2,
  Train,
  School,
  Hospital,
  ShoppingBag,
  Landmark,
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

interface InvestmentExplanationProps {
  first: LocalityData;
  second: LocalityData;
}

export default function InvestmentExplanation({
  first,
  second,
}: InvestmentExplanationProps) {
  const firstScore =
  first?.investmentScore ??
  first?.priceGrowth ??
  first?.averagePrice ??
  0;

const secondScore =
  second?.investmentScore ??
  second?.priceGrowth ??
  second?.averagePrice ??
  0;

const winner =
  firstScore >= secondScore
    ? first
    : second;

  return (
    <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 p-8 text-white shadow-2xl">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

          <Brain className="h-8 w-8" />

        </div>

        <div>

          <h2 className="text-3xl font-black">

            AI Investment Analysis

          </h2>

          <p className="text-indigo-200">

            Why this locality is recommended.

          </p>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div>

          <div className="space-y-5">

            <div className="flex gap-4">

              <BadgeCheck className="mt-1 h-6 w-6 text-green-400" />

              <div>

                <h3 className="font-bold">

                  Better Investment Score

                </h3>

                <p className="mt-1 text-indigo-200">

                  {winner.locality} currently has the highest
                  investment score among the selected localities.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <TrendingUp className="mt-1 h-6 w-6 text-green-400" />

              <div>

                <h3 className="font-bold">

                  Better Appreciation

                </h3>

                <p className="mt-1 text-indigo-200">

                  Historical market trends indicate
                  stronger appreciation potential.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Train className="mt-1 h-6 w-6 text-cyan-400" />

              <div>

                <h3 className="font-bold">

                  Connectivity

                </h3>

                <p className="mt-1 text-indigo-200">

                  Metro and transport accessibility
                  positively affect future property demand.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <School className="mt-1 h-6 w-6 text-yellow-400" />

              <div>

                <h3 className="font-bold">

                  Education Infrastructure

                </h3>

                <p className="mt-1 text-indigo-200">

                  Better educational facilities generally
                  increase long-term property value.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Hospital className="mt-1 h-6 w-6 text-red-400" />

              <div>

                <h3 className="font-bold">

                  Healthcare Access

                </h3>

                <p className="mt-1 text-indigo-200">

                  Hospital availability improves
                  residential demand and resale value.

                </p>

              </div>

            </div>

          </div>

        </div>

        <div>

          <div className="space-y-5">

            <div className="flex gap-4">

              <ShoppingBag className="mt-1 h-6 w-6 text-pink-400" />

              <div>

                <h3 className="font-bold">

                  Lifestyle Score

                </h3>

                <p className="mt-1 text-indigo-200">

                  Better shopping and entertainment
                  improve the area's attractiveness.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Building2 className="mt-1 h-6 w-6 text-green-400" />

              <div>

                <h3 className="font-bold">

                  Rental Potential

                </h3>

                <p className="mt-1 text-indigo-200">

                  Strong rental demand increases
                  recurring investment income.

                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <Landmark className="mt-1 h-6 w-6 text-amber-400" />

              <div>

                <h3 className="font-bold">

                  Future Development

                </h3>

                <p className="mt-1 text-indigo-200">

                  Upcoming infrastructure projects
                  can significantly increase prices.

                </p>

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-3xl bg-white/10 p-6">

            <h3 className="text-2xl font-bold">

              Final AI Verdict

            </h3>

            <p className="mt-4 leading-8 text-indigo-100">

              Based on all analysed parameters including
              infrastructure, investment score, market
              appreciation, public transport, schools,
              hospitals, shopping, rental demand and
              future growth,

              <strong> {winner.locality}</strong>

              is currently the stronger investment option
              among the selected localities.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}