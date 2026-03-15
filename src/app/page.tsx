import Link from "next/link";

const screens = [
  { href: "/onboarding", label: "1. Onboarding", desc: "Pick your anime + set level" },
  { href: "/dashboard", label: "2. Dashboard", desc: "Streak, today's lessons, progress" },
  { href: "/lesson", label: "3. Episode Lesson", desc: "Vocab + grammar from an episode" },
  { href: "/watch", label: "4. Watch Mode", desc: "Video player with AI subtitle hover" },
  { href: "/review", label: "5. Flashcard Review", desc: "Spaced repetition (SRS)" },
  { href: "/progress", label: "6. Progress & Stats", desc: "Words learned, grammar mastered" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-12 font-mono">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">JLP — Learn Japanese Through Anime</h1>
      <p className="text-gray-500 mb-10 text-sm">Wireframes — click a screen to explore</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {screens.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border-2 border-dashed border-gray-400 rounded-lg p-5 hover:bg-gray-50 transition"
          >
            <div className="font-bold text-gray-800">{s.label}</div>
            <div className="text-gray-500 text-sm mt-1">{s.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
