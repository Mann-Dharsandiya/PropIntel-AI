 import axios from "axios";

import { env } from "../../config/env";

export async function recommendationTool(
  message: string,
) {
  try {
    const response = await axios.post(
      `${env.mlServiceUrl}/recommend`,
      {
        query: message,
      },
    );

    return response.data;
  } catch {
    return {
      success: false,
      message: "Recommendation service unavailable.",
    };
  }
}