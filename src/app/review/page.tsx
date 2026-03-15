import { Box, Nav, Badge } from "@/components/wireframe/WireframeShell";

export default function Review() {
  return (
    <div className="min-h-screen bg-white font-mono flex flex-col">
      <Nav active="Review" />

      <main className="flex-1 p-8 max-w-2xl mx-auto w-full flex flex-col gap-6 items-center">

        {/* Progress */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-full h-2 border border-dashed border-gray-300">
            <div className="bg-gray-800 h-full rounded-full" style={{ width: "28%" }} />
          </div>
          <span className="text-xs text-gray-400 shrink-0">13 / 47 cards</span>
          <button className="text-xs text-gray-400 border border-dashed border-gray-300 px-2 py-0.5 rounded hover:bg-gray-50">
            ✕ quit
          </button>
        </div>

        {/* Flashcard */}
        <div className="w-full border-2 border-dashed border-gray-400 rounded-2xl p-10 flex flex-col items-center gap-6 min-h-64 justify-center">
          <Badge text="Demon Slayer · EP 3" />
          <div className="text-7xl font-bold text-gray-800">呼吸</div>

          {/* Front — before flip */}
          <p className="text-gray-400 text-sm">What does this mean?</p>
          <button className="border-2 border-dashed border-gray-800 px-6 py-2 rounded text-sm text-gray-800 hover:bg-gray-50">
            Show Answer ↓
          </button>
        </div>

        {/* Answer revealed state */}
        <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-4 bg-gray-50">
          <div className="text-2xl font-bold text-gray-700">こきゅう — kokyuu</div>
          <div className="text-xl text-gray-600">breathing</div>
          <div className="border-t border-dashed border-gray-300 w-full pt-4 text-sm text-gray-500 text-center">
            Used in <span className="font-bold text-gray-700">全集中の呼吸</span> — Total Concentration Breathing.<br />
            Tanjiro uses this technique to enhance his physical abilities.
          </div>
          <Box label="scene clip thumbnail (optional)" className="w-full h-20" />

          {/* SRS rating buttons */}
          <div className="flex gap-3 w-full mt-2">
            {[
              { label: "Again", sub: "< 1 min", color: "border-red-400 text-red-500 hover:bg-red-50" },
              { label: "Hard", sub: "6 min", color: "border-orange-400 text-orange-500 hover:bg-orange-50" },
              { label: "Good", sub: "1 day", color: "border-gray-800 text-gray-800 bg-gray-800 text-white hover:bg-gray-700" },
              { label: "Easy", sub: "4 days", color: "border-green-400 text-green-600 hover:bg-green-50" },
            ].map((b) => (
              <button
                key={b.label}
                className={`flex-1 border-2 border-dashed rounded-lg py-3 flex flex-col items-center gap-0.5 transition ${b.color}`}
              >
                <span className={`font-bold text-sm ${b.label === "Good" ? "text-white" : ""}`}>{b.label}</span>
                <span className={`text-xs ${b.label === "Good" ? "text-gray-300" : "text-gray-400"}`}>{b.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Session stats */}
        <div className="flex gap-6 text-sm text-gray-400">
          <span>✓ <span className="text-gray-700 font-bold">9</span> correct</span>
          <span>✗ <span className="text-gray-700 font-bold">4</span> again</span>
          <span>⏱ <span className="text-gray-700 font-bold">6m 32s</span></span>
        </div>
      </main>
    </div>
  );
}
