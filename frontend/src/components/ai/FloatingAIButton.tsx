 import { Bot, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingAIButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <div className="group relative">
        <button
          onClick={() => navigate("/ai-advisor")}
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full

            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-purple-700

            text-white
            shadow-2xl

            transition-all
            duration-300

            hover:scale-110
            hover:rotate-6

            active:scale-95
          "
        >
          {/* Pulse Animation */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-30"></span>

          {/* Glow */}
          <span className="absolute h-full w-full rounded-full bg-blue-500 opacity-40 blur-xl"></span>

          {/* Robot Icon */}
          <Bot
            size={36}
            className="relative z-10"
          />

          {/* Sparkle */}
          <Sparkles
            size={16}
            className="absolute right-4 top-4 z-20 text-yellow-300"
          />
        </button>

        {/* Tooltip */}
        <div
          className="
            absolute
            right-24
            top-1/2
            hidden
            -translate-y-1/2
            whitespace-nowrap
            rounded-xl
            bg-gray-900
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            shadow-xl
            group-hover:block
          "
        >
          🤖 Smart AI Advisor
        </div>
      </div>
    </div>
  );
}