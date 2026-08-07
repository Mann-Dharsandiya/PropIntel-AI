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

export default function LoanEligibility() {
  const { updateData } = useFinancial();

  const [salary, setSalary] = useState(120000);

  const [existingEMI, setExistingEMI] =
    useState(15000);

  const [age, setAge] =
    useState(30);

  const [eligibleLoan, setEligibleLoan] =
    useState(0);

  const [recommendedBudget, setRecommendedBudget] =
    useState(0);

  const [safeEMI, setSafeEMI] =
    useState(0);

  useEffect(() => {
    calculateEligibility();
  }, [
    salary,
    existingEMI,
    age,
  ]);

  function calculateEligibility() {
    const maxEMI = salary * 0.4;

    const availableEMI =
      Math.max(maxEMI - existingEMI, 0);

    const estimatedLoan =
      availableEMI * 180;

    const budget =
      estimatedLoan / 0.8;

    setSafeEMI(availableEMI);

    setEligibleLoan(estimatedLoan);

    setRecommendedBudget(budget);

    updateData({
      eligibleLoan: estimatedLoan,
      propertyBudget: budget,
    });
  }

  return (
    <div className="mt-16">

      <h2 className="mb-8 text-3xl font-bold">
        🏦 Loan Eligibility Calculator
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <FinanceInput
          icon="💼"
          label="Monthly Income"
          prefix="₹"
          value={salary}
          onChange={setSalary}
        />

        <FinanceInput
          icon="💳"
          label="Existing EMI"
          prefix="₹"
          value={existingEMI}
          onChange={setExistingEMI}
        />

        <FinanceInput
          icon="🎂"
          label="Age"
          value={age}
          onChange={setAge}
        />

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <FinanceCard
          title="Eligible Loan"
          value={formatCurrency(
            eligibleLoan
          )}
          icon="🏦"
          color="text-blue-600"
        />

        <FinanceCard
          title="Property Budget"
          value={formatCurrency(
            recommendedBudget
          )}
          icon="🏠"
          color="text-green-600"
        />

        <FinanceCard
          title="Safe EMI"
          value={formatCurrency(
            safeEMI
          )}
          icon="💰"
          color="text-orange-600"
        />

      </div>

    </div>
  );
}