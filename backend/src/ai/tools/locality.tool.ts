 import axios from "axios";

import { env } from "../../config/env";

export async function localityTool(
  message: string,
) {
  try {
    const response = await axios.post(
      `${env.mlServiceUrl}/locality`,
      {
        query: message,
      },
    );

    return response.data;
  } catch {
    return {
      success: false,
      message: "Locality service unavailable.",
    };
  }
}