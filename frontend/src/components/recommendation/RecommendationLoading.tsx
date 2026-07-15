export default function RecommendationLoading() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        🤖 AI Recommendation
      </h2>

      <div className="flex h-96 items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />

          <h3 className="text-xl font-semibold text-gray-800">
            Finding Best Properties...
          </h3>

          <p className="mt-3 text-gray-500">
            AI is comparing thousands of properties
            <br />
            to find your best matches.
          </p>

        </div>

      </div>

    </div>
  );
}