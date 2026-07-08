 import { Link } from "react-router-dom";

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      "Property Listings",
      "Price Prediction",
      "AI Recommendations",
      "Investment Analysis",
    ],
  },
  {
    title: "Quick Links",
    links: [
      "Home",
      "Properties",
      "Dashboard",
      "Login",
    ],
  },
  {
    title: "Technology",
    links: [
      "React",
      "Node.js",
      "MongoDB",
      "FastAPI",
      "Machine Learning",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-blueprint-700/60 bg-blueprint-900">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">

          {/* Brand */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <rect
                  width="32"
                  height="32"
                  rx="6"
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

              <span className="font-display text-xl text-paper">
                PropIntel{" "}
                <span className="text-brass-400">
                  AI
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              PropIntel AI is an AI-powered Real
              Estate Intelligence Platform helping
              buyers, sellers and investors make
              smarter decisions using Machine
              Learning based Property Price
              Prediction, Recommendation Engine,
              Investment Analysis and Market
              Insights.
            </p>

            <div className="mt-6 space-y-2 text-sm text-slate-400">

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

          {/* Footer Columns */}

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>

              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-brass-300">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">

                {column.links.map((item) => (
                  <li key={item}>

                    <a
                      href="#"
                      className="text-sm text-slate-400 transition hover:text-paper"
                    >
                      {item}
                    </a>

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-blueprint-700/60 pt-8 text-xs text-slate-500 md:flex-row">

          <div>

            <p>
              © {new Date().getFullYear()} PropIntel
              AI. All Rights Reserved.
            </p>

            <p className="mt-2">
              Built with React • Node.js • MongoDB
              • FastAPI • Machine Learning
            </p>

          </div>

          <div className="flex gap-6 font-mono uppercase tracking-wider">

            <a
              href="#"
              className="transition hover:text-paper"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-paper"
            >
              Terms
            </a>

            <a
              href="#"
              className="transition hover:text-paper"
            >
              Security
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}