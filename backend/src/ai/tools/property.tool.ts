 import { PropertyModel } from "../../models/Property.model";
import { parseQuery } from "../parser/queryParser";

export async function propertyTool(
  message: string,
) {
  const parsed = parseQuery(message);

  console.log("\n=========== PROPERTY TOOL ===========");
  console.log("Parsed Query:");
  console.log(parsed);

  const filter: any = {};

  /**
   * City
   */
  if (parsed.city) {
    filter.city = {
      $regex: parsed.city,
      $options: "i",
    };
  }

  /**
   * Locality
   */
  if (parsed.locality) {
    filter.locality = {
      $regex: parsed.locality,
      $options: "i",
    };
  }

  /**
   * BHK -> MongoDB field is bedrooms
   */
  if (parsed.bhk) {
    filter.bedrooms = parsed.bhk;
  }

  /**
   * Property Type
   */
  if (parsed.propertyType) {
    filter.propertyType = {
      $regex: parsed.propertyType,
      $options: "i",
    };
  }

  /**
   * Furnished
   */
  if (parsed.furnished !== undefined) {
    filter.furnished = parsed.furnished;
  }

  /**
   * Purpose (if stored in DB)
   */
  if (parsed.purpose) {
    filter.purpose = parsed.purpose;
  }

  /**
   * Budget
   */
  if (parsed.budget) {
    filter.price = {
      $lte: parsed.budget,
    };
  }

  console.log("\nMongo Filter:");
  console.log(JSON.stringify(filter, null, 2));

  const properties = await PropertyModel.find(filter)
    .sort({ price: 1 })
    .limit(10)
    .lean();

  console.log(
    `Found ${properties.length} matching properties`
  );

  return properties;
}