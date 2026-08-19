import mongoose from "mongoose";

import {
  PropertyModel,
} from "../models/Property.model";

import {
  AIReportModel,
} from "../models/AIReport.model";

/**
 * Property AI Report Result
 */
export interface PropertyReportResult {
  report: any;
}

/**
 * Generate AI report for one property.
 */
export async function generatePropertyReport(
  userId: string,
  propertyId: string
): Promise<PropertyReportResult> {
  // =========================================================
  // Validate IDs
  // =========================================================

  if (
    !mongoose.Types.ObjectId.isValid(
      userId
    )
  ) {
    throw new Error(
      "Invalid user ID."
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(
      propertyId
    )
  ) {
    throw new Error(
      "Invalid property ID."
    );
  }

  // =========================================================
  // Find property
  // =========================================================

  const property =
    await PropertyModel.findById(
      propertyId
    ).lean();

  if (!property) {
    throw new Error(
      "Property not found."
    );
  }

  // =========================================================
  // Basic calculations
  // =========================================================

  const price = Number(
    property.price || 0
  );

  const area = Number(
    property.area || 0
  );

  const pricePerSqFt =
    area > 0
      ? price / area
      : 0;

  const rentalYield = Number(
    property.rentalYield || 0
  );

  const appreciation = Number(
    property.appreciation || 0
  );

  const aiScore = Number(
    property.aiScore || 0
  );

  const investmentScore =
    Number(
      property.investmentScore || 0
    );

  // =========================================================
  // Investment classification
  // =========================================================

  let investmentRating:
    | "excellent"
    | "good"
    | "moderate"
    | "weak";

  if (
    investmentScore >= 4.5 &&
    aiScore >= 8.5 &&
    rentalYield >= 5 &&
    appreciation >= 12
  ) {
    investmentRating =
      "excellent";
  } else if (
    investmentScore >= 4 &&
    aiScore >= 7 &&
    rentalYield >= 4 &&
    appreciation >= 8
  ) {
    investmentRating =
      "good";
  } else if (
    investmentScore >= 3 &&
    aiScore >= 5
  ) {
    investmentRating =
      "moderate";
  } else {
    investmentRating =
      "weak";
  }

  // =========================================================
  // Risk assessment
  // =========================================================

  let riskLevel:
    | "low"
    | "moderate"
    | "high";

  if (
    investmentRating ===
    "excellent"
  ) {
    riskLevel = "low";
  } else if (
    investmentRating ===
    "good"
  ) {
    riskLevel = "moderate";
  } else {
    riskLevel = "high";
  }

  // =========================================================
  // Generate insights
  // =========================================================

  const insights: {
    id: string;
    type:
      | "positive"
      | "neutral"
      | "warning";
    title: string;
    message: string;
    metric?: string;
    recommendation?: string;
  }[] = [];

  // ---------------------------------------------------------
  // AI Score
  // ---------------------------------------------------------

  if (aiScore >= 8.5) {
    insights.push({
      id: "strong-ai-score",
      type: "positive",
      title: "Strong AI Property Score",
      message:
        `This property has an AI score of ${aiScore.toFixed(
          1
        )}/10, indicating strong overall property fundamentals.`,
      metric: `${aiScore.toFixed(
        1
      )}/10 AI score`,
      recommendation:
        "Continue comparing the property with similar listings before making a final decision.",
    });
  } else if (aiScore >= 6) {
    insights.push({
      id: "moderate-ai-score",
      type: "neutral",
      title: "Moderate AI Property Score",
      message:
        `This property has an AI score of ${aiScore.toFixed(
          1
        )}/10, indicating reasonable but not exceptional fundamentals.`,
      metric: `${aiScore.toFixed(
        1
      )}/10 AI score`,
      recommendation:
        "Compare pricing, locality quality and rental potential with nearby properties.",
    });
  } else {
    insights.push({
      id: "low-ai-score",
      type: "warning",
      title: "Lower AI Property Score",
      message:
        `The property's AI score is ${aiScore.toFixed(
          1
        )}/10, suggesting that additional evaluation may be required.`,
      metric: `${aiScore.toFixed(
        1
      )}/10 AI score`,
      recommendation:
        "Perform additional due diligence before considering the property.",
    });
  }

  // ---------------------------------------------------------
  // Rental Yield
  // ---------------------------------------------------------

  if (rentalYield >= 5) {
    insights.push({
      id: "strong-rental-yield",
      type: "positive",
      title: "Strong Rental Potential",
      message:
        `The property has a recorded rental yield of ${rentalYield.toFixed(
          2
        )}%, which indicates attractive rental-income potential.`,
      metric: `${rentalYield.toFixed(
        2
      )}% rental yield`,
      recommendation:
        "Verify actual rental demand and occupancy levels in the locality.",
    });
  } else if (rentalYield >= 3) {
    insights.push({
      id: "moderate-rental-yield",
      type: "neutral",
      title: "Moderate Rental Potential",
      message:
        `The property has a rental yield of ${rentalYield.toFixed(
          2
        )}%, indicating moderate recurring-income potential.`,
      metric: `${rentalYield.toFixed(
        2
      )}% rental yield`,
      recommendation:
        "Compare expected rent with similar properties in the locality.",
    });
  } else {
    insights.push({
      id: "low-rental-yield",
      type: "warning",
      title: "Lower Rental Yield",
      message:
        `The property's recorded rental yield is ${rentalYield.toFixed(
          2
        )}%, which may provide limited recurring rental income.`,
      metric: `${rentalYield.toFixed(
        2
      )}% rental yield`,
      recommendation:
        "Focus more heavily on appreciation potential and purchase pricing.",
    });
  }

  // ---------------------------------------------------------
  // Appreciation
  // ---------------------------------------------------------

  if (appreciation >= 12) {
    insights.push({
      id: "strong-appreciation",
      type: "positive",
      title: "Strong Appreciation Potential",
      message:
        `The property has a recorded appreciation rate of ${appreciation.toFixed(
          2
        )}%, suggesting attractive capital-growth potential.`,
      metric: `${appreciation.toFixed(
        2
      )}% appreciation`,
      recommendation:
        "Continue monitoring locality development and comparable property prices.",
    });
  } else if (appreciation >= 7) {
    insights.push({
      id: "moderate-appreciation",
      type: "neutral",
      title: "Moderate Appreciation",
      message:
        `The property has a recorded appreciation rate of ${appreciation.toFixed(
          2
        )}%, indicating reasonable capital-growth potential.`,
      metric: `${appreciation.toFixed(
        2
      )}% appreciation`,
      recommendation:
        "Compare historical locality trends before investing.",
    });
  } else {
    insights.push({
      id: "low-appreciation",
      type: "warning",
      title: "Limited Appreciation",
      message:
        `The property's recorded appreciation rate is ${appreciation.toFixed(
          2
        )}%.`,
      metric: `${appreciation.toFixed(
        2
      )}% appreciation`,
      recommendation:
        "Evaluate whether rental income adequately compensates for lower expected appreciation.",
    });
  }

  // ---------------------------------------------------------
  // Price per sq.ft.
  // ---------------------------------------------------------

  insights.push({
    id: "price-per-square-foot",
    type: "neutral",
    title: "Price Per Square Foot",
    message:
      `The property's current asking price translates to approximately ₹${formatIndianCurrency(
        pricePerSqFt
      )} per sq. ft.`,
    metric:
      `₹${formatIndianCurrency(
        pricePerSqFt
      )}/sq.ft.`,
    recommendation:
      "Compare this figure with similar properties in the same locality.",
  });

  // ---------------------------------------------------------
  // Investment score
  // ---------------------------------------------------------

  if (investmentScore >= 4) {
    insights.push({
      id: "strong-investment-score",
      type: "positive",
      title: "Attractive Investment Score",
      message:
        `The property has an investment score of ${investmentScore.toFixed(
          1
        )}/5.`,
      metric: `${investmentScore.toFixed(
        1
      )}/5 investment score`,
      recommendation:
        "Continue with financial and legal due diligence before purchase.",
    });
  } else if (
    investmentScore >= 3
  ) {
    insights.push({
      id: "moderate-investment-score",
      type: "neutral",
      title: "Moderate Investment Score",
      message:
        `The property has an investment score of ${investmentScore.toFixed(
          1
        )}/5.`,
      metric: `${investmentScore.toFixed(
        1
      )}/5 investment score`,
      recommendation:
        "Compare alternative properties before making a final investment decision.",
    });
  } else {
    insights.push({
      id: "weak-investment-score",
      type: "warning",
      title: "Lower Investment Score",
      message:
        `The property has an investment score of ${investmentScore.toFixed(
          1
        )}/5.`,
      metric: `${investmentScore.toFixed(
        1
      )}/5 investment score`,
      recommendation:
        "Perform detailed due diligence and compare alternative investments.",
    });
  }

  // =========================================================
  // Recommendations
  // =========================================================

  const recommendations: string[] = [];

  recommendations.push(
    "Compare this property with similar properties in the same locality."
  );

  recommendations.push(
    "Verify the property's current market price and price per square foot."
  );

  recommendations.push(
    "Check actual rental demand, occupancy and achievable rental rates."
  );

  recommendations.push(
    "Review locality development, infrastructure and future growth prospects."
  );

  recommendations.push(
    "Complete legal, ownership and property-document verification before purchase."
  );

  if (riskLevel === "high") {
    recommendations.push(
      "Consider additional financial analysis before making an investment decision."
    );
  }

  // =========================================================
  // Summary
  // =========================================================

  const summary =
    generatePropertySummary({
      propertyTitle:
        property.title,
      propertyType:
        property.propertyType,
      city:
        property.city,
      locality:
        property.locality,
      price,
      area,
      pricePerSqFt,
      rentalYield,
      appreciation,
      aiScore,
      investmentScore,
      investmentRating,
      riskLevel,
    });

  // =========================================================
  // Save report
  // =========================================================

  const report =
    await AIReportModel.create({
      user:
        new mongoose.Types.ObjectId(
          userId
        ),

      reportType:
        "property",

      title:
        `AI Property Report - ${property.title}`,

      summary,

      insights,

      recommendations,
    });

  // =========================================================
  // Return complete report
  // =========================================================

  return {
    report: {
      ...report.toObject(),

      property: {
        _id: property._id,
        title: property.title,
        description:
          property.description,
        builder:
          property.builder,
        projectName:
          property.projectName,
        price: property.price,
        propertyType:
          property.propertyType,
        bedrooms:
          property.bedrooms,
        bathrooms:
          property.bathrooms,
        area:
          property.area,
        address:
          property.address,
        city:
          property.city,
        locality:
          property.locality,
        state:
          property.state,
        country:
          property.country,
        images:
          property.images,
        status:
          property.status,
        aiScore:
          property.aiScore,
        investmentScore:
          property.investmentScore,
        rentalYield:
          property.rentalYield,
        appreciation:
          property.appreciation,
        amenities:
          property.amenities,
        nearby:
          property.nearby,
        featured:
          property.featured,
        verified:
          property.verified,
      },

      analysis: {
        pricePerSqFt:
          roundNumber(
            pricePerSqFt
          ),
        investmentRating,
        riskLevel,
      },
    },
  };
}

/**
 * Generate property summary.
 */
function generatePropertySummary({
  propertyTitle,
  propertyType,
  city,
  locality,
  price,
  area,
  pricePerSqFt,
  rentalYield,
  appreciation,
  aiScore,
  investmentScore,
  investmentRating,
  riskLevel,
}: {
  propertyTitle: string;
  propertyType: string;
  city: string;
  locality: string;
  price: number;
  area: number;
  pricePerSqFt: number;
  rentalYield: number;
  appreciation: number;
  aiScore: number;
  investmentScore: number;
  investmentRating: string;
  riskLevel: string;
}) {
  return (
    `The ${propertyType.toLowerCase()} "${propertyTitle}" in ${locality}, ${city} ` +
    `is listed at approximately ₹${formatIndianCurrency(
      price
    )} for ${formatIndianNumber(
      area
    )} sq. ft. ` +
    `This represents approximately ₹${formatIndianCurrency(
      pricePerSqFt
    )} per sq. ft. ` +
    `The property has a recorded rental yield of ${rentalYield.toFixed(
      2
    )}% and appreciation of ${appreciation.toFixed(
      2
    )}%. ` +
    `Its AI score is ${aiScore.toFixed(
      1
    )}/10 and investment score is ${investmentScore.toFixed(
      1
    )}/5. ` +
    `Overall, the property is assessed as a ${investmentRating} investment opportunity ` +
    `with ${riskLevel} risk based on the available property data.`
  );
}

/**
 * Indian currency formatting.
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
 * Indian number formatting.
 */
function formatIndianNumber(
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
 * Round number to two decimals.
 */
function roundNumber(
  value: number
): number {
  return Number(
    value.toFixed(2)
  );
}