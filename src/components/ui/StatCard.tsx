import Card from "./Card";

export default function StatCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: string;
  color: string;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            {label}
          </div>
          <div className="text-3xl font-bold mt-1" style={{ color }}>
            {value}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {sub}
          </div>
        </div>
        <span className="text-xl">{icon}</span>
      </div>
    </Card>
  );
}
