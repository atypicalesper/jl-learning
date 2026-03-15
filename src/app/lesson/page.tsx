import { Box, Nav, Badge } from "@/components/wireframe/WireframeShell";

const vocab = [
  { jp: "鬼", reading: "おに", romaji: "oni", meaning: "demon / ogre", seen: 3 },
  { jp: "剣", reading: "けん", romaji: "ken", meaning: "sword", seen: 5 },
  { jp: "呼吸", reading: "こきゅう", romaji: "kokyuu", meaning: "breathing", seen: 8 },
  { jp: "兄", reading: "あに", romaji: "ani", meaning: "older brother", seen: 2 },
];

export default function Lesson() {
  return (
    <div className="min-h-screen bg-white font-mono flex flex-col">
      <Nav active="Lesson" />

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Box label="poster" className="w-16 h-20 shrink-0" />
          <div>
            <div className="flex gap-2 mb-1">
              <Badge text="Demon Slayer" />
              <Badge text="Episode 3" />
              <Badge text="N4 level" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">"Sabito and Makomo"</h1>
            <p className="text-sm text-gray-500">12 new words · 2 grammar points · ~15 min</p>
          </div>
          <button className="ml-auto border-2 border-dashed border-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-50">
            ▶ Watch Episode
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Vocab list */}
          <div className="col-span-2 flex flex-col gap-3">
            <h2 className="font-bold text-gray-800">Vocabulary from this episode</h2>
            {vocab.map((v) => (
              <div key={v.jp} className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
                <div className="text-3xl text-gray-800 w-12 text-center">{v.jp}</div>
                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-gray-700">{v.reading}</span>
                    <span className="text-gray-400 text-sm">({v.romaji})</span>
                  </div>
                  <div className="text-gray-600 text-sm">{v.meaning}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">heard {v.seen}x in ep</div>
                  <button className="mt-1 text-xs border border-dashed border-gray-400 px-2 py-0.5 rounded hover:bg-gray-100">
                    + add to deck
                  </button>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-400 text-gray-500 py-2 rounded text-sm hover:bg-gray-50">
              Show all 12 words ↓
            </button>
          </div>

          {/* Grammar panel */}
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-800">Grammar Points</h2>

            <div className="border-2 border-dashed border-gray-800 rounded-lg p-4 flex flex-col gap-2">
              <Badge text="て-form" />
              <p className="text-sm text-gray-700 mt-1">Used to connect actions or make requests.</p>
              <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-2 text-xs text-gray-600">
                食べて — tabete — "eat and..." or "please eat"
              </div>
              <div className="text-xs text-gray-400 mt-1">Heard 4x in this episode</div>
            </div>

            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col gap-2">
              <Badge text="～ながら" />
              <p className="text-sm text-gray-700 mt-1">Doing two things simultaneously.</p>
              <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-2 text-xs text-gray-600">
                走りながら — hashirinagara — "while running"
              </div>
            </div>

            <h2 className="font-bold text-gray-800 mt-2">AI Context</h2>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-sm text-gray-600">
              <Box label="AI explanation area" className="w-full h-20" />
              <p className="text-xs text-gray-400 mt-2">Click any word to get a deep explanation with anime context</p>
            </div>
          </div>
        </div>

        {/* Progress bar + CTA */}
        <div className="border-t-2 border-dashed border-gray-200 pt-4 flex items-center gap-4">
          <div className="flex-1 bg-gray-100 rounded-full h-2 border border-dashed border-gray-300">
            <div className="bg-gray-800 h-full rounded-full" style={{ width: "33%" }} />
          </div>
          <span className="text-xs text-gray-400">4 / 12 words reviewed</span>
          <button className="border-2 border-dashed border-gray-800 bg-gray-800 text-white px-5 py-2 rounded text-sm hover:bg-gray-700">
            Continue →
          </button>
        </div>
      </main>
    </div>
  );
}
