import { LocalityProperty } from "@/api/localityProperties";
import LocalityPropertyCard from "./LocalityPropertyCard";

interface Props {
  properties: LocalityProperty[];
}

export default function LocalityPropertyGrid({
  properties,
}: Props) {
  if (properties.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 shadow-lg">
        <div className="text-center">
          <div className="text-6xl">🏠</div>

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            No Properties Found
          </h2>

          <p className="mt-3 text-gray-500">
            No available properties in this locality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          🏡 Available Properties
        </h2>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          {properties.length} Properties
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <LocalityPropertyCard
            key={property._id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}