 import EMICalculator from "@/components/financial/EMICalculator";
import LoanEligibility from "@/components/financial/LoanEligibility";
import ROICalculator from "@/components/financial/ROICalculator";
import BuyVsRent from "@/components/financial/BuyVsRent";
import AffordabilityScore from "@/components/financial/AffordabilityScore";
import FinancialDashboard from "@/components/financial/FinancialDashboard";
import DownloadReportButton from "@/components/financial/DownloadReportButton";

import { FinancialProvider } from "@/context/FinancialContext";

export default function FinancialPage() {
  return (
    <FinancialProvider>
      <div className="min-h-screen bg-gray-50">

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-16 text-white">

          <div className="mx-auto max-w-7xl px-6">

            <h1 className="text-5xl font-bold">
              💰 Financial Intelligence Suite
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-blue-100">
              Make smarter property investment decisions with
              AI-powered financial analysis, EMI calculations,
              loan planning, affordability insights and
              investment forecasting.
            </p>

          </div>

        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">

          <FinancialDashboard />
          <DownloadReportButton />

          <EMICalculator />

          <LoanEligibility />

          <ROICalculator />

          <BuyVsRent />

          <AffordabilityScore />

          

        </div>

      </div>
    </FinancialProvider>
  );
}