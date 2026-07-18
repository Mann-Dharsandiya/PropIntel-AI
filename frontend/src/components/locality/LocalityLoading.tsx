export default function LocalityLoading() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">

      <div className="animate-pulse">

        <div className="mb-6 h-8 w-64 rounded bg-gray-300"></div>

        <div className="rounded-xl bg-gray-300 p-8">

          <div className="mx-auto h-8 w-56 rounded bg-gray-400"></div>

          <div className="mx-auto mt-4 h-6 w-32 rounded bg-gray-400"></div>

          <div className="mx-auto mt-8 h-14 w-48 rounded bg-gray-400"></div>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-lg bg-gray-300"
            />
          ))}

        </div>

        <div className="mt-6 h-24 rounded-lg bg-gray-300"></div>

      </div>

    </div>
  );
}