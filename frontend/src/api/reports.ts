import { apiClient } from "@/api/axios";

import type {
  AIReport,
  ReportHistoryResponse,
  InvestmentOpportunitiesResponse,
} from "@/types/reports";

// =========================================================
// Generate Portfolio AI Report
// =========================================================

export async function generatePortfolioReport(): Promise<AIReport> {
  const response =
    await apiClient.post(
      "/reports/portfolio"
    );

  return response.data.data;
}

// =========================================================
// Generate Property AI Report
// =========================================================

export async function generatePropertyReport(
  propertyId: string
): Promise<AIReport> {
  const response =
    await apiClient.post(
      `/reports/property/${propertyId}`
    );

  return response.data.data;
}

// =========================================================
// Get Report History
// =========================================================

export async function getReportHistory(): Promise<ReportHistoryResponse> {
  const response =
    await apiClient.get(
      "/reports/history"
    );

  return response.data.data;
}

// =========================================================
// Get Investment Opportunities
// =========================================================

export async function getInvestmentOpportunities(): Promise<InvestmentOpportunitiesResponse> {
  const response =
    await apiClient.get(
      "/reports/investment-opportunities"
    );

  return response.data.data;
}

// =========================================================
// Download AI Report PDF
// =========================================================

export async function downloadReportPdf(
  reportId: string
): Promise<void> {

  const response =
    await apiClient.get(
      `/reports/${reportId}/pdf`,
      {
        responseType: "blob",
      }
    );

  const blob =
    new Blob(
      [response.data],
      {
        type: "application/pdf",
      }
    );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `propintel-ai-report-${reportId}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}