import Link from "next/link";

const screens = [
  { href: "/onboarding", label: "Onboarding", desc: "Pick your anime + set level", icon: "🎌", num: "01" },
  { href: "/dashboard", label: "Dashboard", desc: "Streak, today's lessons, progress", icon: "🏠", num: "02" },
  { href: "/lesson", label: "Episode Lesson", desc: "Vocab + grammar from an episode", icon: "📖", num: "03" },
  { href: "/watch", label: "Watch Mode", desc: "Video player with AI subtitle hover", icon: "🎬", num: "04" },
  { href: "/review", label: "Flashcard Review", desc: "Spaced repetition (SRS)", icon: "🎴", num: "05" },
  { href: "/progress", label: "Progress & Stats", desc: "Words learned, grammar mastered", icon: "📈", num: "06" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-12">
      <div className="text-center mb-12">
        <div className="text-4xl font-bold mb-2" style={{ color: "var(--primary)" }}>
          JLP
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Learn Japanese Through Anime
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          日本語をアニメで学ぼう
        </p>
        <div className="mt-6">
          <Link
            href="/onboarding"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            Get Started →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
        {screens.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-xl p-4 flex flex-col gap-2 transition-opacity hover:opacity-80"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                {s.num}
              </span>
            </div>
            <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              {s.label}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {s.desc}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
