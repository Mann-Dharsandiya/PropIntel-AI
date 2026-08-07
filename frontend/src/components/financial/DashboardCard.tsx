interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        border
        border-slate-200
        p-6

        shadow-lg

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3
            className={`mt-2 text-3xl font-bold ${color}`}
          >
            {value}
          </h3>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>
    </div>
  );
}