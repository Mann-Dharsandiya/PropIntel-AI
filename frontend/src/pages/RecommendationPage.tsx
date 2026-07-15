 import { useState } from "react";

import {
  RecommendationProperty,
} from "@/api/recommendation";

import RecommendationForm from "@/components/recommendation/RecommendationForm";
import RecommendationLoading from "@/components/recommendation/RecommendationLoading";
import RecommendationCard from "@/components/recommendation/RecommendationCard";

export default function RecommendationPage() {
  const [
    recommendations,
    setRecommendations,
  ] = useState<RecommendationProperty[]>([]);

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12">

      <div className="mx-auto max-w-screen-2xl px-8">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-gray-900">
            🏡 AI Property Recommendation
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Find the best matching properties
            using our AI Recommendation Engine.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">

          {/* LEFT SIDE */}

          <RecommendationForm
            onRecommendations={setRecommendations}
            onLoading={setLoading}
          />

          {/* RIGHT SIDE */}

          <div>

            {loading ? (

              <RecommendationLoading />

            ) : recommendations.length === 0 ? (

              <div className="flex h-[500px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white">

                <div className="text-center">

                  <div className="mb-5 text-7xl">
                    🏠
                  </div>

                  <h2 className="text-3xl font-bold">

                    No Recommendations Yet

                  </h2>

                  <p className="mt-4 text-gray-500">

                    Fill your preferences and click

                    <br />

                    <strong>
                      Find Best Properties
                    </strong>

                  </p>

                </div>

              </div>

            ) : (

              <div className="grid gap-6 md:grid-cols-2">

                {recommendations.map((property) => (

                  <RecommendationCard
                    key={property._id}
                    property={property}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}