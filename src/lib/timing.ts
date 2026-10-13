import type { Episode, Scene } from "./types";

/** Milliseconds of "reading time" per character. Letters read slower than short lines. */
const perChar = (scene: Scene) => (scene.kind === "letter" ? 46 : 36);

export interface RevealPlan {
  /** When the headline/eyebrow block appears. */
  head: number;
  /** When each line appears. */
  lines: number[];
  /** When the sign-off appears (letters). */
  signoff: number | null;
  duration: number;
}

const cache = new WeakMap<Scene, RevealPlan>();

/** Deterministic timeline for a scene so seeking and pausing are exact. */
export function planScene(scene: Scene): RevealPlan {
  const hit = cache.get(scene);
  if (hit) return hit;

  const pc = perChar(scene);
  const head = scene.eyebrow || scene.headline ? 350 : 0;
  let t = scene.headline ? 1500 : scene.eyebrow ? 1000 : scene.photo ? 1100 : 600;

  const lines: number[] = [];
  let lastLen = 0;
  for (const line of scene.lines ?? []) {
    lines.push(t);
    lastLen = line.length;
    t += 650 + line.length * pc;
  }
  let signoff: number | null = null;
  if (scene.signoff) {
    signoff = t;
    lastLen = scene.signoff.length;
    t += 500 + scene.signoff.length * pc;
  }

  let end: number;
  if (!lines.length && signoff === null) {
    end = scene.headline ? 4600 : 3600;
  } else {
    end = t + 1700;
  }
  if (scene.kind === "finale") end += 4500;
  void lastLen;

  const plan: RevealPlan = {
    head,
    lines,
    signoff,
    duration: scene.duration ?? Math.max(3200, Math.round(end)),
  };
  cache.set(scene, plan);
  return plan;
}

export const sceneDuration = (scene: Scene) => planScene(scene).duration;

export function episodeDuration(scenes: Scene[]) {
  return scenes.reduce((sum, s) => sum + sceneDuration(s), 0);
}

export function formatRuntime(ms: number) {
  const mins = Math.max(1, Math.round(ms / 60000));
  return `${mins}m`;
}

export function formatClock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function titleRuntimeMs(episodes: Episode[]) {
  return episodes.reduce((sum, e) => sum + episodeDuration(e.scenes), 0);
}
