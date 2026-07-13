 import { useState } from "react";

import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionLoading from "@/components/prediction/PredictionLoading";
import PredictionResult from "@/components/prediction/PredictionResult";

export default function PricePredictionPage() {
  const [predictedPrice, setPredictedPrice] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            🤖 AI Property Price Prediction
          </h1>

          <p className="mt-3 text-gray-600">
            Estimate your property's market value using our Machine Learning model.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <PredictionForm
            onPrediction={(price) => {
              setPredictedPrice(price);
            }}
            onLoading={setLoading}
          />

          {loading ? (
            <PredictionLoading />
          ) : (
            <PredictionResult
              predictedPrice={predictedPrice}
            />
          )}

        </div>

      </div>
    </div>
  );
}