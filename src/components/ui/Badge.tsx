type BadgeVariant = "default" | "primary" | "gold" | "green" | "level" | "muted";

const styles: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
  default: { bg: "var(--surface-3)", color: "var(--text-muted)" },
  primary: { bg: "var(--primary-dim)", color: "var(--primary)" },
  gold: { bg: "var(--gold-dim)", color: "var(--gold)" },
  green: { bg: "rgba(74,222,128,0.1)", color: "var(--green)" },
  level: { bg: "var(--surface-3)", color: "var(--text)", border: "1px solid var(--border-2)" },
  muted: { bg: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" },
};

export default function Badge({
  text,
  variant = "default",
  className = "",
}: {
  text: string;
  variant?: BadgeVariant;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${className}`}
      style={{ background: s.bg, color: s.color, border: s.border }}
    >
      {text}
    </span>
  );
}
