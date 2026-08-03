export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">

      <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>

      <div
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
        style={{
          animationDelay: "0.2s",
        }}
      ></div>

      <div
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
        style={{
          animationDelay: "0.4s",
        }}
      ></div>

      <span className="text-sm text-gray-500 ml-2">
        PropIntel AI is thinking...
      </span>

    </div>
  );
}