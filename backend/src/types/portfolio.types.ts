export interface CreatePortfolioInput {
  property?: string;

  propertyName: string;

  city: string;

  propertyType: string;

  purchasePrice: number;

  currentValue: number;

  purchaseDate: string;

  monthlyRent?: number;

  loanAmount?: number;

  notes?: string;
}

export interface UpdatePortfolioInput {
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