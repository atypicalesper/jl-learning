import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  padding = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl ${padding ? "p-4" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}
