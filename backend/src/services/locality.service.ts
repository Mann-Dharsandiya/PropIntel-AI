 import { LocalityModel } from "../models/Locality.model";
import { PropertyModel } from "../models/Property.model";
import { PriceHistoryModel } from "../models/PriceHistory.model";

/**
 * Get locality intelligence
 */
export async function getLocalityInsights(
  city: string,
  locality: string
) {
  const localityData = await LocalityModel.findOne({
    city: {
      $regex: city,
      $options: "i",
    },
    locality: {
      $regex: locality,
      $options: "i",
    },
  });

  if (!localityData) {
    return {
      city,
      locality,

      averagePrice: 0,
      priceGrowth: 0,
      investmentScore: 0,

      metroConnectivity: 0,
      schoolsNearby: 0,
      hospitalsNearby: 0,
      shoppingScore: 0,

      rentalDemand: "Unknown",
      futureGrowth: "Unknown",
    };
  }

  return localityData;
}

/**
 * Get all localities
 */
export async function getAllLocalities() {
  return await LocalityModel.find()
    .select("city locality")
    .sort({
      city: 1,
      locality: 1,
    });
}

/**
 * Properties by locality with Smart Filters
 */
export async function getPropertiesByLocality(
  city: string,
  locality: string,
  filters?: {
    propertyType?: string;
    bedrooms?: number;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
  }
) {
  const query: any = {
    city: {
      $regex: city,
      $options: "i",
    },

    locality: {
      $regex: locality,
      $options: "i",
    },

    status: "available",
  };

  if (filters?.propertyType) {
    query.propertyType = filters.propertyType;
  }

  if (filters?.bedrooms) {
    query.bedrooms = filters.bedrooms;
  }

  if (
    filters?.minPrice !== undefined ||
    filters?.maxPrice !== undefined
  ) {
    query.price = {};

    if (filters.minPrice !== undefined) {
      query.price.$gte = filters.minPrice;
    }

    if (filters.maxPrice !== undefined) {
      query.price.$lte = filters.maxPrice;
    }
  }

  if (
    filters?.minArea !== undefined ||
    filters?.maxArea !== undefined
  ) {
    query.area = {};

    if (filters.minArea !== undefined) {
      query.area.$gte = filters.minArea;
    }

    if (filters.maxArea !== undefined) {
      query.area.$lte = filters.maxArea;
    }
  }

  return await PropertyModel.find(query)
    .populate("owner", "name email phone")
    .sort({
      price: 1,
    });
}

/**
 * Price Trend
 */
export async function getPriceTrend(
  city: string,
  locality: string
) {
  const trend =
    await PriceHistoryModel.find({
      city: {
        $regex: city,
        $options: "i",
      },

      locality: {
        $regex: locality,
        $options: "i",
      },
    }).sort({
      createdAt: 1,
    });

  return trend;
}

/**
 * Compare Two Localities
 */
export async function compareLocalities(
  city1: string,
  locality1: string,
  city2: string,
  locality2: string
) {
  const first = await LocalityModel.findOne({
    city: {
      $regex: city1,
      $options: "i",
    },
    locality: {
      $regex: locality1,
      $options: "i",
    },
  });

  const second = await LocalityModel.findOne({
    city: {
      $regex: city2,
      $options: "i",
    },
    locality: {
      $regex: locality2,
      $options: "i",
    },
  });

  if (!first || !second) {
    throw new Error(
      "One or both localities not found."
    );
  }

  return {
    first,
    second,
  };
}

/**
 * AI Investment Explanation
 * (Continues in Part 2)
 */
/**
 * AI Investment Explanation
 */
export async function getRecommendationExplanation(
  city: string,
  locality: string
) {
  const data =
    await getLocalityInsights(
      city,
      locality
    );

  if (!data || data.averagePrice === 0) {
    return {
      title: "No Data Available",
      summary:
        "No investment insights are available for this locality.",
      pros: [],
      cons: [],
      recommendation:
        "Insufficient Data",
    };
  }

  const pros: string[] = [];
  const cons: string[] = [];

  // Investment Score
  if (data.investmentScore >= 8) {
    pros.push(
      "Excellent investment score."
    );
  } else if (
    data.investmentScore >= 6
  ) {
    pros.push(
      "Good long-term investment potential."
    );
  } else {
    cons.push(
      "Investment score is below average."
    );
  }

  // Price Growth
  if (
    data.priceGrowth >= 10
  ) {
    pros.push(
      `Strong annual price growth (${data.priceGrowth}%).`
    );
  } else if (
    data.priceGrowth >= 5
  ) {
    pros.push(
      `Stable annual appreciation (${data.priceGrowth}%).`
    );
  } else {
    cons.push(
      "Price appreciation is relatively low."
    );
  }

  // Metro
  if (
    data.metroConnectivity >= 8
  ) {
    pros.push(
      "Excellent metro connectivity."
    );
  } else if (
    data.metroConnectivity <= 4
  ) {
    cons.push(
      "Metro connectivity is limited."
    );
  }

  // Schools
  if (
    data.schoolsNearby >= 10
  ) {
    pros.push(
      "Good educational infrastructure."
    );
  }

  // Hospitals
  if (
    data.hospitalsNearby >= 8
  ) {
    pros.push(
      "Excellent healthcare facilities nearby."
    );
  }

  // Shopping
  if (
    data.shoppingScore >= 8
  ) {
    pros.push(
      "Excellent shopping and lifestyle amenities."
    );
  }

  // Rental Demand
  if (
    data.rentalDemand ===
    "High"
  ) {
    pros.push(
      "High rental demand provides strong rental income opportunities."
    );
  } else if (
    data.rentalDemand ===
    "Medium"
  ) {
    pros.push(
      "Moderate rental demand."
    );
  } else {
    cons.push(
      "Rental demand is currently low."
    );
  }

  // Future Growth
  if (
    data.futureGrowth ===
    "High"
  ) {
    pros.push(
      "Strong future development potential."
    );
  } else if (
    data.futureGrowth ===
    "Medium"
  ) {
    pros.push(
      "Steady future development expected."
    );
  } else {
    cons.push(
      "Future development potential appears limited."
    );
  }

  let recommendation =
    "Hold";

  if (
    data.investmentScore >= 8 &&
    data.futureGrowth ===
      "High"
  ) {
    recommendation =
      "Strong Buy";
  } else if (
    data.investmentScore >= 6
  ) {
    recommendation =
      "Buy";
  } else if (
    data.investmentScore >= 5
  ) {
    recommendation =
      "Neutral";
  } else {
    recommendation =
      "Avoid";
  }

  return {
    title: `${data.locality} Investment Analysis`,

    summary: `${data.locality}, ${data.city} has an average property price of ₹${data.averagePrice.toLocaleString()} per sq.ft with ${data.priceGrowth}% yearly appreciation. Based on infrastructure, rental demand, future growth and market conditions, our AI has generated the following investment insights.`,

    pros,

    cons,

    recommendation,
  };
}