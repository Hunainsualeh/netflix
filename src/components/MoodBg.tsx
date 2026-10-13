import type { Mood } from "@/lib/types";

const MOODS: Record<Mood, { base: string; a: string; b: string }> = {
  night: { base: "#05060d", a: "rgba(46,64,138,0.55)", b: "rgba(90,50,120,0.4)" },
  dawn: { base: "#110a0e", a: "rgba(226,140,108,0.45)", b: "rgba(110,76,130,0.45)" },
  sunset: { base: "#120808", a: "rgba(255,122,69,0.45)", b: "rgba(194,51,90,0.45)" },
  ocean: { base: "#040c13", a: "rgba(27,111,168,0.5)", b: "rgba(43,182,196,0.35)" },
  forest: { base: "#050b07", a: "rgba(47,122,79,0.5)", b: "rgba(158,194,122,0.28)" },
  garden: { base: "#0a0a0f", a: "rgba(217,107,140,0.42)", b: "rgba(107,163,90,0.35)" },
  castle: { base: "#07091a", a: "rgba(201,162,90,0.4)", b: "rgba(90,111,176,0.5)" },
  candy: { base: "#12070d", a: "rgba(255,127,176,0.48)", b: "rgba(255,211,107,0.35)" },
  ember: { base: "#0d0605", a: "rgba(229,88,58,0.45)", b: "rgba(242,166,90,0.32)" },
};

/** Dark base with two slowly drifting soft glows – the "set" behind text scenes. */
export function MoodBg({ mood = "night" }: { mood?: Mood }) {
  const m = MOODS[mood];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: m.base }}>
      <div
        className="drift-a absolute -left-1/4 -top-1/4 h-[90%] w-[90%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${m.a} 0%, transparent 68%)` }}
      />
      <div
        className="drift-b absolute -bottom-1/3 -right-1/4 h-[100%] w-[100%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${m.b} 0%, transparent 68%)` }}
      />
    </div>
  );
}
