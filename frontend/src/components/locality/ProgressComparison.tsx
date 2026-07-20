import {
  TrendingUp,
  Train,
  School,
  Hospital,
  ShoppingBag,
  Star,
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

interface ProgressComparisonProps {
  first: LocalityData;
  second: LocalityData;
}

interface Metric {
  title: string;
  icon: React.ReactNode;
  first: number;
  second: number;
  max: number;
  color: string;
}

function ProgressBar({
  title,
  icon,
  first,
  second,
  max,
  color,
}: Metric) {
  const firstWidth = (first / max) * 100;
  const secondWidth = (second / max) * 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white`}
        >
          {icon}
        </div>

        <div>

          <h3 className="font-bold text-slate-800">
            {title}
          </h3>

          <p className="text-sm text-slate-500">
            Performance Comparison
          </p>

        </div>

      </div>

      <div className="space-y-6">

        <div>

          <div className="mb-2 flex justify-between">

            <span className="font-medium">
              Location 1
            </span>

            <span className="font-bold">
              {first}
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full rounded-full ${color} transition-all duration-1000`}
              style={{
                width: `${firstWidth}%`,
              }}
            />

          </div>

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span className="font-medium">
              Location 2
            </span>

            <span className="font-bold">
              {second}
            </span>

          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-200">

            <div
              className={`h-full rounded-full ${color} transition-all duration-1000`}
              style={{
                width: `${secondWidth}%`,
              }}
            />

          </div>

        </div>

      </div>

      <div className="mt-6 flex justify-center">

        {first > second ? (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            🏆 Location 1 Leads
          </span>
        ) : second > first ? (
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            🏆 Location 2 Leads
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700">
            🤝 Tie
          </span>
        )}

      </div>

    </div>
  );
}

export default function ProgressComparison({
  first,
  second,
}: ProgressComparisonProps) {
  const metrics: Metric[] = [
    {
      title: "Investment Score",
      icon: <Star className="h-6 w-6" />,
      first: first.investmentScore,
      second: second.investmentScore,
      max: 10,
      color: "bg-indigo-600",
    },
    {
      title: "Price Growth",
      icon: <TrendingUp className="h-6 w-6" />,
      first: first.priceGrowth,
      second: second.priceGrowth,
      max: 20,
      color: "bg-green-600",
    },
    {
      title: "Metro Connectivity",
      icon: <Train className="h-6 w-6" />,
      first: first.metroConnectivity,
      second: second.metroConnectivity,
      max: 10,
      color: "bg-cyan-600",
    },
    {
      title: "Schools Nearby",
      icon: <School className="h-6 w-6" />,
      first: first.schoolsNearby,
      second: second.schoolsNearby,
      max: 10,
      color: "bg-yellow-500",
    },
    {
      title: "Hospitals Nearby",
      icon: <Hospital className="h-6 w-6" />,
      first: first.hospitalsNearby,
      second: second.hospitalsNearby,
      max: 10,
      color: "bg-red-600",
    },
    {
      title: "Shopping Score",
      icon: <ShoppingBag className="h-6 w-6" />,
      first: first.shoppingScore,
      second: second.shoppingScore,
      max: 10,
      color: "bg-purple-600",
    },
  ];

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-slate-800">
          Performance Comparison
        </h2>

        <p className="mt-2 text-slate-500">
          Compare every important investment metric side by side.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {metrics.map((metric) => (
          <ProgressBar
            key={metric.title}
            {...metric}
          />
        ))}

      </div>

    </section>
  );
}