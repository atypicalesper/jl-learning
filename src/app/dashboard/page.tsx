import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import { USER_STATS, CURRENT_EPISODE } from "@/lib/constants";

const { streak, words, grammarPoints, hoursWatched, reviewsDue } = USER_STATS;
const { show, epLabel, epNumber, emoji: epEmoji } = CURRENT_EPISODE;

const stats = [
  { label: "Day Streak", value: String(streak), sub: "days", icon: "🔥", color: "var(--gold)" },
  { label: "Words Learned", value: String(words), sub: "total", icon: "📚", color: "var(--primary)" },
  { label: "Grammar Points", value: String(grammarPoints), sub: "mastered", icon: "✍️", color: "var(--purple)" },
  { label: "Hours Watched", value: String(hoursWatched), sub: "hours", icon: "🎬", color: "var(--green)" },
];

const todayLessons = [
  { anime: show, ep: epLabel, topic: "Vocab: Fighting terms", words: 12, done: true, href: "/lesson", emoji: epEmoji },
  { anime: show, ep: epLabel, topic: "Grammar: て-form", words: 0, done: false, href: "/lesson", emoji: epEmoji },
  { anime: "Spy x Family", ep: "EP 1", topic: "Vocab: Greetings", words: 8, done: false, href: "/lesson", emoji: "🕵️" },
];

const weekData = [
  { day: "Mon", pct: 60 },
  { day: "Tue", pct: 100 },
  { day: "Wed", pct: 80 },
  { day: "Thu", pct: 100 },
  { day: "Fri", pct: 40 },
  { day: "Sat", pct: 0 },
  { day: "Sun", pct: 0 },
];

const jsDay = new Date().getDay();
const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

const pendingCount = todayLessons.filter((l) => !l.done).length;

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "おはよう！ Good morning";
  if (h < 18) return "こんにちは！ Good afternoon";
  return "こんばんは！ Good evening";
}

export default function Dashboard() {
  return (
    <PageShell>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
          {greeting()}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {pendingCount > 0
            ? `You have ${pendingCount} lesson${pendingCount > 1 ? "s" : ""} and ${reviewsDue} reviews waiting today.`
            : `All lessons done! You still have ${reviewsDue} reviews today.`}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Today's lessons */}
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className="font-semibold text-base" style={{ color: "var(--text)" }}>
            Today's Lessons
          </h2>
          <div className="flex flex-col gap-3">
            {todayLessons.map((l) => (
              <Card key={l.topic} padding={false}>
                <div className="flex items-center gap-4 p-4" style={{ opacity: l.done ? 0.5 : 1 }}>
                  <div
                    className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center text-2xl"
                    style={{ background: "var(--surface-3)" }}
                  >
                    {l.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center flex-wrap">
                      <Badge text={l.anime} variant="muted" />
                      <Badge text={l.ep} variant="muted" />
                      {l.done && <Badge text="✓ done" variant="green" />}
                    </div>
                    <div className="font-semibold text-sm mt-1.5" style={{ color: "var(--text)" }}>
                      {l.topic}
                    </div>
                    {l.words > 0 && (
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {l.words} new words
                      </div>
                    )}
                  </div>
                  {!l.done && (
                    <Link href={l.href}>
                      <Button variant="secondary" className="shrink-0">Start</Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Due for Review</div>
                <div className="text-4xl font-bold mt-1" style={{ color: "var(--primary)" }}>{reviewsDue}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>cards today</div>
              </div>
              <span className="text-xl">🎴</span>
            </div>
            <Link href="/review">
              <Button variant="primary" fullWidth>Review Now</Button>
            </Link>
          </Card>

          <Card padding={false}>
            <div
              className="w-full h-28 rounded-t-xl flex items-center justify-center text-4xl"
              style={{ background: "var(--surface-3)" }}
            >
              🎬
            </div>
            <div className="p-4">
              <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                {show} · Next: EP {epNumber + 1}
              </div>
              <div className="text-xs mt-0.5 mb-3" style={{ color: "var(--text-muted)" }}>
                12 new words detected
              </div>
              <Link href="/watch">
                <Button variant="secondary" fullWidth>Watch + Learn</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly activity */}
      <Card>
        <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--text)" }}>
          This Week
        </h2>
        <div className="flex gap-2 items-end h-20">
          {weekData.map(({ day, pct }, i) => {
            const isToday = i === todayIndex;
            const isFuture = i > todayIndex;
            const barColor = isFuture
              ? "transparent"
              : pct === 100
              ? "var(--primary)"
              : pct > 0
              ? "rgba(233,69,96,0.35)"
              : "var(--surface-3)";
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col justify-end" style={{ height: 64 }}>
                  <div
                    className="w-full rounded-sm transition-all"
                    style={{ height: isFuture ? "4px" : `${Math.max(pct, 6)}%`, background: barColor, opacity: isFuture ? 0.2 : 1 }}
                  />
                </div>
                <span
                  className="text-xs"
                  style={{ color: isToday ? "var(--primary)" : "var(--text-muted)", fontWeight: isToday ? 700 : 400 }}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </PageShell>
  );
}
