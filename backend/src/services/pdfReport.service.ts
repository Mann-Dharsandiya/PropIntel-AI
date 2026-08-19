import PDFDocument from "pdfkit";
import mongoose from "mongoose";

export interface GeneratePdfResult {
  buffer: Buffer;
  filename: string;
}

/**
 * Format Indian currency
 */
function formatCurrency(
  value: number
): string {
  return `₹${Number(value || 0).toLocaleString(
    "en-IN"
  )}`;
}

/**
 * Format number
 */
function formatNumber(
  value: number
): string {
  return Number(value || 0).toLocaleString(
    "en-IN"
  );
}

/**
 * Format percentage
 */
function formatPercentage(
  value: number
): string {
  return `${Number(value || 0).toFixed(2)}%`;
}

/**
 * Safely convert value to string
 */
function safeString(
  value: unknown,
  fallback = "N/A"
): string {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  return String(value);
}

/**
 * Generate AI Report PDF
 */
export async function generateReportPdf(
  reportId: string,
  userId: string
): Promise<GeneratePdfResult> {
  /**
   * Validate report ID
   */
  if (
    !mongoose.Types.ObjectId.isValid(
      reportId
    )
  ) {
    throw new Error(
      "Invalid report ID."
    );
  }

  /**
   * Get AI report directly from
   * MongoDB collection.
   *
   * The existing project stores
   * AI reports in `aireports`.
   */
  const reportsCollection =
    mongoose.connection.collection(
      "aireports"
    );

  const report =
    await reportsCollection.findOne({
      _id:
        new mongoose.Types.ObjectId(
          reportId
        ),

      user:
        new mongoose.Types.ObjectId(
          userId
        ),
    });

  if (!report) {
    throw new Error(
      "AI report not found."
    );
  }

  /**
   * Create PDF
   */
  const doc =
    new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: safeString(
          report.title,
          "PropIntel AI Report"
        ),
        Author:
          "PropIntel AI",
        Subject:
          "AI Real Estate Investment Report",
      },
    });

  /**
   * Store PDF chunks
   */
  const chunks: Buffer[] = [];

  doc.on(
    "data",
    (chunk: Buffer) => {
      chunks.push(chunk);
    }
  );

  /**
   * Header
   */
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text(
      "PropIntel AI",
      {
        align: "center",
      }
    );

  doc
    .moveDown(0.3)
    .fontSize(11)
    .font("Helvetica")
    .text(
      "Real Estate Intelligence Platform",
      {
        align: "center",
      }
    );

  doc.moveDown(1);

  /**
   * Report title
   */
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(
      safeString(
        report.title,
        "AI Investment Report"
      )
    );

  doc.moveDown(0.4);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(
      `Report Type: ${safeString(
        report.reportType
      )}`
    );

  doc.text(
    `Generated: ${new Date(
      report.createdAt ||
        Date.now()
    ).toLocaleString(
      "en-IN"
    )}`
  );

  doc.moveDown(1);

  /**
   * Horizontal line
   */
  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  doc.moveDown(1);

  /**
   * Executive Summary
   */
  doc
    .fontSize(16)
    .font("Helvetica-Bold")
    .text(
      "Executive Summary"
    );

  doc.moveDown(0.4);

  doc
    .fontSize(10.5)
    .font("Helvetica")
    .text(
      safeString(
        report.summary,
        "No summary available."
      ),
      {
        align: "left",
        lineGap: 4,
      }
    );

  doc.moveDown(1);

  /**
   * Portfolio Snapshot
   */
  if (
    report.portfolioSnapshot
  ) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "Portfolio Snapshot"
      );

    doc.moveDown(0.5);

    const snapshot =
      report.portfolioSnapshot;

    const snapshotRows = [
      [
        "Total Properties",
        formatNumber(
          snapshot.totalProperties
        ),
      ],

      [
        "Total Investment",
        formatCurrency(
          snapshot.totalInvestment
        ),
      ],

      [
        "Current Value",
        formatCurrency(
          snapshot.currentValue
        ),
      ],

      [
        "Total Profit",
        formatCurrency(
          snapshot.totalProfit
        ),
      ],

      [
        "ROI",
        formatPercentage(
          snapshot.roi
        ),
      ],

      [
        "Monthly Rental Income",
        formatCurrency(
          snapshot.monthlyRentalIncome
        ),
      ],

      [
        "Annual Rental Income",
        formatCurrency(
          snapshot.annualRentalIncome
        ),
      ],

      [
        "Rental Yield",
        formatPercentage(
          snapshot.rentalYield
        ),
      ],

      [
        "Loan To Value",
        formatPercentage(
          snapshot.loanToValue
        ),
      ],
    ];

    snapshotRows.forEach(
      ([label, value]) => {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .text(
            `${label}: `,
            {
              continued: true,
            }
          );

        doc
          .font("Helvetica")
          .text(value);

        doc.moveDown(0.2);
      }
    );

    doc.moveDown(0.7);
  }

  /**
   * Property information
   */
  if (report.property) {
    const property =
      report.property;

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "Property Information"
      );

    doc.moveDown(0.5);

    const propertyRows = [
      [
        "Property",
        property.title,
      ],

      [
        "Builder",
        property.builder,
      ],

      [
        "Project",
        property.projectName,
      ],

      [
        "Property Type",
        property.propertyType,
      ],

      [
        "City",
        property.city,
      ],

      [
        "Locality",
        property.locality,
      ],

      [
        "Area",
        `${formatNumber(
          property.area
        )} sq. ft.`,
      ],

      [
        "Price",
        formatCurrency(
          property.price
        ),
      ],

      [
        "AI Score",
        `${safeString(
          property.aiScore
        )}/10`,
      ],

      [
        "Investment Score",
        `${safeString(
          property.investmentScore
        )}/5`,
      ],

      [
        "Rental Yield",
        formatPercentage(
          property.rentalYield
        ),
      ],

      [
        "Appreciation",
        formatPercentage(
          property.appreciation
        ),
      ],
    ];

    propertyRows.forEach(
      ([label, value]) => {
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .text(
            `${label}: `,
            {
              continued: true,
            }
          );

        doc
          .font("Helvetica")
          .text(
            safeString(value)
          );

        doc.moveDown(0.2);
      }
    );

    doc.moveDown(0.7);
  }

  /**
   * Analysis
   */
  if (report.analysis) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "AI Analysis"
      );

    doc.moveDown(0.5);

    const analysis =
      report.analysis;

    if (
      analysis.pricePerSqFt !==
      undefined
    ) {
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(
          "Price Per Sq. Ft.: ",
          {
            continued: true,
          }
        );

      doc
        .font("Helvetica")
        .text(
          formatCurrency(
            analysis.pricePerSqFt
          )
        );

      doc.moveDown(0.2);
    }

    if (
      analysis.investmentRating
    ) {
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(
          "Investment Rating: ",
          {
            continued: true,
          }
        );

      doc
        .font("Helvetica")
        .text(
          safeString(
            analysis.investmentRating
          )
        );

      doc.moveDown(0.2);
    }

    if (
      analysis.riskLevel
    ) {
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(
          "Risk Level: ",
          {
            continued: true,
          }
        );

      doc
        .font("Helvetica")
        .text(
          safeString(
            analysis.riskLevel
          )
        );

      doc.moveDown(0.2);
    }

    doc.moveDown(0.7);
  }

  /**
   * Insights
   */
  if (
    Array.isArray(
      report.insights
    ) &&
    report.insights.length >
      0
  ) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "AI Insights"
      );

    doc.moveDown(0.5);

    report.insights.forEach(
      (
        insight: any,
        index: number
      ) => {
        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .text(
            `${index + 1}. ${safeString(
              insight.title,
              "Insight"
            )}`
          );

        doc
          .fontSize(10)
          .font("Helvetica")
          .text(
            safeString(
              insight.message,
              "No insight details available."
            ),
            {
              indent: 15,
              lineGap: 3,
            }
          );

        if (
          insight.type
        ) {
          doc
            .fontSize(9)
            .font("Helvetica-Oblique")
            .text(
              `Type: ${safeString(
                insight.type
              )}`,
              {
                indent: 15,
              }
            );
        }

        doc.moveDown(0.5);
      }
    );

    doc.moveDown(0.5);
  }

  /**
   * Recommendations
   */
  if (
    Array.isArray(
      report.recommendations
    ) &&
    report.recommendations.length >
      0
  ) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "Recommendations"
      );

    doc.moveDown(0.5);

    report.recommendations.forEach(
      (
        recommendation: string
      ) => {
        doc
          .fontSize(10)
          .font("Helvetica")
          .text(
            `• ${recommendation}`,
            {
              indent: 10,
              lineGap: 3,
            }
          );

        doc.moveDown(0.25);
      }
    );

    doc.moveDown(0.7);
  }

  /**
   * Disclaimer
   */
  doc
    .moveDown(1)
    .fontSize(9)
    .font("Helvetica-Oblique")
    .text(
      "Disclaimer: This report is generated using available property and portfolio data. It is intended for informational and analytical purposes only and should not be considered financial, legal, tax, or investment advice.",
      {
        align: "left",
        lineGap: 3,
      }
    );

  /**
   * Footer
   */
  doc
    .moveDown(1)
    .fontSize(9)
    .font("Helvetica")
    .text(
      "Generated by PropIntel AI",
      {
        align: "center",
      }
    );

  /**
   * Finish PDF
   */
  doc.end();

  /**
   * Wait for PDF completion
   */
  await new Promise<void>(
    (
      resolve,
      reject
    ) => {
      doc.on(
        "end",
        () => resolve()
      );

      doc.on(
        "error",
        reject
      );
    }
  );

  const buffer =
    Buffer.concat(chunks);

  /**
   * Safe filename
   */
  const baseTitle =
    safeString(
      report.title,
      "PropIntel-AI-Report"
    )
      .replace(
        /[^a-zA-Z0-9-_ ]/g,
        ""
      )
      .trim()
      .replace(
        /\s+/g,
        "-"
      );

  const filename =
    `${baseTitle || "PropIntel-AI-Report"}.pdf`;

  return {
    buffer,
    filename,
  };
}