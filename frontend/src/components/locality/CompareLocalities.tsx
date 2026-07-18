 import { useEffect, useRef, useState } from "react";

import {
  compareLocalities,
  LocalityComparison,
} from "@/api/compare";

export default function CompareLocalities() {
  const [city1, setCity1] = useState("Mumbai");
  const [locality1, setLocality1] =
    useState("Borivali West");

  const [city2, setCity2] = useState("Mumbai");
  const [locality2, setLocality2] =
    useState("Andheri East");

  const [loading, setLoading] =
    useState(false);

  const [comparison, setComparison] =
    useState<LocalityComparison | null>(
      null
    );

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const resultRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (comparison && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [comparison]);

  function validateInputs() {
    if (
      !city1.trim() ||
      !city2.trim() ||
      !locality1.trim() ||
      !locality2.trim()
    ) {
      setError(
        "Please enter both city and locality for comparison."
      );

      return false;
    }

    if (
      city1.trim().toLowerCase() ===
        city2.trim().toLowerCase() &&
      locality1.trim().toLowerCase() ===
        locality2.trim().toLowerCase()
    ) {
      setError(
        "Please select two different localities."
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

      const result =
        await compareLocalities(
          city1.trim(),
          locality1.trim(),
          city2.trim(),
          locality2.trim()
        );

      if (!result) {
        setError(
          "No comparison data found."
        );
        return;
      }

      setComparison(result);

      setSuccess(
        "Comparison completed successfully."
      );
    } catch (err: any) {
      console.error(err);

      if (
        err?.response?.status === 404
      ) {
        setError(
          "Locality not found."
        );
      } else if (
        err?.message ===
        "Network Error"
      ) {
        setError(
          "Unable to connect to the server."
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

    setCity1("Mumbai");
    setLocality1("Borivali West");

    setCity2("Mumbai");
    setLocality2("Andheri East");
  }

  function winner(
    first: number,
    second: number
  ) {
    if (first > second)
      return "first";

    if (second > first)
      return "second";

    return "equal";
  }

  function scoreColor(
    side:
      | "first"
      | "second"
      | "equal",
    current:
      | "first"
      | "second"
  ) {
    if (side === "equal")
      return "text-gray-700";

    if (side === current)
      return "text-green-600 font-bold";

    return "text-red-500";
  }

  if (!comparison) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-2 text-3xl font-bold">
          🆚 Compare Localities
        </h2>

        <p className="mb-8 text-gray-600">
          Compare two localities based on
          investment score, price growth,
          rental demand and infrastructure.
        </p>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 text-lg font-semibold">
              Locality 1
            </h3>

            <input
              value={city1}
              disabled={loading}
              onChange={(e) =>
                setCity1(
                  e.target.value
                )
              }
              placeholder="City"
              className="mb-4 w-full rounded-lg border p-3 disabled:bg-gray-100"
            />

            <input
              value={locality1}
              disabled={loading}
              onChange={(e) =>
                setLocality1(
                  e.target.value
                )
              }
              placeholder="Locality"
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            />

          </div>

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 text-lg font-semibold">
              Locality 2
            </h3>

            <input
              value={city2}
              disabled={loading}
              onChange={(e) =>
                setCity2(
                  e.target.value
                )
              }
              placeholder="City"
              className="mb-4 w-full rounded-lg border p-3 disabled:bg-gray-100"
            />

            <input
              value={locality2}
              disabled={loading}
              onChange={(e) =>
                setLocality2(
                  e.target.value
                )
              }
              placeholder="Locality"
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-center">

          <button
            onClick={handleCompare}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Comparing..."
              : "Compare Localities"}
          </button>

        </div>

      </div>
    );
  }

  const first = comparison.first;
  const second = comparison.second;
   return (
  <div
    ref={resultRef}
    className="rounded-2xl bg-white p-8 shadow-lg"
  >
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>

        <h2 className="text-3xl font-bold">
          🆚 Compare Localities
        </h2>

        <p className="mt-2 text-gray-600">
          Compare investment potential, pricing, infrastructure,
          and growth of two localities.
        </p>

      </div>

      <button
        onClick={resetComparison}
        disabled={loading}
        className="rounded-lg bg-gray-200 px-5 py-2 font-medium transition hover:bg-gray-300 disabled:opacity-50"
      >
        Compare Another
      </button>

    </div>

    {error && (
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    )}

    {success && (
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
        {success}
      </div>
    )}

    <div className="overflow-x-auto rounded-xl border">

      <table className="w-full border-collapse">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-5 py-4 text-left">
              Metric
            </th>

            <th className="px-5 py-4 text-center">
              {first.locality}
            </th>

            <th className="px-5 py-4 text-center">
              {second.locality}
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Average Price
            </td>

            <td
              className={`px-5 py-4 text-center ${scoreColor(
                winner(
                  first.averagePrice,
                  second.averagePrice
                ),
                "first"
              )}`}
            >
              ₹ {first.averagePrice.toLocaleString()}
            </td>

            <td
              className={`px-5 py-4 text-center ${scoreColor(
                winner(
                  first.averagePrice,
                  second.averagePrice
                ),
                "second"
              )}`}
            >
              ₹ {second.averagePrice.toLocaleString()}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Investment Score
            </td>

            <td
              className={`px-5 py-4 text-center ${scoreColor(
                winner(
                  first.investmentScore,
                  second.investmentScore
                ),
                "first"
              )}`}
            >
              ⭐ {first.investmentScore}
            </td>

            <td
              className={`px-5 py-4 text-center ${scoreColor(
                winner(
                  first.investmentScore,
                  second.investmentScore
                ),
                "second"
              )}`}
            >
              ⭐ {second.investmentScore}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Price Growth
            </td>

            <td className="px-5 py-4 text-center">
              📈 {first.priceGrowth}%
            </td>

            <td className="px-5 py-4 text-center">
              📈 {second.priceGrowth}%
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Rental Demand
            </td>

            <td className="px-5 py-4 text-center">
              🏘️ {first.rentalDemand}
            </td>

            <td className="px-5 py-4 text-center">
              🏘️ {second.rentalDemand}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Future Growth
            </td>

            <td className="px-5 py-4 text-center">
              🚀 {first.futureGrowth}
            </td>

            <td className="px-5 py-4 text-center">
              🚀 {second.futureGrowth}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Metro Connectivity
            </td>

            <td className="px-5 py-4 text-center">
              🚇 {first.metroConnectivity}
            </td>

            <td className="px-5 py-4 text-center">
              🚇 {second.metroConnectivity}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Schools Nearby
            </td>

            <td className="px-5 py-4 text-center">
              🏫 {first.schoolsNearby}
            </td>

            <td className="px-5 py-4 text-center">
              🏫 {second.schoolsNearby}
            </td>

          </tr>

          <tr className="border-t hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Hospitals Nearby
            </td>

            <td className="px-5 py-4 text-center">
              🏥 {first.hospitalsNearby}
            </td>

            <td className="px-5 py-4 text-center">
              🏥 {second.hospitalsNearby}
            </td>

          </tr>

          <tr className="border-y hover:bg-gray-50">

            <td className="px-5 py-4 font-semibold">
              Shopping Score
            </td>

            <td className="px-5 py-4 text-center">
              🛍️ {first.shoppingScore}
            </td>

            <td className="px-5 py-4 text-center">
              🛍️ {second.shoppingScore}
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <div className="mt-8 grid gap-6 md:grid-cols-2">

      <div className="rounded-xl border bg-blue-50 p-5">

        <h3 className="mb-3 text-lg font-bold">
          📍 {first.locality}
        </h3>

        <p>
          Investment Score:
          <strong> {first.investmentScore}</strong>
        </p>

        <p>
          Average Price:
          <strong>
            {" "}
            ₹{first.averagePrice.toLocaleString()}
          </strong>
        </p>

      </div>

      <div className="rounded-xl border bg-green-50 p-5">

        <h3 className="mb-3 text-lg font-bold">
          📍 {second.locality}
        </h3>

        <p>
          Investment Score:
          <strong> {second.investmentScore}</strong>
        </p>

        <p>
          Average Price:
          <strong>
            {" "}
            ₹{second.averagePrice.toLocaleString()}
          </strong>
        </p>

      </div>

    </div>
        <div className="mt-10 rounded-xl bg-indigo-50 p-6">

      <h3 className="mb-4 text-2xl font-bold">
        🤖 AI Investment Verdict
      </h3>

      <p className="mb-6 text-lg leading-8 text-gray-700">

        {first.investmentScore >
        second.investmentScore
          ? `${first.locality} is currently the better investment option because it offers a higher investment score, stronger future growth potential, and better overall infrastructure.`
          : first.investmentScore <
            second.investmentScore
          ? `${second.locality} is currently the better investment option because it offers a higher investment score, stronger future growth potential, and better overall infrastructure.`
          : `${first.locality} and ${second.locality} have very similar investment potential. Your final decision should depend on your budget, preferred amenities, and long-term investment goals.`}

      </p>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-white p-5 shadow">

          <h4 className="mb-3 text-lg font-semibold">
            🏆 Recommended Locality
          </h4>

          <p className="text-2xl font-bold text-indigo-600">

            {first.investmentScore >
            second.investmentScore
              ? first.locality
              : first.investmentScore <
                second.investmentScore
              ? second.locality
              : "Tie"}

          </p>

          <p className="mt-2 text-sm text-gray-500">
            Based on overall investment score and
            future growth analysis.
          </p>

        </div>

        <div className="rounded-xl bg-white p-5 shadow">

          <h4 className="mb-3 text-lg font-semibold">
            💡 Investment Tips
          </h4>

          <ul className="list-disc space-y-2 pl-5 text-gray-700">

            <li>
              Compare property prices before making
              a final decision.
            </li>

            <li>
              Consider future infrastructure
              developments.
            </li>

            <li>
              Look for areas with higher rental
              demand.
            </li>

            <li>
              Higher investment scores generally
              indicate better long-term returns.
            </li>

          </ul>

        </div>

      </div>

    </div>

    <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">

      <h3 className="mb-3 text-xl font-bold">
        📌 Comparison Summary
      </h3>

      <ul className="space-y-2 text-gray-700">

        <li>
          ✔ Compared <strong>{first.locality}</strong> (
          {first.city}) with{" "}
          <strong>{second.locality}</strong> (
          {second.city})
        </li>

        <li>
          ✔ Total Metrics Compared: <strong>9</strong>
        </li>

        <li>
          ✔ AI Recommendation Generated
        </li>

        <li>
          ✔ Investment Analysis Completed
        </li>

      </ul>

    </div>

  </div>
);
}