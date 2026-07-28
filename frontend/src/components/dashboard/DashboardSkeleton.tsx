export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 bg-gray-200 rounded-2xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 bg-gray-200 rounded-2xl"
          />
        ))}
      </div>

      <div className="h-72 bg-gray-200 rounded-2xl" />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="h-72 bg-gray-200 rounded-2xl" />
        <div className="h-72 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}