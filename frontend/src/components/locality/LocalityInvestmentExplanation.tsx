 import {
  Brain,
  BadgeCheck,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import { InvestmentExplanation } from "@/api/explanation";

interface Props {
  data: InvestmentExplanation;
}

export default function LocalityInvestmentExplanation({
  data,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-800 p-8 text-white shadow-2xl">

      <div className="flex items-center gap-5">

        <div className="rounded-2xl bg-white/15 p-4">

          <Brain className="h-9 w-9" />

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            {data.title}

          </h2>

          <p className="mt-2 text-indigo-100">

            {data.summary}

          </p>

        </div>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div>

          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">

            <BadgeCheck className="text-green-300" />

            Advantages

          </h3>

          <div className="space-y-4">

            {data.pros.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white/10 p-4"
              >
                ✅ {item}
              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">

            <AlertTriangle className="text-yellow-300" />

            Considerations

          </h3>

          <div className="space-y-4">

            {data.cons.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white/10 p-4"
              >
                ⚠️ {item}
              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-6">

        <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">

          <Lightbulb />

          AI Recommendation

        </h3>

        <p className="leading-8 text-indigo-100">

          {data.recommendation}

        </p>

      </div>

    </section>
  );
}