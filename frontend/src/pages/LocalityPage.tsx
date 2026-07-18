 import { useState } from "react";

import {
  getLocalityInsights,
  LocalityInsights,
} from "@/api/locality";

import {
  getLocalityProperties,
  LocalityProperty,
  PropertyFilters,
} from "@/api/localityProperties";

import {
  getPriceTrend,
  PriceTrend,
} from "@/api/trend";

import {
  getInvestmentExplanation,
  InvestmentExplanation,
} from "@/api/explanation";

import LocalityForm from "@/components/locality/LocalityForm";
import LocalityCard from "@/components/locality/LocalityCard";
import LocalityLoading from "@/components/locality/LocalityLoading";
import LocalityPropertyGrid from "@/components/locality/LocalityPropertyGrid";
import PriceTrendChart from "@/components/locality/PriceTrendChart";
import InvestmentExplanationCard from "@/components/locality/InvestmentExplanation";
import PropertyFiltersComponent from "@/components/locality/PropertyFilters";

export default function LocalityPage() {
  const [loading, setLoading] = useState(false);

  const [data, setData] =
    useState<LocalityInsights | null>(null);

  const [properties, setProperties] =
    useState<LocalityProperty[]>([]);

  const [trend, setTrend] =
    useState<PriceTrend[]>([]);

  const [explanation, setExplanation] =
    useState<InvestmentExplanation | null>(
      null
    );

  // Save current search so filters can re-fetch
  const [city, setCity] = useState("");

  const [locality, setLocality] =
    useState("");

  // Smart Filters
  const [propertyType, setPropertyType] =
    useState("");

  const [bedrooms, setBedrooms] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [minArea, setMinArea] =
    useState("");

  const [maxArea, setMaxArea] =
    useState("");

  async function loadProperties(
    cityValue: string,
    localityValue: string,
    filters?: PropertyFilters
  ) {
    const propertyList =
      await getLocalityProperties(
        cityValue,
        localityValue,
        filters
      );

    setProperties(propertyList);
  }

  async function handleSearch(
    cityValue: string,
    localityValue: string
  ) {
    try {
      setLoading(true);

      setCity(cityValue);

      setLocality(localityValue);

      const [
        insights,
        trendData,
        explanationData,
      ] = await Promise.all([
        getLocalityInsights(
          cityValue,
          localityValue
        ),

        getPriceTrend(
          cityValue,
          localityValue
        ),

        getInvestmentExplanation(
          cityValue,
          localityValue
        ),
      ]);

      setData(insights);

      setTrend(trendData);

      setExplanation(
        explanationData
      );

      await loadProperties(
        cityValue,
        localityValue
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to fetch locality information."
      );
    } finally {
      setLoading(false);
    }
  }

  async function applyFilters() {
    if (!city || !locality) return;

    const filters: PropertyFilters = {};

    if (propertyType) {
      filters.propertyType =
        propertyType;
    }

    if (bedrooms) {
      filters.bedrooms =
        Number(bedrooms);
    }

    if (minPrice) {
      filters.minPrice =
        Number(minPrice);
    }

    if (maxPrice) {
      filters.maxPrice =
        Number(maxPrice);
    }

    if (minArea) {
      filters.minArea =
        Number(minArea);
    }

    if (maxArea) {
      filters.maxArea =
        Number(maxArea);
    }

    await loadProperties(
      city,
      locality,
      filters
    );
  }

  async function clearFilters() {
    setPropertyType("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");

    if (city && locality) {
      await loadProperties(
        city,
        locality
      );
    }
  }
    return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-screen-2xl px-8">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-gray-900">
            📍 Locality Intelligence
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Explore AI-powered market insights,
            investment score,
            historical trends,
            smart property filtering,
            and AI recommendations.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-[380px_1fr]">

          <LocalityForm
            onSearch={handleSearch}
            onLoading={setLoading}
          />

          {loading ? (
            <LocalityLoading />
          ) : (
            <LocalityCard
              data={data}
            />
          )}

        </div>

        {!loading && data && (
          <div className="mt-10">

            <PriceTrendChart
              data={trend}
            />

          </div>
        )}

        {!loading && explanation && (
          <InvestmentExplanationCard
            data={explanation}
          />
        )}

        {!loading && data && (
          <PropertyFiltersComponent
            propertyType={propertyType}
            bedrooms={bedrooms}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minArea={minArea}
            maxArea={maxArea}

            onPropertyTypeChange={
              setPropertyType
            }

            onBedroomsChange={
              setBedrooms
            }

            onMinPriceChange={
              setMinPrice
            }

            onMaxPriceChange={
              setMaxPrice
            }

            onMinAreaChange={
              setMinArea
            }

            onMaxAreaChange={
              setMaxArea
            }

            onClear={clearFilters}
          />
        )}

        {!loading && data && (

          <div className="mt-5 flex justify-end">

            <button
              onClick={applyFilters}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Apply Filters
            </button>

          </div>

        )}

        {!loading && (

          <div className="mt-10">

            <LocalityPropertyGrid
              properties={properties}
            />

          </div>

        )}

      </div>
    </div>
  );
}