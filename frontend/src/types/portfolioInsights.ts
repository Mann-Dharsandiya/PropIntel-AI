export type PortfolioInsightType =
  | "positive"
  | "neutral"
  | "warning"
  | "negative";

export interface PortfolioInsight {
  id: string;
  type: PortfolioInsightType;
  title: string;
  message: string;
  metric: string;
  recommendation: string;
}

export interface PortfolioInsightsData {
  health: "excellent" | "good" | "moderate" | "poor";

  healthScore: number;

  totalProperties: number;

  totalInvestment: number;

  currentValue: number;

  totalProfit: number;

  roi: number;

  monthlyRentalIncome: number;

  annualRentalIncome: number;

  rentalYield: number;

  loanToValue: number;

  insights: PortfolioInsight[];

  generatedAt: string;
}

export interface PortfolioInsightsResponse {
  success: boolean;

  message: string;

  data: PortfolioInsightsData;
}