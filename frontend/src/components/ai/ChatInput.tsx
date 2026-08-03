 import { useRef, useState } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";

interface Props {
  loading: boolean;
  onSend: (message: string) => void;
}

const SUGGESTIONS = [
  "🏠 Recommend apartments in Bangalore",
  "📈 Is Mumbai good for investment?",
  "💰 Best properties under ₹80 Lakhs",
  "🌆 Compare Ahmedabad vs Pune",
  "🏢 Show luxury villas",
  "📊 Where will prices increase next?",
];

export default function ChatInput({
  loading,
  onSend,
}: Props) {
  const [text, setText] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  function submit() {
    if (!text.trim() || loading) return;

    onSend(text.trim());

    setText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  }

  function handleSuggestion(prompt: string) {
    if (loading) return;

    onSend(prompt);
  }

  function resize() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "56px";

    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }

  return (
    <div className="border-t bg-white">

      {/* Suggested Prompts */}

      <div className="border-b bg-gray-50 px-5 py-3">

        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Sparkles
            size={16}
            className="text-blue-600"
          />
          Suggested Questions
        </div>

        <div className="flex flex-wrap gap-2">

          {SUGGESTIONS.map((prompt) => (
            <button
              key={prompt}
              disabled={loading}
              onClick={() =>
                handleSuggestion(prompt)
              }
              className="
                rounded-full
                border
                border-gray-300
                bg-white
                px-4
                py-2
                text-sm
                transition
                hover:border-blue-500
                hover:bg-blue-50
                hover:text-blue-700
                disabled:opacity-50
              "
            >
              {prompt}
            </button>
          ))}

        </div>

      </div>

      {/* Input */}

      <div className="flex items-end gap-3 p-4">

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            resize();
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask anything about properties, investments, localities..."
          className="
            max-h-40
            min-h-[56px]
            flex-1
            resize-none
            rounded-2xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        />

        <button
          disabled={loading}
          onClick={submit}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            text-white
            transition
            hover:bg-blue-700
            hover:scale-105
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <SendHorizonal size={22} />
        </button>

      </div>

    </div>
  );
}