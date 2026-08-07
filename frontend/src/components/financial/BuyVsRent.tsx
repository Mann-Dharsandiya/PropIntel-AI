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

export default function BuyVsRent() {
  const { updateData } = useFinancial();

  const [propertyPrice, setPropertyPrice] =
    useState(8000000);

  const [monthlyRent, setMonthlyRent] =
    useState(30000);

  const [interestRate, setInterestRate] =
    useState(8.5);

  const [years, setYears] =
    useState(10);

  const [buyCost, setBuyCost] =
    useState(0);

  const [rentCost, setRentCost] =
    useState(0);

  const [saving, setSaving] =
    useState(0);

  const [recommendation, setRecommendation] =
    useState("");

  useEffect(() => {
    calculate();
  }, [
    propertyPrice,
    monthlyRent,
    interestRate,
    years,
  ]);

  function calculate() {
    const totalRent =
      monthlyRent *
      12 *
      years;

    const totalBuy =
      propertyPrice +
      propertyPrice *
        (interestRate / 100) *
        years;

    const difference =
      Math.abs(totalBuy - totalRent);

    setBuyCost(totalBuy);

    setRentCost(totalRent);

    setSaving(difference);

    setRecommendation(
      totalBuy < totalRent
        ? "🏠 Buying is financially better."
        : "🏡 Renting is currently more economical."
    );

    updateData({
      buyCost: totalBuy,
      rentCost: totalRent,
    });
  }

  return (
    <div className="mt-16">

      <h2 className="mb-8 text-3xl font-bold">
        🏠 Buy vs Rent Analyzer
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <FinanceInput
          icon="🏠"
          label="Property Price"
          prefix="₹"
          value={propertyPrice}
          onChange={setPropertyPrice}
        />

        <FinanceInput
          icon="🏡"
          label="Monthly Rent"
          prefix="₹"
          value={monthlyRent}
          onChange={setMonthlyRent}
        />

        <FinanceInput
          icon="📈"
          label="Interest Rate"
          suffix="%"
          value={interestRate}
          onChange={setInterestRate}
        />

        <FinanceInput
          icon="📅"
          label="Years"
          value={years}
          onChange={setYears}
        />

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <FinanceCard
          title="Buying Cost"
          value={formatCurrency(buyCost)}
          icon="🏠"
          color="text-blue-600"
        />

        <FinanceCard
          title="Rent Cost"
          value={formatCurrency(rentCost)}
          icon="🏡"
          color="text-orange-600"
        />

        <FinanceCard
          title="Difference"
          value={formatCurrency(saving)}
          icon="💰"
          color="text-green-600"
        />

      </div>

      <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-center">

        <h3 className="text-2xl font-bold text-blue-700">
          {recommendation}
        </h3>

      </div>

    </div>
  );
}