"use client";
import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Badge from "@/components/ui/Badge";
import { CURRENT_EPISODE } from "@/lib/constants";

const subtitleWords = [
  { jp: "鬼", reading: "おに", romaji: "oni", meaning: "demon / ogre", jlpt: "N4", inDeck: true, context: "Tanjiro is saying 'in order to defeat the demon' — 鬼 refers to Muzan's minions.", compounds: ["鬼殺隊 — Demon Slayer Corps", "鬼舞辻無惨 — Kibutsuji Muzan"], seenCount: 8 },
  { jp: "を", reading: "を", romaji: "wo", meaning: "object marker (particle)", jlpt: "N5", inDeck: false, context: "を marks the object of the verb 倒す (to defeat). It's one of the most common Japanese particles.", compounds: ["本を読む — to read a book", "ご飯を食べる — to eat a meal"], seenCount: 22 },
  { jp: "倒す", reading: "たおす", romaji: "taosu", meaning: "to defeat / knock down", jlpt: "N4", inDeck: false, context: "Tanjiro's declaration of intent — 倒す is an active, decisive verb meaning to bring something down.", compounds: ["打ち倒す — to strike down", "倒れる — to fall down (intransitive)"], seenCount: 5 },
  { jp: "ために", reading: "ために", romaji: "tame ni", meaning: "in order to / for the purpose of", jlpt: "N4", inDeck: false, context: "A grammar construction: [verb dictionary form] + ために expresses purpose. Tanjiro trains ために defeat demons.", compounds: ["〜のために — for someone's sake", "〜ために〜する — do X in order to Y"], seenCount: 6 },
];

const upcomingWords = [
  { jp: "全集中", reading: "ぜんしゅうちゅう", meaning: "Total Concentration" },
  { jp: "水の呼吸", reading: "みずのこきゅう", meaning: "Water Breathing" },
  { jp: "斬る", reading: "きる", meaning: "to cut / slash" },
  { jp: "修行", reading: "しゅぎょう", meaning: "training / discipline" },
  { jp: "仲間", reading: "なかま", meaning: "comrade / ally" },
  { jp: "強さ", reading: "つよさ", meaning: "strength / power" },
];

export default function Watch() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [aiSubs, setAiSubs] = useState(true);
  const [deck, setDeck] = useState<Set<string>>(new Set(["鬼"]));

  const selected = subtitleWords[selectedIdx];
  const inDeck = deck.has(selected.jp);

  const toggleDeck = () => {
    setDeck((prev) => {
      const next = new Set(prev);
      if (next.has(selected.jp)) next.delete(selected.jp);
      else next.add(selected.jp);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#050508" }}>
      <Nav />

      <main className="flex-1 flex flex-col items-center px-6 py-4 gap-4">

        {/* Video player */}
        <div className="w-full max-w-5xl">
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{ aspectRatio: "16/9", background: "#0a0a0a" }}
          >
            {/* Fake video bg */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a0a 100%)" }}
            >
              <div className="text-center" style={{ color: "rgba(255,255,255,0.07)" }}>
                <div className="text-7xl mb-2">▶</div>
                <div className="text-sm tracking-widest uppercase">{CURRENT_EPISODE.show} · {CURRENT_EPISODE.epLabel}</div>
              </div>
            </div>

            {/* Subtitle bar */}
            {aiSubs && (
              <div className="absolute bottom-14 left-0 right-0 flex justify-center px-4">
                <div
                  className="px-6 py-2 rounded-lg flex gap-5 text-xl"
                  style={{ background: "rgba(0,0,0,0.85)" }}
                >
                  {subtitleWords.map((w, i) => (
                    <span
                      key={w.jp}
                      onClick={() => setSelectedIdx(i)}
                      className="cursor-pointer transition-colors"
                      style={{
                        color: i === selectedIdx ? "#fde68a" : "#fff",
                        borderBottom: i === selectedIdx ? "2px solid var(--gold)" : "2px solid transparent",
                      }}
                    >
                      {w.jp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Video controls */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-2"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
            >
              <button className="text-white text-sm opacity-70 hover:opacity-100 transition-opacity">⏮</button>
              <button className="text-white text-lg opacity-90 hover:opacity-100 transition-opacity">⏸</button>
              <button className="text-white text-sm opacity-70 hover:opacity-100 transition-opacity">⏭</button>
              <div className="flex-1 rounded-full h-1 relative cursor-pointer" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full" style={{ width: "38%", background: "var(--primary)" }} />
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{ left: "38%", top: "50%", transform: "translate(-50%, -50%)", background: "#fff" }}
                />
              </div>
              <span className="text-white text-xs opacity-70">08:24 / 22:10</span>
              <button
                className="text-xs px-2 py-0.5 rounded font-medium transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
              >
                JP
              </button>
              <button
                onClick={() => setAiSubs((v) => !v)}
                className="text-xs px-2 py-0.5 rounded font-medium transition-all"
                style={
                  aiSubs
                    ? { background: "var(--primary)", color: "#fff", border: "none" }
                    : { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.3)" }
                }
              >
                {aiSubs ? "AI subs ON" : "AI subs OFF"}
              </button>
            </div>
          </div>
        </div>

        {/* Word detail + upcoming */}
        <div className="w-full max-w-5xl grid grid-cols-3 gap-4">
          {/* Selected word panel */}
          <div
            className="col-span-1 rounded-xl p-4 flex flex-col gap-3"
            style={{ background: "var(--surface)", border: `1px solid ${aiSubs ? "var(--gold)" : "var(--border)"}` }}
          >
            {aiSubs ? (
              <>
                <div className="flex items-start gap-3">
                  <span className="text-5xl font-bold" style={{ color: "#fde68a" }}>
                    {selected.jp}
                  </span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {selected.reading}{" "}
                      <span className="font-normal text-xs" style={{ color: "var(--text-muted)" }}>
                        ({selected.romaji})
                      </span>
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {selected.meaning}
                    </div>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      <Badge text={selected.jlpt} variant="level" />
                      <Badge text={`seen ${selected.seenCount}×`} variant="muted" />
                      {inDeck && <Badge text="in deck" variant="green" />}
                    </div>
                  </div>
                </div>

                <div
                  className="text-xs rounded-lg p-2.5"
                  style={{ background: "var(--surface-3)", color: "var(--text-muted)", borderLeft: "2px solid var(--gold)" }}
                >
                  {selected.context}
                </div>

                <div>
                  <div className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                    Related:
                  </div>
                  {selected.compounds.map((c) => (
                    <div key={c} className="text-xs" style={{ color: "var(--text)" }}>
                      {c}
                    </div>
                  ))}
                </div>

                <button
                  onClick={toggleDeck}
                  className="w-full py-2 rounded-lg text-xs font-semibold transition-all"
                  style={
                    inDeck
                      ? { background: "rgba(74,222,128,0.1)", color: "var(--green)", border: "1px solid var(--green)" }
                      : { background: "var(--gold-dim)", color: "var(--gold)", border: "1px solid var(--gold)" }
                  }
                >
                  {inDeck ? "✓ In review deck" : "+ Add to review deck"}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
                <div className="text-2xl">🤖</div>
                <div className="text-sm text-center" style={{ color: "var(--text-muted)" }}>
                  AI subtitles are off
                </div>
                <button
                  onClick={() => setAiSubs(true)}
                  className="text-xs px-3 py-1.5 rounded-lg mt-2"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  Turn on AI subs
                </button>
              </div>
            )}
          </div>

          {/* Upcoming vocabulary */}
          <div
            className="col-span-2 rounded-xl p-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
              New words coming up in this scene
            </div>
            <div className="grid grid-cols-3 gap-2">
              {upcomingWords.map((w) => (
                <div
                  key={w.jp}
                  className="rounded-lg p-3 flex flex-col gap-1"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border)" }}
                >
                  <span className="text-lg font-bold" style={{ color: "var(--text)" }}>{w.jp}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{w.reading}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{w.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
