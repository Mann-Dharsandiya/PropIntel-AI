 import { useEffect, useRef } from "react";

import { useAIChat } from "@/context/AIChatContext";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const {
    messages,
    loading,
    sendMessage,
  } = useAIChat();

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messagesRef.current) return;

    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-[85vh] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

      {/* Header */}

      <div className="shrink-0 border-b bg-white px-6 py-5">
        <h2 className="text-2xl font-bold">
          🤖 PropIntel AI Advisor
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ask about properties, investments, localities and market insights.
        </p>
      </div>

      {/* Messages */}

      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto bg-gray-50 px-6 py-6"
      >
        {messages.length === 0 && (
          <div className="mt-24 text-center text-gray-400">
            <div className="text-6xl mb-4">🏡</div>

            <h3 className="text-xl font-semibold text-gray-700">
              Welcome to PropIntel AI
            </h3>

            <p className="mt-2">
              Ask anything about buying, selling or investing in properties.
            </p>
          </div>
        )}

        <div className="space-y-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {loading && <TypingIndicator />}
        </div>
      </div>

      {/* Input */}

      <div className="shrink-0 border-t bg-white p-4">
        <ChatInput
          loading={loading}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}