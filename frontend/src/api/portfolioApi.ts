 import { apiClient } from "@/api/axios";

import type {
  PortfolioInvestment,
  PortfolioSummary,
  CreateInvestmentPayload,
  UpdateInvestmentPayload,
} from "@/types/portfolio";

/**
 * Get all portfolio investments
 */
export const getPortfolio =
  async (): Promise<PortfolioInvestment[]> => {
    const response = await apiClient.get(
      "/portfolio"
    );

    return response.data.data;
  };

/**
 * Get portfolio summary
 */
export const getPortfolioSummary =
  async (): Promise<PortfolioSummary> => {
    const response = await apiClient.get(
      "/portfolio/summary"
    );

    return response.data.data;
  };

/**
 * Get a single portfolio investment
 */
export const getPortfolioInvestment =
  async (
    id: string
  ): Promise<PortfolioInvestment> => {
    const response = await apiClient.get(
      `/portfolio/${id}`
    );

    return response.data.data;
  };

/**
 * Create a new portfolio investment
 */
export const createPortfolioInvestment =
  async (
    data: CreateInvestmentPayload
  ): Promise<PortfolioInvestment> => {
    const response = await apiClient.post(
      "/portfolio",
      data
    );

    return response.data.data;
  };

/**
 * Update an existing portfolio investment
 */
export const updatePortfolioInvestment =
  async (
    id: string,
    data: UpdateInvestmentPayload
  ): Promise<PortfolioInvestment> => {
    const response = await apiClient.put(
      `/portfolio/${id}`,
      data
    );

    return response.data.data;
  };

/**
 * Delete a portfolio investment
 */
export const deletePortfolioInvestment =
  async (
    id: string
  ): Promise<void> => {
    await apiClient.delete(
      `/portfolio/${id}`
    );
  };