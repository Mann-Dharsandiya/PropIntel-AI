 import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Star,
  Train,
  School,
  Hospital,
  ShoppingBag,
  Building2,
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

interface MetricCardsProps {
  first: LocalityData;
  second: LocalityData;
}

type Winner = "first" | "second" | "equal";

function getWinner(a: number, b: number): Winner {
  if (a > b) return "first";
  if (b > a) return "second";
  return "equal";
}

interface CardProps {
  title: string;
  icon: React.ReactNode;
  value1: string | number;
  value2: string | number;
  label1: string;
  label2: string;
  winner: Winner;
}

function Card({
  title,
  icon,
  value1,
  value2,
  label1,
  label2,
  winner,
}: CardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          {icon}
        </div>

        {winner === "equal" ? (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
            Tie
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            Winner
          </span>
        )}
      </div>

      <h3 className="mb-6 text-lg font-bold text-slate-800">
        {title}
      </h3>

      <div className="space-y-4">
        <div
          className={`rounded-2xl border p-4 transition ${
            winner === "first"
              ? "border-green-400 bg-green-50"
              : "border-slate-200"
          }`}
        >
          <p className="text-sm text-gray-500">{label1}</p>

          <h4 className="mt-2 text-2xl font-black">
            {value1}
          </h4>
        </div>

        <div
          className={`rounded-2xl border p-4 transition ${
            winner === "second"
              ? "border-green-400 bg-green-50"
              : "border-slate-200"
          }`}
        >
          <p className="text-sm text-gray-500">{label2}</p>

          <h4 className="mt-2 text-2xl font-black">
            {value2}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default function MetricCards({
  first,
  second,
}: MetricCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <Card
        title="Average Property Price"
        icon={<IndianRupee className="h-7 w-7" />}
        value1={`₹${first.averagePrice.toLocaleString()}`}
        value2={`₹${second.averagePrice.toLocaleString()}`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(first.averagePrice, second.averagePrice)}
      />

      <Card
        title="Investment Score"
        icon={<Star className="h-7 w-7" />}
        value1={`${first.investmentScore}/10`}
        value2={`${second.investmentScore}/10`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(first.investmentScore, second.investmentScore)}
      />

      <Card
        title="Price Growth"
        icon={<TrendingUp className="h-7 w-7" />}
        value1={`${first.priceGrowth}%`}
        value2={`${second.priceGrowth}%`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(first.priceGrowth, second.priceGrowth)}
      />

      <Card
        title="Metro Connectivity"
        icon={<Train className="h-7 w-7" />}
        value1={`${first.metroConnectivity}/10`}
        value2={`${second.metroConnectivity}/10`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(
          first.metroConnectivity,
          second.metroConnectivity
        )}
      />

      <Card
        title="Schools Nearby"
        icon={<School className="h-7 w-7" />}
        value1={`${first.schoolsNearby}/10`}
        value2={`${second.schoolsNearby}/10`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(
          first.schoolsNearby,
          second.schoolsNearby
        )}
      />
            <Card
        title="Hospitals Nearby"
        icon={<Hospital className="h-7 w-7" />}
        value1={`${first.hospitalsNearby}/10`}
        value2={`${second.hospitalsNearby}/10`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(
          first.hospitalsNearby,
          second.hospitalsNearby
        )}
      />

      <Card
        title="Shopping Score"
        icon={<ShoppingBag className="h-7 w-7" />}
        value1={`${first.shoppingScore}/10`}
        value2={`${second.shoppingScore}/10`}
        label1={first.locality}
        label2={second.locality}
        winner={getWinner(
          first.shoppingScore,
          second.shoppingScore
        )}
      />

      <Card
        title="Rental Demand"
        icon={<Building2 className="h-7 w-7" />}
        value1={first.rentalDemand}
        value2={second.rentalDemand}
        label1={first.locality}
        label2={second.locality}
        winner="equal"
      />

      <Card
        title="Future Growth"
        icon={<TrendingUp className="h-7 w-7" />}
        value1={first.futureGrowth}
        value2={second.futureGrowth}
        label1={first.locality}
        label2={second.locality}
        winner="equal"
      />
    </div>
  );
}