import {
  CheckCircle2,
  MinusCircle,
  Trophy,
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

interface DecisionMatrixProps {
  first: LocalityData;
  second: LocalityData;
}

type Winner = "first" | "second" | "equal";

function getWinner(
  a: number,
  b: number
): Winner {
  if (a > b) return "first";
  if (b > a) return "second";
  return "equal";
}

export default function DecisionMatrix({
  first,
  second,
}: DecisionMatrixProps) {
  const metrics = [
    {
      label: "Average Price",
      first: `₹${first.averagePrice.toLocaleString()}`,
      second: `₹${second.averagePrice.toLocaleString()}`,
      winner: getWinner(
        first.averagePrice,
        second.averagePrice
      ),
    },
    {
      label: "Investment Score",
      first: first.investmentScore,
      second: second.investmentScore,
      winner: getWinner(
        first.investmentScore,
        second.investmentScore
      ),
    },
    {
      label: "Price Growth",
      first: `${first.priceGrowth}%`,
      second: `${second.priceGrowth}%`,
      winner: getWinner(
        first.priceGrowth,
        second.priceGrowth
      ),
    },
    {
      label: "Metro Connectivity",
      first: first.metroConnectivity,
      second: second.metroConnectivity,
      winner: getWinner(
        first.metroConnectivity,
        second.metroConnectivity
      ),
    },
    {
      label: "Schools Nearby",
      first: first.schoolsNearby,
      second: second.schoolsNearby,
      winner: getWinner(
        first.schoolsNearby,
        second.schoolsNearby
      ),
    },
    {
      label: "Hospitals Nearby",
      first: first.hospitalsNearby,
      second: second.hospitalsNearby,
      winner: getWinner(
        first.hospitalsNearby,
        second.hospitalsNearby
      ),
    },
    {
      label: "Shopping Score",
      first: first.shoppingScore,
      second: second.shoppingScore,
      winner: getWinner(
        first.shoppingScore,
        second.shoppingScore
      ),
    },
    {
      label: "Rental Demand",
      first: first.rentalDemand,
      second: second.rentalDemand,
      winner: "equal",
    },
    {
      label: "Future Growth",
      first: first.futureGrowth,
      second: second.futureGrowth,
      winner: "equal",
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-8 flex items-center gap-3">

        <Trophy className="h-8 w-8 text-indigo-600" />

        <div>

          <h2 className="text-3xl font-bold">
            AI Decision Matrix
          </h2>

          <p className="text-gray-500">
            Side-by-side comparison of all investment metrics.
          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="px-6 py-4 text-left">
                Metric
              </th>

              <th className="px-6 py-4 text-center">
                {first.locality}
              </th>

              <th className="px-6 py-4 text-center">
                {second.locality}
              </th>

              <th className="px-6 py-4 text-center">
                Better
              </th>

            </tr>

          </thead>

          <tbody>

            {metrics.map((metric) => (
              <tr
                key={metric.label}
                className="border-b transition hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-semibold">
                  {metric.label}
                </td>

                <td
                  className={`px-6 py-5 text-center font-semibold ${
                    metric.winner === "first"
                      ? "text-green-600"
                      : "text-slate-700"
                  }`}
                >
                  {metric.first}
                </td>

                <td
                  className={`px-6 py-5 text-center font-semibold ${
                    metric.winner === "second"
                      ? "text-green-600"
                      : "text-slate-700"
                  }`}
                >
                  {metric.second}
                </td>

                <td className="px-6 py-5 text-center">

                  {metric.winner === "equal" ? (
                    <MinusCircle className="mx-auto h-6 w-6 text-gray-400" />
                  ) : metric.winner === "first" ? (
                    <CheckCircle2 className="mx-auto h-6 w-6 text-green-600" />
                  ) : (
                    <CheckCircle2 className="mx-auto h-6 w-6 text-blue-600" />
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}