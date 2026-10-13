"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { SplashLogo } from "@/components/Logo";
import { Avatar, Photo } from "@/components/Photo";
import { formatRuntime, episodeDuration } from "@/lib/timing";
import type { Episode, PhotoId, Profile, Title } from "@/lib/types";

/* ------------------------------------------------------------------ studio intro */

export function StudioIntro({ profile, onDone }: { profile: Profile; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 5200);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.45em" }}
        transition={{ duration: 1.6, delay: 0.1 }}
        className="mb-5 text-[0.7rem] font-semibold uppercase text-white/70 sm:text-xs"
      >
        {profile.studioIntro.kicker}
      </motion.p>
      <SplashLogo size="clamp(56px, 17vw, 150px)" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className={`mt-6 max-w-md text-balance text-lg text-white/85 sm:text-xl ${
          profile.font === "script" ? "font-script text-2xl sm:text-3xl" : profile.font === "serif" ? "font-serif text-2xl sm:text-3xl" : ""
        }`}
      >
        {profile.studioIntro.line}
      </motion.p>
      <button
        onClick={onDone}
        className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-5 rounded border border-white/40 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
      >
        Skip intro
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ end / up next */

interface UpNextProps {
  mode: "next-episode" | "end";
  headline: string;
  sub?: string;
  /** What plays next, if anything */
  next?: { label: string; title: string; synopsis: string; photo: PhotoId; photoPos?: string; badge?: string };
  auto: boolean;
  seconds?: number;
  accent: string;
  onPlayNext?: () => void;
  onCancelAuto: () => void;
  onReplay: () => void;
  onBack: () => void;
}

export function EndOverlay(p: UpNextProps) {
  const fired = useRef(false);
  const seconds = p.seconds ?? 8;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm md:items-center md:p-10"
    >
      <div className="pb-safe flex w-full max-w-3xl flex-col gap-6 md:gap-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: p.accent }}>
            {p.mode === "end" ? "The end" : "Up next"}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-balance md:text-5xl">{p.headline}</h2>
          {p.sub && <p className="mt-2 text-sm text-white/70 md:text-base">{p.sub}</p>}
        </div>

        {p.next && (
          <div className="flex gap-4 overflow-hidden rounded-md bg-white/10 p-3 md:p-4">
            <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded md:aspect-video md:w-56">
              <Photo id={p.next.photo} pos={p.next.photoPos} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{p.next.label}</p>
              <p className="mt-0.5 truncate text-lg font-bold md:text-xl">{p.next.title}</p>
              <p className="mt-1 line-clamp-3 text-sm text-white/75">{p.next.synopsis}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2.5 sm:flex-row">
          {p.next && p.onPlayNext && (
            <button
              onClick={p.onPlayNext}
              className="relative flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded bg-white px-6 font-bold text-black transition hover:bg-white/85"
            >
              {p.auto && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-black/15"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: seconds, ease: "linear" }}
                  onAnimationComplete={() => {
                    if (!fired.current) {
                      fired.current = true;
                      p.onPlayNext?.();
                    }
                  }}
                />
              )}
              <Play className="relative h-5 w-5 fill-black" />
              <span className="relative">{p.auto ? "Playing next…" : "Play next"}</span>
            </button>
          )}
          {p.auto && p.next && (
            <button
              onClick={p.onCancelAuto}
              className="flex h-12 items-center justify-center gap-2 rounded bg-white/20 px-6 font-semibold transition hover:bg-white/30"
            >
              <X className="h-5 w-5" /> Stay here
            </button>
          )}
          <button
            onClick={p.onReplay}
            className="flex h-12 items-center justify-center gap-2 rounded bg-white/20 px-6 font-semibold transition hover:bg-white/30"
          >
            <RotateCcw className="h-5 w-5" /> Replay
          </button>
          <button
            onClick={p.onBack}
            className="flex h-12 items-center justify-center gap-2 rounded bg-white/20 px-6 font-semibold transition hover:bg-white/30"
          >
            <ArrowLeft className="h-5 w-5" /> Back to browsing
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ are you still watching */

export function StillWatching({
  profile,
  onYes,
  onNo,
}: {
  profile: Profile;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
      role="dialog"
      aria-modal
    >
      <motion.div
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        <Avatar profile={profile} className="mb-6 h-24 w-24 animate-floaty" />
        <h2 className="text-3xl font-bold text-balance md:text-4xl">{profile.stillWatching.headline}</h2>
        <p
          className={`mt-3 text-balance text-white/80 ${
            profile.font === "script" ? "font-script text-2xl" : profile.font === "serif" ? "font-serif text-2xl" : "text-base"
          }`}
        >
          {profile.stillWatching.body}
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={onYes}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded bg-white font-bold text-black transition hover:bg-white/85"
          >
            <Check className="h-5 w-5" /> {profile.stillWatching.yes}
          </button>
          <button
            onClick={onNo}
            className="flex h-12 flex-1 items-center justify-center rounded bg-white/20 font-semibold transition hover:bg-white/30"
          >
            {profile.stillWatching.no}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ episodes panel */

export function EpisodesPanel({
  open,
  title,
  current,
  autoplay,
  onToggleAutoplay,
  onPick,
  onClose,
}: {
  open: boolean;
  title: Title;
  current: number;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  onPick: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            className="absolute inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            className="pb-safe absolute inset-x-0 bottom-0 z-50 flex max-h-[78%] flex-col rounded-t-xl bg-[#181818] shadow-2xl md:inset-x-auto md:bottom-0 md:right-0 md:top-0 md:max-h-none md:w-[26rem] md:rounded-none"
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-lg font-bold">{title.title}</p>
                <p className="text-xs text-white/60">{title.episodes.length} episodes</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-white/10">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {title.episodes.map((ep, i) => (
                <EpisodeRow key={i} ep={ep} index={i} fallback={title.thumb} active={i === current} onPick={() => onPick(i)} />
              ))}
            </div>
            <button
              onClick={onToggleAutoplay}
              className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold">Autoplay next episode</span>
              <span
                className={`relative h-6 w-11 rounded-full transition ${autoplay ? "bg-nf-red" : "bg-white/25"}`}
                aria-checked={autoplay}
                role="switch"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${autoplay ? "left-[1.4rem]" : "left-0.5"}`}
                />
              </span>
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function episodeThumb(ep: Episode, fallback: PhotoId): PhotoId {
  return ep.scenes.find((s) => s.photo)?.photo ?? fallback;
}

export function EpisodeRow({
  ep,
  index,
  fallback,
  active,
  onPick,
}: {
  ep: Episode;
  index: number;
  fallback: PhotoId;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      onClick={onPick}
      className={`flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/10 ${active ? "bg-white/10" : ""}`}
    >
      <span className="w-5 shrink-0 text-center text-lg font-semibold text-white/60">{index + 1}</span>
      <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded bg-nf-raised">
        <Photo id={episodeThumb(ep, fallback)} />
        {active && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Play className="h-5 w-5 fill-white" />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-bold">{ep.title}</span>
          <span className="shrink-0 text-xs text-white/60">{formatRuntime(episodeDuration(ep.scenes))}</span>
        </span>
        <span className="mt-1 line-clamp-2 text-xs text-white/65">{ep.synopsis}</span>
      </span>
    </button>
  );
}
