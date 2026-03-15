import { Box, Nav, Badge } from "@/components/wireframe/WireframeShell";

const topWords = [
  { jp: "鬼", meaning: "demon", seen: 42 },
  { jp: "剣", meaning: "sword", seen: 38 },
  { jp: "呼吸", meaning: "breathing", seen: 31 },
  { jp: "強い", meaning: "strong", seen: 27 },
  { jp: "仲間", meaning: "comrade", seen: 24 },
];

const animeProgress = [
  { name: "Demon Slayer", eps: 12, total: 26, words: 284 },
  { name: "Spy x Family", eps: 3, total: 25, words: 58 },
];

export default function Progress() {
  return (
    <div className="min-h-screen bg-white font-mono flex flex-col">
      <Nav active="Progress" />

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Progress</h1>

        {/* Top stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Words", value: "342", sub: "+12 this week" },
            { label: "Grammar Points", value: "28", sub: "+3 this week" },
            { label: "Day Streak", value: "14 🔥", sub: "best: 21" },
            { label: "Study Time", value: "9.5h", sub: "1.2h this week" },
          ].map((s) => (
            <div key={s.label} className="border-2 border-dashed border-gray-400 rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* JLPT level breakdown */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 flex flex-col gap-4">
            <h2 className="font-bold text-gray-800">Words by JLPT Level</h2>
            {[
              { level: "N5", count: 180, total: 800, color: "bg-gray-800" },
              { level: "N4", count: 120, total: 1500, color: "bg-gray-500" },
              { level: "N3", count: 42, total: 3750, color: "bg-gray-300" },
            ].map((l) => (
              <div key={l.level} className="flex items-center gap-3">
                <Badge text={l.level} />
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className={`${l.color} h-full rounded-full`} style={{ width: `${(l.count / l.total) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">{l.count} / {l.total}</span>
              </div>
            ))}
            <div className="border-t border-dashed border-gray-200 pt-3 text-xs text-gray-400">
              At this pace you'll reach N4 in ~4 months
            </div>
          </div>

          {/* Anime progress */}
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 flex flex-col gap-4">
            <h2 className="font-bold text-gray-800">Anime Progress</h2>
            {animeProgress.map((a) => (
              <div key={a.name} className="flex gap-3 items-start">
                <Box label="poster" className="w-10 h-14 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-gray-700 text-sm">{a.name}</div>
                  <div className="text-xs text-gray-400">{a.words} words learned</div>
                  <div className="mt-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-gray-800 h-full rounded-full" style={{ width: `${(a.eps / a.total) * 100}%` }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{a.eps} / {a.total} episodes</div>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-400 text-gray-500 text-sm py-2 rounded hover:bg-gray-50">
              + Add another anime
            </button>
          </div>
        </div>

        {/* Most seen words */}
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-5 flex flex-col gap-3">
          <h2 className="font-bold text-gray-800">Most Seen Words</h2>
          <div className="flex flex-col gap-2">
            {topWords.map((w, i) => (
              <div key={w.jp} className="flex items-center gap-4">
                <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                <span className="text-xl text-gray-800 w-10">{w.jp}</span>
                <span className="text-sm text-gray-500 flex-1">{w.meaning}</span>
                <div className="w-32 bg-gray-100 rounded-full h-2">
                  <div className="bg-gray-800 h-full rounded-full" style={{ width: `${(w.seen / 42) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-16 text-right">×{w.seen}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly heatmap */}
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-5">
          <h2 className="font-bold text-gray-800 mb-4">Study Activity</h2>
          <Box label="activity heatmap (GitHub-style, 12 weeks)" className="w-full h-20" />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>12 weeks ago</span>
            <span>today</span>
          </div>
        </div>
      </main>
    </div>
  );
}
