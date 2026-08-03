export interface ParsedQuery {
  city?: string;
  locality?: string;
  bhk?: number;
  budget?: number;
  propertyType?: string;
  furnished?: boolean;
  purpose?: "buy" | "rent";
}

const cities = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Mumbai",
  "Delhi",
  "Pune",
  "Bangalore",
];

const propertyTypes = [
  "Apartment",
  "Flat",
  "Villa",
  "House",
  "Plot",
];

const localities = [
  "SG Highway",
  "Satellite",
  "Navrangpura",
  "Bopal",
  "Gota",
];

export function parseQuery(message: string): ParsedQuery {
  const query: ParsedQuery = {};

  const text = message.toLowerCase();

  //-----------------------
  // BHK
  //-----------------------

  const bhk = text.match(/(\d+)\s*bhk/i);

  if (bhk) {
    query.bhk = Number(bhk[1]);
  }

  //-----------------------
  // Budget
  //-----------------------

  const lakh = text.match(/(\d+)\s*lakh/i);

  if (lakh) {
    query.budget = Number(lakh[1]) * 100000;
  }

  const crore = text.match(/(\d+)\s*crore/i);

  if (crore) {
    query.budget = Number(crore[1]) * 10000000;
  }

  //-----------------------
  // City
  //-----------------------

  for (const city of cities) {
    if (text.includes(city.toLowerCase())) {
      query.city = city;
      break;
    }
  }

  //-----------------------
  // Locality
  //-----------------------

  for (const locality of localities) {
    if (text.includes(locality.toLowerCase())) {
      query.locality = locality;
      break;
    }
  }

  //-----------------------
  // Property Type
  //-----------------------

  for (const type of propertyTypes) {
    if (text.includes(type.toLowerCase())) {
      query.propertyType = type;
      break;
    }
  }

  //-----------------------
  // Furnished
  //-----------------------

  if (text.includes("furnished")) {
    query.furnished = true;
  }

  if (text.includes("unfurnished")) {
    query.furnished = false;
  }

  //-----------------------
  // Purpose
  //-----------------------

  if (
    text.includes("rent") ||
    text.includes("rental")
  ) {
    query.purpose = "rent";
  } else {
    query.purpose = "buy";
  }

  return query;
}