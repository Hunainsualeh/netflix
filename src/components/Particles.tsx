"use client";

import { useEffect, useRef } from "react";
import type { ParticleKind } from "@/lib/types";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  ph: number;
  rot: number;
  vr: number;
  c: string;
}

const PALETTES: Record<Exclude<ParticleKind, "none">, string[]> = {
  stars: ["#ffffff", "#dfe8ff", "#fff3d6"],
  sparkles: ["#ffffff", "#ffe9a8", "#ffd1dc"],
  petals: ["#f6b5c6", "#ffd9e2", "#ffffff", "#f08fa9"],
  fireflies: ["#ffe58a", "#ffd25e", "#fff6c9"],
  bubbles: ["#ffffff", "#ffd1e6", "#cfe9ff"],
  confetti: ["#e50914", "#ffd25e", "#ffffff", "#ff8fb1", "#7fd3c2", "#ffb37a"],
};

/** Lightweight canvas ambience. Respects `paused` so the player can freeze it. */
export function Particles({ kind, paused = false }: { kind: ParticleKind; paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (kind === "none") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    const palette = PALETTES[kind];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const make = (initial: boolean): P => {
      const c = palette[Math.floor(Math.random() * palette.length)];
      const base: P = {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        r: 1,
        a: 1,
        ph: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 2,
        c,
      };
      switch (kind) {
        case "stars":
          base.r = Math.random() * 1.6 + 0.4;
          break;
        case "sparkles":
          base.r = Math.random() * 5 + 3;
          base.vy = -4 - Math.random() * 8;
          break;
        case "petals":
          if (!initial) base.y = -20;
          base.r = Math.random() * 6 + 5;
          base.vy = 18 + Math.random() * 26;
          base.vx = -10 + Math.random() * 20;
          break;
        case "fireflies":
          base.r = Math.random() * 2.5 + 1.5;
          base.vx = (Math.random() - 0.5) * 14;
          base.vy = (Math.random() - 0.5) * 14;
          break;
        case "bubbles":
          if (!initial) base.y = h + 20;
          base.r = Math.random() * 14 + 5;
          base.vy = -(14 + Math.random() * 26);
          base.vx = (Math.random() - 0.5) * 8;
          break;
        case "confetti":
          if (!initial) base.y = -20;
          else base.y = Math.random() * h * 0.5 - h * 0.3;
          base.r = Math.random() * 5 + 4;
          base.vy = 60 + Math.random() * 110;
          base.vx = (Math.random() - 0.5) * 60;
          base.vr = (Math.random() - 0.5) * 8;
          break;
      }
      return base;
    };

    let list: P[] = [];
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density: Record<string, number> = {
        stars: 1 / 5500,
        sparkles: 1 / 14000,
        petals: 1 / 22000,
        fireflies: 1 / 30000,
        bubbles: 1 / 28000,
        confetti: 1 / 5500,
      };
      const n = Math.max(10, Math.round(w * h * density[kind]));
      list = Array.from({ length: n }, () => make(true));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (pausedRef.current) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.ph += dt * (kind === "stars" ? 1.4 : 2);
        p.rot += p.vr * dt;
        if (kind === "fireflies") {
          p.vx += (Math.random() - 0.5) * 20 * dt;
          p.vy += (Math.random() - 0.5) * 20 * dt;
        }
        p.x += p.vx * dt + (kind === "petals" ? Math.sin(p.ph) * 14 * dt : 0);
        p.y += p.vy * dt;

        let alpha = 1;
        if (kind === "stars") alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.ph));
        if (kind === "fireflies") alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(p.ph * 0.8));
        if (kind === "sparkles") alpha = Math.max(0, Math.sin(p.ph)) * 0.9;
        if (kind === "bubbles") alpha = 0.55;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.c;
        ctx.strokeStyle = p.c;

        switch (kind) {
          case "stars":
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.283);
            ctx.fill();
            break;
          case "sparkles": {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.beginPath();
            const s = p.r;
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(0, 0, s, 0);
            ctx.quadraticCurveTo(0, 0, 0, s);
            ctx.quadraticCurveTo(0, 0, -s, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s);
            ctx.fill();
            ctx.restore();
            break;
          }
          case "petals":
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.283);
            ctx.fill();
            ctx.restore();
            break;
          case "fireflies": {
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            g.addColorStop(0, p.c);
            g.addColorStop(1, "rgba(255,229,138,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 6, 0, 6.283);
            ctx.fill();
            break;
          }
          case "bubbles":
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.283);
            ctx.stroke();
            ctx.globalAlpha = 0.18;
            ctx.fill();
            break;
          case "confetti":
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
            ctx.restore();
            break;
        }

        const out = p.y < -40 || p.y > h + 40 || p.x < -40 || p.x > w + 40;
        if (out) {
          if (kind === "stars" || kind === "fireflies") {
            p.x = (p.x + w + 40) % (w + 40);
            p.y = (p.y + h + 40) % (h + 40);
          } else if (kind === "sparkles") {
            list[i] = make(true);
          } else {
            list[i] = make(false);
            list[i].x = Math.random() * w;
          }
        } else if (kind === "sparkles" && p.ph > Math.PI) {
          list[i] = make(true);
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [kind]);

  if (kind === "none") return null;
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
