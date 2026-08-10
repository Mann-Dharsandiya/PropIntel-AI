import {
  PieChart as PieChartIcon,
  Building2,
  Home,
  Map,
  Wallet,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
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

const normalizePropertyType = (
  type: string
) => {
  const value = type
    .trim()
    .toLowerCase();

  if (
    value.includes("commercial") ||
    value.includes("office") ||
    value.includes("shop") ||
    value.includes("retail")
  ) {
    return "Commercial";
  }

  if (
    value.includes("land") ||
    value.includes("plot") ||
    value.includes("farm")
  ) {
    return "Land";
  }

  return "Residential";
};

const getTypeIcon = (
  type: string
) => {
  if (type === "Commercial") {
    return Building2;
  }

  if (type === "Land") {
    return Map;
  }

  return Home;
};

const CHART_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function PortfolioAllocation() {
  const {
    investments,
  } = usePortfolio();

  // =========================
  // Create Allocation
  // =========================

  const allocationMap =
    investments.reduce(
      (
        result,
        investment
      ) => {
        const type =
          normalizePropertyType(
            investment.propertyType
          );

        const value =
          getNumber(
            investment.currentValue
          );

        if (!result[type]) {
          result[type] = 0;
        }

        result[type] += value;

        return result;
      },
      {} as Record<
        string,
        number
      >
    );

  const totalValue =
    Object.values(
      allocationMap
    ).reduce(
      (total, value) =>
        total + value,
      0
    );

  const allocationData =
    Object.entries(
      allocationMap
    )
      .filter(
        ([, value]) =>
          value > 0
      )
      .map(
        ([name, value]) => ({
          name,
          value,
          percentage:
            totalValue > 0
              ? Number(
                  (
                    (value /
                      totalValue) *
                    100
                  ).toFixed(2)
                )
              : 0,
        })
      )
      .sort(
        (a, b) =>
          b.value - a.value
      );

  // =========================
  // Empty State
  // =========================

  if (
    investments.length === 0 ||
    allocationData.length === 0
  ) {
    return (
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col items-center justify-center py-10 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">

            <PieChartIcon
              size={27}
              className="text-indigo-600"
            />

          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Portfolio Allocation
          </h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Add investments with property types
            to see how your portfolio is allocated.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="mt-6">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50">

          <PieChartIcon
            size={22}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Portfolio Allocation
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See how your current portfolio value
            is distributed across property types.
          </p>

        </div>

      </div>

      {/* ========================= */}
      {/* Main Card */}
      {/* ========================= */}

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8">

        {/* ========================= */}
        {/* Donut Chart */}
        {/* ========================= */}

        <div className="relative">

          <div className="h-[360px] w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={95}
                  outerRadius={135}
                  paddingAngle={3}
                  strokeWidth={2}
                >

                  {allocationData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={
                          CHART_COLORS[
                            index %
                              CHART_COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  formatter={(
                    value,
                    name
                  ) => [
                    formatCurrency(
                      Number(value)
                    ),
                    String(name),
                  ]}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Center Value */}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

            <div className="text-center">

              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Total Value
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatCurrency(
                  totalValue
                )}
              </p>

            </div>

          </div>

        </div>

        {/* ========================= */}
        {/* Allocation Details */}
        {/* ========================= */}

        <div className="flex flex-col justify-center">

          <div className="mb-5">

            <h3 className="text-lg font-bold text-slate-900">
              Allocation Breakdown
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current market value by property type.
            </p>

          </div>

          <div className="space-y-4">

            {allocationData.map(
              (
                allocation,
                index
              ) => {

                const Icon =
                  getTypeIcon(
                    allocation.name
                  );

                return (
                  <div
                    key={
                      allocation.name
                    }
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{
                            backgroundColor:
                              `${CHART_COLORS[index % CHART_COLORS.length]}15`,
                          }}
                        >

                          <Icon
                            size={20}
                            style={{
                              color:
                                CHART_COLORS[
                                  index %
                                    CHART_COLORS.length
                                ],
                            }}
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {allocation.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {allocation.percentage}%
                            of portfolio
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="font-bold text-slate-900">
                          {formatCurrency(
                            allocation.value
                          )}
                        </p>

                        <p className="text-xs text-slate-400">
                          Current Value
                        </p>

                      </div>

                    </div>

                    {/* Progress */}

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${allocation.percentage}%`,
                          backgroundColor:
                            CHART_COLORS[
                              index %
                                CHART_COLORS.length
                            ],
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>

          {/* Portfolio Insight */}

          <div className="mt-6 rounded-2xl bg-indigo-50 p-5">

            <div className="flex items-start gap-3">

              <Wallet
                size={20}
                className="mt-0.5 shrink-0 text-indigo-600"
              />

              <div>

                <p className="font-semibold text-indigo-900">
                  Portfolio Concentration
                </p>

                <p className="mt-1 text-sm leading-relaxed text-indigo-700">

                  Your largest allocation is{" "}

                  <strong>
                    {
                      allocationData[0]
                        ?.name
                    }
                  </strong>{" "}

                  at{" "}

                  <strong>
                    {
                      allocationData[0]
                        ?.percentage
                    }
                    %
                  </strong>{" "}

                  of your current portfolio value.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}