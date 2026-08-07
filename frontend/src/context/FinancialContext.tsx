import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface FinancialData {
  emi: number;
  loanAmount: number;
  totalInterest: number;
  totalPayment: number;

  eligibleLoan: number;
  propertyBudget: number;

  roi: number;
  futureValue: number;

  affordability: number;

  buyCost: number;
  rentCost: number;
}

interface FinancialContextType {
  data: FinancialData;

  updateData: (
    values: Partial<FinancialData>
  ) => void;
}

const FinancialContext =
  createContext<FinancialContextType | null>(
    null
  );

export function FinancialProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState<FinancialData>({
      emi: 0,
      loanAmount: 0,
      totalInterest: 0,
      totalPayment: 0,

      eligibleLoan: 0,
      propertyBudget: 0,

      roi: 0,
      futureValue: 0,

      affordability: 0,

      buyCost: 0,
      rentCost: 0,
    });

  function updateData(
    values: Partial<FinancialData>
  ) {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  return (
    <FinancialContext.Provider
      value={{
        data,
        updateData,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context =
    useContext(FinancialContext);

  if (!context) {
    throw new Error(
      "useFinancial must be used inside FinancialProvider"
    );
  }

  return context;
}