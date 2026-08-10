 export type PortfolioHealth =
  | "excellent"
  | "good"
  | "moderate"
  | "needs_attention";

export type InsightType =
  | "positive"
  | "warning"
  | "neutral"
  | "opportunity";

export interface PortfolioInsight {
  id: string;

  type: InsightType;

  title: string;

  message: string;

  metric?: string;

  recommendation?: string;
}

export interface PortfolioInsightsResult {
  health: PortfolioHealth;

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