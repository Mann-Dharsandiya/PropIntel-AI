 import mongoose from "mongoose";

import { PortfolioModel } from "../models/Portfolio.model";
import { AIReportModel } from "../models/AIReport.model";

export interface PortfolioReportResult {
  report: any;
}

/**
 * Generate an AI-style investment report
 * from the user's existing portfolio.
 */
export async function generatePortfolioReport(
  userId: string
): Promise<PortfolioReportResult> {
  // =========================================================
  // Validate user ID
  // =========================================================

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID.");
  }

  const userObjectId =
    new mongoose.Types.ObjectId(userId);

  // =========================================================
  // Get user's portfolio
  // =========================================================

  const investments =
    await PortfolioModel.find({
      user: userObjectId,
    }).lean();

  if (!investments.length) {
    throw new Error(
      "No portfolio investments found. Add at least one investment before generating a report."
    );
  }

  // =========================================================
  // Calculate portfolio metrics
  // =========================================================

  const totalProperties =
    investments.length;

  const totalInvestment =
    investments.reduce(
      (total, investment) =>
        total +
        Number(
          investment.purchasePrice || 0
        ),
      0
    );

  const currentValue =
    investments.reduce(
      (total, investment) =>
        total +
        Number(
          investment.currentValue || 0
        ),
      0
    );

  const totalProfit =
    currentValue - totalInvestment;

  const roi =
    totalInvestment > 0
      ? (totalProfit / totalInvestment) *
        100
      : 0;

  const monthlyRentalIncome =
    investments.reduce(
      (total, investment) =>
        total +
        Number(
          investment.monthlyRent || 0
        ),
      0
    );

  const annualRentalIncome =
    monthlyRentalIncome * 12;

  const rentalYield =
    currentValue > 0
      ? (annualRentalIncome / currentValue) *
        100
      : 0;

  const totalLoanAmount =
    investments.reduce(
      (total, investment) =>
        total +
        Number(
          investment.loanAmount || 0
        ),
      0
    );

  const loanToValue =
    currentValue > 0
      ? (totalLoanAmount / currentValue) *
        100
      : 0;

  // =========================================================
  // Determine portfolio health
  // =========================================================

  let health:
    | "excellent"
    | "good"
    | "moderate"
    | "high-risk" = "moderate";

  if (
    roi >= 20 &&
    rentalYield >= 6 &&
    loanToValue <= 50
  ) {
    health = "excellent";
  } else if (
    roi >= 10 &&
    rentalYield >= 4 &&
    loanToValue <= 70
  ) {
    health = "good";
  } else if (
    roi >= 0 &&
    loanToValue <= 80
  ) {
    health = "moderate";
  } else {
    health = "high-risk";
  }

  // =========================================================
  // Generate insights
  // =========================================================

  const insights: {
    title: string;
    message: string;
    type:
      | "positive"
      | "neutral"
      | "warning";
  }[] = [];

  // ---------------------------------------------------------
  // ROI insight
  // ---------------------------------------------------------

  if (roi >= 15) {
    insights.push({
      title: "Strong Portfolio Growth",
      message: `Your portfolio is currently generating approximately ${roi.toFixed(
        2
      )}% ROI, indicating strong overall capital appreciation.`,
      type: "positive",
    });
  } else if (roi >= 8) {
    insights.push({
      title: "Moderate Portfolio Growth",
      message: `Your current portfolio ROI is ${roi.toFixed(
        2
      )}%. The portfolio is generating positive returns, but there may be opportunities to improve capital efficiency.`,
      type: "neutral",
    });
  } else if (roi >= 0) {
    insights.push({
      title: "Limited Portfolio Growth",
      message: `Your portfolio currently has an ROI of ${roi.toFixed(
        2
      )}%. Review properties with weaker appreciation or rental performance.`,
      type: "warning",
    });
  } else {
    insights.push({
      title: "Negative Portfolio Return",
      message: `Your current portfolio value is below the recorded purchase investment, resulting in an ROI of ${roi.toFixed(
        2
      )}%.`,
      type: "warning",
    });
  }

  // ---------------------------------------------------------
  // Rental Yield insight
  // ---------------------------------------------------------

  if (rentalYield >= 5) {
    insights.push({
      title: "Healthy Rental Yield",
      message: `Your portfolio generates approximately ${rentalYield.toFixed(
        2
      )}% annual rental yield based on current property value.`,
      type: "positive",
    });
  } else if (rentalYield > 0) {
    insights.push({
      title: "Rental Yield Could Improve",
      message: `Your current rental yield is approximately ${rentalYield.toFixed(
        2
      )}%. Consider reviewing rental rates and occupancy.`,
      type: "neutral",
    });
  } else {
    insights.push({
      title: "No Rental Income Recorded",
      message:
        "No recurring rental income is currently recorded for your portfolio.",
      type: "warning",
    });
  }

  // ---------------------------------------------------------
  // Profit insight
  // ---------------------------------------------------------

  if (totalProfit > 0) {
    insights.push({
      title: "Positive Unrealized Gain",
      message: `Your portfolio is currently approximately ₹${formatIndianCurrency(
        totalProfit
      )} above the recorded purchase investment.`,
      type: "positive",
    });
  } else if (totalProfit < 0) {
    insights.push({
      title: "Portfolio Value Below Investment",
      message: `Your current portfolio value is approximately ₹${formatIndianCurrency(
        Math.abs(totalProfit)
      )} below the recorded purchase investment.`,
      type: "warning",
    });
  } else {
    insights.push({
      title: "Portfolio at Break-Even",
      message:
        "Your current portfolio value is approximately equal to the recorded purchase investment.",
      type: "neutral",
    });
  }

  // ---------------------------------------------------------
  // Rental income insight
  // ---------------------------------------------------------

  if (monthlyRentalIncome > 0) {
    insights.push({
      title: "Recurring Rental Income",
      message: `Your portfolio currently records approximately ₹${formatIndianCurrency(
        monthlyRentalIncome
      )} in monthly rental income.`,
      type: "positive",
    });
  }

  // ---------------------------------------------------------
  // Leverage insight
  // ---------------------------------------------------------

  if (loanToValue > 70) {
    insights.push({
      title: "High Loan Exposure",
      message: `Your portfolio loan-to-value ratio is approximately ${loanToValue.toFixed(
        2
      )}%, indicating relatively high leverage.`,
      type: "warning",
    });
  } else if (loanToValue > 50) {
    insights.push({
      title: "Moderate Loan Exposure",
      message: `Your portfolio loan-to-value ratio is approximately ${loanToValue.toFixed(
        2
      )}%. Continue monitoring your debt exposure.`,
      type: "neutral",
    });
  } else {
    insights.push({
      title: "Controlled Loan Exposure",
      message: `Your portfolio loan-to-value ratio is approximately ${loanToValue.toFixed(
        2
      )}%, indicating relatively controlled leverage.`,
      type: "positive",
    });
  }

  // =========================================================
  // Generate recommendations
  // =========================================================

  const recommendations: string[] = [];

  if (roi < 10) {
    recommendations.push(
      "Review properties with weaker appreciation or rental performance."
    );
  } else {
    recommendations.push(
      "Continue monitoring property appreciation and overall portfolio growth."
    );
  }

  if (rentalYield < 4) {
    recommendations.push(
      "Review rental rates and occupancy to improve recurring rental income."
    );
  } else {
    recommendations.push(
      "Continue monitoring occupancy, rental collection and maintenance expenses."
    );
  }

  if (loanToValue > 70) {
    recommendations.push(
      "Consider reducing loan exposure or increasing equity before making additional investments."
    );
  } else {
    recommendations.push(
      "Maintain a comfortable debt level relative to the current portfolio value."
    );
  }

  if (totalProperties === 1) {
    recommendations.push(
      "Consider diversification across multiple properties or localities when financially appropriate."
    );
  } else {
    recommendations.push(
      "Continue evaluating diversification across properties and localities."
    );
  }

  // =========================================================
  // Generate summary
  // =========================================================

  const summary =
    generatePortfolioSummary({
      health,
      totalProperties,
      totalInvestment,
      currentValue,
      totalProfit,
      roi,
      monthlyRentalIncome,
      rentalYield,
      loanToValue,
    });

  // =========================================================
  // Save report
  // =========================================================

  const report =
    await AIReportModel.create({
      user: userObjectId,

      reportType: "portfolio",

      title:
        "AI Portfolio Investment Report",

      summary,

      portfolioSnapshot: {
        totalProperties,
        totalInvestment,
        currentValue,
        totalProfit,
        roi: roundNumber(roi),
        monthlyRentalIncome,
        annualRentalIncome,
        rentalYield: roundNumber(
          rentalYield
        ),
        loanToValue: roundNumber(
          loanToValue
        ),
      },

      insights,

      recommendations,
    });

  // =========================================================
  // Return report
  // =========================================================

  return {
    report,
  };
}

/**
 * Generate human-readable portfolio summary.
 */
function generatePortfolioSummary({
  health,
  totalProperties,
  totalInvestment,
  currentValue,
  totalProfit,
  roi,
  monthlyRentalIncome,
  rentalYield,
  loanToValue,
}: {
  health: string;
  totalProperties: number;
  totalInvestment: number;
  currentValue: number;
  totalProfit: number;
  roi: number;
  monthlyRentalIncome: number;
  rentalYield: number;
  loanToValue: number;
}) {
  const healthText =
    health === "excellent"
      ? "excellent"
      : health === "good"
        ? "good"
        : health === "moderate"
          ? "moderate"
          : "high-risk";

  let summary =
    `Your portfolio currently contains ${totalProperties} ${
      totalProperties === 1
        ? "property"
        : "properties"
    }. `;

  summary +=
    `The recorded investment is ₹${formatIndianCurrency(
      totalInvestment
    )}, while the current portfolio value is ₹${formatIndianCurrency(
      currentValue
    )}. `;

  if (totalProfit >= 0) {
    summary +=
      `This represents an unrealized gain of ₹${formatIndianCurrency(
        totalProfit
      )} with an overall ROI of ${roi.toFixed(
        2
      )}%. `;
  } else {
    summary +=
      `This represents an unrealized loss of ₹${formatIndianCurrency(
        Math.abs(totalProfit)
      )} with an overall ROI of ${roi.toFixed(
        2
      )}%. `;
  }

  if (monthlyRentalIncome > 0) {
    summary +=
      `The portfolio currently generates approximately ₹${formatIndianCurrency(
        monthlyRentalIncome
      )} in monthly rental income, producing a rental yield of ${rentalYield.toFixed(
        2
      )}%. `;
  }

  summary +=
    `The current loan-to-value ratio is ${loanToValue.toFixed(
      2
    )}%. Overall, the portfolio is assessed as ${healthText}.`;

  return summary;
}

/**
 * Format numbers using Indian numbering.
 */
function formatIndianCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      maximumFractionDigits: 0,
    }
  ).format(value);
}

/**
 * Round numeric values.
 */
function roundNumber(
  value: number
): number {
  return Number(value.toFixed(2));
}