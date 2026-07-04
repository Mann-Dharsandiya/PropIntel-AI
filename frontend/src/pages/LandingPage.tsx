import { useHealthCheck } from '@/hooks/useHealthCheck';

const LEDGER_STATS = [
  { label: 'Parcels indexed', value: '4.2M', unit: 'nationwide' },
  { label: 'Valuation accuracy', value: '96.8', unit: '%  MAE-adjusted' },
  { label: 'Signal refresh', value: '15', unit: 'min interval' },
];

const FEATURES = [
  {
    mark: 'A',
    title: 'Automated Valuation Engine',
    copy: 'Scikit-learn regression models trained on comparable sales, permits, and neighborhood drift to price a parcel in seconds.',
  },
  {
    mark: 'B',
    title: 'Market Signal Radar',
    copy: 'Continuous ingestion of listing, permit, and macro data surfaces the neighborhoods moving before they trend.',
  },
  {
    mark: 'C',
    title: 'Portfolio Risk Ledger',
    copy: 'Every asset scored against liquidity, appreciation, and volatility factors, reconciled like a real ledger — not a dashboard guess.',
  },
];

export default function LandingPage() {
  const { data: health, isLoading, isError } = useHealthCheck();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blueprint-900">
        <div className="absolute inset-0 bg-blueprint-grid opacity-50" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-brass-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-brass-300">
            Real Estate Intelligence, Surveyed
          </span>

          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-paper md:text-6xl">
            Every property, appraised like an analyst read the deed.
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">
            PropIntel AI fuses parcel records, comparable sales, and live market signals into a
            single valuation model — so you price with the confidence of a full title search, not
            a guess.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="rounded-sm bg-brass-500 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-blueprint-900 transition hover:bg-brass-300">
              Request a valuation
            </button>
            <button className="rounded-sm border border-blueprint-600 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-slate-200 transition hover:border-brass-400 hover:text-brass-300">
              View live demo
            </button>
          </div>

          {/* Ledger */}
          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-blueprint-700/70 bg-blueprint-700/70 sm:grid-cols-3">
            {LEDGER_STATS.map((stat) => (
              <div key={stat.label} className="bg-blueprint-900 px-6 py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-mono text-3xl text-brass-300">
                  {stat.value}
                  <span className="ml-1 text-sm text-slate-400">{stat.unit}</span>
                </dd>
              </div>
            ))}
          </dl>

          {/* Live API status - proves frontend/backend wiring works out of the box */}
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-400">
            <span
              className={`h-2 w-2 rounded-full ${
                isLoading ? 'bg-slate-500' : isError ? 'bg-red-500' : 'bg-emerald-400'
              }`}
            />
            {isLoading && 'Checking backend connection…'}
            {isError && 'Backend unreachable — start the API server (see README).'}
            {health && `Backend connected — API status: ${health.data.status}`}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="platform" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass-600">
            The Platform
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
            Three instruments, one blueprint.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.mark} className="border-t border-blueprint-700/30 pt-6">
              <span className="font-display text-2xl text-brass-500">{feature.mark}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-650">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="bg-blueprint-900">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-24">
          <h2 className="font-display text-3xl text-paper md:text-4xl">
            Survey your next acquisition before you bid.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-300">
            Set up takes minutes. Bring your own data or start with our national parcel index.
          </p>
          <button className="mt-8 rounded-sm bg-brass-500 px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-blueprint-900 transition hover:bg-brass-300">
            Get started free
          </button>
        </div>
      </section>
    </div>
  );
}
