 import axios from "axios";

import { env } from "../../config/env";

export async function predictionTool(
  message: string,
) {
  try {
    const response = await axios.post(
      `${env.mlServiceUrl}/predict`,
      {
        query: message,
      },
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Prediction service unavailable.",
    };
  }
}