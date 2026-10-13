import { useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChartNoAxesCombined,
  ArrowRight,
  CircleDollarSign,
  House,
  BadgeCheck,
} from "lucide-react";

import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionLoading from "@/components/prediction/PredictionLoading";
import PredictionResult from "@/components/prediction/PredictionResult";

export default function PricePredictionPage() {
  const [predictedPrice, setPredictedPrice] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const highlights = [
    {
      icon: BrainCircuit,
      title: "Machine Learning",
      description: "AI-powered price estimation",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Data-Driven Insights",
      description: "Estimate market value",
    },
    {
      icon: ShieldCheck,
      title: "Smarter Decisions",
      description: "Make informed property choices",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[420px] h-72 w-72 rounded-full bg-indigo-100/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Page header */}
        <header className="mb-10">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
              <Sparkles size={14} />
              PROPINTEL AI INTELLIGENCE
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Price prediction
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/15 sm:h-16 sm:w-16">
                  <BrainCircuit size={30} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-blue-700">
                    Intelligent property valuation
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                    AI Property Price Prediction
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Discover an estimated property value with our machine learning
                model. Enter your property details and explore a smarter way
                to evaluate your next real estate decision.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-sm lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <CircleDollarSign size={23} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Know your property's value
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Start with your property details
                  </p>
                </div>
              </div>

              <div className="my-4 h-px bg-slate-100" />

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <BadgeCheck size={15} className="text-emerald-600" />
                Model-generated estimate
              </div>
            </div>
          </div>
        </header>

        {/* Feature highlights */}
        <section
          aria-label="Prediction features"
          className="mb-8 grid gap-3 sm:grid-cols-3"
        >
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Prediction workspace */}
        <section aria-label="Property price prediction">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Prediction workspace
              </p>

              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Estimate your property value
              </h2>

              <p className="mt-1.5 text-sm text-slate-500">
                Provide the property information to generate an estimate.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
              <House size={15} className="text-blue-700" />
              Property valuation
            </div>
          </div>

          <div className="grid min-w-0 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Input panel */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.035] sm:rounded-3xl">
              <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600" />

              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <House size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Property details
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Enter the details required for prediction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-w-0 p-4 sm:p-6">
                <PredictionForm
                  onPrediction={(price) => {
                    setPredictedPrice(price);
                  }}
                  onLoading={setLoading}
                />
              </div>
            </div>

            {/* Result panel */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.035] sm:rounded-3xl lg:sticky lg:top-6">
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600" />

              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <TrendingUp size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Prediction results
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Your estimated property valuation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-w-0 p-4 sm:p-6">
                {loading ? (
                  <PredictionLoading />
                ) : (
                  <PredictionResult predictedPrice={predictedPrice} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Supporting information */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
            <ShieldCheck size={19} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Understand your estimate
            </h3>

            <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">
              This prediction is an AI-generated estimate, not a guaranteed
              sale price or formal property valuation. Actual market prices may
              vary based on location, property condition, demand, and other
              factors.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Sparkles size={13} />
          <span>Smarter insights for smarter property decisions</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}
