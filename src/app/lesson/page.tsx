"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/ui/Nav";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { CURRENT_EPISODE } from "@/lib/constants";

const allVocab = [
  { jp: "鬼", reading: "おに", romaji: "oni", meaning: "demon / ogre", seen: 3, jlpt: "N4" },
  { jp: "剣", reading: "けん", romaji: "ken", meaning: "sword", seen: 5, jlpt: "N4" },
  { jp: "呼吸", reading: "こきゅう", romaji: "kokyuu", meaning: "breathing", seen: 8, jlpt: "N4" },
  { jp: "兄", reading: "あに", romaji: "ani", meaning: "older brother", seen: 2, jlpt: "N5" },
  { jp: "修行", reading: "しゅぎょう", romaji: "shugyou", meaning: "training / discipline", seen: 4, jlpt: "N3" },
  { jp: "仲間", reading: "なかま", romaji: "nakama", meaning: "comrade / ally", seen: 6, jlpt: "N4" },
  { jp: "強さ", reading: "つよさ", romaji: "tsuyosa", meaning: "strength / power", seen: 5, jlpt: "N4" },
  { jp: "涙", reading: "なみだ", romaji: "namida", meaning: "tears", seen: 3, jlpt: "N4" },
  { jp: "守る", reading: "まもる", romaji: "mamoru", meaning: "to protect", seen: 7, jlpt: "N4" },
  { jp: "師匠", reading: "ししょう", romaji: "shishou", meaning: "master / teacher", seen: 2, jlpt: "N2" },
  { jp: "岩", reading: "いわ", romaji: "iwa", meaning: "boulder / rock", seen: 3, jlpt: "N4" },
  { jp: "斬る", reading: "きる", romaji: "kiru", meaning: "to cut / slash", seen: 4, jlpt: "N3" },
];

const grammar = [
  {
    pattern: "て-form",
    variant: "primary" as const,
    desc: "Used to connect actions sequentially or make polite requests.",
    example: "食べて — tabete — \"eat and...\" or \"please eat\"",
    seen: 4,
  },
  {
    pattern: "〜ながら",
    variant: "level" as const,
    desc: "Doing two actions simultaneously.",
    example: "走りながら — hashirinagara — \"while running\"",
    seen: 2,
  },
];

const { show, epLabel, title, emoji: epEmoji } = CURRENT_EPISODE;
const PREVIEW_COUNT = 4;

export default function Lesson() {
  const [expanded, setExpanded] = useState(false);
  const [deck, setDeck] = useState<Set<string>>(new Set());

  const vocab = expanded ? allVocab : allVocab.slice(0, PREVIEW_COUNT);

  const toggleDeck = (jp: string) => {
    setDeck((prev) => {
      const next = new Set(prev);
      if (next.has(jp)) next.delete(jp);
      else next.add(jp);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full flex flex-col gap-6">

        {/* Episode header */}
        <Card padding={false}>
          <div className="flex items-center gap-5 p-5">
            <div
              className="w-16 h-20 rounded-lg shrink-0 flex items-center justify-center text-3xl"
              style={{ background: "var(--surface-3)" }}
            >
              {epEmoji}
            </div>
            <div className="flex-1">
              <div className="flex gap-2 flex-wrap mb-2">
                <Badge text={show} variant="muted" />
                <Badge text={epLabel} variant="muted" />
                <Badge text="N4" variant="level" />
              </div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                "{title}"
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {allVocab.length} new words · 2 grammar points · ~15 min
              </p>
            </div>
            <Link href="/watch">
              <Button variant="secondary">▶ Watch Episode</Button>
            </Link>
          </div>
          <div className="px-5 pb-4 flex items-center gap-3" style={{ borderTop: "1px solid var(--border)" }}>
            <ProgressBar value={deck.size} max={allVocab.length} className="flex-1" />
            <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
              {deck.size} / {allVocab.length} added to deck
            </span>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* Vocab list */}
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              Vocabulary from this episode
            </h2>
            <div className="flex flex-col gap-2">
              {vocab.map((v) => {
                const inDeck = deck.has(v.jp);
                return (
                  <Card key={v.jp} padding={false}>
                    <div className="flex items-center gap-4 p-4">
                      <div className="text-4xl w-14 text-center font-bold shrink-0" style={{ color: "var(--text)" }}>
                        {v.jp}
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 items-center">
                          <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                            {v.reading}
                          </span>
                          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                            ({v.romaji})
                          </span>
                          <Badge text={v.jlpt} variant="level" />
                        </div>
                        <div className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {v.meaning}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                          heard {v.seen}× in ep
                        </div>
                        <button
                          onClick={() => toggleDeck(v.jp)}
                          className="text-xs px-3 py-1 rounded-full transition-all"
                          style={
                            inDeck
                              ? { background: "var(--green)", color: "#0c0c0f", opacity: 0.9 }
                              : { background: "var(--primary-dim)", color: "var(--primary)" }
                          }
                        >
                          {inDeck ? "✓ in deck" : "+ add to deck"}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="py-2.5 rounded-xl text-sm transition-colors"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                Show all {allVocab.length} words ↓
              </button>
            )}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="py-2.5 rounded-xl text-sm"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                Show less ↑
              </button>
            )}
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              Grammar Points
            </h2>
            {grammar.map((g) => (
              <Card key={g.pattern}>
                <div className="flex flex-col gap-2">
                  <Badge text={g.pattern} variant={g.variant} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {g.desc}
                  </p>
                  <div
                    className="text-xs rounded-lg p-2.5"
                    style={{ background: "var(--surface-3)", color: "var(--text)" }}
                  >
                    {g.example}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Heard {g.seen}× in this episode
                  </div>
                </div>
              </Card>
            ))}

            <div className="mt-2">
              <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>
                AI Context
              </h2>
              <Card>
                <div
                  className="w-full h-20 rounded-lg flex items-center justify-center text-xs mb-2"
                  style={{ background: "var(--surface-3)", color: "var(--text-muted)" }}
                >
                  ✨ AI explanation
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Click any word to get a deep explanation with anime context
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <Link href="/dashboard">
            <Button variant="ghost">← Back</Button>
          </Link>
          <div className="flex-1" />
          <Link href="/review">
            <Button variant="primary" className="px-8">
              Continue to Review →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
