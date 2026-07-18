interface LocalityInsights {
  city: string;
  locality: string;
  averagePrice: number;
  priceGrowth: number;
  investmentScore: number;
  metroConnectivity: number;
  schoolsNearby: number;
  hospitalsNearby: number;
  shoppingScore: number;
  rentalDemand: string;
  futureGrowth: string;
}

interface Props {
  data: LocalityInsights | null;
}

export default function LocalityCard({
  data,
}: Props) {
  if (!data) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <div className="flex h-[520px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-6xl">📍</div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              No Locality Selected
            </h2>

            <p className="mt-3 text-gray-500">
              Select a city and locality
              <br />
              to view market intelligence.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        📊 Market Intelligence
      </h2>

      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-7 text-center text-white">

        <h3 className="text-3xl font-bold">
          {data.locality}
        </h3>

        <p className="mt-2 text-lg opacity-90">
          {data.city}
        </p>

        <div className="mt-6">

          <p className="text-sm uppercase tracking-wider opacity-80">
            Average Price
          </p>

          <p className="mt-2 text-5xl font-bold">
            ₹{data.averagePrice.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-sm">
            per sq.ft
          </p>

        </div>

      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">

        <StatCard
          title="📈 Price Growth"
          value={`${data.priceGrowth}%`}
        />

        <StatCard
          title="⭐ Investment"
          value={`${data.investmentScore}/10`}
        />

        <StatCard
          title="🚇 Metro"
          value={`${data.metroConnectivity}/10`}
        />

        <StatCard
          title="🏫 Schools"
          value={String(data.schoolsNearby)}
        />

        <StatCard
          title="🏥 Hospitals"
          value={String(data.hospitalsNearby)}
        />

        <StatCard
          title="🛍 Shopping"
          value={`${data.shoppingScore}/10`}
        />

      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-5">

        <div className="flex items-center justify-between">

          <span className="font-semibold">
            Rental Demand
          </span>

          <span className="rounded-full bg-green-100 px-4 py-1 font-bold text-green-700">
            {data.rentalDemand}
          </span>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <span className="font-semibold">
            Future Growth
          </span>

          <span className="rounded-full bg-indigo-100 px-4 py-1 font-bold text-indigo-700">
            {data.futureGrowth}
          </span>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-gray-100 p-4 text-center">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-blue-700">
        {value}
      </p>

    </div>
  );
}