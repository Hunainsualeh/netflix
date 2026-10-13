"use client";

import { useEffect, useRef } from "react";
import { MoodBg } from "@/components/MoodBg";
import { Particles } from "@/components/Particles";
import { Photo } from "@/components/Photo";
import { planScene } from "@/lib/timing";
import type { Scene, SceneFont } from "@/lib/types";

const FONT: Record<SceneFont, { body: string; head: string; letter: string }> = {
  serif: {
    body: "font-serif text-[1.65rem] leading-[1.25] sm:text-4xl md:text-5xl font-medium",
    head: "font-serif text-5xl leading-[1.02] sm:text-7xl md:text-8xl font-semibold",
    letter: "font-serif text-[1.18rem] leading-[1.45] sm:text-2xl md:text-[1.7rem] font-medium",
  },
  script: {
    body: "font-script text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl font-bold",
    head: "font-script text-6xl leading-[0.95] sm:text-8xl md:text-9xl font-bold",
    letter: "font-script text-[1.5rem] leading-[1.25] sm:text-3xl md:text-4xl font-semibold",
  },
  sans: {
    body: "font-sans text-2xl leading-tight sm:text-4xl md:text-5xl font-semibold",
    head: "font-logo text-6xl uppercase sm:text-8xl md:text-9xl",
    letter: "font-sans text-lg leading-relaxed sm:text-xl md:text-2xl",
  },
};

interface Props {
  scene: Scene;
  /** ms since this scene began */
  elapsed: number;
  playing: boolean;
  font: SceneFont;
  accent: string;
  videoVolume: number;
  videoMuted: boolean;
}

export function SceneView({ scene, elapsed, playing, font, accent, videoVolume, videoMuted }: Props) {
  const plan = planScene(scene);
  const f = FONT[font];
  const motion = scene.motion ?? "in";
  const lines = scene.lines ?? [];
  const lastVisible = plan.lines.reduce((acc, t, i) => (elapsed >= t ? i : acc), -1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = videoVolume;
    v.muted = videoMuted;
  }, [videoVolume, videoMuted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) void v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  useEffect(() => {
    const v = videoRef.current;
    if (v && Math.abs(v.currentTime - elapsed / 1000) > 0.8) v.currentTime = elapsed / 1000;
    // sync only on mount / big seeks
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.floor(elapsed / 1500)]);

  const headOn = elapsed >= plan.head;
  const headlineOn = elapsed >= (scene.eyebrow ? plan.head + 650 : plan.head);

  const lineEls = lines.map((line, i) => {
    const on = elapsed >= plan.lines[i];
    const old = on && i < lastVisible && scene.kind !== "letter";
    return (
      <p
        key={i}
        className={`reveal ${on ? "on" : ""} ${old ? "old" : ""} ${
          scene.kind === "letter" ? `${f.letter} text-white/95` : `${f.body} text-white`
        } text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.65)]`}
      >
        {line}
      </p>
    );
  });

  const eyebrow = scene.eyebrow && (
    <p
      className={`reveal ${headOn ? "on" : ""} font-sans text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-white/75 sm:text-xs`}
      style={{ color: accent }}
    >
      {scene.eyebrow}
    </p>
  );

  const headline = scene.headline && (
    <h2
      className={`reveal ${headlineOn ? "on" : ""} ${f.head} text-balance text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]`}
    >
      {scene.headline}
    </h2>
  );

  const isFinale = scene.kind === "finale";
  const hasPhoto = Boolean(scene.photo);

  return (
    <div className={`absolute inset-0 overflow-hidden ${playing ? "" : "paused"}`}>
      <MoodBg mood={scene.mood ?? "night"} />

      {hasPhoto && scene.photo && (
        <>
          {/* blurred backdrop */}
          <div className="absolute inset-0 opacity-60">
            <Photo id={scene.photo} large className="scale-125 blur-3xl brightness-50 saturate-125" />
          </div>
          {/* sharp portrait: full-bleed on phones, framed on wide screens */}
          <div className="absolute inset-0 flex items-stretch justify-center">
            <div
              className="relative h-full w-full overflow-hidden md:aspect-[3/4] md:w-auto"
              style={{ opacity: elapsed > 80 ? 1 : 0, transition: "opacity 900ms ease" }}
            >
              <div
                key={scene.photo + motion}
                className={`h-full w-full motion-${motion}`}
                style={{ ["--dur" as string]: `${plan.duration + 600}ms` }}
              >
                <Photo id={scene.photo} large />
              </div>
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        </>
      )}

      {scene.kind === "video" && scene.video && (
        <video
          ref={videoRef}
          src={scene.video}
          className="absolute inset-0 h-full w-full object-contain"
          playsInline
          autoPlay
          preload="auto"
        />
      )}

      <Particles kind={scene.particles ?? "none"} paused={!playing} />

      {/* ---- text layer ---- */}
      <div
        className={`absolute inset-0 flex flex-col px-7 pb-36 pt-24 sm:px-16 md:pb-32 ${
          hasPhoto && scene.kind !== "letter" ? "justify-end" : "justify-center"
        }`}
      >
        <div
          className={`mx-auto flex w-full flex-col gap-4 sm:gap-5 ${
            scene.kind === "letter" ? "max-w-2xl" : "max-w-4xl"
          } ${scene.kind === "title" || isFinale || (!hasPhoto && scene.kind !== "letter") ? "items-center text-center" : hasPhoto && scene.kind !== "letter" ? "items-center text-center" : "items-start text-left"}`}
        >
          {scene.kind === "letter" ? (
            <div
              className={`w-full space-y-4 rounded-sm sm:space-y-5 ${
                hasPhoto ? "bg-black/55 p-5 backdrop-blur-md sm:p-8" : ""
              }`}
            >
              {eyebrow}
              {headline}
              {lineEls}
              {scene.signoff && (
                <p
                  className={`reveal ${plan.signoff !== null && elapsed >= plan.signoff ? "on" : ""} ${f.letter} pt-2 text-right italic`}
                  style={{ color: accent }}
                >
                  {scene.signoff}
                </p>
              )}
            </div>
          ) : (
            <>
              {eyebrow}
              {headline}
              {lineEls}
              {scene.signoff && (
                <p
                  className={`reveal ${plan.signoff !== null && elapsed >= plan.signoff ? "on" : ""} ${f.body} italic`}
                  style={{ color: accent }}
                >
                  {scene.signoff}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
