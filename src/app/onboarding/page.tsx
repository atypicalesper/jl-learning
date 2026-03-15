"use client";
import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const animes = [
  { name: "Demon Slayer", jp: "鬼滅の刃", genres: ["Action", "Supernatural"], levels: ["N5", "N4"] },
  { name: "Spy x Family", jp: "スパイファミリー", genres: ["Comedy", "Action"], levels: ["N5"] },
  { name: "Attack on Titan", jp: "進撃の巨人", genres: ["Action", "Drama"], levels: ["N4", "N3"] },
  { name: "Jujutsu Kaisen", jp: "呪術廻戦", genres: ["Action", "Supernatural"], levels: ["N4"] },
  { name: "Naruto", jp: "ナルト", genres: ["Action", "Adventure"], levels: ["N5", "N4"] },
  { name: "One Piece", jp: "ワンピース", genres: ["Adventure", "Comedy"], levels: ["N4", "N3"] },
];

const levels = [
  { id: "beginner", label: "Complete Beginner", sub: "I don't know any Japanese" },
  { id: "hiragana", label: "Knows Kana", sub: "I can read hiragana & katakana" },
  { id: "n5", label: "JLPT N5", sub: "~800 words, basic sentences" },
  { id: "n4", label: "JLPT N4", sub: "~1,500 words, simple conversations" },
  { id: "n3plus", label: "N3 or above", sub: "Intermediate and beyond" },
];

const goals = [
  { id: "casual", label: "Casual enjoyment", icon: "🎌", sub: "Understand anime without subs" },
  { id: "jlpt", label: "Pass JLPT", icon: "📋", sub: "Structured exam preparation" },
  { id: "fluent", label: "Become fluent", icon: "🗣️", sub: "Full conversational ability" },
  { id: "travel", label: "Travel to Japan", icon: "✈️", sub: "Practical everyday Japanese" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selectedAnime, setSelectedAnime] = useState<string[]>(["Demon Slayer"]);
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedGoal, setSelectedGoal] = useState("casual");

  const toggleAnime = (name: string) => {
    setSelectedAnime((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const steps = ["Anime", "Level", "Goal"];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Logo */}
      <div className="mb-10 text-center">
        <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>
          JLP
        </div>
        <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Learn Japanese Through Anime
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className="flex items-center gap-2"
              style={{ cursor: i < step ? "pointer" : "default" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: i === step ? "var(--primary)" : i < step ? "var(--surface-3)" : "var(--surface-2)",
                  color: i === step ? "#fff" : i < step ? "var(--green)" : "var(--text-muted)",
                  border: i < step ? "1px solid var(--green)" : "none",
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: i === step ? "var(--text)" : "var(--text-muted)" }}
              >
                {s}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div
                className="w-8 h-px mx-1"
                style={{ background: i < step ? "var(--green)" : "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl">
        {/* Step 0: Anime */}
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                Which anime do you love?
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                We'll build your lessons from shows you actually watch. Pick as many as you want.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {animes.map((a) => {
                const selected = selectedAnime.includes(a.name);
                return (
                  <button
                    key={a.name}
                    onClick={() => toggleAnime(a.name)}
                    className="rounded-xl p-3 flex flex-col gap-2 text-left transition-all"
                    style={{
                      background: selected ? "var(--primary-dim)" : "var(--surface)",
                      border: `1px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                    }}
                  >
                    {/* Poster placeholder */}
                    <div
                      className="w-full h-24 rounded-lg flex items-center justify-center text-3xl"
                      style={{ background: "var(--surface-3)" }}
                    >
                      {selected ? "✓" : "🎬"}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                        {a.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {a.jp}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {a.levels.map((l) => (
                        <Badge key={l} text={l} variant="level" />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <span style={{ color: "var(--text-muted)" }}>🔍</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Search for any anime...
              </span>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => setStep(1)}
              disabled={selectedAnime.length === 0}
            >
              Continue with {selectedAnime.length} anime →
            </Button>
          </div>
        )}

        {/* Step 1: Level */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                What's your current level?
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                We'll calibrate difficulty and focus areas for you.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {levels.map((l) => {
                const selected = selectedLevel === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLevel(l.id)}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      background: selected ? "var(--primary-dim)" : "var(--surface)",
                      border: `1px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full shrink-0 transition-all"
                      style={{
                        background: selected ? "var(--primary)" : "var(--surface-3)",
                        border: selected ? "none" : "2px solid var(--border-2)",
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                        {l.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {l.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(0)}>
                ← Back
              </Button>
              <Button variant="primary" fullWidth onClick={() => setStep(2)}>
                Continue →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                What's your main goal?
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                This helps us prioritize what you learn first.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {goals.map((g) => {
                const selected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className="flex flex-col items-start gap-2 px-4 py-4 rounded-xl text-left transition-all"
                    style={{
                      background: selected ? "var(--primary-dim)" : "var(--surface)",
                      border: `1px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                    }}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                        {g.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {g.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button variant="gold" fullWidth>
                  Start Learning 🎌
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
