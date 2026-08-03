 import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChatMessage as Message } from "@/types/advisor";

import PropertyCard from "./PropertyCard";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message,
}: Props) {

  const isUser =
    message.role === "user";

  return (

    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border border-gray-200"
        }`}
      >

        {isUser ? (

          <p className="whitespace-pre-wrap">
            {message.message}
          </p>

        ) : (

          <div
            className="prose prose-sm max-w-none
            prose-headings:text-blue-700
            prose-strong:text-black
            prose-li:my-1
            prose-table:border
            prose-th:border
            prose-td:border"
          >

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {message.message}
            </ReactMarkdown>

          </div>

        )}

        {message.properties &&
          message.properties.length > 0 && (

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {message.properties.map(
              (property) => (

                <PropertyCard
                  key={property._id}
                  property={property}
                />

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}