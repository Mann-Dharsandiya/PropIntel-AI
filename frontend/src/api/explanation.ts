import { apiClient } from "./axios";

export interface InvestmentExplanation {
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export async function getInvestmentExplanation(
  city: string,
  locality: string
): Promise<InvestmentExplanation> {
  const response = await apiClient.get(
    `/localities/${encodeURIComponent(
      city
    )}/${encodeURIComponent(
      locality
    )}/explanation`
  );

  return response.data.data;
}