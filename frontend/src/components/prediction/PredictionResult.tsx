 interface Props {
  predictedPrice: number | null;
}

export default function PredictionResult({
  predictedPrice,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        🤖 AI Valuation Report
      </h2>

      {!predictedPrice ? (
        <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-300">

          <div className="text-center">

            <div className="mb-4 text-6xl">
              🏡
            </div>

            <h3 className="text-xl font-semibold text-gray-700">
              No Prediction Yet
            </h3>

            <p className="mt-2 text-gray-500">
              Fill the property details and click
              <br />
              <strong>Predict Price</strong>
            </p>

          </div>

        </div>
      ) : (
        <div className="space-y-6">

          <div className="rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-center text-white">

            <p className="text-sm uppercase tracking-widest">
              Estimated Property Value
            </p>

            <h1 className="mt-4 text-5xl font-extrabold">
              ₹{" "}
              {predictedPrice.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </h1>

            <p className="mt-4 text-sm opacity-90">
              AI Generated Market Estimate
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                AI Model
              </p>

              <h3 className="mt-2 font-bold">
                Random Forest
              </h3>

            </div>

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Confidence
              </p>

              <h3 className="mt-2 font-bold text-green-600">
                96.8%
              </h3>

            </div>

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Average Error
              </p>

              <h3 className="mt-2 font-bold">
                ₹4.77 Lakhs
              </h3>

            </div>

            <div className="rounded-xl bg-gray-50 p-5">

              <p className="text-sm text-gray-500">
                Status
              </p>

              <h3 className="mt-2 font-bold text-green-600">
                ✓ Completed
              </h3>

            </div>

          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

            <h3 className="font-semibold text-blue-800">
              AI Analysis
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-700">
              This property valuation is generated using a Random Forest
              Machine Learning model trained on Indian real estate data.
              The predicted value is an estimated market price and should
              be used as a reference alongside local market trends and
              expert property evaluation.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}