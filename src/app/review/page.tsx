"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

const cards = [
  { jp: "呼吸", reading: "こきゅう", romaji: "kokyuu", meaning: "breathing", context: "Used in 全集中の呼吸 — Total Concentration Breathing. Tanjiro uses this technique to enhance his physical abilities.", source: "Demon Slayer · EP 3", jlpt: "N4" },
  { jp: "鬼", reading: "おに", romaji: "oni", meaning: "demon / ogre", context: "Refers to Muzan's minions and the creatures Tanjiro hunts. The word appears in 鬼殺隊 (Demon Slayer Corps).", source: "Demon Slayer · EP 3", jlpt: "N4" },
  { jp: "剣", reading: "けん", romaji: "ken", meaning: "sword", context: "The weapon wielded by Demon Slayer Corps members. Appears as part of compound words like 日輪刀.", source: "Demon Slayer · EP 3", jlpt: "N4" },
  { jp: "修行", reading: "しゅぎょう", romaji: "shugyou", meaning: "training / discipline", context: "Tanjiro's grueling mountain training under Urokodaki is described as 修行.", source: "Demon Slayer · EP 3", jlpt: "N3" },
  { jp: "仲間", reading: "なかま", romaji: "nakama", meaning: "comrade / ally", context: "A central theme word — bonds between Tanjiro and those he fights alongside.", source: "Demon Slayer · EP 3", jlpt: "N4" },
  { jp: "強さ", reading: "つよさ", romaji: "tsuyosa", meaning: "strength / power", context: "Tanjiro's goal — becoming strong enough to protect Nezuko and defeat Muzan.", source: "Demon Slayer · EP 4", jlpt: "N4" },
  { jp: "涙", reading: "なみだ", romaji: "namida", meaning: "tears", context: "Tanjiro sheds tears mourning his family throughout early episodes.", source: "Demon Slayer · EP 2", jlpt: "N4" },
  { jp: "守る", reading: "まもる", romaji: "mamoru", meaning: "to protect", context: "Tanjiro's core motivation — 守る is used when he vows to protect Nezuko.", source: "Demon Slayer · EP 1", jlpt: "N4" },
];

const srsButtons = [
  { label: "Again", sub: "< 1 min", bg: "rgba(248,113,113,0.1)", color: "#f87171", border: "rgba(248,113,113,0.3)", correct: false },
  { label: "Hard", sub: "6 min", bg: "rgba(251,146,60,0.1)", color: "#fb923c", border: "rgba(251,146,60,0.3)", correct: false },
  { label: "Good", sub: "1 day", bg: "var(--primary)", color: "#fff", border: "var(--primary)", correct: true },
  { label: "Easy", sub: "4 days", bg: "rgba(74,222,128,0.1)", color: "var(--green)", border: "rgba(74,222,128,0.3)", correct: true },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export default function Review() {
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [againCount, setAgainCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  if (cards.length === 0) return null;
  const card = cards[cardIndex];

  const handleSRS = (correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);
    else setAgainCount((c) => c + 1);

    const next = cardIndex + 1;
    if (next >= cards.length) {
      setDone(true);
    } else {
      setCardIndex(next);
      setRevealed(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            Session complete!
          </h2>
          <Card className="w-full max-w-sm" padding={false}>
            <div className="p-8 flex flex-col items-center gap-4 w-full">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold" style={{ color: "var(--green)" }}>{correctCount}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>correct</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: "var(--red)" }}>{againCount}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>again</div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: "var(--text)" }}>
                    {correctCount + againCount > 0 ? Math.round((correctCount / (correctCount + againCount)) * 100) : 0}%
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>accuracy</div>
                </div>
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Completed in {formatTime(elapsed)}
              </div>
            </div>
          </Card>
          <Link href="/dashboard">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full flex flex-col gap-6">

        {/* Progress */}
        <div className="flex items-center gap-3">
          <ProgressBar value={cardIndex} max={cards.length} className="flex-1" />
          <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
            {cardIndex} / {cards.length}
          </span>
          <Link href="/dashboard">
            <button
              className="text-xs px-2.5 py-1 rounded-lg"
              style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              ✕ quit
            </button>
          </Link>
        </div>

        {/* Flashcard front */}
        <Card className="flex flex-col items-center gap-4 py-12 px-8">
          <Badge text={card.source} variant="muted" />
          <div className="text-8xl font-bold leading-none mt-2" style={{ color: "var(--text)" }}>
            {card.jp}
          </div>

          {!revealed ? (
            <>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                What does this mean?
              </p>
              <button
                onClick={() => setRevealed(true)}
                className="mt-2 px-8 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--surface-3)", color: "var(--text)", border: "1px solid var(--border-2)" }}
              >
                Show Answer ↓
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-4 mt-2">
              <div className="text-center">
                <div className="text-xl font-medium" style={{ color: "var(--text-muted)" }}>
                  {card.reading} — {card.romaji}
                </div>
                <div className="text-2xl font-bold mt-1" style={{ color: "var(--primary)" }}>
                  {card.meaning}
                </div>
                <Badge text={card.jlpt} variant="level" className="mt-2" />
              </div>
              <div
                className="w-full rounded-xl p-4 text-sm text-center"
                style={{ background: "var(--surface-3)", color: "var(--text-muted)", borderLeft: "3px solid var(--primary)" }}
              >
                {card.context}
              </div>
            </div>
          )}
        </Card>

        {/* SRS buttons */}
        {revealed && (
          <div className="flex gap-3">
            {srsButtons.map((b) => (
              <button
                key={b.label}
                onClick={() => handleSRS(b.correct)}
                className="flex-1 rounded-xl py-3 flex flex-col items-center gap-0.5 font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}` }}
              >
                {b.label}
                <span className="text-xs font-normal opacity-70">{b.sub}</span>
              </button>
            ))}
          </div>
        )}

        {/* Session stats */}
        <div className="flex justify-center gap-8 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>
            ✓ <span className="font-bold" style={{ color: "var(--green)" }}>{correctCount}</span> correct
          </span>
          <span>
            ✗ <span className="font-bold" style={{ color: "var(--red)" }}>{againCount}</span> again
          </span>
          <span>
            ⏱ <span className="font-bold" style={{ color: "var(--text)" }}>{formatTime(elapsed)}</span>
          </span>
        </div>
      </main>
    </div>
  );
}
