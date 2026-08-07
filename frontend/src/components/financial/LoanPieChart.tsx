import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  principal: number;
  interest: number;
}

const COLORS = [
  "#2563eb",
  "#f59e0b",
];

export default function LoanPieChart({
  principal,
  interest,
}: Props) {
  const data = [
    {
      name: "Principal",
      value: principal,
    },
    {
      name: "Interest",
      value: interest,
    },
  ];

  return (
    <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold">
        📊 Loan Breakdown
      </h2>

      <div className="h-[380px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={5}
            >

              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}