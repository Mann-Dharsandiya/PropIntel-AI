 import { askGemini } from "./gemini.service";
import { PROPERTY_PROMPT } from "./systemPrompt";

import { parseQuery } from "./parser/queryParser";
import { runAgent } from "./orchestrator/advisor.agent";

import {
  getMemory,
  saveMemory,
} from "./memory/memory.service";

export async function advisorService(
  message: string,
  sessionId: string,
) {
  console.log("\n==================================");
  console.log("PROPINTEL AI ADVISOR");
  console.log("==================================");

  const previousMemory = getMemory(sessionId);

  const currentQuery = parseQuery(message);

  /**
   * Merge current query with previous conversation
   */
  const mergedQuery = {
    ...(previousMemory?.parsedQuery ?? {}),
    ...currentQuery,
  };

  console.log("\nMerged Query");
  console.log(mergedQuery);

  /**
   * Run Agent
   */
  const toolResults = await runAgent(
    JSON.stringify(mergedQuery),
  );

  /**
   * Build Prompt
   */
  const prompt = `
${PROPERTY_PROMPT}

==========================
Conversation Memory
==========================

${JSON.stringify(previousMemory, null, 2)}

==========================
Current User Question
==========================

${message}

==========================
Merged Query
==========================

${JSON.stringify(mergedQuery, null, 2)}

==========================
Tool Results
==========================

${JSON.stringify(toolResults, null, 2)}

Answer professionally.

Never invent property information.

Use conversation memory whenever applicable.
`;

  /**
   * AI Response
   */
  let answer = "";

  try {
    answer = await askGemini(prompt);

    console.log("\n✅ Gemini Response Generated");
  } catch (error) {
    console.error("\n❌ Gemini Failed");
    console.error(error);

    /**
     * Fix TypeScript error
     */
    const properties = Array.isArray(
      (toolResults as any)?.properties,
    )
      ? (toolResults as any).properties
      : [];

    const propertyCount = properties.length;

    answer = `
# 🤖 PropIntel AI Advisor

The AI service is currently unavailable (Gemini quota exceeded).

However, I searched the PropIntel property database and found **${propertyCount} matching properties** for your request.

You can still review the recommended properties displayed below.

Once the AI service becomes available again, I can also provide:

- 📈 Investment Analysis
- 💰 ROI Estimation
- 📍 Locality Comparison
- 🏠 Property Recommendation
- 📊 Future Price Prediction
- ⭐ Personalized Buying Advice

Please continue exploring the matching properties.
`;
  }

  /**
   * Save Conversation Memory
   */
  saveMemory(sessionId, {
    lastQuery: message,
    parsedQuery: mergedQuery,
    toolResults,
    lastAnswer: answer,
  });

  /**
   * Return Response
   */
  return {
    success: true,
    sessionId,
    memory: getMemory(sessionId),
    answer,
    toolResults,
  };
}