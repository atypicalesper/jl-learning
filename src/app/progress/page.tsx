import PageShell from "@/components/ui/PageShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import StatCard from "@/components/ui/StatCard";
import { USER_STATS } from "@/lib/constants";

const { streak, words, grammarPoints, hoursWatched } = USER_STATS;

const stats = [
  { label: "Total Words", value: String(words), sub: "+12 this week", icon: "📚", color: "var(--primary)" },
  { label: "Grammar Points", value: String(grammarPoints), sub: "+3 this week", icon: "✍️", color: "var(--purple)" },
  { label: "Day Streak", value: String(streak), sub: "best: 21 days", icon: "🔥", color: "var(--gold)" },
  { label: "Study Time", value: `${hoursWatched}h`, sub: "1.2h this week", icon: "⏱", color: "var(--green)" },
];

const jlptLevels = [
  { level: "N5", count: 180, total: 800, color: "var(--green)" },
  { level: "N4", count: 120, total: 1500, color: "var(--primary)" },
  { level: "N3", count: 42, total: 2250, color: "var(--purple)" },
];

const animeProgress = [
  { name: "Demon Slayer", jp: "鬼滅の刃", eps: 12, total: 26, words: 284, emoji: "🗡️" },
  { name: "Spy x Family", jp: "スパイファミリー", eps: 3, total: 25, words: 58, emoji: "🕵️" },
];

const topWords = [
  { jp: "鬼", meaning: "demon", seen: 42 },
  { jp: "剣", meaning: "sword", seen: 38 },
  { jp: "呼吸", meaning: "breathing", seen: 31 },
  { jp: "強い", meaning: "strong", seen: 27 },
  { jp: "仲間", meaning: "comrade", seen: 24 },
];

// Seeded pseudo-random for SSR-safe heatmap
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const heatmapData = Array.from({ length: 12 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => {
    if (week >= 10) return 0;
    const r = seededRand(week * 7 + day);
    return r > 0.4 ? Math.floor(r * 3) + 1 : 0;
  })
);

const heatmapColor = (level: number) => {
  if (level === 0) return "var(--surface-3)";
  if (level === 1) return "rgba(233,69,96,0.25)";
  if (level === 2) return "rgba(233,69,96,0.55)";
  return "var(--primary)";
};

export default function Progress() {
  return (
    <PageShell>
      <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
        Your Progress
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* JLPT level breakdown */}
        <Card>
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>
            Words by JLPT Level
          </h2>
          <div className="flex flex-col gap-4">
            {jlptLevels.map((l) => (
              <div key={l.level}>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge text={l.level} variant="level" />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {l.count} / {l.total}
                  </span>
                </div>
                <ProgressBar value={l.count} max={l.total} color={l.color} />
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-4 text-xs"
            style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            📈 At this pace you'll reach N4 in ~4 months
          </div>
        </Card>

        {/* Anime progress */}
        <Card>
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>
            Anime Progress
          </h2>
          <div className="flex flex-col gap-4">
            {animeProgress.map((a) => (
              <div key={a.name} className="flex gap-3 items-start">
                <div
                  className="w-12 h-16 rounded-lg shrink-0 flex items-center justify-center text-2xl"
                  style={{ background: "var(--surface-3)" }}
                >
                  {a.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {a.name}
                  </div>
                  <div className="text-xs mt-0.5 mb-2" style={{ color: "var(--text-muted)" }}>
                    {a.jp} · {a.words} words learned
                  </div>
                  <ProgressBar value={a.eps} max={a.total} />
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {a.eps} / {a.total} episodes
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="ghost" fullWidth>+ Add another anime</Button>
          </div>
        </Card>
      </div>

      {/* Most seen words */}
      <Card>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>
          Most Seen Words
        </h2>
        <div className="flex flex-col gap-3">
          {topWords.map((w, i) => (
            <div key={w.jp} className="flex items-center gap-4">
              <span className="text-xs w-4 text-center font-mono" style={{ color: "var(--text-muted)" }}>
                {i + 1}
              </span>
              <span className="text-2xl w-10 text-center" style={{ color: "var(--text)" }}>
                {w.jp}
              </span>
              <span className="text-sm flex-1" style={{ color: "var(--text-muted)" }}>
                {w.meaning}
              </span>
              <div className="w-36">
                <ProgressBar value={w.seen} max={topWords[0].seen} color="var(--primary)" height={4} />
              </div>
              <span className="text-xs w-10 text-right" style={{ color: "var(--text-muted)" }}>
                ×{w.seen}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity heatmap */}
      <Card>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>
          Study Activity
        </h2>
        <div className="flex gap-1">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <div
                  key={di}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: heatmapColor(level) }}
                  title={level > 0 ? `${level * 15} min studied` : "No activity"}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          <span>12 weeks ago</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {[0, 1, 2, 3].map((l) => (
              <div key={l} className="w-3 h-3 rounded-sm" style={{ background: heatmapColor(l) }} />
            ))}
            <span>More</span>
          </div>
          <span>today</span>
        </div>
      </Card>
    </PageShell>
  );
}
