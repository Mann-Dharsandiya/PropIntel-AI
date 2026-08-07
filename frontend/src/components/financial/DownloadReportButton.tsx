import { Download } from "lucide-react";

import { useFinancial } from "@/context/FinancialContext";

import { generateFinancialReport } from "@/utils/reportGenerator";

export default function DownloadReportButton() {
  const { data } = useFinancial();

  function handleDownload() {
    generateFinancialReport(data);
  }

  return (
    <div className="mb-10 flex justify-end">

      <button
        onClick={handleDownload}
        className="
          flex
          items-center
          gap-3

          rounded-2xl

          bg-gradient-to-r

          from-blue-600

          to-indigo-700

          px-6

          py-4

          font-semibold

          text-white

          shadow-lg

          transition

          hover:scale-105

          hover:shadow-xl
        "
      >
        <Download size={22} />

        Download Financial Report
      </button>

    </div>
  );
}