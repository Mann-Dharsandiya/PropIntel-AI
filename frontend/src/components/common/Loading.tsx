interface LoadingProps {
  label?: string;
  fullScreen?: boolean;
}

/** Shared loading indicator used for route-level suspense and data fetches. */
export function Loading({ label = 'Loading', fullScreen = true }: LoadingProps) {
  return (
    <div
      className={
        fullScreen
          ? 'flex min-h-screen flex-col items-center justify-center bg-paper'
          : 'flex flex-col items-center justify-center py-16'
      }
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12">
        <span className="absolute inset-0 animate-ping rounded-full border border-brass-500 opacity-40" />
        <span className="absolute inset-0 rounded-full border-2 border-blueprint-700 border-t-brass-500 animate-spin" />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-650">{label}</p>
    </div>
  );
}
