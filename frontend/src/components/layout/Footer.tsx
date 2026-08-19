 import { Link } from "react-router-dom";
import {
  FileText,
  TrendingUp,
  Wallet,
  BriefcaseBusiness,
} from "lucide-react";

// =========================================================
// Footer Navigation
// =========================================================

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      {
        label: "Property Listings",
        to: "/properties",
      },
      {
        label: "Price Prediction",
        to: "/predict-price",
      },
      {
        label: "AI Recommendations",
        to: "/recommendation",
      },
      {
        label: "Investment Analysis",
        to: "/financial",
      },
    ],
  },

  {
    title: "Intelligence",
    links: [
      {
        label: "Locality Intelligence",
        to: "/locality",
      },
      {
        label: "Compare Localities",
        to: "/compare-localities",
      },
      {
        label: "AI Advisor",
        to: "/ai-advisor",
      },
      {
        label: "Market Intelligence",
        to: "/market-intelligence",
      },
    ],
  },

  {
    title: "Reports & Portfolio",
    links: [
      {
        label: "AI Reports",
        to: "/reports",
      },
      {
        label: "Investment Portfolio",
        to: "/portfolio",
      },
      {
        label: "Dashboard",
        to: "/dashboard",
      },
      {
        label: "Profile",
        to: "/profile",
      },
    ],
  },
];

// =========================================================
// Footer
// =========================================================

export default function Footer() {

  return (

    <footer
      className="
        border-t
        border-blueprint-700/60
        bg-blueprint-900
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-16
        "
      >

        {/* ================================================= */}
        {/* Main Footer */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            md:grid-cols-5
          "
        >

          {/* ================================================= */}
          {/* Brand */}
          {/* ================================================= */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="
                flex
                items-center
                gap-2.5
              "
            >

              <svg
                width="30"
                height="30"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >

                <rect
                  width="32"
                  height="32"
                  rx="7"
                  fill="#0F1B2E"
                />

                <path
                  d="M16 6 L26 13 V26 H6 V13 Z"
                  fill="none"
                  stroke="#C08B3E"
                  strokeWidth="1.6"
                />

                <path
                  d="M13 26 V18 H19 V26"
                  fill="none"
                  stroke="#4A90A4"
                  strokeWidth="1.6"
                />

              </svg>

              <span
                className="
                  font-display
                  text-xl
                  text-paper
                "
              >
                PropIntel{" "}

                <span className="text-brass-400">
                  AI
                </span>

              </span>

            </Link>

            <p
              className="
                mt-5
                max-w-md
                leading-7
                text-slate-400
              "
            >
              PropIntel AI is an AI-powered Real
              Estate Intelligence Platform helping
              buyers, sellers and investors make
              smarter decisions using property
              intelligence, machine learning,
              financial analysis and market insights.
            </p>

            {/* Contact */}

            <div
              className="
                mt-6
                space-y-2
                text-sm
                text-slate-400
              "
            >

              <p>
                📍 Ahmedabad, Gujarat, India
              </p>

              <p>
                📧 support@propintel.ai
              </p>

              <p>
                ☎ +91 98765 43210
              </p>

            </div>

          </div>

          {/* ================================================= */}
          {/* Footer Columns */}
          {/* ================================================= */}

          {FOOTER_COLUMNS.map(
            (column) => (

              <div key={column.title}>

                <h3
                  className="
                    font-mono
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-brass-300
                  "
                >
                  {column.title}
                </h3>

                <ul
                  className="
                    mt-5
                    space-y-3
                  "
                >

                  {column.links.map(
                    (item) => (

                      <li key={item.label}>

                        <Link
                          to={item.to}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-400
                            transition
                            duration-200
                            hover:translate-x-1
                            hover:text-paper
                          "
                        >

                          {item.label ===
                            "AI Reports" && (
                            <FileText
                              size={13}
                              className="text-brass-400"
                            />
                          )}

                          {item.label ===
                            "Market Intelligence" && (
                            <TrendingUp
                              size={13}
                              className="text-brass-400"
                            />
                          )}

                          {item.label ===
                            "Investment Portfolio" && (
                            <BriefcaseBusiness
                              size={13}
                              className="text-brass-400"
                            />
                          )}

                          {item.label ===
                            "Investment Analysis" && (
                            <Wallet
                              size={13}
                              className="text-brass-400"
                            />
                          )}

                          {item.label}

                        </Link>

                      </li>

                    )
                  )}

                </ul>

              </div>

            )
          )}

        </div>

        {/* ================================================= */}
        {/* Intelligence Highlight */}
        {/* ================================================= */}

        <div
          className="
            mt-14
            rounded-2xl
            border
            border-blueprint-700/70
            bg-blueprint-800/40
            p-6
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>

              <p
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-brass-300
                "
              >
                PropIntel AI Intelligence Suite
              </p>

              <h3
                className="
                  mt-2
                  font-display
                  text-xl
                  text-paper
                "
              >
                From property search to investment decision.
              </h3>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                Explore AI predictions, locality intelligence,
                financial analysis, investment portfolios,
                AI-generated reports and real-estate market trends
                from one platform.
              </p>

            </div>

            <div
              className="
                flex
                shrink-0
                flex-wrap
                gap-3
              "
            >

              <Link
                to="/reports"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-brass-500/70
                  px-4
                  py-2.5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-brass-300
                  transition
                  hover:bg-brass-500
                  hover:text-blueprint-900
                "
              >

                <FileText size={14} />

                AI Reports

              </Link>

              <Link
                to="/market-intelligence"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-brass-500
                  px-4
                  py-2.5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-blueprint-900
                  transition
                  hover:bg-brass-400
                "
              >

                <TrendingUp size={14} />

                Market Intelligence

              </Link>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* Bottom */}
        {/* ================================================= */}

        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-between
            gap-5
            border-t
            border-blueprint-700/60
            pt-8
            text-xs
            text-slate-500
            md:flex-row
          "
        >

          <div>

            <p>
              © {new Date().getFullYear()} PropIntel AI.
              All Rights Reserved.
            </p>

            <p className="mt-2">
              Built with React • Node.js • MongoDB •
              FastAPI • Machine Learning
            </p>

          </div>

          {/* These are intentionally informational,
              not fake navigation buttons. */}

          <div
            className="
              flex
              gap-6
              font-mono
              uppercase
              tracking-wider
            "
          >

            <span>
              Privacy
            </span>

            <span>
              Terms
            </span>

            <span>
              Security
            </span>

          </div>

        </div>

      </div>

    </footer>

  );
}