 import {
  ArrowRight,
  Brain,
  Calendar,
  Download,
  FileText,
} from "lucide-react";

import type {
  ReportHistoryItem,
} from "@/types/reports";

interface ReportCardProps {
  report: ReportHistoryItem;

  onDownload: (
    reportId: string
  ) => void;

  onView: (
    reportId: string
  ) => void;

  downloading?: boolean;
}

export default function ReportCard({
  report,
  onDownload,
  onView,
  downloading = false,
}: ReportCardProps) {

  const isPortfolio =
    report.reportType === "portfolio";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-4">

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
              isPortfolio
                ? "bg-blue-50 text-blue-600"
                : "bg-purple-50 text-purple-600"
            }`}
          >

            {isPortfolio ? (
              <Brain size={23} />
            ) : (
              <FileText size={23} />
            )}

          </div>

          <div className="min-w-0">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">

              {isPortfolio
                ? "Portfolio Report"
                : "Property Report"}

            </p>

            <h3 className="mt-1 truncate font-bold text-slate-900">

              {report.title}

            </h3>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <p className="mt-5 line-clamp-4 text-sm leading-6 text-slate-600">

        {report.summary}

      </p>

      {/* ================================================= */}
      {/* DATE */}
      {/* ================================================= */}

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">

        <Calendar size={14} />

        <span>
          {new Date(
            report.createdAt
          ).toLocaleString("en-IN")}
        </span>

      </div>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">

        {/* View */}

        <button
          type="button"
          onClick={() =>
            onView(report._id)
          }
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >

          View Report

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />

        </button>

        {/* PDF */}

        <button
          type="button"
          onClick={() =>
            onDownload(report._id)
          }
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >

          <Download size={16} />

          {downloading
            ? "Downloading..."
            : "PDF"}

        </button>

      </div>

    </div>
  );
}