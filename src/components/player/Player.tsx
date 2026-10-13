"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FINALE_UNLOCK_AT, regularTitles } from "@/data";
import { audio } from "@/lib/audio";
import { useStore } from "@/lib/store";
import { episodeDuration, sceneDuration } from "@/lib/timing";
import type { Profile, Title } from "@/lib/types";
import { Controls } from "./Controls";
import { EndOverlay, EpisodesPanel, StillWatching, StudioIntro, episodeThumb } from "./Overlays";
import { SceneView } from "./SceneView";

export function Player({
  profile,
  title,
  startEp,
  resume,
}: {
  profile: Profile;
  title: Title;
  startEp: number;
  resume: boolean;
}) {
  const router = useRouter();
  const S = useStore();
  const slug = profile.slug;

  const [boot, setBoot] = useState<"boot" | "intro" | "play">("boot");
  const [epIdx, setEpIdx] = useState(Math.min(startEp, title.episodes.length - 1));
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [ended, setEnded] = useState<null | "episode" | "title">(null);
  const [uiVisible, setUiVisible] = useState(true);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showStill, setShowStill] = useState(false);
  const [autoCancel, setAutoCancel] = useState(false);
  const [fs, setFs] = useState(false);
  const [canFs, setCanFs] = useState(false);
  const [flash, setFlash] = useState<null | "l" | "r" | "p">(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wasPlaying = useRef(true);
  const pending = useRef<null | (() => void)>(null);
  const markedRef = useRef(false);
  const tuneKey = useRef("");
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const ep = title.episodes[epIdx];
  const scenes = ep.scenes;
  const durs = useMemo(() => scenes.map(sceneDuration), [scenes]);
  const starts = useMemo(() => {
    let acc = 0;
    return durs.map((d) => {
      const s = acc;
      acc += d;
      return s;
    });
  }, [durs]);
  const total = useMemo(() => episodeDuration(scenes), [scenes]);

  let sceneIdx = 0;
  for (let i = 0; i < starts.length; i++) if (t >= starts[i]) sceneIdx = i;
  const scene = scenes[sceneIdx];
  const elapsed = t - starts[sceneIdx];

  const epProgress = (epIdx + Math.min(1, t / total)) / title.episodes.length;

  /* ------------------------------------------------------------ boot */
  useEffect(() => {
    if (!S.ready || boot !== "boot") return;
    const saved = S.progress[slug]?.[title.id];
    if (resume && saved && saved.pct < 0.97) {
      const e = Math.min(saved.ep, title.episodes.length - 1);
      setEpIdx(e);
      tRef.current = Math.max(0, saved.t - 1500);
      setT(tRef.current);
      setBoot("play");
    } else if (!S.studioSeen[slug] && startEp === 0 && !title.finale) {
      setBoot("intro");
      setPlaying(false);
    } else setBoot("play");
    audio.setMuted(S.muted);
    audio.setVolume(S.volume);
    setCanFs(typeof document !== "undefined" && Boolean(document.fullscreenEnabled));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [S.ready]);

  const finishIntro = useCallback(() => {
    S.markStudioSeen(slug);
    setBoot("play");
    setPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* ------------------------------------------------------------ music */
  useEffect(() => {
    if (boot === "boot") return;
    audio.startMusic(profile.music);
    const unlock = () => {
      audio.unlock();
      audio.startMusic(profile.music);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [boot, profile.music]);

  useEffect(
    () => () => {
      audio.stopMusic(true);
      audio.resume();
    },
    [],
  );

  useEffect(() => {
    if (boot === "boot") return;
    if (ended) audio.resume();
    else if (playing) audio.resume();
    else audio.suspend();
  }, [playing, ended, boot]);

  useEffect(() => {
    if (boot !== "play" || !playing || !scene?.birthdayTune) return;
    const key = `${epIdx}-${sceneIdx}`;
    if (tuneKey.current === key) return;
    tuneKey.current = key;
    audio.birthday();
  }, [boot, playing, scene, epIdx, sceneIdx]);

  /* ------------------------------------------------------------ progress / watched */
  const progressRef = useRef({ epIdx, epProgress, ended });
  progressRef.current = { epIdx, epProgress, ended };

  const persist = useCallback(() => {
    const p = progressRef.current;
    S.saveProgress(slug, title.id, {
      ep: p.epIdx,
      t: tRef.current,
      pct: p.ended === "title" ? 1 : p.epProgress,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, title.id]);

  useEffect(() => {
    if (boot !== "play") return;
    const id = setInterval(persist, 3000);
    const vis = () => {
      if (document.hidden) {
        setPlaying(false);
        persist();
      }
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
      persist();
    };
  }, [boot, persist]);

  useEffect(() => {
    if (markedRef.current || boot !== "play") return;
    if (epProgress < 0.6 && !ended) return;
    markedRef.current = true;
    const before = S.watched[slug] ?? [];
    S.markWatched(slug, title.id);
    if (!title.finale && !before.includes(title.id)) {
      const finaleIds = new Set(profile.titles.filter((x) => x.finale).map((x) => x.id));
      const count = new Set([...before, title.id].filter((id) => !finaleIds.has(id))).size;
      if (count === FINALE_UNLOCK_AT) S.toast("✨ A new episode just unlocked — check the home screen.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epProgress, ended, boot]);

  /* ------------------------------------------------------------ clock */
  const finishRef = useRef<() => void>(() => {});
  const finishEpisode = useCallback(() => {
    const last = epIdx >= title.episodes.length - 1;
    setEnded(last ? "title" : "episode");
    setAutoCancel(false);
    setUiVisible(false);
  }, [epIdx, title.episodes.length]);
  finishRef.current = finishEpisode;

  useEffect(() => {
    if (boot !== "play" || !playing || ended || scrubbing || showStill) return;
    let raf = 0;
    let last = performance.now();
    let lastPush = 0;
    const loop = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      tRef.current += dt;
      if (tRef.current >= total) {
        tRef.current = total;
        setT(total);
        finishRef.current();
        return;
      }
      if (now - lastPush > 60) {
        lastPush = now;
        setT(tRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [boot, playing, ended, scrubbing, showStill, total]);

  /* ------------------------------------------------------------ controls UI */
  const bump = useCallback(() => {
    setUiVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 3400);
  }, []);

  useEffect(() => {
    bump();
    return () => clearTimeout(hideTimer.current);
  }, [bump]);

  const seek = useCallback(
    (ms: number) => {
      const v = Math.min(total - 1, Math.max(0, ms));
      tRef.current = v;
      setT(v);
      if (ended) {
        setEnded(null);
        setPlaying(true);
      }
    },
    [total, ended],
  );

  const doFlash = (k: "l" | "r" | "p") => {
    setFlash(k);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 550);
  };

  const prevScene = useCallback(() => {
    if (elapsed > 1800 || sceneIdx === 0) seek(starts[sceneIdx]);
    else seek(starts[sceneIdx - 1]);
  }, [elapsed, sceneIdx, starts, seek]);

  const nextScene = useCallback(() => {
    if (sceneIdx >= scenes.length - 1) {
      tRef.current = total;
      setT(total);
      finishEpisode();
    } else seek(starts[sceneIdx + 1]);
  }, [sceneIdx, scenes.length, total, starts, seek, finishEpisode]);

  const togglePlay = useCallback(() => {
    if (ended) return;
    setPlaying((p) => !p);
    bump();
  }, [ended, bump]);

  const goEpisode = useCallback(
    (i: number) => {
      tRef.current = 0;
      setT(0);
      setEpIdx(i);
      setEnded(null);
      setPlaying(true);
      setShowEpisodes(false);
      markedRef.current = false;
      tuneKey.current = "";
      window.history.replaceState(null, "", `?e=${i}`);
      bump();
    },
    [bump],
  );

  const replay = useCallback(() => {
    if (ended === "title" && title.episodes.length > 1) goEpisode(0);
    else {
      tRef.current = 0;
      setT(0);
      setEnded(null);
      setPlaying(true);
      tuneKey.current = "";
      bump();
    }
  }, [ended, title.episodes.length, goEpisode, bump]);

  const goBack = useCallback(() => {
    persist();
    S.setStreak(0);
    if (document.fullscreenElement) void document.exitFullscreen();
    router.push(`/browse/${slug}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist, router, slug]);

  const toggleFs = useCallback(() => {
    const el = containerRef.current;
    if (!el || !document.fullscreenEnabled) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const h = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  /* ------------------------------------------------------------ what plays next */
  const nextTitle = useMemo<Title | null>(() => {
    if (title.finale) return null;
    const watched = new Set([...(S.watched[slug] ?? []), title.id]);
    const regular = regularTitles(profile);
    const finale = profile.titles.find((x) => x.finale);
    const regularWatched = regular.filter((x) => watched.has(x.id)).length;
    if (finale && !watched.has(finale.id) && (regularWatched >= FINALE_UNLOCK_AT || S.unlocked[slug])) return finale;
    const idx = regular.findIndex((x) => x.id === title.id);
    for (let k = 1; k <= regular.length; k++) {
      const c = regular[(idx + k) % regular.length];
      if (c.id !== title.id && !watched.has(c.id)) return c;
    }
    return regular[(idx + 1) % regular.length] ?? null;
  }, [profile, title, S.watched, S.unlocked, slug]);

  /** Wraps an auto-advance so the "still watching?" check can interrupt it. */
  const guarded = useCallback(
    (action: () => void) => {
      if (S.streak >= 2) {
        pending.current = action;
        setPlaying(false);
        setShowStill(true);
        return;
      }
      S.setStreak(S.streak + 1);
      action();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [S.streak],
  );

  const playNextEpisode = useCallback(() => guarded(() => goEpisode(epIdx + 1)), [guarded, goEpisode, epIdx]);
  const playNextTitle = useCallback(() => {
    if (!nextTitle) return;
    guarded(() => router.replace(`/watch/${slug}/${nextTitle.id}`));
  }, [guarded, nextTitle, router, slug]);

  /* ------------------------------------------------------------ keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (boot === "intro") return;
      if (showStill) return;
      bump();
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          nextScene();
          doFlash("r");
          break;
        case "ArrowLeft":
          prevScene();
          doFlash("l");
          break;
        case "ArrowUp":
          e.preventDefault();
          S.setVolume(Math.min(1, S.volume + 0.1));
          if (S.muted) S.setMuted(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          S.setVolume(Math.max(0, S.volume - 0.1));
          break;
        case "m":
          S.setMuted(!S.muted);
          break;
        case "f":
          toggleFs();
          break;
        case "n":
          if (epIdx < title.episodes.length - 1) goEpisode(epIdx + 1);
          break;
        case "r":
          replay();
          break;
        case "e":
          if (title.episodes.length > 1) setShowEpisodes((v) => !v);
          break;
        case "Escape":
          if (showEpisodes) setShowEpisodes(false);
          else if (!document.fullscreenElement) goBack();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* ------------------------------------------------------------ touch + mouse on the stage */
  const down = useRef({ x: 0, y: 0 });
  const tap = useRef<{ time: number; side: string; timer?: ReturnType<typeof setTimeout> }>({ time: 0, side: "" });

  const onStageDown = (e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  };
  const onStageUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return; // mouse uses onClick/onDoubleClick
    const dx = e.clientX - down.current.x;
    const dy = e.clientY - down.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 60) {
      if (dx < 0) {
        nextScene();
        doFlash("r");
      } else {
        prevScene();
        doFlash("l");
      }
      return;
    }
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) return;
    const w = window.innerWidth;
    const side = e.clientX < w * 0.32 ? "l" : e.clientX > w * 0.68 ? "r" : "c";
    const now = Date.now();
    if (side !== "c" && now - tap.current.time < 300 && tap.current.side === side) {
      clearTimeout(tap.current.timer);
      tap.current.time = 0;
      if (side === "l") prevScene();
      else nextScene();
      doFlash(side);
      return;
    }
    tap.current.time = now;
    tap.current.side = side;
    clearTimeout(tap.current.timer);
    tap.current.timer = setTimeout(() => {
      tap.current.time = 0;
      setUiVisible((v) => {
        if (!v) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => setUiVisible(false), 3400);
        }
        return !v;
      });
    }, 300);
  };

  const onScrub = (pct: number, phase: "start" | "move" | "end") => {
    if (phase === "start") {
      wasPlaying.current = playing;
      setScrubbing(true);
    }
    seek(pct * total);
    if (phase === "end") {
      setScrubbing(false);
      setPlaying(wasPlaying.current || Boolean(ended));
    }
    bump();
  };

  /* ------------------------------------------------------------ render */
  const showUi = (uiVisible || !playing) && !ended && boot === "play" && !showStill;
  const hasNextEp = epIdx < title.episodes.length - 1;
  const finaleUnlockedNow = nextTitle?.finale ?? false;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] select-none overflow-hidden bg-black ${showUi || !playing ? "" : "cursor-none"}`}
      onPointerMove={(e) => e.pointerType === "mouse" && bump()}
    >
      {boot === "boot" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="nf-spinner" />
        </div>
      )}

      {boot !== "boot" && (
        <div
          className="absolute inset-0 touch-none"
          onPointerDown={onStageDown}
          onPointerUp={onStageUp}
          onClick={(e) => {
            if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") return;
            if (boot === "play") {
              togglePlay();
              doFlash("p");
            }
          }}
          onDoubleClick={(e) => (e.nativeEvent as PointerEvent).pointerType === "mouse" && toggleFs()}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={`${epIdx}-${sceneIdx}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {scene && (
                <SceneView
                  scene={scene}
                  elapsed={elapsed}
                  playing={playing && !ended}
                  font={profile.font}
                  accent={profile.accent}
                  videoVolume={S.volume}
                  videoMuted={S.muted}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* tap feedback */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash + Date.now()}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`pointer-events-none absolute top-1/2 z-20 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 ${
              flash === "l" ? "left-[10%]" : flash === "r" ? "right-[10%]" : "left-1/2 -translate-x-1/2"
            }`}
          >
            {flash === "p" ? (
              playing ? <Play className="h-9 w-9 fill-white" /> : <Pause className="h-9 w-9 fill-white" />
            ) : (
              <span className="text-2xl font-bold">{flash === "l" ? "⏮" : "⏭"}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {boot === "play" && (
        <Controls
          visible={showUi}
          title={title.title}
          epLabel={title.episodes.length > 1 ? `Episode ${epIdx + 1} · ${ep.title}` : ep.title}
          t={t}
          total={total}
          ticks={starts.slice(1).map((s) => s / total)}
          sceneIndex={sceneIdx}
          sceneCount={scenes.length}
          playing={playing}
          muted={S.muted}
          volume={S.volume}
          fs={fs}
          canFs={canFs}
          hasNextEp={hasNextEp}
          hasEpisodes={title.episodes.length > 1}
          accent={profile.accent}
          onBack={goBack}
          onToggle={togglePlay}
          onPrev={prevScene}
          onNext={nextScene}
          onScrub={onScrub}
          onMute={() => S.setMuted(!S.muted)}
          onVolume={(v) => {
            S.setVolume(v);
            if (S.muted) S.setMuted(false);
          }}
          onFullscreen={toggleFs}
          onReplay={replay}
          onEpisodes={() => setShowEpisodes(true)}
          onNextEp={() => goEpisode(epIdx + 1)}
        />
      )}

      <AnimatePresence>
        {boot === "intro" && <StudioIntro key="intro" profile={profile} onDone={finishIntro} />}
      </AnimatePresence>

      <EpisodesPanel
        open={showEpisodes}
        title={title}
        current={epIdx}
        autoplay={S.autoplay}
        onToggleAutoplay={() => S.setAutoplay(!S.autoplay)}
        onPick={goEpisode}
        onClose={() => setShowEpisodes(false)}
      />

      <AnimatePresence>
        {ended === "episode" && hasNextEp && (
          <EndOverlay
            key="next-ep"
            mode="next-episode"
            headline={`${title.title}`}
            sub={`Episode ${epIdx + 1} finished`}
            next={{
              label: `Episode ${epIdx + 2}`,
              title: title.episodes[epIdx + 1].title,
              synopsis: title.episodes[epIdx + 1].synopsis,
              photo: episodeThumb(title.episodes[epIdx + 1], title.thumb),
            }}
            auto={S.autoplay && !autoCancel}
            accent={profile.accent}
            onPlayNext={playNextEpisode}
            onCancelAuto={() => setAutoCancel(true)}
            onReplay={replay}
            onBack={goBack}
          />
        )}
        {ended === "title" && (
          <EndOverlay
            key="end"
            mode="end"
            headline={title.finale ? `Happy birthday, ${profile.name}.` : `You finished ${title.title}`}
            sub={
              title.finale
                ? "That was the last episode. It's yours to replay forever."
                : finaleUnlockedNow
                  ? "Something new just unlocked for you…"
                  : undefined
            }
            next={
              nextTitle
                ? {
                    label: nextTitle.finale ? "Unlocked · The Final Episode" : "Up next",
                    title: nextTitle.title,
                    synopsis: nextTitle.tagline,
                    photo: nextTitle.thumb,
                    photoPos: nextTitle.thumbPos,
                  }
                : undefined
            }
            auto={S.autoplay && !autoCancel}
            accent={profile.accent}
            onPlayNext={nextTitle ? playNextTitle : undefined}
            onCancelAuto={() => setAutoCancel(true)}
            onReplay={replay}
            onBack={goBack}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStill && (
          <StillWatching
            profile={profile}
            onYes={() => {
              S.setStreak(0);
              setShowStill(false);
              setPlaying(true);
              const a = pending.current;
              pending.current = null;
              a?.();
            }}
            onNo={goBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
