import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { PriceTrend } from "@/api/trend";

interface Props {
  data: PriceTrend[];
}

export default function PriceTrendChart({
  data,
}: Props) {
  if (!data.length) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="mb-4 text-2xl font-bold">
          📈 Price Trend
        </h2>

        <p className="text-gray-500">
          No price history available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          📈 Price Trend
        </h2>

        <p className="text-gray-500">
          Historical average property price
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
            />

            <YAxis
              tickFormatter={(value) =>
                `₹${(
                  value / 1000
                ).toFixed(0)}k`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Average Price",
              ]}
            />

            <Line
              type="monotone"
              dataKey="averagePrice"
              strokeWidth={3}
              dot
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}