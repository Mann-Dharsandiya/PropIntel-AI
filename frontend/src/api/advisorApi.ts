import axios from "axios";

import { AdvisorResponse } from "@/types/advisor";

const api = axios.create({

  baseURL: "http://localhost:5000/api/v1",

  withCredentials: true,

});

const SESSION_KEY = "propintel-session";

/**
 * Generates one session id per browser.
 */
function getSessionId() {

  let session = localStorage.getItem(
    SESSION_KEY,
  );

  if (!session) {

    session =
      crypto.randomUUID();

    localStorage.setItem(
      SESSION_KEY,
      session,
    );

  }

  return session;

}

/**
 * Send message to AI
 */
export async function chatWithAdvisor(
  message: string,
) {

  const response =
    await api.post<AdvisorResponse>(
      "/advisor/chat",

      {

        sessionId: getSessionId(),

        message,

      },
    );

  return response.data;

}