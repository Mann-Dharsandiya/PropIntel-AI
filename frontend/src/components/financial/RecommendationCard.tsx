export default function RecommendationCard() {
  return (
    <div
      className="
        rounded-3xl

        bg-gradient-to-r

        from-blue-700

        via-indigo-700

        to-purple-700

        p-8

        text-white

        shadow-xl
      "
    >
      <h2 className="text-2xl font-bold">
        🤖 AI Financial Summary
      </h2>

      <div className="mt-6 space-y-3">

        <p>
          ✅ Excellent affordability score.
        </p>

        <p>
          ✅ Strong ROI potential.
        </p>

        <p>
          ✅ Property appreciation is healthy.
        </p>

        <p>
          ✅ Buying is financially recommended.
        </p>

      </div>

      <div className="mt-8 rounded-2xl bg-white/10 p-4">

        <div className="text-lg font-semibold">

          Overall Investment Rating

        </div>

        <div className="mt-2 text-3xl">

          ⭐⭐⭐⭐☆

        </div>

      </div>

    </div>
  );
}