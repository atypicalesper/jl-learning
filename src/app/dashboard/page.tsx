import { Box, Nav, Badge } from "@/components/wireframe/WireframeShell";

const todayLessons = [
  { anime: "Demon Slayer", ep: "EP 3", topic: "Vocab: Fighting terms", words: 12, done: true },
  { anime: "Demon Slayer", ep: "EP 3", topic: "Grammar: て-form", words: 0, done: false },
  { anime: "Spy x Family", ep: "EP 1", topic: "Vocab: Greetings", words: 8, done: false },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white font-mono flex flex-col">
      <Nav active="Dashboard" />

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full flex flex-col gap-8">

        {/* Top stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Day Streak", value: "14 🔥" },
            { label: "Words Learned", value: "342" },
            { label: "Grammar Points", value: "28" },
            { label: "Hours Watched", value: "9.5" },
          ].map((s) => (
            <div key={s.label} className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</span>
              <span className="text-2xl font-bold text-gray-800">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Today's lessons */}
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="font-bold text-gray-800 text-lg">Today's Lessons</h2>
            {todayLessons.map((l) => (
              <div key={l.topic} className={`border-2 border-dashed rounded-lg p-4 flex items-center gap-4 ${l.done ? "border-gray-300 bg-gray-50" : "border-gray-400 hover:bg-gray-50 cursor-pointer"}`}>
                <Box label="thumb" className="w-14 h-14 shrink-0" />
                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <Badge text={l.anime} />
                    <Badge text={l.ep} />
                    {l.done && <Badge text="✓ done" />}
                  </div>
                  <div className="font-bold text-gray-700 mt-1">{l.topic}</div>
                  {l.words > 0 && <div className="text-xs text-gray-400 mt-0.5">{l.words} words</div>}
                </div>
                {!l.done && (
                  <button className="border-2 border-dashed border-gray-800 text-gray-800 text-sm px-3 py-1 rounded hover:bg-gray-100">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-800 text-lg">Due for Review</h2>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col gap-2">
              <span className="text-3xl font-bold text-gray-800">47</span>
              <span className="text-xs text-gray-400">cards due today</span>
              <button className="mt-2 w-full border-2 border-dashed border-gray-800 text-gray-800 text-sm py-2 rounded hover:bg-gray-100">
                Review Now
              </button>
            </div>

            <h2 className="font-bold text-gray-800 text-lg mt-2">Continue Watching</h2>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col gap-2">
              <Box label="thumbnail" className="w-full h-24" />
              <span className="text-sm font-bold text-gray-700">Demon Slayer EP 4</span>
              <span className="text-xs text-gray-400">12 new words detected</span>
              <button className="mt-1 w-full border-2 border-dashed border-gray-800 text-gray-800 text-sm py-2 rounded hover:bg-gray-100">
                Watch + Learn
              </button>
            </div>
          </div>
        </div>

        {/* Weekly progress bar */}
        <div>
          <h2 className="font-bold text-gray-800 text-lg mb-3">This Week</h2>
          <div className="flex gap-2 items-end h-16">
            {[60, 100, 80, 100, 40, 0, 0].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full border-2 border-dashed border-gray-400 rounded"
                  style={{ height: `${h}%`, minHeight: h > 0 ? "8px" : "0", background: h === 100 ? "#1f2937" : h > 0 ? "#e5e7eb" : "transparent" }}
                />
                <span className="text-xs text-gray-400">{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
