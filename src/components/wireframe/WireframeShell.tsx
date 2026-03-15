// Shared wireframe shell — grey boxes, labels, no real styling
// Replace with real components as we build

export function Box({
  label,
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`border-2 border-dashed border-gray-400 bg-gray-100 rounded flex flex-col items-center justify-center text-gray-500 text-sm font-mono p-2 ${className}`}
    >
      {label && <span className="text-xs uppercase tracking-widest mb-1 text-gray-400">{label}</span>}
      {children}
    </div>
  );
}

export function Nav({ active }: { active: string }) {
  const links = ["Dashboard", "Lesson", "Watch", "Review", "Progress"];
  return (
    <nav className="w-full border-b-2 border-dashed border-gray-400 flex items-center gap-6 px-6 py-3 bg-white">
      <span className="font-bold text-lg font-mono text-gray-700">JLP 🎌</span>
      <div className="flex gap-4 ml-6">
        {links.map((l) => (
          <a
            key={l}
            href={`/${l.toLowerCase()}`}
            className={`text-sm font-mono px-3 py-1 rounded ${
              active === l
                ? "bg-gray-800 text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {l}
          </a>
        ))}
      </div>
      <div className="ml-auto">
        <Box label="user avatar" className="w-8 h-8" />
      </div>
    </nav>
  );
}

export function Badge({ text }: { text: string }) {
  return (
    <span className="border border-dashed border-gray-400 text-gray-500 text-xs font-mono px-2 py-0.5 rounded-full">
      {text}
    </span>
  );
}
