interface Props {
  winner: any;
  loser: any;
}

export default function AIInsightsPanel({
  winner,
  loser,
}: Props) {
  const strengths = [
    "Excellent investment score",
    "Strong infrastructure",
    "Better future appreciation",
    "High buyer demand",
  ];

  const weaknesses = [
    "Premium property pricing",
    "Growing market competition",
  ];

  return (
    <section className="rounded-3xl bg-white shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        🧠 AI Investment Insights
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        <div>

          <h3 className="text-2xl font-bold text-indigo-600 mb-3">
            🏆 Best Overall
          </h3>

          <p className="text-3xl font-bold">
            {winner.locality}
          </p>

          <p className="mt-3 text-gray-600">
            Best suited for long-term investment and
            wealth creation.
          </p>

          <div className="mt-8">

            <h4 className="font-bold text-green-600 mb-3">
              Strengths
            </h4>

            <ul className="space-y-2">
              {strengths.map((item) => (
                <li key={item}>
                  ✅ {item}
                </li>
              ))}
            </ul>

          </div>

          <div className="mt-8">

            <h4 className="font-bold text-red-500 mb-3">
              Weaknesses
            </h4>

            <ul className="space-y-2">
              {weaknesses.map((item) => (
                <li key={item}>
                  ⚠ {item}
                </li>
              ))}
            </ul>

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8">

          <h3 className="text-2xl font-bold mb-5">
            🎯 AI Verdict
          </h3>

          <p className="leading-8 text-gray-700">

            Based on investment score,
            infrastructure quality,
            metro connectivity,
            educational facilities,
            healthcare availability
            and historical appreciation,
            <strong> {winner.locality} </strong>
            is expected to outperform
            <strong> {loser.locality} </strong>
            over the next 5–8 years.

          </p>

          <div className="mt-8">

            <div className="rounded-xl bg-indigo-600 text-white p-5">

              <h4 className="font-bold mb-2">
                Recommendation
              </h4>

              <p>
                Suitable for long-term investors,
                rental income seekers,
                and buyers looking for strong
                future appreciation.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}