 // =========================================================
// Market Intelligence API
// Phase 12
// =========================================================

// =========================================================
// Types
// =========================================================

export interface Locality {
  _id?: string;
  id?: string;

  city: string;
  locality: string;
}

export interface LocalityInsights {
  _id?: string;

  city: string;
  locality: string;

  averagePrice: number;
  priceGrowth: number;
  investmentScore: number;

  metroConnectivity?: number;
  schoolsNearby?: number;
  hospitalsNearby?: number;
  shoppingScore?: number;

  rentalDemand?: string;
  futureGrowth?: string;

  [key: string]: unknown;
}

export interface PriceHistory {
  _id?: string;

  city?: string;
  locality?: string;

  price?: number;
  pricePerSqFt?: number;
  averagePrice?: number;

  date?: string;
  year?: number;
  month?: number;

  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

// =========================================================
// API BASE URL
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api/v1";

// =========================================================
// Helper
// =========================================================

async function request<T>(
  endpoint: string
): Promise<T> {

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "GET",

      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  if (!response.ok) {

    let message =
      `Request failed with status ${response.status}`;

    try {
      const errorData =
        await response.json();

      if (
        errorData?.message
      ) {
        message =
          errorData.message;
      }

      if (
        errorData?.error
      ) {
        message =
          errorData.error;
      }

    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  const result =
    await response.json();

  // =====================================================
  // Handle different backend response formats
  // =====================================================

  if (
    result &&
    typeof result === "object" &&
    "data" in result
  ) {
    return result.data as T;
  }

  return result as T;
}

// =========================================================
// Get all localities
// =========================================================

export async function getMarketLocalities(): Promise<
  Locality[]
> {

  return request<Locality[]>(
    "/localities"
  );
}

// =========================================================
// Get locality intelligence
// =========================================================

export async function getMarketLocalityInsights(
  city: string,
  locality: string
): Promise<LocalityInsights> {

  const encodedCity =
    encodeURIComponent(city);

  const encodedLocality =
    encodeURIComponent(locality);

  return request<LocalityInsights>(
    `/localities/${encodedCity}/${encodedLocality}`
  );
}

// =========================================================
// Get locality price trend
// =========================================================

export async function getMarketPriceTrend(
  city: string,
  locality: string
): Promise<PriceHistory[]> {

  const encodedCity =
    encodeURIComponent(city);

  const encodedLocality =
    encodeURIComponent(locality);

  return request<PriceHistory[]>(
    `/localities/${encodedCity}/${encodedLocality}/trend`
  );
}

// =========================================================
// Get market overview
// =========================================================

export async function getMarketOverview(): Promise<
  LocalityInsights[]
> {

  const localities =
    await getMarketLocalities();

  const results =
    await Promise.all(
      localities.map(
        async (item) => {

          try {

            return await getMarketLocalityInsights(
              item.city,
              item.locality
            );

          } catch {

            return null;
          }
        }
      )
    );

  return results.filter(
    (
      item
    ): item is LocalityInsights =>
      item !== null
  );
}