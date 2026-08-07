import FinanceCard from "./FinanceCard";

interface LoanSummaryProps {
  loanAmount: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function LoanSummary({
  loanAmount,
  emi,
  totalInterest,
  totalPayment,
}: LoanSummaryProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <FinanceCard
        title="Loan Amount"
        value={formatCurrency(loanAmount)}
        icon="🏦"
        color="text-blue-600"
      />

      <FinanceCard
        title="Monthly EMI"
        value={formatCurrency(emi)}
        icon="💰"
        color="text-green-600"
      />

      <FinanceCard
        title="Total Interest"
        value={formatCurrency(totalInterest)}
        icon="📈"
        color="text-orange-600"
      />

      <FinanceCard
        title="Total Payment"
        value={formatCurrency(totalPayment)}
        icon="💳"
        color="text-purple-600"
      />

    </div>
  );
}