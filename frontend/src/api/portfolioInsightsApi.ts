 import { apiClient } from "@/api/axios";

import type {
  PortfolioInsightsResponse,
} from "@/types/portfolioInsights";

/**
 * Get AI-powered portfolio insights
 */
export async function getPortfolioInsights() {
  const response =
    await apiClient.get<PortfolioInsightsResponse>(
      "/portfolio-insights"
    );

  return response.data.data;
}