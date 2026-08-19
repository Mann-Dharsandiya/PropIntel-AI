 import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  Hospital,
  Home,
  MapPin,
  RefreshCw,
  School,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Train,
  Wallet,
  AlertCircle,
} from "lucide-react";

import {
  getMarketLocalities,
  getMarketLocalityInsights,
  getMarketPriceTrend,
  type Locality,
  type LocalityInsights,
  type PriceHistory,
} from "@/api/marketIntelligence";

// =========================================================
// Helper Types
// =========================================================

interface TrendPoint {
  label: string;
  value: number;
}

// =========================================================
// Helper Functions
// =========================================================

function formatCurrency(
  value: number | undefined
): string {
  const amount =
    Number(value) || 0;

  return `₹${amount.toLocaleString(
    "en-IN"
  )}`;
}

function formatNumber(
  value: number | undefined
): string {
  return (
    Number(value) || 0
  ).toLocaleString("en-IN");
}

function safeNumber(
  value: unknown
): number {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

// =========================================================
// Demand / Growth Labels
// =========================================================

function getDemandLabel(
  demand: string | undefined
): string {

  if (!demand) {
    return "Unknown";
  }

  const normalized =
    demand.toLowerCase();

  if (
    normalized === "high"
  ) {
    return "High";
  }

  if (
    normalized === "medium"
  ) {
    return "Medium";
  }

  if (
    normalized === "low"
  ) {
    return "Low";
  }

  return "Unknown";
}

function getGrowthLabel(
  growth: string | undefined
): string {

  if (!growth) {
    return "Unknown";
  }

  const normalized =
    growth.toLowerCase();

  if (
    normalized === "high"
  ) {
    return "High";
  }

  if (
    normalized === "medium"
  ) {
    return "Medium";
  }

  if (
    normalized === "low"
  ) {
    return "Low";
  }

  return "Unknown";
}

// =========================================================
// Badge Classes
// =========================================================

function getDemandClass(
  demand: string | undefined
): string {

  const value =
    getDemandLabel(
      demand
    ).toLowerCase();

  if (value === "high") {
    return "bg-green-100 text-green-700";
  }

  if (value === "medium") {
    return "bg-yellow-100 text-yellow-700";
  }

  if (value === "low") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-600";
}

function getGrowthClass(
  growth: string | undefined
): string {

  const value =
    getGrowthLabel(
      growth
    ).toLowerCase();

  if (value === "high") {
    return "bg-green-100 text-green-700";
  }

  if (value === "medium") {
    return "bg-blue-100 text-blue-700";
  }

  if (value === "low") {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-gray-100 text-gray-600";
}

// =========================================================
// Score Helpers
// =========================================================

function getScoreLabel(
  score: number
): string {

  if (score >= 8) {
    return "Excellent";
  }

  if (score >= 6) {
    return "Good";
  }

  if (score >= 5) {
    return "Average";
  }

  return "Low";
}

function getScoreClass(
  score: number
): string {

  if (score >= 8) {
    return "text-green-600";
  }

  if (score >= 6) {
    return "text-blue-600";
  }

  if (score >= 5) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

// =========================================================
// Trend Extraction
// =========================================================

function getTrendValue(
  item: PriceHistory
): number {

  if (
    item.pricePerSqFt !==
    undefined
  ) {
    return safeNumber(
      item.pricePerSqFt
    );
  }

  if (
    item.averagePrice !==
    undefined
  ) {
    return safeNumber(
      item.averagePrice
    );
  }

  if (
    item.price !==
    undefined
  ) {
    return safeNumber(
      item.price
    );
  }

  return 0;
}

function getTrendLabel(
  item: PriceHistory,
  index: number
): string {

  if (item.date) {
    return new Date(
      item.date
    ).toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      }
    );
  }

  if (
    item.createdAt
  ) {
    return new Date(
      item.createdAt
    ).toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      }
    );
  }

  if (
    item.year &&
    item.month
  ) {
    return `${item.month}/${item.year}`;
  }

  if (item.year) {
    return String(
      item.year
    );
  }

  return `Period ${index + 1}`;
}

// =========================================================
// Metric Card
// =========================================================

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBackground: string;
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconBackground,
}: MetricCardProps) {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {subtitle}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBackground}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

// =========================================================
// Infrastructure Card
// =========================================================

interface InfrastructureCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix?: string;
}

function InfrastructureCard({
  icon,
  title,
  value,
  suffix = "/10",
}: InfrastructureCardProps) {

  const score =
    Math.max(
      0,
      Math.min(
        10,
        safeNumber(value)
      )
    );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <div className="mt-1 flex items-center justify-between">

            <span className="font-bold text-gray-900">
              {score}
              {suffix}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">

        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{
            width: `${score * 10}%`,
          }}
        />

      </div>

    </div>
  );
}

// =========================================================
// Main Page
// =========================================================

export default function MarketIntelligencePage() {

  // =======================================================
  // State
  // =======================================================

  const [
    localities,
    setLocalities,
  ] = useState<Locality[]>(
    []
  );

  const [
    selectedCity,
    setSelectedCity,
  ] = useState("");

  const [
    selectedLocality,
    setSelectedLocality,
  ] = useState("");

  const [
    selectedInsights,
    setSelectedInsights,
  ] = useState<
    LocalityInsights | null
  >(null);

  const [
    priceTrend,
    setPriceTrend,
  ] = useState<
    PriceHistory[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadingInsights,
    setLoadingInsights,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  // =======================================================
  // Load Localities
  // =======================================================

  async function loadLocalities() {

    try {

      setLoading(true);
      setError("");

      const data =
        await getMarketLocalities();

      setLocalities(
        data || []
      );

      if (
        data &&
        data.length > 0
      ) {

        const first =
          data[0];

        setSelectedCity(
          first.city
        );

        setSelectedLocality(
          first.locality
        );
      }

    } catch (err) {

      console.error(
        "Failed to load localities:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load market data."
      );

    } finally {

      setLoading(false);

    }
  }

  // =======================================================
  // Initial Load
  // =======================================================

  useEffect(() => {

    loadLocalities();

  }, []);

  // =======================================================
  // City List
  // =======================================================

  const cities =
    useMemo(() => {

      const unique =
        new Set<string>();

      localities.forEach(
        (item) => {

          if (item.city) {
            unique.add(
              item.city
            );
          }

        }
      );

      return Array.from(
        unique
      ).sort();

    }, [localities]);

  // =======================================================
  // Localities For Selected City
  // =======================================================

  const cityLocalities =
    useMemo(() => {

      return localities
        .filter(
          (item) =>
            item.city ===
            selectedCity
        )
        .sort(
          (a, b) =>
            a.locality.localeCompare(
              b.locality
            )
        );

    }, [
      localities,
      selectedCity,
    ]);

  // =======================================================
  // Search Filter
  // =======================================================

  const filteredLocalities =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return localities;
      }

      return localities.filter(
        (item) =>
          item.city
            .toLowerCase()
            .includes(query) ||
          item.locality
            .toLowerCase()
            .includes(query)
      );

    }, [
      localities,
      search,
    ]);

  // =======================================================
  // Load Selected Locality
  // =======================================================

  async function loadInsights(
    city: string,
    locality: string
  ) {

    if (
      !city ||
      !locality
    ) {
      return;
    }

    try {

      setLoadingInsights(
        true
      );

      setError("");

      const [
        insights,
        trend,
      ] =
        await Promise.all([
          getMarketLocalityInsights(
            city,
            locality
          ),
          getMarketPriceTrend(
            city,
            locality
          ),
        ]);

      setSelectedInsights(
        insights
      );

      setPriceTrend(
        trend || []
      );

    } catch (err) {

      console.error(
        "Failed to load locality intelligence:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load locality intelligence."
      );

    } finally {

      setLoadingInsights(
        false
      );

    }
  }

  // =======================================================
  // When Selection Changes
  // =======================================================

  useEffect(() => {

    if (
      selectedCity &&
      selectedLocality
    ) {

      loadInsights(
        selectedCity,
        selectedLocality
      );

    }

  }, [
    selectedCity,
    selectedLocality,
  ]);

  // =======================================================
  // Change City
  // =======================================================

  function handleCityChange(
    city: string
  ) {

    setSelectedCity(
      city
    );

    const first =
      localities.find(
        (item) =>
          item.city === city
      );

    setSelectedLocality(
      first?.locality || ""
    );
  }

  // =======================================================
  // Refresh
  // =======================================================

  async function handleRefresh() {

    await loadLocalities();

    if (
      selectedCity &&
      selectedLocality
    ) {

      await loadInsights(
        selectedCity,
        selectedLocality
      );

    }
  }

  // =======================================================
  // Market Summary
  // =======================================================

  const marketSummary =
    useMemo(() => {

      if (
        !selectedInsights
      ) {
        return "";
      }

      const score =
        safeNumber(
          selectedInsights.investmentScore
        );

      const growth =
        safeNumber(
          selectedInsights.priceGrowth
        );

      const demand =
        getDemandLabel(
          selectedInsights.rentalDemand
        );

      const future =
        getGrowthLabel(
          selectedInsights.futureGrowth
        );

      let summary =
        `${selectedInsights.locality} in ${selectedInsights.city} currently has an average property price of ${formatCurrency(
          selectedInsights.averagePrice
        )} per sq.ft. `;

      summary +=
        `The locality is showing ${growth}% annual price growth and has an investment score of ${score}/10. `;

      summary +=
        `Rental demand is ${demand.toLowerCase()} and future growth is assessed as ${future.toLowerCase()}. `;

      if (score >= 8) {

        summary +=
          "Overall, the locality shows strong investment potential based on the available market indicators.";

      } else if (score >= 6) {

        summary +=
          "Overall, the locality shows good investment potential with reasonable long-term prospects.";

      } else if (score >= 5) {

        summary +=
          "Overall, the locality presents moderate investment potential and should be evaluated against alternatives.";

      } else {

        summary +=
          "Overall, investors should conduct additional research before making a major investment decision.";

      }

      return summary;

    }, [
      selectedInsights,
    ]);

  // =======================================================
  // Trend Data
  // =======================================================

  const trendData =
    useMemo<TrendPoint[]>(
      () => {

        return priceTrend
          .map(
            (
              item,
              index
            ) => ({
              label:
                getTrendLabel(
                  item,
                  index
                ),
              value:
                getTrendValue(
                  item
                ),
            })
          )
          .filter(
            (item) =>
              item.value > 0
          );

      },
      [priceTrend]
    );

  const maxTrend =
    Math.max(
      ...trendData.map(
        (item) =>
          item.value
      ),
      1
    );

  // =======================================================
  // Market Statistics
  // =======================================================

  const totalLocalities =
    localities.length;

  const highGrowthCount =
    localities.filter(
      (item) =>
        item.city
    ).length;

  // =======================================================
  // Loading Screen
  // =======================================================

  if (
    loading
  ) {

    return (
      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex min-h-[500px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">

                <RefreshCw
                  className="h-8 w-8 animate-spin text-indigo-600"
                />

              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Loading Market Intelligence
              </h2>

              <p className="mt-2 text-gray-500">
                Analysing locality and property market data...
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =======================================================
  // Main Render
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />

          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white" />

        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">

                <Sparkles className="h-4 w-4" />

                AI Market Intelligence

              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">

                Real Estate Market
                <span className="block text-indigo-200">
                  Intelligence
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">

                Explore locality-level property prices, growth,
                infrastructure, rental demand and AI-powered
                investment insights.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

                <p className="text-3xl font-black text-white">
                  {totalLocalities}
                </p>

                <p className="mt-1 text-sm text-indigo-100">
                  Localities
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

                <p className="text-3xl font-black text-white">
                  AI
                </p>

                <p className="mt-1 text-sm text-indigo-100">
                  Insights
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>

              <p className="font-semibold">
                Unable to load market data
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* SEARCH + SELECTORS */}
        {/* ================================================= */}

        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">

                <MapPin className="h-5 w-5 text-indigo-600" />

                Select Market

              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose a city and locality to view detailed intelligence.
              </p>

            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >

              <RefreshCw className="h-4 w-4" />

              Refresh

            </button>

          </div>

          <div className="grid gap-4 lg:grid-cols-3">

            {/* Search */}

            <div className="relative">

              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search locality..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* City */}

            <div className="relative">

              <select
                value={selectedCity}
                onChange={(event) =>
                  handleCityChange(
                    event.target.value
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >

                <option value="">
                  Select City
                </option>

                {cities.map(
                  (city) => (
                    <option
                      key={city}
                      value={city}
                    >
                      {city}
                    </option>
                  )
                )}

              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            </div>

            {/* Locality */}

            <div className="relative">

              <select
                value={
                  selectedLocality
                }
                onChange={(event) =>
                  setSelectedLocality(
                    event.target.value
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >

                <option value="">
                  Select Locality
                </option>

                {cityLocalities.map(
                  (item) => (
                    <option
                      key={`${item.city}-${item.locality}`}
                      value={
                        item.locality
                      }
                    >
                      {item.locality}
                    </option>
                  )
                )}

              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            </div>

          </div>

          {/* Search Results */}

          {search.trim() && (
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Search Results
              </p>

              <div className="flex flex-wrap gap-2">

                {filteredLocalities
                  .slice(0, 12)
                  .map(
                    (item) => (

                      <button
                        key={`${item.city}-${item.locality}`}
                        type="button"
                        onClick={() => {

                          setSelectedCity(
                            item.city
                          );

                          setSelectedLocality(
                            item.locality
                          );

                          setSearch("");
                        }}
                        className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-700"
                      >

                        {item.locality}
                        <span className="ml-1 text-gray-400">
                          · {item.city}
                        </span>

                      </button>

                    )
                  )}

              </div>

            </div>
          )}

        </section>

        {/* ================================================= */}
        {/* SELECTED LOCALITY */}
        {/* ================================================= */}

        {loadingInsights ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-indigo-600" />

            <p className="mt-4 font-semibold text-gray-800">
              Analysing locality...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Fetching prices, growth and infrastructure data.
            </p>

          </div>

        ) : selectedInsights ? (

          <div className="space-y-8">

            {/* ================================================= */}
            {/* LOCALITY HEADER */}
            {/* ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">

                    <Building2 className="h-7 w-7" />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-indigo-600">
                      Selected Locality
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-gray-900">
                      {selectedInsights.locality}
                    </h2>

                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">

                      <MapPin className="h-4 w-4" />

                      {selectedInsights.city}

                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap gap-2">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${getDemandClass(
                      selectedInsights.rentalDemand
                    )}`}
                  >

                    <Wallet className="h-3.5 w-3.5" />

                    Rental Demand:
                    {" "}
                    {getDemandLabel(
                      selectedInsights.rentalDemand
                    )}

                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${getGrowthClass(
                      selectedInsights.futureGrowth
                    )}`}
                  >

                    <TrendingUp className="h-3.5 w-3.5" />

                    Future Growth:
                    {" "}
                    {getGrowthLabel(
                      selectedInsights.futureGrowth
                    )}

                  </span>

                </div>

              </div>

            </section>

            {/* ================================================= */}
            {/* METRICS */}
            {/* ================================================= */}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <MetricCard
                title="Average Price"
                value={formatCurrency(
                  selectedInsights.averagePrice
                )}
                subtitle="Per sq.ft."
                icon={
                  <CircleDollarSign className="h-6 w-6 text-indigo-600" />
                }
                iconBackground="bg-indigo-50"
              />

              <MetricCard
                title="Price Growth"
                value={`${safeNumber(
                  selectedInsights.priceGrowth
                )}%`}
                subtitle="Annual appreciation"
                icon={
                  <TrendingUp className="h-6 w-6 text-green-600" />
                }
                iconBackground="bg-green-50"
              />

              <MetricCard
                title="Investment Score"
                value={`${safeNumber(
                  selectedInsights.investmentScore
                )}/10`}
                subtitle={getScoreLabel(
                  safeNumber(
                    selectedInsights.investmentScore
                  )
                )}
                icon={
                  <Target className="h-6 w-6 text-purple-600" />
                }
                iconBackground="bg-purple-50"
              />

              <MetricCard
                title="Rental Demand"
                value={getDemandLabel(
                  selectedInsights.rentalDemand
                )}
                subtitle="Market demand"
                icon={
                  <Wallet className="h-6 w-6 text-orange-600" />
                }
                iconBackground="bg-orange-50"
              />

            </section>

            {/* ================================================= */}
            {/* AI SUMMARY */}
            {/* ================================================= */}

            <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50">

              <div className="p-6 sm:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">

                    <Sparkles className="h-6 w-6" />

                  </div>

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">
                      AI Market Summary
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      Investment Intelligence
                    </h3>

                  </div>

                </div>

                <p className="mt-6 max-w-5xl text-base leading-8 text-gray-700">
                  {marketSummary}
                </p>

              </div>

            </section>

            {/* ================================================= */}
            {/* INVESTMENT SCORE */}
            {/* ================================================= */}

            <section className="grid gap-6 lg:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

                    <Gauge className="h-6 w-6" />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Investment Score
                    </h3>

                    <p className="text-sm text-gray-500">
                      AI calculated score
                    </p>

                  </div>

                </div>

                <div className="mt-8 text-center">

                  <div
                    className={`text-6xl font-black ${getScoreClass(
                      safeNumber(
                        selectedInsights.investmentScore
                      )
                    )}`}
                  >
                    {safeNumber(
                      selectedInsights.investmentScore
                    )}
                  </div>

                  <p className="mt-2 text-gray-500">
                    out of 10
                  </p>

                  <p
                    className={`mt-3 text-lg font-bold ${getScoreClass(
                      safeNumber(
                        selectedInsights.investmentScore
                      )
                    )}`}
                  >
                    {getScoreLabel(
                      safeNumber(
                        selectedInsights.investmentScore
                      )
                    )}
                  </p>

                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          safeNumber(
                            selectedInsights.investmentScore
                          ) * 10
                        )
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* Demand */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">

                    <Activity className="h-6 w-6" />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Rental Market
                    </h3>

                    <p className="text-sm text-gray-500">
                      Current rental demand
                    </p>

                  </div>

                </div>

                <div className="mt-8">

                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${getDemandClass(
                      selectedInsights.rentalDemand
                    )}`}
                  >
                    {getDemandLabel(
                      selectedInsights.rentalDemand
                    )}
                  </span>

                  <p className="mt-5 text-sm leading-6 text-gray-600">

                    {getDemandLabel(
                      selectedInsights.rentalDemand
                    ) === "High"
                      ? "Strong rental demand can support better rental income and tenant availability."
                      : getDemandLabel(
                            selectedInsights.rentalDemand
                          ) === "Medium"
                        ? "Moderate rental demand indicates a balanced rental market."
                        : getDemandLabel(
                              selectedInsights.rentalDemand
                            ) === "Low"
                          ? "Rental demand is relatively low and should be considered before buying for rental income."
                          : "Rental demand information is currently unavailable."}

                  </p>

                </div>

              </div>

              {/* Future Growth */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                    <TrendingUp className="h-6 w-6" />

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Future Growth
                    </h3>

                    <p className="text-sm text-gray-500">
                      Development potential
                    </p>

                  </div>

                </div>

                <div className="mt-8">

                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${getGrowthClass(
                      selectedInsights.futureGrowth
                    )}`}
                  >
                    {getGrowthLabel(
                      selectedInsights.futureGrowth
                    )}
                  </span>

                  <p className="mt-5 text-sm leading-6 text-gray-600">

                    {getGrowthLabel(
                      selectedInsights.futureGrowth
                    ) === "High"
                      ? "The locality shows strong future development potential."
                      : getGrowthLabel(
                            selectedInsights.futureGrowth
                          ) === "Medium"
                        ? "Steady development and appreciation may be expected."
                        : getGrowthLabel(
                              selectedInsights.futureGrowth
                            ) === "Low"
                          ? "Future development indicators are currently limited."
                          : "Future growth information is currently unavailable."}

                  </p>

                </div>

              </div>

            </section>

            {/* ================================================= */}
            {/* INFRASTRUCTURE */}
            {/* ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <Building2 className="h-6 w-6" />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900">
                    Locality Infrastructure
                  </h2>

                  <p className="text-sm text-gray-500">
                    Key infrastructure and lifestyle indicators
                  </p>

                </div>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <InfrastructureCard
                  title="Metro Connectivity"
                  value={safeNumber(
                    selectedInsights.metroConnectivity
                  )}
                  icon={
                    <Train className="h-5 w-5" />
                  }
                />

                <InfrastructureCard
                  title="Schools Nearby"
                  value={safeNumber(
                    selectedInsights.schoolsNearby
                  )}
                  icon={
                    <School className="h-5 w-5" />
                  }
                />

                <InfrastructureCard
                  title="Hospitals Nearby"
                  value={safeNumber(
                    selectedInsights.hospitalsNearby
                  )}
                  icon={
                    <Hospital className="h-5 w-5" />
                  }
                />

                <InfrastructureCard
                  title="Shopping Score"
                  value={safeNumber(
                    selectedInsights.shoppingScore
                  )}
                  icon={
                    <ShoppingBag className="h-5 w-5" />
                  }
                />

              </div>

            </section>

            {/* ================================================= */}
            {/* PRICE TREND */}
            {/* ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">

                    <BarChart3 className="h-6 w-6" />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Property Price Trend
                    </h2>

                    <p className="text-sm text-gray-500">
                      Historical market movement
                    </p>

                  </div>

                </div>

                {selectedInsights.priceGrowth >
                0 && (

                  <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700">

                    <ArrowUp className="h-4 w-4" />

                    {selectedInsights.priceGrowth}%
                    annual growth

                  </div>

                )}

              </div>

              {trendData.length === 0 ? (

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">

                  <BarChart3 className="mx-auto h-8 w-8 text-gray-300" />

                  <p className="mt-3 font-semibold text-gray-700">
                    No historical trend data
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Price history is not available for this locality.
                  </p>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <div
                    className="flex min-w-[650px] items-end gap-4"
                    style={{
                      height: "280px",
                    }}
                  >

                    {trendData.map(
                      (
                        item,
                        index
                      ) => {

                        const height =
                          Math.max(
                            8,
                            (item.value /
                              maxTrend) *
                              210
                          );

                        return (
                          <div
                            key={`${item.label}-${index}`}
                            className="flex h-full flex-1 flex-col items-center justify-end"
                          >

                            <div className="mb-2 text-xs font-semibold text-gray-600">

                              {formatCurrency(
                                item.value
                              )}

                            </div>

                            <div
                              className="w-full max-w-14 rounded-t-lg bg-gradient-to-t from-indigo-600 to-blue-400 transition-all hover:from-indigo-700 hover:to-blue-500"
                              style={{
                                height: `${height}px`,
                              }}
                              title={`${item.label}: ${formatCurrency(
                                item.value
                              )}`}
                            />

                            <div className="mt-3 max-w-20 truncate text-center text-xs text-gray-500">
                              {item.label}
                            </div>

                          </div>
                        );

                      }
                    )}

                  </div>

                </div>

              )}

            </section>

            {/* ================================================= */}
            {/* AI INVESTMENT VERDICT */}
            {/* ================================================= */}

            <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl">

              <div className="p-6 sm:p-8">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">

                    <Sparkles className="h-6 w-6" />

                  </div>

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wide text-indigo-100">
                      AI Investment Verdict
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      Should you consider this locality?
                    </h2>

                  </div>

                </div>

                <div className="mt-7 grid gap-6 lg:grid-cols-2">

                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                    <p className="text-sm leading-7 text-indigo-50">

                      {safeNumber(
                        selectedInsights.investmentScore
                      ) >= 8

                        ? `${selectedInsights.locality} appears to be a strong investment candidate. The combination of investment score, price appreciation and locality indicators suggests attractive long-term potential.`

                        : safeNumber(
                              selectedInsights.investmentScore
                            ) >= 6

                          ? `${selectedInsights.locality} shows good investment potential. Investors should compare pricing, rental demand and future development with nearby alternatives.`

                          : safeNumber(
                                selectedInsights.investmentScore
                              ) >= 5

                            ? `${selectedInsights.locality} has moderate investment potential. A detailed comparison with other localities is recommended before making a decision.`

                            : `${selectedInsights.locality} currently has a relatively low investment score. Additional research and comparison with alternative markets is recommended.`}

                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                    <h3 className="mb-4 font-bold">
                      Key Factors
                    </h3>

                    <div className="space-y-3">

                      <div className="flex items-center gap-3">

                        <CheckCircle2 className="h-5 w-5 text-green-300" />

                        <span className="text-sm text-indigo-50">
                          Investment score:
                          {" "}
                          {selectedInsights.investmentScore}/10
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <CheckCircle2 className="h-5 w-5 text-green-300" />

                        <span className="text-sm text-indigo-50">
                          Annual growth:
                          {" "}
                          {selectedInsights.priceGrowth}%
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <CheckCircle2 className="h-5 w-5 text-green-300" />

                        <span className="text-sm text-indigo-50">
                          Rental demand:
                          {" "}
                          {getDemandLabel(
                            selectedInsights.rentalDemand
                          )}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <CheckCircle2 className="h-5 w-5 text-green-300" />

                        <span className="text-sm text-indigo-50">
                          Future growth:
                          {" "}
                          {getGrowthLabel(
                            selectedInsights.futureGrowth
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* ================================================= */}
            {/* DISCLAIMER */}
            {/* ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center text-xs leading-5 text-gray-500">

              <p>

                <strong className="text-gray-700">
                  AI-generated market insight:
                </strong>{" "}
                These insights are based on the property and locality
                data currently available in PropIntel-AI. They are
                intended for informational purposes and should not be
                considered financial or investment advice.

              </p>

            </div>

          </div>

        ) : (

          /* ================================================= */
          /* EMPTY STATE */
          /* ================================================= */

          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

              <Home className="h-8 w-8" />

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Select a locality
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Select a city and locality above to view
              AI-powered market intelligence, pricing,
              infrastructure and investment analysis.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}