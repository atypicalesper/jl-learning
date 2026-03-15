import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "#fff",
    border: "none",
  },
  secondary: {
    background: "var(--surface-3)",
    color: "var(--text)",
    border: "1px solid var(--border-2)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid var(--border)",
  },
  gold: {
    background: "var(--gold)",
    color: "#0c0c0f",
    border: "none",
  },
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled,
  type = "button",
  fullWidth,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-opacity ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        ...variantStyles[variant],
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}
