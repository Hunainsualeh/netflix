"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { audio } from "./audio";

interface Progress {
  ep: number;
  /** ms into the episode */
  t: number;
  /** 0..1 over the whole title */
  pct: number;
}

interface Persisted {
  myList: Record<string, string[]>;
  liked: Record<string, string[]>;
  watched: Record<string, string[]>;
  progress: Record<string, Record<string, Progress>>;
  unlocked: Record<string, boolean>;
  studioSeen: Record<string, boolean>;
  reminders: string[];
  autoplay: boolean;
  muted: boolean;
  volume: number;
  lastProfile: string | null;
}

const DEFAULTS: Persisted = {
  myList: {},
  liked: {},
  watched: {},
  progress: {},
  unlocked: {},
  studioSeen: {},
  reminders: [],
  autoplay: true,
  muted: false,
  volume: 0.7,
  lastProfile: null,
};

const KEY = "fakiha-originals:v1";

interface Ctx extends Persisted {
  ready: boolean;
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
  /** consecutive titles auto-played in this sitting */
  streak: number;
  setStreak: (n: number) => void;
  toggleList: (slug: string, id: string) => boolean;
  toggleLike: (slug: string, id: string) => boolean;
  markWatched: (slug: string, id: string) => void;
  saveProgress: (slug: string, id: string, p: Progress) => void;
  unlockFinale: (slug: string) => void;
  markStudioSeen: (slug: string) => void;
  toggleReminder: (key: string) => boolean;
  setAutoplay: (v: boolean) => void;
  setMuted: (v: boolean) => void;
  setVolume: (v: number) => void;
  setLastProfile: (slug: string | null) => void;
  toast: (msg: string) => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Persisted>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDoneState] = useState(true);
  const [streak, setStreak] = useState(0);
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Persisted>) };
        setData(parsed);
        audio.volume = parsed.volume;
        audio.muted = parsed.muted;
      }
    } catch {}
    setReady(true);
  }, []);

  const update = useCallback((fn: (d: Persisted) => Persisted) => {
    setData((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const toast = useCallback((msg: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const setIntroDone = useCallback((v: boolean) => {
    setIntroDoneState(v);
    try {
      if (v) sessionStorage.setItem("fakiha-intro", "1");
      else sessionStorage.removeItem("fakiha-intro");
    } catch {}
  }, []);

  const toggleIn = (field: "myList" | "liked", slug: string, id: string) => {
    const added = !(data[field][slug] ?? []).includes(id);
    update((d) => {
      const cur = d[field][slug] ?? [];
      const next = added ? (cur.includes(id) ? cur : [...cur, id]) : cur.filter((x) => x !== id);
      return { ...d, [field]: { ...d[field], [slug]: next } };
    });
    return added;
  };

  const value = useMemo<Ctx>(
    () => ({
      ...data,
      ready,
      introDone,
      setIntroDone,
      streak,
      setStreak,
      toggleList: (slug, id) => toggleIn("myList", slug, id),
      toggleLike: (slug, id) => toggleIn("liked", slug, id),
      markWatched: (slug, id) =>
        update((d) => {
          const cur = d.watched[slug] ?? [];
          return cur.includes(id) ? d : { ...d, watched: { ...d.watched, [slug]: [...cur, id] } };
        }),
      saveProgress: (slug, id, p) =>
        update((d) => ({
          ...d,
          progress: { ...d.progress, [slug]: { ...(d.progress[slug] ?? {}), [id]: p } },
        })),
      unlockFinale: (slug) => update((d) => ({ ...d, unlocked: { ...d.unlocked, [slug]: true } })),
      markStudioSeen: (slug) => update((d) => ({ ...d, studioSeen: { ...d.studioSeen, [slug]: true } })),
      toggleReminder: (key) => {
        const on = !data.reminders.includes(key);
        update((d) => ({ ...d, reminders: on ? [...d.reminders, key] : d.reminders.filter((k) => k !== key) }));
        return on;
      },
      setAutoplay: (v) => update((d) => ({ ...d, autoplay: v })),
      setMuted: (v) => {
        audio.setMuted(v);
        update((d) => ({ ...d, muted: v }));
      },
      setVolume: (v) => {
        audio.setVolume(v);
        update((d) => ({ ...d, volume: v }));
      },
      setLastProfile: (slug) => update((d) => ({ ...d, lastProfile: slug })),
      toast,
    }),
    [data, ready, introDone, setIntroDone, streak, update, toast],
  );

  return (
    <StoreCtx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[200] flex flex-col items-center gap-2 px-4 md:bottom-10">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              className="max-w-sm rounded-md bg-white px-4 py-2.5 text-center text-sm font-medium text-black shadow-2xl"
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </StoreCtx.Provider>
  );
}
