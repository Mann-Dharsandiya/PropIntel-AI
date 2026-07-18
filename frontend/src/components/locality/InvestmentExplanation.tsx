 import {
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

import type {
  InvestmentExplanation as InvestmentExplanationData,
} from "@/api/explanation";

interface Props {
  data: InvestmentExplanationData | null;
}

export default function InvestmentExplanation({
  data,
}: Props) {
  if (!data) {
    return null;
  }

  const explanation = data;

  const recommendationColor = (() => {
    switch (
      explanation.recommendation.toLowerCase()
    ) {
      case "strong buy":
        return "bg-green-600";

      case "buy":
        return "bg-blue-600";

      case "hold":
        return "bg-yellow-500";

      case "neutral":
        return "bg-orange-500";

      case "avoid":
        return "bg-red-600";

      default:
        return "bg-gray-600";
    }
  })();

  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Sparkles
            size={30}
            className="text-indigo-600"
          />

          <div>

            <h2 className="text-2xl font-bold">
              🤖 AI Investment Analysis
            </h2>

            <p className="text-gray-500">
              Personalized recommendation based on
              locality intelligence
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-5 py-2 text-sm font-bold text-white ${recommendationColor}`}
        >
          {explanation.recommendation}
        </span>

      </div>

      <div className="rounded-xl bg-indigo-50 p-5">

        <h3 className="mb-3 text-xl font-bold">
          {explanation.title}
        </h3>

        <p className="leading-7 text-gray-700">
          {explanation.summary}
        </p>

      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">

        <div>

          <h3 className="mb-4 text-xl font-bold text-green-700">
            ✅ Strengths
          </h3>

          <div className="space-y-3">

            {explanation.pros.map(
              (pro, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-green-50 p-4"
                >
                  <CheckCircle
                    size={20}
                    className="mt-1 text-green-600"
                  />

                  <span>{pro}</span>

                </div>
              )
            )}

          </div>

        </div>

        <div>

          <h3 className="mb-4 text-xl font-bold text-red-700">
            ❌ Weaknesses
          </h3>

          {explanation.cons.length ===
          0 ? (
            <div className="rounded-lg bg-green-50 p-4 text-green-700">
              No major concerns found.
            </div>
          ) : (
            <div className="space-y-3">

              {explanation.cons.map(
                (con, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg bg-red-50 p-4"
                  >
                    <XCircle
                      size={20}
                      className="mt-1 text-red-600"
                    />

                    <span>{con}</span>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}