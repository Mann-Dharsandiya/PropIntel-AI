import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getPortfolio,
  getPortfolioSummary,
  createPortfolioInvestment,
  updatePortfolioInvestment,
  deletePortfolioInvestment,
} from "@/api/portfolioApi";

import type {
  PortfolioInvestment,
  PortfolioSummary,
  CreateInvestmentPayload,
  UpdateInvestmentPayload,
} from "@/types/portfolio";

interface PortfolioContextType {
  investments: PortfolioInvestment[];

  summary: PortfolioSummary | null;

  loading: boolean;

  error: string | null;

  refreshPortfolio: () => Promise<void>;

  addInvestment: (
    data: CreateInvestmentPayload
  ) => Promise<PortfolioInvestment>;

  updateInvestment: (
    id: string,
    data: UpdateInvestmentPayload
  ) => Promise<PortfolioInvestment>;

  removeInvestment: (
    id: string
  ) => Promise<void>;
}

const PortfolioContext =
  createContext<
    PortfolioContextType | undefined
  >(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({
  children,
}: PortfolioProviderProps) {
  const [investments, setInvestments] =
    useState<PortfolioInvestment[]>([]);

  const [summary, setSummary] =
    useState<PortfolioSummary | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /**
   * Load portfolio data
   */
  const refreshPortfolio =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          portfolioData,
          summaryData,
        ] = await Promise.all([
          getPortfolio(),
          getPortfolioSummary(),
        ]);

        setInvestments(
          portfolioData
        );

        setSummary(summaryData);
      } catch (err: any) {
        console.error(
          "Portfolio loading error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load portfolio."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /**
   * Load portfolio on mount
   */
  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  /**
   * Add investment
   */
  const addInvestment =
    async (
      data: CreateInvestmentPayload
    ) => {
      try {
        setError(null);

        const newInvestment =
          await createPortfolioInvestment(
            data
          );

        setInvestments((current) => [
          newInvestment,
          ...current,
        ]);

        await refreshPortfolio();

        return newInvestment;
      } catch (err: any) {
        console.error(
          "Add investment error:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to add investment.";

        setError(message);

        throw err;
      }
    };

  /**
   * Update investment
   */
  const updateInvestment =
    async (
      id: string,
      data: UpdateInvestmentPayload
    ) => {
      try {
        setError(null);

        const updatedInvestment =
          await updatePortfolioInvestment(
            id,
            data
          );

        setInvestments((current) =>
          current.map((investment) =>
            investment._id === id
              ? updatedInvestment
              : investment
          )
        );

        await refreshPortfolio();

        return updatedInvestment;
      } catch (err: any) {
        console.error(
          "Update investment error:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to update investment.";

        setError(message);

        throw err;
      }
    };

  /**
   * Delete investment
   */
  const removeInvestment =
    async (id: string) => {
      try {
        setError(null);

        await deletePortfolioInvestment(
          id
        );

        setInvestments((current) =>
          current.filter(
            (investment) =>
              investment._id !== id
          )
        );

        await refreshPortfolio();
      } catch (err: any) {
        console.error(
          "Delete investment error:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to delete investment.";

        setError(message);

        throw err;
      }
    };

  return (
    <PortfolioContext.Provider
      value={{
        investments,
        summary,
        loading,
        error,
        refreshPortfolio,
        addInvestment,
        updateInvestment,
        removeInvestment,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * Portfolio hook
 */
export function usePortfolio() {
  const context =
    useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolio must be used inside PortfolioProvider"
    );
  }

  return context;
}