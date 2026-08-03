 import {
  Sparkles,
  Building2,
  TrendingUp,
  MapPin,
  IndianRupee,
  Brain,
  Home,
  BarChart3,
} from "lucide-react";

import ChatWindow from "@/components/ai/ChatWindow";
import { AIChatProvider } from "@/context/AIChatContext";

export default function AIAdvisorPage() {
  const suggestions = [
    {
      icon: <IndianRupee size={20} />,
      title: "Best Property Under ₹80 Lakhs",
    },
    {
      icon: <Building2 size={20} />,
      title: "Recommend Apartments in Bangalore",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Best Investment for 5 Years",
    },
    {
      icon: <MapPin size={20} />,
      title: "Compare Mumbai vs Pune",
    },
    {
      icon: <Brain size={20} />,
      title: "Explain AI Score",
    },
    {
      icon: <Home size={20} />,
      title: "Best Villas in Ahmedabad",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Highest Rental Yield Properties",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Give Me Investment Advice",
    },
  ];

  return (
    <AIChatProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

        {/* Header */}

        <div className="mx-auto max-w-7xl px-6 pt-8">

          <div className="mb-8 rounded-3xl bg-white p-8 shadow-xl">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">

                <Sparkles size={32} />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-gray-800">

                  Smart AI Advisor

                </h1>

                <p className="mt-2 text-gray-500">

                  Ask anything about properties, investment, price prediction,
                  localities and real estate.

                </p>

              </div>

            </div>

          </div>

          {/* Suggested Prompts */}

          <div className="mb-8">

            <h2 className="mb-4 text-xl font-bold text-gray-700">

              Suggested Questions

            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {suggestions.map((item) => (
                <div
                  key={item.title}
                  className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                >
                  <div className="mb-3 text-blue-600">
                    {item.icon}
                  </div>

                  <p className="font-semibold text-gray-700">
                    {item.title}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* Chat */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

            <ChatWindow />

          </div>

        </div>

      </div>
    </AIChatProvider>
  );
}