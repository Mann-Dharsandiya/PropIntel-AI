interface Props {
  first: any;
  second: any;
}

export default function AIAnalyticsCard({ first, second }: Props) {
  const winner =
    first.investmentScore >= second.investmentScore ? first : second;

  const confidence = Math.min(
    98,
    Math.max(
      75,
      Math.round(
        80 +
          Math.abs(first.investmentScore - second.investmentScore) * 2
      )
    )
  );

  const risk =
    winner.investmentScore >= 8
      ? "Low"
      : winner.investmentScore >= 6
      ? "Medium"
      : "High";

  return (
    <section className="rounded-3xl bg-white shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8">
        🤖 AI Investment Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-indigo-50 p-6">
          <h3 className="text-gray-500">AI Confidence</h3>
          <p className="text-4xl font-bold text-indigo-600">
            {confidence}%
          </p>
        </div>

        <div className="rounded-2xl bg-green-50 p-6">
          <h3 className="text-gray-500">Risk Level</h3>
          <p className="text-4xl font-bold text-green-600">
            {risk}
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-6">
          <h3 className="text-gray-500">Investment Score</h3>
          <p className="text-4xl font-bold text-yellow-600">
            {winner.investmentScore}/10
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-6">
          <h3 className="text-gray-500">Expected ROI</h3>
          <p className="text-4xl font-bold text-blue-600">
            {(winner.priceGrowth * 1.25).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-purple-50 p-6">
          <h3 className="text-gray-500">Investment Horizon</h3>
          <p className="text-3xl font-bold text-purple-600">
            5–8 Years
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-6">
          <h3 className="text-gray-500">Rental Yield</h3>
          <p className="text-4xl font-bold text-orange-600">
            {(winner.priceGrowth / 2).toFixed(1)}%
          </p>
        </div>

      </div>
    </section>
  );
}