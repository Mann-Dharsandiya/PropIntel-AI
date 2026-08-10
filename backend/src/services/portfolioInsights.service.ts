 import {
  PortfolioModel,
} from "../models/Portfolio.model";

import {
  PortfolioHistoryModel,
} from "../models/PortfolioHistory.model";

import type {
  PortfolioHealth,
  PortfolioInsight,
  PortfolioInsightsResult,
} from "../types/portfolioInsights";

function round(
  value: number,
  decimals = 2
): number {
  const factor =
    Math.pow(10, decimals);

  return (
    Math.round(value * factor) /
    factor
  );
}

/**
 * Calculate overall portfolio health
 */
function calculateHealth(
  roi: number,

  rentalYield: number,

  loanToValue: number,

  totalProperties: number
): {
  health: PortfolioHealth;

  score: number;
} {
  let score = 50;

  /**
   * ROI
   */
  if (roi >= 20) {
    score += 25;
  } else if (roi >= 12) {
    score += 18;
  } else if (roi >= 7) {
    score += 10;
  } else if (roi < 0) {
    score -= 20;
  }

  /**
   * Rental yield
   */
  if (rentalYield >= 6) {
    score += 15;
  } else if (rentalYield >= 4) {
    score += 10;
  } else if (rentalYield >= 2) {
    score += 5;
  }

  /**
   * Loan exposure
   */
  if (loanToValue <= 30) {
    score += 10;
  } else if (loanToValue <= 50) {
    score += 5;
  } else if (loanToValue > 70) {
    score -= 15;
  }

  /**
   * Diversification
   */
  if (totalProperties === 1) {
    score -= 5;
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  let health: PortfolioHealth;

  if (score >= 80) {
    health = "excellent";
  } else if (score >= 65) {
    health = "good";
  } else if (score >= 45) {
    health = "moderate";
  } else {
    health = "needs_attention";
  }

  return {
    health,

    score,
  };
}

/**
 * Generate portfolio insights
 */
function createInsights(
  data: {
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
): PortfolioInsight[] {
  const insights: PortfolioInsight[] =
    [];

  /**
   * ROI
   */
  if (data.roi >= 15) {
    insights.push({
      id: "strong-roi",

      type: "positive",

      title:
        "Strong Portfolio Returns",

      message:
        `Your portfolio currently shows an estimated ROI of ${data.roi.toFixed(
          2
        )}%. This indicates healthy value appreciation relative to your recorded investment.`,

      metric: `${data.roi.toFixed(
        2
      )}% ROI`,

      recommendation:
        "Continue monitoring valuation growth and compare performance with local market conditions.",
    });
  } else if (data.roi >= 5) {
    insights.push({
      id: "moderate-roi",

      type: "neutral",

      title:
        "Moderate Portfolio Growth",

      message:
        `Your current portfolio ROI is ${data.roi.toFixed(
          2
        )}%. The portfolio is generating positive returns, but there may be opportunities to improve capital efficiency.`,

      metric: `${data.roi.toFixed(
        2
      )}% ROI`,

      recommendation:
        "Review properties with weaker appreciation or rental performance.",
    });
  } else if (data.roi < 0) {
    insights.push({
      id: "negative-roi",

      type: "warning",

      title:
        "Portfolio Value Requires Attention",

      message:
        `Your current portfolio value is below your recorded purchase investment, resulting in an ROI of ${data.roi.toFixed(
          2
        )}%.`,

      metric: `${data.roi.toFixed(
        2
      )}% ROI`,

      recommendation:
        "Review properties with declining values and evaluate their rental performance.",
    });
  }

  /**
   * Rental yield
   */
  if (data.rentalYield >= 5) {
    insights.push({
      id: "strong-rental-yield",

      type: "positive",

      title:
        "Healthy Rental Yield",

      message:
        `Your portfolio generates approximately ${data.rentalYield.toFixed(
          2
        )}% annual rental yield based on current property value.`,

      metric: `${data.rentalYield.toFixed(
        2
      )}% yield`,

      recommendation:
        "Continue monitoring occupancy and rental rates.",
    });
  } else if (
    data.rentalYield > 0 &&
    data.rentalYield < 3
  ) {
    insights.push({
      id: "low-rental-yield",

      type: "opportunity",

      title:
        "Rental Yield Could Improve",

      message:
        `Your estimated rental yield is ${data.rentalYield.toFixed(
          2
        )}%, which is relatively low compared with the capital currently invested.`,

      metric: `${data.rentalYield.toFixed(
        2
      )}% yield`,

      recommendation:
        "Review rental rates, vacancy periods and operating costs.",
    });
  }

  /**
   * Debt
   */
  if (data.loanToValue > 70) {
    insights.push({
      id: "high-leverage",

      type: "warning",

      title:
        "High Portfolio Leverage",

      message:
        `Your recorded loan amount represents approximately ${data.loanToValue.toFixed(
          2
        )}% of your current portfolio value.`,

      metric: `${data.loanToValue.toFixed(
        2
      )}% LTV`,

      recommendation:
        "Prioritize debt management and maintain a cash-flow buffer.",
    });
  } else if (
    data.loanToValue <= 40
  ) {
    insights.push({
      id: "healthy-leverage",

      type: "positive",

      title:
        "Healthy Debt Position",

      message:
        `Your recorded loan exposure is approximately ${data.loanToValue.toFixed(
          2
        )}% of current portfolio value.`,

      metric: `${data.loanToValue.toFixed(
        2
      )}% LTV`,

      recommendation:
        "Continue monitoring interest costs and portfolio cash flow.",
    });
  }

  /**
   * Diversification
   */
  if (data.totalProperties === 1) {
    insights.push({
      id: "single-property",

      type: "opportunity",

      title:
        "Diversification Opportunity",

      message:
        "Your portfolio currently contains one property, so your real estate exposure is concentrated in a single asset.",

      metric: "1 property",

      recommendation:
        "Consider diversifying across locations or property types as your investment capacity grows.",
    });
  } else if (
    data.totalProperties >= 4
  ) {
    insights.push({
      id: "diversified-portfolio",

      type: "positive",

      title:
        "Broader Property Exposure",

      message:
        `Your portfolio contains ${data.totalProperties} properties, giving you broader real estate exposure.`,

      metric: `${data.totalProperties} properties`,

      recommendation:
        "Continue monitoring concentration by location and property type.",
    });
  }

  /**
   * Profit
   */
  if (data.totalProfit > 0) {
    insights.push({
      id: "positive-profit",

      type: "positive",

      title:
        "Positive Unrealized Gain",

      message:
        `Your portfolio is currently approximately ₹${Math.round(
          data.totalProfit
        ).toLocaleString(
          "en-IN"
        )} above the recorded purchase investment.`,

      metric: `₹${Math.round(
        data.totalProfit
      ).toLocaleString(
        "en-IN"
      )} gain`,

      recommendation:
        "Continue monitoring appreciation and rental income together.",
    });
  }

  /**
   * Rental income
   */
  if (
    data.monthlyRentalIncome > 0
  ) {
    insights.push({
      id: "rental-income",

      type: "positive",

      title:
        "Recurring Rental Income",

      message:
        `Your portfolio currently records approximately ₹${Math.round(
          data.monthlyRentalIncome
        ).toLocaleString(
          "en-IN"
        )} in monthly rental income.`,

      metric: `₹${Math.round(
        data.monthlyRentalIncome
      ).toLocaleString(
        "en-IN"
      )}/month`,

      recommendation:
        "Track rental collection, vacancy and maintenance expenses.",
    });
  }

  return insights.slice(0, 6);
}

/**
 * Main Portfolio Insights Service
 */
export async function getPortfolioInsights(
  userId: string
): Promise<PortfolioInsightsResult> {
  const investments =
    await PortfolioModel.find({
      user: userId,
    }).lean();

  const totalProperties =
    investments.length;

  const totalInvestment =
    investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.purchasePrice || 0
        ),
      0
    );

  const currentValue =
    investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.currentValue || 0
        ),
      0
    );

  const totalProfit =
    currentValue -
    totalInvestment;

  const roi =
    totalInvestment > 0
      ? (totalProfit /
          totalInvestment) *
        100
      : 0;

  const monthlyRentalIncome =
    investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.monthlyRent || 0
        ),
      0
    );

  const annualRentalIncome =
    monthlyRentalIncome * 12;

  const rentalYield =
    currentValue > 0
      ? (annualRentalIncome /
          currentValue) *
        100
      : 0;

  const totalLoan =
    investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.loanAmount || 0
        ),
      0
    );

  const loanToValue =
    currentValue > 0
      ? (totalLoan /
          currentValue) *
        100
      : 0;

  const {
    health,
    score,
  } = calculateHealth(
    roi,
    rentalYield,
    loanToValue,
    totalProperties
  );

  const insights =
    createInsights({
      totalProperties,

      totalInvestment,

      currentValue,

      totalProfit,

      roi,

      monthlyRentalIncome,

      annualRentalIncome,

      rentalYield,

      loanToValue,
    });

  /**
   * Performance history
   */
  const history =
    await PortfolioHistoryModel.find({
      user: userId,
    })
      .sort({
        recordedAt: -1,
      })
      .limit(30)
      .lean();

  /**
   * Historical trend
   */
  if (history.length >= 2) {
    const newest =
      Number(history[0].value || 0);

    const oldest =
      Number(
        history[
          history.length - 1
        ].value || 0
      );

    const historicalChange =
      oldest > 0
        ? ((newest - oldest) /
            oldest) *
          100
        : 0;

    if (
      Math.abs(
        historicalChange
      ) >= 3
    ) {
      insights.push({
        id: "historical-trend",

        type:
          historicalChange > 0
            ? "positive"
            : "warning",

        title:
          historicalChange > 0
            ? "Portfolio Trend Is Positive"
            : "Portfolio Trend Needs Attention",

        message:
          `Recorded valuation snapshots indicate a ${Math.abs(
            historicalChange
          ).toFixed(
            2
          )}% ${historicalChange > 0 ? "increase" : "decrease"} across the available history.`,

        metric: `${
          historicalChange > 0
            ? "+"
            : ""
        }${historicalChange.toFixed(
          2
        )}% trend`,

        recommendation:
          historicalChange > 0
            ? "Continue monitoring whether the positive trend is sustained."
            : "Review the properties contributing most to the decline.",
      });
    }
  }

  return {
    health,

    healthScore: Math.round(
      score
    ),

    totalProperties,

    totalInvestment:
      round(
        totalInvestment
      ),

    currentValue:
      round(currentValue),

    totalProfit:
      round(totalProfit),

    roi:
      round(roi),

    monthlyRentalIncome:
      round(
        monthlyRentalIncome
      ),

    annualRentalIncome:
      round(
        annualRentalIncome
      ),

    rentalYield:
      round(rentalYield),

    loanToValue:
      round(loanToValue),

    insights,

    generatedAt:
      new Date().toISOString(),
  };
}