import { Box, Badge } from "@/components/wireframe/WireframeShell";

const animes = ["Attack on Titan", "Demon Slayer", "Jujutsu Kaisen", "Naruto", "One Piece", "Spy x Family"];
const levels = ["Complete Beginner", "Knows Hiragana", "N5", "N4", "N3+"];

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-white font-mono flex flex-col items-center justify-center p-10 gap-8">
      {/* Step indicator */}
      <div className="flex gap-3">
        {["Anime", "Level", "Goal"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-xs ${i === 0 ? "bg-gray-800 text-white border-gray-800" : "text-gray-400"}`}>
              {i + 1}
            </div>
            <span className={`text-sm ${i === 0 ? "text-gray-800 font-bold" : "text-gray-400"}`}>{s}</span>
            {i < 2 && <span className="text-gray-300 ml-2">──</span>}
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800">Which anime do you love?</h2>
        <p className="text-gray-500 text-sm -mt-4">We'll build your lessons from shows you actually watch.</p>

        {/* Anime grid */}
        <div className="grid grid-cols-3 gap-3">
          {animes.map((a) => (
            <div key={a} className={`border-2 border-dashed border-gray-400 rounded-lg p-3 flex flex-col gap-2 cursor-pointer hover:bg-gray-50 ${a === "Demon Slayer" ? "border-gray-800 bg-gray-100" : ""}`}>
              <Box label="poster" className="w-full h-20" />
              <span className="text-xs text-gray-600">{a}</span>
              {a === "Demon Slayer" && <Badge text="selected" />}
            </div>
          ))}
        </div>

        <Box label="+ search for any anime" className="w-full h-10" />

        {/* Level */}
        <h2 className="text-2xl font-bold text-gray-800 mt-2">What's your level?</h2>
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <div key={l} className={`border-2 border-dashed rounded-full px-4 py-1 text-sm cursor-pointer ${l === "Complete Beginner" ? "border-gray-800 bg-gray-800 text-white" : "border-gray-400 text-gray-500 hover:bg-gray-50"}`}>
              {l}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-4 w-full bg-gray-800 text-white font-bold py-3 rounded-lg border-2 border-gray-800 hover:bg-gray-700 transition">
          Start Learning →
        </button>
      </div>
    </main>
  );
}
