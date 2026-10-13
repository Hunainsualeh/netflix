"use client";

import {
  ArrowLeft,
  ChevronsRight,
  ListVideo,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRef } from "react";
import { formatClock } from "@/lib/timing";

interface Props {
  visible: boolean;
  title: string;
  epLabel: string;
  t: number;
  total: number;
  ticks: number[];
  sceneIndex: number;
  sceneCount: number;
  playing: boolean;
  muted: boolean;
  volume: number;
  fs: boolean;
  canFs: boolean;
  hasNextEp: boolean;
  hasEpisodes: boolean;
  accent: string;
  onBack: () => void;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onScrub: (pct: number, phase: "start" | "move" | "end") => void;
  onMute: () => void;
  onVolume: (v: number) => void;
  onFullscreen: () => void;
  onReplay: () => void;
  onEpisodes: () => void;
  onNextEp: () => void;
}

const btn =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15 active:scale-90 md:h-12 md:w-12";

export function Controls(p: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pct = p.total ? Math.min(1, p.t / p.total) : 0;

  const pctFromEvent = (e: React.PointerEvent) => {
    const r = trackRef.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  };

  const VolIcon = p.muted || p.volume === 0 ? VolumeX : p.volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 ${
        p.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* top */}
      <div className="pt-safe pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent pb-10">
        <div className={`flex items-center gap-2 px-3 pt-3 md:px-8 md:pt-6 ${p.visible ? "pointer-events-auto" : ""}`}>
          <button onClick={p.onBack} aria-label="Back to browsing" className={btn}>
            <ArrowLeft className="h-7 w-7" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-base font-bold md:text-xl">{p.title}</p>
            {p.epLabel && <p className="truncate text-xs text-white/70 md:text-sm">{p.epLabel}</p>}
          </div>
        </div>
      </div>

      {/* bottom */}
      <div
        className={`pb-safe absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-16 md:px-8 md:pb-6 ${
          p.visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* scrubber */}
        <div className="flex items-center gap-3">
          <div
            ref={trackRef}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct * 100)}
            tabIndex={0}
            className="group relative h-8 flex-1 cursor-pointer touch-none"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragging.current = true;
              p.onScrub(pctFromEvent(e), "start");
            }}
            onPointerMove={(e) => dragging.current && p.onScrub(pctFromEvent(e), "move")}
            onPointerUp={(e) => {
              if (!dragging.current) return;
              dragging.current = false;
              p.onScrub(pctFromEvent(e), "end");
            }}
            onPointerCancel={() => {
              dragging.current = false;
              p.onScrub(pct, "end");
            }}
          >
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/30 transition-all group-hover:h-1.5">
              <div className="h-full rounded-full bg-nf-red" style={{ width: `${pct * 100}%` }} />
              {p.ticks.map((tk, i) => (
                <span
                  key={i}
                  className="absolute top-0 h-full w-[2px] bg-black/70"
                  style={{ left: `${tk * 100}%` }}
                />
              ))}
            </div>
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nf-red shadow-lg transition-transform group-hover:scale-125"
              style={{ left: `${pct * 100}%` }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-xs tabular-nums text-white/90 md:w-14 md:text-sm">
            -{formatClock(p.total - p.t)}
          </span>
        </div>

        {/* buttons */}
        <div className="mt-1 flex items-center gap-0.5 md:gap-2">
          <button onClick={p.onToggle} aria-label={p.playing ? "Pause" : "Play"} className={btn}>
            {p.playing ? <Pause className="h-8 w-8 fill-white" /> : <Play className="h-8 w-8 fill-white" />}
          </button>
          <button onClick={p.onPrev} aria-label="Previous scene" className={btn}>
            <SkipBack className="h-6 w-6 fill-white" />
          </button>
          <button onClick={p.onNext} aria-label="Next scene" className={btn}>
            <SkipForward className="h-6 w-6 fill-white" />
          </button>

          <div className="group/vol flex items-center">
            <button onClick={p.onMute} aria-label={p.muted ? "Unmute" : "Mute"} className={btn}>
              <VolIcon className="h-6 w-6" />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={p.muted ? 0 : p.volume}
              onChange={(e) => p.onVolume(Number(e.target.value))}
              aria-label="Volume"
              className="hidden h-1 w-0 cursor-pointer rounded-full bg-white/40 opacity-0 transition-all accent-white group-hover/vol:w-24 group-hover/vol:opacity-100 focus:w-24 focus:opacity-100 md:block"
            />
          </div>

          <p className="mx-2 hidden min-w-0 flex-1 truncate text-center text-sm font-semibold md:block">
            <span style={{ color: p.accent }}>{p.sceneIndex + 1}</span>
            <span className="text-white/50"> / {p.sceneCount}</span>
          </p>
          <div className="flex-1 md:hidden" />

          <button onClick={p.onReplay} aria-label="Replay episode" className={btn}>
            <RotateCcw className="h-6 w-6" />
          </button>
          {p.hasNextEp && (
            <button onClick={p.onNextEp} aria-label="Next episode" className={btn}>
              <ChevronsRight className="h-7 w-7" />
            </button>
          )}
          {p.hasEpisodes && (
            <button onClick={p.onEpisodes} aria-label="Episodes" className={btn}>
              <ListVideo className="h-6 w-6" />
            </button>
          )}
          {p.canFs && (
            <button onClick={p.onFullscreen} aria-label={p.fs ? "Exit fullscreen" : "Fullscreen"} className={btn}>
              {p.fs ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
