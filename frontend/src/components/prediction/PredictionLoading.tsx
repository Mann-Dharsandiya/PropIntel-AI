export default function PredictionLoading() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        AI Prediction
      </h2>

      <div className="flex h-72 flex-col items-center justify-center">

        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <p className="mt-6 text-lg font-medium text-gray-600">
          AI is analyzing your property...
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Please wait a few seconds
        </p>

      </div>

    </div>
  );
}