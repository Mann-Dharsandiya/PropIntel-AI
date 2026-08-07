 import { useEffect, useState } from "react";

import FinanceInput from "./FinanceInput";
import FinanceCard from "./FinanceCard";

import { useFinancial } from "@/context/FinancialContext";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ROICalculator() {
  const { updateData } = useFinancial();

  const [purchasePrice, setPurchasePrice] =
    useState(8000000);

  const [monthlyRent, setMonthlyRent] =
    useState(35000);

  const [growthRate, setGrowthRate] =
    useState(8);

  const [years, setYears] =
    useState(5);

  const [futureValue, setFutureValue] =
    useState(0);

  const [rentalIncome, setRentalIncome] =
    useState(0);

  const [profit, setProfit] =
    useState(0);

  const [roi, setROI] =
    useState(0);

  useEffect(() => {
    calculateROI();
  }, [
    purchasePrice,
    monthlyRent,
    growthRate,
    years,
  ]);

  function calculateROI() {
    const future =
      purchasePrice *
      Math.pow(
        1 + growthRate / 100,
        years
      );

    const rent =
      monthlyRent *
      12 *
      years;

    const totalProfit =
      future +
      rent -
      purchasePrice;

    const roiValue =
      (totalProfit /
        purchasePrice) *
      100;

    setFutureValue(future);

    setRentalIncome(rent);

    setProfit(totalProfit);

    setROI(roiValue);

    updateData({
      roi: roiValue,
      futureValue: future,
    });
  }

  return (
    <div className="mt-16">

      <h2 className="mb-8 text-3xl font-bold">
        📈 Investment ROI Calculator
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <FinanceInput
          icon="🏠"
          label="Purchase Price"
          prefix="₹"
          value={purchasePrice}
          onChange={setPurchasePrice}
        />

        <FinanceInput
          icon="💵"
          label="Monthly Rent"
          prefix="₹"
          value={monthlyRent}
          onChange={setMonthlyRent}
        />

        <FinanceInput
          icon="📈"
          label="Expected Appreciation"
          suffix="%"
          value={growthRate}
          onChange={setGrowthRate}
        />

        <FinanceInput
          icon="📅"
          label="Holding Period"
          suffix="Years"
          value={years}
          onChange={setYears}
        />

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <FinanceCard
          title="Future Value"
          value={formatCurrency(
            futureValue
          )}
          icon="🏠"
          color="text-green-600"
        />

        <FinanceCard
          title="Rental Income"
          value={formatCurrency(
            rentalIncome
          )}
          icon="💰"
          color="text-blue-600"
        />

        <FinanceCard
          title="Net Profit"
          value={formatCurrency(
            profit
          )}
          icon="📈"
          color="text-orange-600"
        />

        <FinanceCard
          title="ROI"
          value={`${roi.toFixed(
            2
          )}%`}
          icon="⭐"
          color="text-purple-600"
        />

      </div>

    </div>
  );
}