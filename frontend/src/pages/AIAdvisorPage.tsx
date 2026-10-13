import {
  Sparkles,
  Building2,
  TrendingUp,
  MapPin,
  IndianRupee,
  Brain,
  Home,
  BarChart3,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";

import ChatWindow from "@/components/ai/ChatWindow";
import { AIChatProvider } from "@/context/AIChatContext";

const suggestions = [
  {
    icon: IndianRupee,
    title: "Best Property Under ₹80 Lakhs",
    description: "Explore homes within your budget.",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  {
    icon: Building2,
    title: "Recommend Apartments in Bangalore",
    description: "Find apartments that fit your needs.",
    color: "bg-blue-50 text-blue-700 ring-blue-100",
  },
  {
    icon: TrendingUp,
    title: "Best Investment for 5 Years",
    description: "Explore long-term investment opportunities.",
    color: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  {
    icon: MapPin,
    title: "Compare Mumbai vs Pune",
    description: "Compare localities and property markets.",
    color: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  {
    icon: Brain,
    title: "Explain AI Score",
    description: "Understand how properties are evaluated.",
    color: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  {
    icon: Home,
    title: "Best Villas in Ahmedabad",
    description: "Discover villas for your lifestyle.",
    color: "bg-teal-50 text-teal-700 ring-teal-100",
  },
  {
    icon: BarChart3,
    title: "Highest Rental Yield Properties",
    description: "Explore potential rental income.",
    color: "bg-orange-50 text-orange-700 ring-orange-100",
  },
  {
    icon: Sparkles,
    title: "Give Me Investment Advice",
    description: "Get guidance for your next property.",
    color: "bg-pink-50 text-pink-700 ring-pink-100",
  },
];

export default function AIAdvisorPage() {
  return (
    <AIChatProvider>
      <div className="relative min-h-screen overflow-hidden bg-paper">
        {/* Subtle background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-80 h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* Page heading */}
          <header className="mb-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                YOUR REAL ESTATE COPILOT
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck size={14} />
                AI-powered insights
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/15 sm:h-16 sm:w-16">
                    <Sparkles size={30} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-semibold text-blue-700">
                      PropIntel AI
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                      Smart AI Advisor
                    </h1>
                  </div>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Your intelligent companion for real estate decisions. Ask
                  about properties, price predictions, localities, and
                  investment opportunities—all in one place.
                </p>
              </div>

              <div className="hidden items-center gap-3 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm lg:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Have a question?
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Start a conversation below
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Suggested questions */}
          <section className="mb-8" aria-labelledby="suggestions-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <WandSparkles size={18} className="text-blue-700" />

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                    Get started
                  </p>
                </div>

                <h2
                  id="suggestions-heading"
                  className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
                >
                  What would you like to explore?
                </h2>

                <p className="mt-1.5 text-sm text-slate-500">
                  A few ideas to help you get started with your next decision.
                </p>
              </div>

              <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 sm:inline-flex">
                8 suggested topics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative flex min-h-[142px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-5"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${item.color}`}
                      >
                        <Icon size={21} strokeWidth={1.9} />
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                      />
                    </div>

                    <h3 className="text-sm font-semibold leading-5 text-slate-800 transition-colors group-hover:text-blue-800">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI chat */}
          <section aria-labelledby="chat-heading" className="pb-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  id="chat-heading"
                  className="text-xl font-bold tracking-tight text-ink"
                >
                  Chat with your AI Advisor
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ask a question to explore your real estate options.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Ready to assist
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.04] sm:rounded-3xl">
              <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600" />

              <div className="min-w-0">
                <ChatWindow />
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-slate-400">
              AI-generated insights are intended to support your research.
              Verify important property, pricing, and investment details before
              making financial decisions.
            </p>
          </section>
        </div>
      </div>
    </AIChatProvider>
  );
}
