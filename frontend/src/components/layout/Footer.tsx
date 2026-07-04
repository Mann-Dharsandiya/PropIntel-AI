import { Link } from 'react-router-dom';

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: ['Valuation Engine', 'Market Signals', 'Portfolio Analytics', 'API Access'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Data Methodology', 'Status', 'Changelog'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-blueprint-700/60 bg-blueprint-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
                <rect width="32" height="32" rx="6" fill="#0F1B2E" />
                <path d="M16 6 L26 13 V26 H6 V13 Z" fill="none" stroke="#C08B3E" strokeWidth="1.6" />
                <path d="M13 26 V18 H19 V26" fill="none" stroke="#4A90A4" strokeWidth="1.6" />
              </svg>
              <span className="font-display text-lg text-paper">
                PropIntel <span className="text-brass-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              AI-driven valuation and market intelligence for real estate investors, brokers, and
              analysts.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-brass-300">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 transition hover:text-paper">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-blueprint-700/60 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} PropIntel AI. All rights reserved.</p>
          <div className="flex gap-6 font-mono uppercase tracking-wider">
            <a href="#" className="hover:text-paper">
              Privacy
            </a>
            <a href="#" className="hover:text-paper">
              Terms
            </a>
            <a href="#" className="hover:text-paper">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
