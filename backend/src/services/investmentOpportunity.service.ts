import {
  PropertyModel,
} from "../models/Property.model";

/**
 * Investment Opportunity
 */
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

/**
 * Locality Opportunity
 */
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

/**
 * Complete Investment Opportunities Result
 */
export interface InvestmentOpportunitiesResult {
  totalPropertiesAnalyzed: number;

  topProperties: InvestmentOpportunity[];

  topLocalities: LocalityOpportunity[];

  generatedAt: Date;
}

/**
 * Round number
 */
function round(
  value: number,
  decimals = 2
): number {
  const factor =
    Math.pow(10, decimals);

  return (
    Math.round(
      value * factor
    ) / factor
  );
}

/**
 * Calculate property opportunity score.
 *
 * Maximum = 100
 */
function calculateOpportunityScore(
  aiScore: number,
  investmentScore: number,
  rentalYield: number,
  appreciation: number
): number {
  /*
   * AI score:
   * 25%
   */
  const aiComponent =
    (aiScore / 10) * 25;

  /*
   * Investment score:
   * 25%
   */
  const investmentComponent =
    (investmentScore / 5) * 25;

  /*
   * Rental yield:
   * 25%
   *
   * 8% yield is considered
   * an excellent benchmark.
   */
  const rentalComponent =
    Math.min(
      rentalYield / 8,
      1
    ) * 25;

  /*
   * Appreciation:
   * 25%
   *
   * 20% is considered
   * an excellent benchmark.
   */
  const appreciationComponent =
    Math.min(
      appreciation / 20,
      1
    ) * 25;

  return round(
    aiComponent +
      investmentComponent +
      rentalComponent +
      appreciationComponent
  );
}

/**
 * Rating from opportunity score
 */
function getRating(
  score: number
):
  | "excellent"
  | "good"
  | "moderate" {
  if (score >= 80) {
    return "excellent";
  }

  if (score >= 65) {
    return "good";
  }

  return "moderate";
}

/**
 * Generate reasons
 */
function generateReasons(
  aiScore: number,
  investmentScore: number,
  rentalYield: number,
  appreciation: number
): string[] {
  const reasons: string[] = [];

  if (aiScore >= 8.5) {
    reasons.push(
      "Strong AI property score."
    );
  }

  if (investmentScore >= 4) {
    reasons.push(
      "Attractive investment score."
    );
  }

  if (rentalYield >= 5) {
    reasons.push(
      "Healthy rental yield."
    );
  }

  if (appreciation >= 12) {
    reasons.push(
      "Strong appreciation potential."
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      "Potential opportunity based on available property data."
    );
  }

  return reasons;
}

/**
 * Get investment opportunities
 */
export async function getInvestmentOpportunities(): Promise<InvestmentOpportunitiesResult> {
  // =========================================================
  // Get available properties
  // =========================================================

  const properties =
    await PropertyModel.find({
      status: "available",
    })
      .select(
        [
          "title",
          "propertyType",
          "price",
          "area",
          "city",
          "locality",
          "aiScore",
          "investmentScore",
          "rentalYield",
          "appreciation",
          "verified",
        ].join(" ")
      )
      .lean();

  // =========================================================
  // Analyze properties
  // =========================================================

  const analyzedProperties: InvestmentOpportunity[] =
    properties.map(
      (property) => {
        const price =
          Number(
            property.price || 0
          );

        const area =
          Number(
            property.area || 0
          );

        const aiScore =
          Number(
            property.aiScore || 0
          );

        const investmentScore =
          Number(
            property.investmentScore ||
              0
          );

        const rentalYield =
          Number(
            property.rentalYield || 0
          );

        const appreciation =
          Number(
            property.appreciation || 0
          );

        const pricePerSqFt =
          area > 0
            ? price / area
            : 0;

        const opportunityScore =
          calculateOpportunityScore(
            aiScore,
            investmentScore,
            rentalYield,
            appreciation
          );

        return {
          propertyId:
            String(property._id),

          title:
            property.title,

          propertyType:
            property.propertyType,

          city:
            property.city,

          locality:
            property.locality,

          price,

          area,

          pricePerSqFt:
            round(
              pricePerSqFt
            ),

          aiScore:
            round(aiScore),

          investmentScore:
            round(
              investmentScore
            ),

          rentalYield:
            round(
              rentalYield
            ),

          appreciation:
            round(
              appreciation
            ),

          opportunityScore,

          rating:
            getRating(
              opportunityScore
            ),

          reasons:
            generateReasons(
              aiScore,
              investmentScore,
              rentalYield,
              appreciation
            ),
        };
      }
    );

  // =========================================================
  // Sort properties
  // =========================================================

  analyzedProperties.sort(
    (a, b) =>
      b.opportunityScore -
      a.opportunityScore
  );

  // =========================================================
  // Locality analysis
  // =========================================================

  const localityMap =
    new Map<
      string,
      {
        city: string;
        locality: string;
        properties: InvestmentOpportunity[];
      }
    >();

  for (
    const property of analyzedProperties
  ) {
    const key =
      `${property.city}::${property.locality}`;

    if (
      !localityMap.has(key)
    ) {
      localityMap.set(key, {
        city:
          property.city,

        locality:
          property.locality,

        properties: [],
      });
    }

    localityMap
      .get(key)!
      .properties.push(
        property
      );
  }

  // =========================================================
  // Calculate locality scores
  // =========================================================

  const localityOpportunities: LocalityOpportunity[] =
    Array.from(
      localityMap.values()
    ).map(
      (group) => {
        const list =
          group.properties;

        const propertyCount =
          list.length;

        const averagePrice =
          list.reduce(
            (sum, item) =>
              sum + item.price,
            0
          ) / propertyCount;

        const averagePricePerSqFt =
          list.reduce(
            (sum, item) =>
              sum +
              item.pricePerSqFt,
            0
          ) / propertyCount;

        const averageAiScore =
          list.reduce(
            (sum, item) =>
              sum + item.aiScore,
            0
          ) / propertyCount;

        const averageInvestmentScore =
          list.reduce(
            (sum, item) =>
              sum +
              item.investmentScore,
            0
          ) / propertyCount;

        const averageRentalYield =
          list.reduce(
            (sum, item) =>
              sum +
              item.rentalYield,
            0
          ) / propertyCount;

        const averageAppreciation =
          list.reduce(
            (sum, item) =>
              sum +
              item.appreciation,
            0
          ) / propertyCount;

        const opportunityScore =
          calculateOpportunityScore(
            averageAiScore,
            averageInvestmentScore,
            averageRentalYield,
            averageAppreciation
          );

        return {
          city:
            group.city,

          locality:
            group.locality,

          propertyCount,

          averagePrice:
            round(
              averagePrice
            ),

          averagePricePerSqFt:
            round(
              averagePricePerSqFt
            ),

          averageAiScore:
            round(
              averageAiScore
            ),

          averageInvestmentScore:
            round(
              averageInvestmentScore
            ),

          averageRentalYield:
            round(
              averageRentalYield
            ),

          averageAppreciation:
            round(
              averageAppreciation
            ),

          opportunityScore,

          rating:
            getRating(
              opportunityScore
            ),
        };
      }
    );

  // =========================================================
  // Sort localities
  // =========================================================

  localityOpportunities.sort(
    (a, b) =>
      b.opportunityScore -
      a.opportunityScore
  );

  // =========================================================
  // Return result
  // =========================================================

  return {
    totalPropertiesAnalyzed:
      analyzedProperties.length,

    /*
     * Return top 10 properties.
     */
    topProperties:
      analyzedProperties.slice(
        0,
        10
      ),

    /*
     * Return top 10 localities.
     */
    topLocalities:
      localityOpportunities.slice(
        0,
        10
      ),

    generatedAt:
      new Date(),
  };
}