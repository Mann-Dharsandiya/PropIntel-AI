interface Props {
  password: string;
}

export default function PasswordStrength({
  password,
}: Props) {
  let strength = 0;

  if (password.length >= 8) strength++;

  if (/[A-Z]/.test(password)) strength++;

  if (/[0-9]/.test(password)) strength++;

  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const colors = [
    "bg-gray-300",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const labels = [
    "",
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ];

  return (
    <div className="mt-2">

      <div className="grid grid-cols-4 gap-2">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`h-2 rounded ${
              item <= strength
                ? colors[strength]
                : "bg-gray-200"
            }`}
          />
        ))}

      </div>

      {password.length > 0 && (
        <p className="text-sm mt-2 text-gray-500">
          Password Strength :
          <span className="font-semibold ml-1">
            {labels[strength]}
          </span>
        </p>
      )}

    </div>
  );
}