import {
  BarChart3,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { usePortfolio } from "@/context/PortfolioContext";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getNumber = (
  value: unknown
): number => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue)
    ? numberValue
    : 0;
};

export default function PortfolioCharts() {
  const { investments } =
    usePortfolio();

  // =========================
  // Investment Value Data
  // =========================

  const performanceData =
    investments.map((investment) => ({
      name:
        investment.propertyName.length > 18
          ? `${investment.propertyName.slice(
              0,
              18
            )}...`
          : investment.propertyName,

      invested: getNumber(
        investment.purchasePrice
      ),

      current: getNumber(
        investment.currentValue
      ),
    }));

  // =========================
  // ROI Data
  // =========================

  const roiData = investments.map(
    (investment) => {
      const purchase =
        getNumber(
          investment.purchasePrice
        );

      const current =
        getNumber(
          investment.currentValue
        );

      const profit =
        current - purchase;

      const roi =
        purchase > 0
          ? (profit / purchase) * 100
          : 0;

      return {
        name:
          investment.propertyName.length >
          18
            ? `${investment.propertyName.slice(
                0,
                18
              )}...`
            : investment.propertyName,

        roi: Number(
          roi.toFixed(2)
        ),
      };
    }
  );

  // =========================
  // Empty State
  // =========================

  if (investments.length === 0) {
    return (
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col items-center justify-center py-10 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
            <BarChart3
              size={26}
              className="text-indigo-600"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Portfolio Charts
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Add an investment to your portfolio
            to start viewing performance charts.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="mt-6">

      {/* ========================= */}
      {/* Section Header */}
      {/* ========================= */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">
          <BarChart3
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Portfolio Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Visualize the performance of your
            real estate investments.
          </p>
        </div>

      </div>

      {/* ========================= */}
      {/* Charts */}
      {/* ========================= */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* ========================= */}
        {/* Investment Value Chart */}
        {/* ========================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-start justify-between">

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Investment Value
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Purchase value vs current market value
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <TrendingUp
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

          <div className="h-[350px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={performanceData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 50,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                  }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis
                  tick={{
                    fontSize: 11,
                  }}
                  tickFormatter={(
                    value
                  ) => {
                    if (
                      value >=
                      10000000
                    ) {
                      return `₹${(
                        value / 10000000
                      ).toFixed(1)}Cr`;
                    }

                    if (
                      value >=
                      100000
                    ) {
                      return `₹${(
                        value / 100000
                      ).toFixed(1)}L`;
                    }

                    return `₹${(
                      value / 1000
                    ).toFixed(0)}K`;
                  }}
                />

                <Tooltip
                  formatter={(
                    value,
                    name
                  ) => [
                    formatCurrency(
                      Number(value)
                    ),
                    name === "invested"
                      ? "Invested"
                      : "Current Value",
                  ]}
                  labelStyle={{
                    fontWeight: 600,
                  }}
                />

                <Legend />

                <Bar
                  dataKey="invested"
                  name="Invested"
                  fill="#3b82f6"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

                <Bar
                  dataKey="current"
                  name="Current Value"
                  fill="#6366f1"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* ========================= */}
        {/* ROI Chart */}
        {/* ========================= */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-start justify-between">

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Property ROI
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Return generated by each property
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp
                size={20}
                className="text-emerald-600"
              />
            </div>

          </div>

          <div className="h-[350px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={roiData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 25,
                  left: 30,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  tick={{
                    fontSize: 11,
                  }}
                  tickFormatter={(
                    value
                  ) =>
                    `${value}%`
                  }
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  formatter={(
                    value
                  ) => [
                    `${Number(value).toFixed(
                      2
                    )}%`,
                    "ROI",
                  ]}
                />

                <Bar
                  dataKey="roi"
                  name="ROI"
                  fill="#10b981"
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </section>
  );
}