export interface PortfolioInvestment {
  _id: string;
  user: string;

  propertyName: string;
  city: string;
  propertyType: string;

  purchasePrice: number;
  currentValue: number;

  purchaseDate: string;

  monthlyRent: number;
  loanAmount: number;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSummary {
  totalProperties: number;
  totalInvestment: number;
  currentValue: number;
  totalProfit: number;
  roi: number;
  monthlyRentalIncome: number;
  annualRentalIncome: number;
}

export interface CreateInvestmentPayload {
  propertyName: string;
  city: string;
  propertyType: string;

  purchasePrice: number;
  currentValue: number;

  purchaseDate: string;

  monthlyRent: number;
  loanAmount: number;

  notes?: string;
}

export interface UpdateInvestmentPayload {
  propertyName?: string;
  city?: string;
  propertyType?: string;

  purchasePrice?: number;
  currentValue?: number;

  purchaseDate?: string;

  monthlyRent?: number;
  loanAmount?: number;

  notes?: string;
}