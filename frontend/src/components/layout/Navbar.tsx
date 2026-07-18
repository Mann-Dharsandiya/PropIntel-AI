 import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "AI Prediction", to: "/predict-price" },
  { label: "AI Recommendation", to: "/recommendation" },
  { label: "Locality AI", to: "/locality" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blueprint-700/60 bg-blueprint-900/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <svg width="26" height="26" viewBox="0 0 32 32">
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

          <span className="font-display text-lg tracking-tight text-paper">
            PropIntel <span className="text-brass-400">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.15em] transition ${
                  isActive
                    ? "text-brass-300"
                    : "text-slate-300 hover:text-brass-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/login"
            className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:text-brass-300"
          >
            Sign In
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-sm border border-brass-500 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-300 transition hover:bg-brass-500 hover:text-blueprint-900"
          >
            Get Started
          </NavLink>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </nav>

      {open && (
        <div className="border-t border-blueprint-700/60 bg-blueprint-900 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-slate-300"
              >
                {link.label}
              </NavLink>
            ))}

          </div>
        </div>
      )}

    </header>
  );
}