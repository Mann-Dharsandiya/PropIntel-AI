import { MapPin, Building2, ArrowRightLeft, Sparkles, Search, Loader2 } from "lucide-react";

interface LocalityOption {
  city: string;
  locality: string;
}

interface CompareHeroProps {
  cities: string[];

  leftCity: string;
  rightCity: string;

  leftLocality: string;
  rightLocality: string;

  leftLocalities: LocalityOption[];
  rightLocalities: LocalityOption[];

  loading: boolean;

  onLeftCityChange: (city: string) => void;
  onRightCityChange: (city: string) => void;

  onLeftLocalityChange: (locality: string) => void;
  onRightLocalityChange: (locality: string) => void;

  onCompare: () => void;
}

export default function CompareHero({
  cities,

  leftCity,
  rightCity,

  leftLocality,
  rightLocality,

  leftLocalities,
  rightLocalities,

  loading,

  onLeftCityChange,
  onRightCityChange,

  onLeftLocalityChange,
  onRightLocalityChange,

  onCompare,
}: CompareHeroProps) {
  return (
    <div className="space-y-10">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-10 shadow-xl">

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">

            <ArrowRightLeft className="h-8 w-8 text-white" />

          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">

            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">

              AI Locality Comparison

            </span>

          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">

            Compare localities across different cities using AI-powered
            investment insights, infrastructure analysis, rental demand,
            future growth prediction and market intelligence.

          </p>

        </div>

      </div>

      {/* Compare Section */}

      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">

        {/* LEFT CARD */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

              <MapPin className="h-7 w-7 text-blue-700" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Location A

              </h2>

              <p className="text-sm text-slate-500">

                Select first locality

              </p>

            </div>

          </div>

          {/* CITY */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">

              City

            </label>

            <div className="relative">

              <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={leftCity}
                onChange={(e) => onLeftCityChange(e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Choose City</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* LOCALITY */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">

              Locality

            </label>

            <div className="relative">

              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={leftLocality}
                onChange={(e) => onLeftLocalityChange(e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Choose Locality</option>

                {leftLocalities.map((item) => (
                  <option
                    key={item.locality}
                    value={item.locality}
                  >
                    {item.locality}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>
                {/* VS SECTION */}

        <div className="flex flex-col items-center justify-center gap-4">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-30" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl">

              <ArrowRightLeft className="h-10 w-10 text-white" />

            </div>

          </div>

          <span className="text-2xl font-black tracking-widest text-slate-700">

            VS

          </span>

          <p className="max-w-[180px] text-center text-sm text-slate-500">

            Compare across different cities with AI-powered market intelligence

          </p>

        </div>

        {/* RIGHT CARD */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">

              <MapPin className="h-7 w-7 text-purple-700" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Location B

              </h2>

              <p className="text-sm text-slate-500">

                Select second locality

              </p>

            </div>

          </div>

          {/* CITY */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">

              City

            </label>

            <div className="relative">

              <Building2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={rightCity}
                onChange={(e) => onRightCityChange(e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              >
                <option value="">Choose City</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* LOCALITY */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">

              Locality

            </label>

            <div className="relative">

              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={rightLocality}
                onChange={(e) => onRightLocalityChange(e.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              >
                <option value="">Choose Locality</option>

                {rightLocalities.map((item) => (
                  <option
                    key={item.locality}
                    value={item.locality}
                  >
                    {item.locality}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* PREMIUM FEATURES */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">

        {[
          {
            icon: "🏙️",
            title: "Cross City",
            desc: "Compare any two cities",
          },
          {
            icon: "📈",
            title: "Market Trends",
            desc: "Growth & appreciation",
          },
          {
            icon: "💰",
            title: "ROI",
            desc: "Investment analysis",
          },
          {
            icon: "🏡",
            title: "Rental Yield",
            desc: "Rental potential",
          },
          {
            icon: "🚇",
            title: "Infrastructure",
            desc: "Metro & roads",
          },
          {
            icon: "🤖",
            title: "AI Verdict",
            desc: "Smart recommendation",
          },
        ].map((feature) => (

          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >

            <div className="mb-3 text-3xl">

              {feature.icon}

            </div>

            <h3 className="font-bold text-slate-800">

              {feature.title}

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              {feature.desc}

            </p>

          </div>

        ))}

      </div>
            {/* COMPARE BUTTON */}

      <div className="flex flex-col items-center justify-center gap-6">

        <button
          onClick={onCompare}
          disabled={
            loading ||
            !leftCity ||
            !rightCity ||
            !leftLocality ||
            !rightLocality
          }
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-12 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

          <span className="relative flex items-center gap-3">

            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                Compare Localities
              </>
            )}

          </span>

        </button>

        {!loading &&
          (!leftLocality ||
            !rightLocality ||
            !leftCity ||
            !rightCity) && (
            <p className="text-sm text-slate-500">
              Select both cities and localities to start comparison.
            </p>
          )}

      </div>

      {/* AI INFORMATION CARD */}

      <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-8 shadow-lg">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">

                <Sparkles className="h-6 w-6 text-white" />

              </div>

              <h2 className="text-2xl font-bold text-slate-800">

                AI Powered Comparison

              </h2>

            </div>

            <p className="max-w-3xl text-slate-600">

              Our AI compares investment potential, price appreciation,
              infrastructure, metro connectivity, rental demand,
              schools, hospitals, safety, future development,
              and overall market strength to help you choose
              the better locality.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white p-5 text-center shadow-md">

              <p className="text-3xl font-black text-blue-700">

                25+

              </p>

              <p className="mt-2 text-sm text-slate-500">

                AI Metrics

              </p>

            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow-md">

              <p className="text-3xl font-black text-purple-700">

                98%

              </p>

              <p className="mt-2 text-sm text-slate-500">

                Confidence

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}