import { propertyTool } from "../tools/property.tool";
import { localityTool } from "../tools/locality.tool";
import { predictionTool } from "../tools/prediction.tool";
import { recommendationTool } from "../tools/recommendation.tool";
import { compareTool } from "../tools/compare.tool";
import { investmentTool } from "../tools/investment.tool";

export async function runAgent(message: string) {

  const lower = message.toLowerCase();

  const result: Record<string, unknown> = {};

  if (
    lower.includes("property") ||
    lower.includes("flat") ||
    lower.includes("house") ||
    lower.includes("villa") ||
    lower.includes("apartment") ||
    lower.includes("bhk")
  ) {
    result.properties = await propertyTool(message);
  }

  if (
    lower.includes("recommend") ||
    lower.includes("suggest")
  ) {
    result.recommendation = await recommendationTool(message);
  }

  if (
    lower.includes("locality") ||
    lower.includes("area")
  ) {
    result.locality = await localityTool(message);
  }

  if (
    lower.includes("predict") ||
    lower.includes("price")
  ) {
    result.prediction = await predictionTool(message);
  }

  if (
    lower.includes("investment") ||
    lower.includes("roi")
  ) {
    result.investment = await investmentTool(message);
  }

  if (
    lower.includes("compare")
  ) {
    result.compare = await compareTool(message);
  }

  return result;
}