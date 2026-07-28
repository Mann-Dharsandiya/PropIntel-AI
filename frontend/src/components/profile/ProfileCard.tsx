 import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ProfileCard({
  title,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}