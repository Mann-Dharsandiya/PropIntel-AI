 import { useEffect, useState } from "react";

import FinanceInput from "./FinanceInput";

import { useFinancial } from "@/context/FinancialContext";

export default function AffordabilityScore() {
  const { updateData } = useFinancial();

  const [income, setIncome] =
    useState(120000);

  const [expenses, setExpenses] =
    useState(25000);

  const [emi, setEmi] =
    useState(30000);

  const [score, setScore] =
    useState(0);

  const [risk, setRisk] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    calculateScore();
  }, [
    income,
    expenses,
    emi,
  ]);

  function calculateScore() {
    const disposable =
      income - expenses;

    const ratio =
      emi / disposable;

    let finalScore = 0;

    if (ratio <= 0.30)
      finalScore = 95;
    else if (ratio <= 0.40)
      finalScore = 80;
    else if (ratio <= 0.50)
      finalScore = 65;
    else
      finalScore = 40;

    setScore(finalScore);

    updateData({
      affordability: finalScore,
    });

    if (finalScore >= 90) {
      setRisk("🟢 LOW");
      setMessage(
        "Excellent affordability. This property comfortably fits your financial profile."
      );
    } else if (finalScore >= 70) {
      setRisk("🟡 MODERATE");
      setMessage(
        "Affordable, but ensure you maintain an emergency fund."
      );
    } else {
      setRisk("🔴 HIGH");
      setMessage(
        "High financial risk. Consider reducing your loan amount or increasing the down payment."
      );
    }
  }

  return (
    <div className="mt-16">

      <h2 className="mb-8 text-3xl font-bold">
        🧠 AI Affordability Score
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <FinanceInput
          icon="💼"
          label="Monthly Income"
          prefix="₹"
          value={income}
          onChange={setIncome}
        />

        <FinanceInput
          icon="💳"
          label="Monthly Expenses"
          prefix="₹"
          value={expenses}
          onChange={setExpenses}
        />

        <FinanceInput
          icon="🏦"
          label="Expected EMI"
          prefix="₹"
          value={emi}
          onChange={setEmi}
        />

      </div>

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-center text-white">

        <div className="text-6xl font-bold">
          {score}/100
        </div>

        <div className="mt-2 text-xl">
          {risk}
        </div>

      </div>

      <div className="mt-8 rounded-2xl bg-blue-50 p-6">

        <h3 className="text-xl font-bold text-blue-700">
          AI Recommendation
        </h3>

        <p className="mt-3 text-gray-700">
          {message}
        </p>

      </div>

    </div>
  );
}