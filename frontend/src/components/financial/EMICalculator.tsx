 import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

import FinanceInput from "./FinanceInput";
import LoanSummary from "./LoanSummary";
import LoanPieChart from "./LoanPieChart";
import { useFinancial } from "@/context/FinancialContext";

export default function EMICalculator() {
  const { updateData } = useFinancial();

  const [propertyPrice, setPropertyPrice] = useState(8000000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(20);

  const [loanAmount, setLoanAmount] = useState(0);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [
    propertyPrice,
    downPayment,
    interestRate,
    loanYears,
  ]);

  function calculateEMI() {
    const principal = propertyPrice - downPayment;

    setLoanAmount(principal);

    const monthlyRate = interestRate / 12 / 100;
    const months = loanYears * 12;

    const monthlyEMI =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const payment = monthlyEMI * months;
    const interest = payment - principal;

    setEmi(monthlyEMI);
    setTotalInterest(interest);
    setTotalPayment(payment);

    // Update Financial Context
    updateData({
      emi: monthlyEMI,
      loanAmount: principal,
      totalInterest: interest,
      totalPayment: payment,
    });
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-10 flex items-center gap-4">

        <div className="rounded-2xl bg-blue-100 p-4">
          <Calculator
            size={34}
            className="text-blue-700"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            EMI Calculator
          </h2>

          <p className="text-gray-500">
            Calculate your monthly home loan instantly.
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <FinanceInput
          icon="🏠"
          label="Property Price"
          prefix="₹"
          value={propertyPrice}
          onChange={setPropertyPrice}
        />

        <FinanceInput
          icon="💵"
          label="Down Payment"
          prefix="₹"
          value={downPayment}
          onChange={setDownPayment}
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
          label="Loan Tenure"
          suffix="Years"
          value={loanYears}
          onChange={setLoanYears}
        />

      </div>

      <LoanSummary
        loanAmount={loanAmount}
        emi={emi}
        totalInterest={totalInterest}
        totalPayment={totalPayment}
      />

      <LoanPieChart
        principal={loanAmount}
        interest={totalInterest}
      />

    </div>
  );
}