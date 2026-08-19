 import { useHealthCheck } from "@/hooks/useHealthCheck";
import { useNavigate } from "react-router-dom";

// =========================================================
// DATA
// =========================================================

const LEDGER_STATS = [
  {
    label: "Parcels indexed",
    value: "4.2M",
    unit: "nationwide",
  },
  {
    label: "Valuation accuracy",
    value: "96.8",
    unit: "% MAE-adjusted",
  },
  {
    label: "Signal refresh",
    value: "15",
    unit: "min interval",
  },
];

const FEATURES = [
  {
    mark: "A",
    title: "Automated Valuation Engine",
    copy: "Scikit-learn regression models trained on comparable sales, permits, and neighborhood drift to price a parcel in seconds.",
  },
  {
    mark: "B",
    title: "Market Signal Radar",
    copy: "Continuous ingestion of listing, permit, and market data surfaces neighborhoods moving before they trend.",
  },
  {
    mark: "C",
    title: "Portfolio Risk Ledger",
    copy: "Every asset is scored against liquidity, appreciation, and volatility factors, reconciled like a real investment ledger.",
  },
];

// =========================================================
// APPLICATION MODULES
// =========================================================

const APPLICATION_MODULES = [
  {
    icon: "🏠",
    title: "Properties",
    description: "Browse and analyze available properties.",
    path: "/properties",
  },
  {
    icon: "📊",
    title: "AI Price Prediction",
    description: "Predict property prices using AI models.",
    path: "/predict-price",
  },
  {
    icon: "🤖",
    title: "AI Recommendations",
    description: "Find properties matched to your requirements.",
    path: "/recommendation",
  },
  {
    icon: "📍",
    title: "Locality Intelligence",
    description: "Analyze locality performance and investment potential.",
    path: "/locality",
  },
  {
    icon: "⚖️",
    title: "Compare Localities",
    description: "Compare locations using multiple market factors.",
    path: "/compare-localities",
  },
  {
    icon: "💰",
    title: "Financial Intelligence",
    description: "Calculate EMI, loans, ROI and investment scenarios.",
    path: "/financial",
  },
  {
    icon: "📁",
    title: "Investment Portfolio",
    description: "Track and analyze your real estate portfolio.",
    path: "/portfolio",
  },
  {
    icon: "📑",
    title: "AI Reports",
    description: "Generate AI property and portfolio reports.",
    path: "/reports",
  },
  {
    icon: "🧠",
    title: "Smart AI Advisor",
    description: "Get intelligent real estate investment guidance.",
    path: "/ai-advisor",
  },
];

// =========================================================
// LANDING PAGE
// =========================================================

export default function LandingPage() {
  const {
    data: health,
    isLoading,
    isError,
  } = useHealthCheck();

  const navigate = useNavigate();

  return (
    <div className="bg-paper">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-blueprint-900">

        {/* Background Grid */}

        <div className="absolute inset-0 bg-blueprint-grid opacity-50" />

        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-brass-500/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-24 md:pt-28">

          {/* ================================================= */}
          {/* HERO INTRO */}
          {/* ================================================= */}

          <div className="max-w-4xl">

            <span className="font-mono text-xs uppercase tracking-[0.35em] text-brass-300">
              Real Estate Intelligence, Surveyed
            </span>

            <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] text-paper md:text-6xl lg:text-7xl">
              Every property, appraised like an analyst read the deed.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              PropIntel AI fuses property data, comparable sales,
              AI predictions, locality intelligence and financial
              analysis into one intelligent real estate platform.
            </p>

          </div>

          {/* ================================================= */}
          {/* MAIN APPLICATION NAVIGATION */}
          {/* ================================================= */}

          <div className="mt-12">

            <div className="mb-5">

              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brass-300">
                Explore PropIntel AI
              </span>

              <h2 className="mt-2 font-display text-2xl text-paper md:text-3xl">
                Your complete real estate intelligence workspace.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Access property discovery, AI analysis, investment tools,
                portfolio management and intelligent reports from one place.
              </p>

            </div>

            {/* Module Grid */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {APPLICATION_MODULES.map((module) => (

                <button
                  key={module.path}
                  type="button"
                  onClick={() => navigate(module.path)}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-sm
                    border
                    border-blueprint-700/70
                    bg-blueprint-900/80
                    p-5
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-brass-400/70
                    hover:bg-blueprint-800
                    hover:shadow-xl
                  "
                >

                  {/* Top Accent */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-0.5
                      bg-brass-500/0
                      transition-all
                      duration-300
                      group-hover:bg-brass-500
                    "
                  />

                  <div className="flex items-start gap-4">

                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-blueprint-600
                        bg-blueprint-800
                        text-xl
                        transition
                        duration-300
                        group-hover:border-brass-400/60
                        group-hover:bg-brass-500/10
                      "
                    >
                      {module.icon}
                    </div>

                    {/* Content */}

                    <div className="min-w-0">

                      <h3 className="font-display text-lg text-paper">
                        {module.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {module.description}
                      </p>

                    </div>

                  </div>

                  {/* Arrow */}

                  <div className="mt-4 flex items-center justify-end">

                    <span
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-brass-400
                        opacity-70
                        transition
                        group-hover:opacity-100
                      "
                    >
                      Open module →
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

          {/* ================================================= */}
          {/* QUICK ACTIONS */}
          {/* ================================================= */}

          <div className="mt-10 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="
                rounded-sm
                bg-brass-500
                px-6
                py-3
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-blueprint-900
                transition
                hover:-translate-y-0.5
                hover:bg-brass-300
              "
            >
              Explore Properties →
            </button>

            <button
              type="button"
              onClick={() => navigate("/ai-advisor")}
              className="
                rounded-sm
                border
                border-blueprint-600
                px-6
                py-3
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-slate-200
                transition
                hover:border-brass-400
                hover:text-brass-300
              "
            >
              Ask AI Advisor →
            </button>

            <button
              type="button"
              onClick={() => navigate("/reports")}
              className="
                rounded-sm
                border
                border-blueprint-600
                px-6
                py-3
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-slate-200
                transition
                hover:border-brass-400
                hover:text-brass-300
              "
            >
              View AI Reports →
            </button>

          </div>

          {/* ================================================= */}
          {/* FINANCIAL INTELLIGENCE */}
          {/* ================================================= */}

          <div className="mt-14 rounded-sm border border-blueprint-700/70 bg-blueprint-900/80 p-8 shadow-2xl">

            <div className="flex flex-col items-center text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brass-400/40 bg-brass-500/10 text-3xl">
                💰
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass-300">
                Financial Intelligence
              </span>

              <h2 className="mt-2 font-display text-3xl text-paper">
                Financial Intelligence Suite
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                Plan your next property investment using AI-powered
                financial analysis, EMI planning, loan eligibility,
                ROI forecasting and investment insights.
              </p>

              {/* Financial Features */}

              <div className="mt-7 flex flex-wrap justify-center gap-3">

                <span className="rounded-full border border-blueprint-600 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-brass-300">
                  💰 EMI Calculator
                </span>

                <span className="rounded-full border border-blueprint-600 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-brass-300">
                  🏦 Loan Eligibility
                </span>

                <span className="rounded-full border border-blueprint-600 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-brass-300">
                  📈 ROI Analysis
                </span>

                <span className="rounded-full border border-blueprint-600 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-brass-300">
                  💹 Investment Planner
                </span>

              </div>

              {/* Functional Button */}

              <button
                type="button"
                onClick={() => navigate("/financial")}
                className="
                  mt-8
                  rounded-sm
                  bg-brass-500
                  px-8
                  py-3.5
                  font-mono
                  text-xs
                  uppercase
                  tracking-wider
                  text-blueprint-900
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:bg-brass-300
                  hover:shadow-lg
                "
              >
                Open Financial Intelligence →
              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* LEDGER STATS */}
          {/* ================================================= */}

          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-blueprint-700/70 bg-blueprint-700/70 sm:grid-cols-3">

            {LEDGER_STATS.map((stat) => (

              <div
                key={stat.label}
                className="bg-blueprint-900 px-6 py-6"
              >

                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </dt>

                <dd className="mt-2 font-mono text-3xl text-brass-300">

                  {stat.value}

                  <span className="ml-1 text-sm text-slate-400">
                    {stat.unit}
                  </span>

                </dd>

              </div>

            ))}

          </dl>

          {/* ================================================= */}
          {/* BACKEND STATUS */}
          {/* ================================================= */}

          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-400">

            <span
              className={`h-2 w-2 rounded-full ${
                isLoading
                  ? "bg-slate-500"
                  : isError
                  ? "bg-red-500"
                  : "bg-emerald-400"
              }`}
            />

            {isLoading && (
              <span>
                Checking backend connection…
              </span>
            )}

            {isError && (
              <span>
                Backend unreachable — start the API server.
              </span>
            )}

            {health && (
              <span>
                Backend connected — API status:{" "}
                {health.data.status}
              </span>
            )}

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* PLATFORM FEATURES */}
      {/* ===================================================== */}

      <section
        id="platform"
        className="mx-auto max-w-7xl px-6 py-20 md:py-28"
      >

        <div className="max-w-2xl">

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass-600">
            The Platform
          </span>

          <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
            Three instruments, one blueprint.
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            PropIntel AI combines automated valuation,
            market intelligence and portfolio analysis
            into a unified real estate decision platform.
          </p>

        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">

          {FEATURES.map((feature) => (

            <div
              key={feature.mark}
              className="border-t border-blueprint-700/30 pt-6"
            >

              <span className="font-display text-2xl text-brass-500">
                {feature.mark}
              </span>

              <h3 className="mt-3 font-display text-xl text-ink">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-650">
                {feature.copy}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}

      <section className="bg-blueprint-900">

        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-24">

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass-300">
            PropIntel AI
          </span>

          <h2 className="mt-4 font-display text-3xl text-paper md:text-4xl">
            Make your next real estate decision with intelligence.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Explore properties, predict prices, compare localities,
            evaluate investments, manage your portfolio and generate
            AI-powered reports — all from one platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="
                rounded-sm
                bg-brass-500
                px-8
                py-3.5
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-blueprint-900
                transition
                hover:bg-brass-300
              "
            >
              Start Exploring →
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="
                rounded-sm
                border
                border-blueprint-600
                px-8
                py-3.5
                font-mono
                text-xs
                uppercase
                tracking-wider
                text-slate-200
                transition
                hover:border-brass-400
                hover:text-brass-300
              "
            >
              Open Dashboard →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}