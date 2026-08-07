 import DashboardCard from "./DashboardCard";
import RecommendationCard from "./RecommendationCard";

import { useFinancial } from "@/context/FinancialContext";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinancialDashboard() {
  const { data } = useFinancial();

  function getInvestmentRating() {
    let score = 0;

    if (data.affordability >= 90) score += 2;
    else if (data.affordability >= 70) score += 1;

    if (data.roi >= 20) score += 2;
    else if (data.roi >= 10) score += 1;

    if (data.buyCost > 0 && data.rentCost > 0) {
      if (data.buyCost < data.rentCost)
        score += 1;
    }

    switch (score) {
      case 5:
        return "★★★★★";
      case 4:
        return "★★★★☆";
      case 3:
        return "★★★☆☆";
      case 2:
        return "★★☆☆☆";
      default:
        return "★☆☆☆☆";
    }
  }

  return (
    <section className="mb-12">

      {/* Header */}

      <div className="mb-10">

        <h2 className="text-4xl font-bold text-slate-800">
          💰 Financial Dashboard
        </h2>

        <p className="mt-3 text-lg text-slate-500">
          Live summary generated from all financial calculators.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <DashboardCard
          title="Monthly EMI"
          value={formatCurrency(data.emi)}
          icon="💰"
          color="text-green-600"
        />

        <DashboardCard
          title="Eligible Loan"
          value={formatCurrency(
            data.eligibleLoan
          )}
          icon="🏦"
          color="text-blue-600"
        />

        <DashboardCard
          title="ROI"
          value={`${data.roi.toFixed(
            2
          )}%`}
          icon="📈"
          color="text-purple-600"
        />

        <DashboardCard
          title="Future Value"
          value={formatCurrency(
            data.futureValue
          )}
          icon="💹"
          color="text-orange-600"
        />

        <DashboardCard
          title="Affordability"
          value={`${data.affordability}/100`}
          icon="🧠"
          color="text-emerald-600"
        />

        <DashboardCard
          title="Investment Rating"
          value={getInvestmentRating()}
          icon="⭐"
          color="text-yellow-500"
        />

      </div>

      {/* AI Summary */}

      <div className="mt-10">

        <RecommendationCard />

      </div>

    </section>
  );
}