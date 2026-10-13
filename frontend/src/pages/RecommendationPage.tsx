import { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  SlidersHorizontal,
  House,
  ArrowUpRight,
  ShieldCheck,
  WandSparkles,
  Search,
  Heart,
  MapPin,
} from "lucide-react";

import { RecommendationProperty } from "@/api/recommendation";

import RecommendationForm from "@/components/recommendation/RecommendationForm";
import RecommendationLoading from "@/components/recommendation/RecommendationLoading";
import RecommendationCard from "@/components/recommendation/RecommendationCard";

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState<
    RecommendationProperty[]
  >([]);

  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-[500px] h-72 w-72 rounded-full bg-indigo-100/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Page heading */}
        <header className="mb-9">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
              <Sparkles size={14} />
              PERSONALIZED PROPERTY DISCOVERY
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI recommendation engine
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/15 sm:h-16 sm:w-16">
                  <BrainCircuit size={30} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="mb-1 text-sm font-semibold text-blue-700">
                    PropIntel AI
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                    AI Property Recommendations
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Discover properties that match your preferences, budget, and
                goals. Set your requirements and let our recommendation engine
                help you explore your next property.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-sm lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <WandSparkles size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Made for your preferences
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Discover your next opportunity
                  </p>
                </div>
              </div>

              <div className="my-4 h-px bg-slate-100" />

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={15} className="text-emerald-600" />
                Personalized property discovery
              </div>
            </div>
          </div>
        </header>

        {/* Quick feature indicators */}
        <section
          aria-label="Recommendation benefits"
          className="mb-8 grid gap-3 sm:grid-cols-3"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <SlidersHorizontal size={20} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Your preferences
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Set your property requirements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <BrainCircuit size={20} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Intelligent matching
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Explore matching properties
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Heart size={20} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Find your fit
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Compare options for your needs
              </p>
            </div>
          </div>
        </section>

        {/* Main workspace */}
        <section aria-label="Property recommendation workspace">
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              Your discovery workspace
            </p>

            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Find properties that fit your goals
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Tell us what you are looking for and explore your matches.
            </p>
          </div>

          <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[350px_minmax(0,1fr)] xl:grid-cols-[390px_minmax(0,1fr)] xl:gap-8">
            {/* Preferences panel */}
            <aside className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/[0.035] sm:rounded-3xl lg:sticky lg:top-6">
              <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600" />

              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <SlidersHorizontal size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Your preferences
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Customize your property search.
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-w-0 p-4 sm:p-5">
                <RecommendationForm
                  onRecommendations={setRecommendations}
                  onLoading={setLoading}
                />
              </div>

              <div className="mx-4 mb-4 flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 sm:mx-5 sm:mb-5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <p className="text-xs leading-5 text-slate-500">
                  Adjust your preferences to find properties that better fit
                  your requirements.
                </p>
              </div>
            </aside>

            {/* Results panel */}
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <House size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Recommended properties
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {loading
                        ? "Finding properties for you..."
                        : recommendations.length > 0
                          ? `${recommendations.length} ${
                              recommendations.length === 1
                                ? "property"
                                : "properties"
                            } found`
                          : "Your personalized results will appear here"}
                    </p>
                  </div>
                </div>

                {!loading && recommendations.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <Sparkles size={13} />
                    Matches found
                  </span>
                )}
              </div>

              {loading ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
                  <RecommendationLoading />
                </div>
              ) : recommendations.length === 0 ? (
                <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white/90 px-5 py-12 shadow-sm sm:min-h-[500px] sm:rounded-3xl sm:px-8">
                  <div className="mx-auto max-w-md text-center">
                    <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700">
                      <House size={42} strokeWidth={1.5} />

                      <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-xl border-4 border-white bg-blue-700 text-white shadow-sm">
                        <Search size={15} />
                      </span>
                    </div>

                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                      <Sparkles size={13} />
                      Ready to discover
                    </span>

                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Your next property starts here
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                      Set your preferences in the panel and find properties
                      tailored to what you are looking for.
                    </p>

                    <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 text-left">
                      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                          <SlidersHorizontal size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            Set your preferences
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Choose the requirements that matter to you.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-700 shadow-sm">
                          <BrainCircuit size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            Discover your matches
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Your recommendations will appear in this area.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 xl:gap-6">
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
        </section>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <MapPin size={14} />
          <span>
            Discover opportunities that match your real estate goals.
          </span>
          <ArrowUpRight size={13} />
        </div>
      </div>
    </div>
  );
}
