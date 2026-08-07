interface FinanceCardProps {
  title: string;
  value: string;
  icon: string;
  color?: string;
}

export default function FinanceCard({
  title,
  value,
  icon,
  color = "text-blue-600",
}: FinanceCardProps) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-lg
        border
        border-slate-200

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center

            rounded-2xl

            bg-slate-100

            text-3xl

            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}