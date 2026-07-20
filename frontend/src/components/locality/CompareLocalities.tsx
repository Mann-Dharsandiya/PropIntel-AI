 import { useEffect, useMemo, useRef, useState } from "react";

import {
  compareLocalities,
  LocalityComparison,
} from "@/api/compare";

import {
  getAllLocalities,
  LocalityOption,
} from "@/api/locality";

import CompareHero from "./CompareHero";
import WinnerCard from "./WinnerCard";
import MetricCards from "./MetricCards";
import ProgressComparison from "./ProgressComparison";
import DecisionMatrix from "./DecisionMatrix";
import AIRecommendation from "./AIRecommendation";
import InvestmentExplanation from "./InvestmentExplanation";
import ComparisonSummary from "./ComparisonSummary";
import RadarComparison from "./RadarComparison";
import AIAnalyticsCard from "./AIAnalyticsCard";
import { generateComparisonPDF } from "@/utils/generateComparisonPDF";
import AnimatedWinnerCard from "./AnimatedWinnerCard";
import AIInsightsPanel from "./AIInsightsPanel";
import ComparisonActions from "./ComparisonActions";
import FadeInSection from "../common/FadeInSection";

export default function CompareLocalities() {
  const [allLocalities, setAllLocalities] =
    useState<LocalityOption[]>([]);

  const [cities, setCities] = useState<string[]>([]);

  const [city1, setCity1] = useState("");

  const [city2, setCity2] = useState("");

  const [locality1, setLocality1] = useState("");

  const [locality2, setLocality2] = useState("");

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [comparison, setComparison] =
    useState<LocalityComparison | null>(null);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const resultRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLocalities();
  }, []);

  useEffect(() => {
    if (comparison && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [comparison]);

  const localitiesForCity1 = useMemo(() => {
    return allLocalities.filter(
      (item) => item.city === city1
    );
  }, [city1, allLocalities]);

  const localitiesForCity2 = useMemo(() => {
    return allLocalities.filter(
      (item) => item.city === city2
    );
  }, [city2, allLocalities]);
    async function loadLocalities() {
    try {
      setPageLoading(true);

      const data = await getAllLocalities();

      setAllLocalities(data);

      const uniqueCities = [
        ...new Set(data.map((item) => item.city)),
      ].sort();

      setCities(uniqueCities);

      if (uniqueCities.length > 0) {
        const firstCity = uniqueCities[0];

        setCity1(firstCity);

        const firstCityLocalities = data.filter(
          (item) => item.city === firstCity
        );

        if (firstCityLocalities.length > 0) {
          setLocality1(
            firstCityLocalities[0].locality
          );
        }

        if (uniqueCities.length > 1) {
          const secondCity = uniqueCities[1];

          setCity2(secondCity);

          const secondCityLocalities =
            data.filter(
              (item) =>
                item.city === secondCity
            );

          if (
            secondCityLocalities.length > 0
          ) {
            setLocality2(
              secondCityLocalities[0].locality
            );
          }
        } else {
          setCity2(firstCity);

          if (
            firstCityLocalities.length > 1
          ) {
            setLocality2(
              firstCityLocalities[1].locality
            );
          } else if (
            firstCityLocalities.length > 0
          ) {
            setLocality2(
              firstCityLocalities[0].locality
            );
          }
        }
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load available localities."
      );
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (
      localitiesForCity1.length &&
      !localitiesForCity1.find(
        (l) => l.locality === locality1
      )
    ) {
      setLocality1(
        localitiesForCity1[0].locality
      );
    }
  }, [city1]);

  useEffect(() => {
    if (
      localitiesForCity2.length &&
      !localitiesForCity2.find(
        (l) => l.locality === locality2
      )
    ) {
      setLocality2(
        localitiesForCity2[0].locality
      );
    }
  }, [city2]);

  function validateInputs() {
    if (
      !city1 ||
      !city2 ||
      !locality1 ||
      !locality2
    ) {
      setError(
        "Please select both cities and localities."
      );
      return false;
    }

    if (
      city1.toLowerCase() ===
        city2.toLowerCase() &&
      locality1.toLowerCase() ===
        locality2.toLowerCase()
    ) {
      setError(
        "Please choose two different localities."
      );
      return false;
    }

    return true;
  }
    async function handleCompare() {
    setError("");
    setSuccess("");

    if (!validateInputs()) return;

    try {
      setLoading(true);

  const data = await compareLocalities(
  city1,
  locality1,
  city2,
  locality2
);

console.log("API Response:", data);

setComparison(data);

      setSuccess(
        "Comparison completed successfully."
      );
    } catch (err: any) {
      console.error(err);

      if (err?.response?.status === 404) {
        setError("Locality not found.");
      } else if (
        err?.message === "Network Error"
      ) {
        setError(
          "Unable to connect to backend."
        );
      } else {
        setError(
          "Unable to compare localities."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function resetComparison() {
    setComparison(null);
    setError("");
    setSuccess("");
  }

  if (pageLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <h2 className="mt-8 text-3xl font-bold text-slate-800">
            Loading Localities...
          </h2>

          <p className="mt-3 text-slate-500">
            Preparing AI Comparison Dashboard
          </p>

        </div>

      </div>
    );
  }

  if (!comparison) {
    return (
      <CompareHero
  cities={cities}

  leftCity={city1}
  rightCity={city2}

  leftLocality={locality1}
  rightLocality={locality2}

  leftLocalities={localitiesForCity1}
  rightLocalities={localitiesForCity2}

  loading={loading}

  onLeftCityChange={setCity1}
  onRightCityChange={setCity2}

  onLeftLocalityChange={setLocality1}
  onRightLocalityChange={setLocality2}

  onCompare={handleCompare}
/>
    );
  }

  console.log("Comparison Response:", comparison);

const first = comparison?.first;
const second = comparison?.second;

if (!first || !second) {
  return (
    <div className="p-10 text-center text-red-600 text-xl">
      Comparison data not received from backend.
    </div>
  );
}

  return (
    <div
      ref={resultRef}
      className="space-y-8 pb-10"
    >

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black text-slate-800">
            AI Locality Comparison
          </h1>

          <p className="mt-2 text-slate-500">
            Comprehensive AI-powered investment comparison.
          </p>

        </div>

        <button
          onClick={resetComparison}
          className="rounded-2xl bg-slate-900 px-7 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          Compare Again
        </button>
        <button
  onClick={() =>
    generateComparisonPDF(first, second)
  }
  className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
>
  📄 Download Comparison Report
</button>
<ComparisonActions
  first={first}
  second={second}
/>

      </div>
            {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

 <FadeInSection>
  <AnimatedWinnerCard
    winner={
      first.investmentScore >= second.investmentScore
        ? first
        : second
    }
  />
</FadeInSection>

  <FadeInSection>
  <RadarComparison
    first={first}
    second={second}
  />
</FadeInSection>

<FadeInSection>
  <AIAnalyticsCard
    first={first}
    second={second}
  />
</FadeInSection>

<FadeInSection>
  <AIInsightsPanel
    winner={
      first.investmentScore >= second.investmentScore
        ? first
        : second
    }
    loser={
      first.investmentScore >= second.investmentScore
        ? second
        : first
    }
  />
</FadeInSection>

      <MetricCards
        first={first}
        second={second}
      />

      <ProgressComparison
        first={first}
        second={second}
      />

      <DecisionMatrix
        first={first}
        second={second}
      />

     <AIRecommendation
  first={first}
  second={second}
/>

{/* <InvestmentExplanation
  first={first}
  second={second}
/> */}

<ComparisonSummary
  first={first}
  second={second}
/>

    </div>
  );
}