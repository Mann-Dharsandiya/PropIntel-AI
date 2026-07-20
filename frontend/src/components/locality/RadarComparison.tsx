import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LocalityData {
  locality: string;
  investmentScore: number;
  priceGrowth: number;
  metroConnectivity: number;
  schoolsNearby: number;
  hospitalsNearby: number;
  shoppingScore: number;
}

interface Props {
  first: LocalityData;
  second: LocalityData;
}

export default function RadarComparison({
  first,
  second,
}: Props) {
  const data = [
    {
      metric: "Investment",
      first: first.investmentScore,
      second: second.investmentScore,
    },
    {
      metric: "Growth",
      first: first.priceGrowth,
      second: second.priceGrowth,
    },
    {
      metric: "Metro",
      first: first.metroConnectivity,
      second: second.metroConnectivity,
    },
    {
      metric: "Schools",
      first: first.schoolsNearby,
      second: second.schoolsNearby,
    },
    {
      metric: "Hospitals",
      first: first.hospitalsNearby,
      second: second.hospitalsNearby,
    },
    {
      metric: "Shopping",
      first: first.shoppingScore,
      second: second.shoppingScore,
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="mb-8 text-3xl font-bold text-slate-800">
        📊 AI Radar Comparison
      </h2>

      <div className="h-[500px]">

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart data={data}>

            <PolarGrid />

            <PolarAngleAxis dataKey="metric" />

            <PolarRadiusAxis />

            <Radar
              name={first.locality}
              dataKey="first"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.35}
            />

            <Radar
              name={second.locality}
              dataKey="second"
              stroke="#EC4899"
              fill="#EC4899"
              fillOpacity={0.35}
            />

            <Legend />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}