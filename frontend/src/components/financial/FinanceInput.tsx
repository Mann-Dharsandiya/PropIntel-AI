interface FinanceInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: string;
  prefix?: string;
  suffix?: string;
  min?: number;
}

export default function FinanceInput({
  label,
  value,
  onChange,
  icon,
  prefix,
  suffix,
  min = 0,
}: FinanceInputProps) {
  return (
    <div className="space-y-2">

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-xl">{icon}</span>
        {label}
      </label>

      <div className="flex items-center overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">

        {prefix && (
          <span className="border-r bg-slate-100 px-4 py-3 font-semibold text-slate-600">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          min={min}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="w-full bg-transparent px-4 py-3 text-lg font-semibold outline-none"
        />

        {suffix && (
          <span className="border-l bg-slate-100 px-4 py-3 font-semibold text-slate-600">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}