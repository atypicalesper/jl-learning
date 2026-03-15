import { Box, Nav, Badge } from "@/components/wireframe/WireframeShell";

export default function Watch() {
  return (
    <div className="min-h-screen bg-gray-950 font-mono flex flex-col">
      <Nav active="Watch" />

      <main className="flex-1 flex flex-col items-center p-6 gap-4">

        {/* Video player */}
        <div className="w-full max-w-4xl">
          <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Box label="video player" className="w-full h-full rounded-none border-0 bg-gray-900 text-gray-600" />

            {/* Subtitle bar */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <div className="bg-black/80 text-white px-6 py-2 rounded text-lg flex gap-3">
                {["鬼", "を", "倒す", "ために"].map((w, i) => (
                  <span
                    key={i}
                    className={`cursor-pointer hover:text-yellow-300 border-b-2 ${i === 0 ? "border-yellow-400 text-yellow-300" : "border-transparent"}`}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-2 flex items-center gap-3">
              <button className="text-white text-sm">⏮</button>
              <button className="text-white text-sm">⏸</button>
              <button className="text-white text-sm">⏭</button>
              <div className="flex-1 bg-gray-600 rounded-full h-1">
                <div className="bg-white h-full rounded-full" style={{ width: "38%" }} />
              </div>
              <span className="text-white text-xs">08:24 / 22:10</span>
              <button className="text-white text-xs border border-dashed border-white/40 px-2 py-0.5 rounded">JP</button>
              <button className="text-white text-xs border border-white/40 px-2 py-0.5 rounded bg-white/20">AI subs ON</button>
            </div>
          </div>
        </div>

        {/* AI popup — word hover */}
        <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
          <div className="col-span-1 border-2 border-dashed border-yellow-400 bg-gray-900 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 text-3xl font-bold">鬼</span>
              <div>
                <div className="text-white text-sm">おに <span className="text-gray-400">(oni)</span></div>
                <div className="text-gray-300 text-sm">demon / ogre</div>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-700 pt-2 text-xs text-gray-400">
              In this context: Tanjiro is saying "in order to defeat the demon" — 鬼 refers to Muzan's minions
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge text="N4" />
              <Badge text="seen 8x this ep" />
              <Badge text="in your deck" />
            </div>
            <div className="border-t border-dashed border-gray-700 pt-2">
              <div className="text-xs text-gray-500 mb-1">Other uses in this anime:</div>
              <div className="text-xs text-gray-400">鬼殺隊 — Demon Slayer Corps</div>
              <div className="text-xs text-gray-400">鬼舞辻無惨 — Kibutsuji Muzan</div>
            </div>
            <button className="mt-1 w-full border border-dashed border-yellow-400 text-yellow-300 text-xs py-1 rounded hover:bg-yellow-400/10">
              + Add to review deck
            </button>
          </div>

          {/* Up next words */}
          <div className="col-span-2 border-2 border-dashed border-gray-700 bg-gray-900 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-3">New words coming up in this scene</div>
            <div className="grid grid-cols-3 gap-3">
              {["全集中", "水の呼吸", "斬る", "修行", "仲間", "強さ"].map((w) => (
                <div key={w} className="border border-dashed border-gray-700 rounded p-2 flex flex-col gap-1">
                  <span className="text-white text-lg">{w}</span>
                  <Box label="meaning" className="w-full h-5 bg-gray-800 border-gray-700 text-gray-600 text-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
