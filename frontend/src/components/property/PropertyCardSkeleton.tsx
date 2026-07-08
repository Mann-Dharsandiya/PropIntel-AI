 export default function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border bg-white shadow">

      <div className="h-56 w-full bg-gray-300" />

      <div className="space-y-3 p-4">

        <div className="h-5 w-3/4 rounded bg-gray-300" />

        <div className="h-4 w-1/2 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />

        <div className="flex justify-between">

          <div className="h-4 w-16 rounded bg-gray-200" />

          <div className="h-4 w-16 rounded bg-gray-200" />

          <div className="h-4 w-16 rounded bg-gray-200" />

        </div>

        <div className="h-10 rounded bg-gray-300" />

      </div>
    </div>
  );
}