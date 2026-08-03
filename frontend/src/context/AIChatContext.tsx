 import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { ChatMessage } from "@/types/advisor";
import { chatWithAdvisor } from "@/api/advisorApi";

interface AIChatContextType {
  messages: ChatMessage[];

  loading: boolean;

  sessionId: string;

  sendMessage: (
    message: string
  ) => Promise<void>;

  clearChat: () => void;

  retryLastMessage: () => Promise<void>;
}

const AIChatContext =
  createContext<AIChatContextType | null>(
    null
  );

export function AIChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  /* -------------------------
     Conversation Memory
  -------------------------- */

  const [messages, setMessages] =
    useState<ChatMessage[]>(() => {
      const saved =
        localStorage.getItem("advisor-chat");

      return saved
        ? JSON.parse(saved)
        : [];
    });

  /* -------------------------
     Loading
  -------------------------- */

  const [loading, setLoading] =
    useState(false);

  /* -------------------------
     Persistent Session
  -------------------------- */

  const [sessionId] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "advisor-session"
        );

      if (saved) return saved;

      const id =
        crypto.randomUUID();

      localStorage.setItem(
        "advisor-session",
        id
      );

      return id;
    });

  /* -------------------------
     Last Prompt
  -------------------------- */

  const [lastPrompt, setLastPrompt] =
    useState("");

  /* -------------------------
     Save Chat Automatically
  -------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "advisor-chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  /* -------------------------
     Send Message
  -------------------------- */

  async function sendMessage(
    text: string
  ) {
    if (!text.trim()) return;

    setLastPrompt(text);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      message: text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {
      setLoading(true);

      // Keep single parameter until backend is updated
      const response =
        await chatWithAdvisor(text);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        message: response.answer,
        properties:
          response.toolResults?.properties ??
          [],
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          message:
            "⚠️ Sorry, I'm temporarily unavailable.\n\nPlease try again in a few moments.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------
     Retry
  -------------------------- */

  async function retryLastMessage() {
    if (!lastPrompt) return;

    await sendMessage(lastPrompt);
  }

  /* -------------------------
     Clear Chat
  -------------------------- */

  function clearChat() {
    setMessages([]);

    localStorage.removeItem(
      "advisor-chat"
    );

    localStorage.removeItem(
      "advisor-session"
    );
  }

  return (
    <AIChatContext.Provider
      value={{
        messages,
        loading,
        sessionId,
        sendMessage,
        clearChat,
        retryLastMessage,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context =
    useContext(AIChatContext);

  if (!context) {
    throw new Error(
      "useAIChat must be used inside AIChatProvider"
    );
  }

  return context;
}