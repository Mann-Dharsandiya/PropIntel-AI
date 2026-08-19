// =========================================================
// AI REPORT TYPES
// =========================================================

export type ReportType =
  | "portfolio"
  | "property";

export type ReportInsightType =
  | "positive"
  | "neutral"
  | "warning";

// =========================================================
// Report Insight
// =========================================================

export interface ReportInsight {
  id?: string;

  title: string;

  message: string;

  type: ReportInsightType;

  metric?: string;

  recommendation?: string;
}

// =========================================================
// Portfolio Snapshot
// =========================================================

export interface PortfolioSnapshot {
  totalProperties: number;

  totalInvestment: number;

  currentValue: number;

  totalProfit: number;

  roi: number;

  monthlyRentalIncome: number;

  annualRentalIncome: number;

  rentalYield: number;

  loanToValue: number;
}

// =========================================================
// Property Report Property
// =========================================================

export interface ReportProperty {
  _id: string;

  title: string;

  description?: string;

  builder?: string;

  projectName?: string;

  price: number;

  propertyType: string;

  bedrooms?: number;

  bathrooms?: number;

  area: number;

  address?: string;

  city: string;

  locality: string;

  state?: string;

  country?: string;

  images?: string[];

  status?: string;

  aiScore: number;

  investmentScore: number;

  rentalYield: number;

  appreciation: number;

  amenities?: string[];

  nearby?: string[];

  featured?: boolean;

  verified?: boolean;
}

// =========================================================
// Property Analysis
// =========================================================

export interface PropertyAnalysis {
  pricePerSqFt: number;

  investmentRating:
    | "excellent"
    | "good"
    | "moderate"
    | "weak"
    | string;

  riskLevel:
    | "low"
    | "moderate"
    | "high"
    | string;
}

// =========================================================
// AI Report
// =========================================================

export interface AIReport {
  _id: string;

  user: string;

  reportType: ReportType;

  title: string;

  summary: string;

  portfolioSnapshot?: PortfolioSnapshot;

  insights: ReportInsight[];

  recommendations: string[];

  property?: ReportProperty;

  analysis?: PropertyAnalysis;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// Report History Item
// =========================================================

export interface ReportHistoryItem {
  _id: string;

  reportType: ReportType;

  title: string;

  summary: string;

  createdAt: string;

  updatedAt: string;
}

// =========================================================
// Report History Response
// =========================================================

export interface ReportHistoryResponse {
  reports: ReportHistoryItem[];

  total: number;
}

// =========================================================
// Investment Opportunity
// =========================================================

export interface InvestmentOpportunity {
  propertyId: string;

  title: string;

  propertyType: string;

  city: string;

  locality: string;

  price: number;

  area: number;

  pricePerSqFt: number;

  aiScore: number;

  investmentScore: number;

  rentalYield: number;

  appreciation: number;

  opportunityScore: number;

  rating:
    | "excellent"
    | "good"
    | "moderate";

  reasons: string[];
}

// =========================================================
// Locality Opportunity
// =========================================================

export interface LocalityOpportunity {
  city: string;

  locality: string;

  propertyCount: number;

  averagePrice: number;

  averagePricePerSqFt: number;

  averageAiScore: number;

  averageInvestmentScore: number;

  averageRentalYield: number;

  averageAppreciation: number;

  opportunityScore: number;

  rating:
    | "excellent"
    | "good"
    | "moderate";
}

// =========================================================
// Investment Opportunities Response
// =========================================================

export interface InvestmentOpportunitiesResponse {
  totalPropertiesAnalyzed: number;

  topProperties: InvestmentOpportunity[];

  topLocalities: LocalityOpportunity[];

  generatedAt: string;
}