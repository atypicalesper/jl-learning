export default function ProgressBar({
  value,
  max,
  color = "var(--primary)",
  height = 6,
  className = "",
}: {
  value: number;
  max: number;
  color?: string;
  height?: number;
  className?: string;
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className={`w-full rounded-full overflow-hidden ${className}`}
      style={{ height, background: "var(--surface-3)" }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
