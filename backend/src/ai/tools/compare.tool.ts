 import axios from "axios";

import { env } from "../../config/env";

export async function compareTool(
  message: string,
) {
  try {
    const response = await axios.post(
      `${env.mlServiceUrl}/compare`,
      {
        query: message,
      },
    );

    return response.data;
  } catch {
    return {
      success: false,
      message: "Comparison service unavailable.",
    };
  }
}