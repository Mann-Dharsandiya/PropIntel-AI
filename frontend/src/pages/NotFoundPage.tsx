import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-blueprint-900 px-6 text-center">
      <div className="absolute inset-0 bg-blueprint-grid opacity-60" />
      <div className="relative">
        <span className="font-mono text-sm uppercase tracking-[0.35em] text-brass-300">
          Parcel not found
        </span>
        <h1 className="mt-4 font-display text-[6rem] leading-none text-paper">404</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-300">
          This address doesn&apos;t appear on the map. It may have been moved, renamed, or never
          platted in the first place.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-sm border border-brass-500 px-6 py-3 font-mono text-sm uppercase tracking-wider text-brass-300 transition hover:bg-brass-500 hover:text-blueprint-900"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
