"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  Lock,
  Mail,
  Play,
  Plus,
  Check,
  Search,
  Sparkles,
  ThumbsUp,
  X,
  Flame,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FINALE_UNLOCK_AT, PROFILES, regularTitles, titlesByIds } from "@/data";
import { audio } from "@/lib/audio";
import { useStore } from "@/lib/store";
import { formatRuntime, titleRuntimeMs } from "@/lib/timing";
import type { Message, MessageKind, Profile, Title } from "@/lib/types";
import { EpisodeRow } from "@/components/player/Overlays";
import { Logo } from "@/components/Logo";
import { Avatar, Photo } from "@/components/Photo";
import { MoodBg } from "@/components/MoodBg";

type Tab = "home" | "stories" | "letters" | "new" | "list";
const TABS: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "stories", label: "Stories", icon: Flame },
  { id: "letters", label: "Letters", icon: Mail },
  { id: "new", label: "New & Hot", icon: Sparkles },
  { id: "list", label: "My List", icon: Bookmark },
];
const href = (slug: string, tab: Tab) => (tab === "home" ? `/browse/${slug}` : `/browse/${slug}/${tab}`);

function useHelpers(profile: Profile) {
  const S = useStore();
  const router = useRouter();
  const seen = useMemo(() => {
    const ids = new Set(regularTitles(profile).map((t) => t.id));
    return (S.watched[profile.slug] ?? []).filter((id) => ids.has(id)).length;
  }, [S.watched, profile]);
  const locked = (t: Title) => Boolean(t.finale) && !S.unlocked[profile.slug] && seen < FINALE_UNLOCK_AT;
  const play = (t: Title) => {
    if (locked(t)) {
      const n = FINALE_UNLOCK_AT - seen;
      S.toast(`Locked — watch ${n} more ${n === 1 ? "title" : "titles"} to unlock it.`);
      return;
    }
    audio.unlock();
    S.setStreak(0);
    const pr = S.progress[profile.slug]?.[t.id];
    router.push(`/watch/${profile.slug}/${t.id}${pr && pr.pct < 0.95 ? "?r=1" : ""}`);
  };
  return { S, locked, play, seen };
}

/* ------------------------------------------------------------------ card */
function Card({
  profile,
  title,
  onOpen,
  progress,
  rank,
}: {
  profile: Profile;
  title: Title;
  onOpen: (t: Title) => void;
  progress?: number;
  rank?: number;
}) {
  const { S, locked, play } = useHelpers(profile);
  const inList = (S.myList[profile.slug] ?? []).includes(title.id);
  const lock = locked(title);
  return (
    <div className={`group/card relative shrink-0 snap-start ${rank ? "flex items-end" : ""}`}>
      {rank && (
        <span
          className="-mr-3 select-none font-logo text-[7.5rem] leading-[0.8] text-black md:text-[10rem]"
          style={{ WebkitTextStroke: "3px #595959" }}
        >
          {rank}
        </span>
      )}
      <div
        className={`relative aspect-[2/3] overflow-hidden rounded-[4px] bg-nf-raised transition duration-300 md:aspect-video md:group-hover/card:z-20 md:group-hover/card:scale-[1.12] md:group-hover/card:shadow-2xl ${
          rank ? "w-[7.5rem] md:w-[13rem]" : "w-[7.5rem] sm:w-36 md:w-[17rem]"
        } ${rank ? "md:aspect-[2/3]" : ""}`}
      >
        <button onClick={() => onOpen(title)} className="absolute inset-0 text-left" aria-label={`Open ${title.title}`}>
          <Photo id={title.thumb} pos={title.thumbPos} className={lock ? "brightness-[0.35]" : "md:group-hover/card:scale-110 transition duration-700"} />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-8 md:p-3">
            <span className="line-clamp-2 font-logo text-xl uppercase leading-none tracking-wide md:text-2xl">{title.title}</span>
          </span>
          {title.badge && !lock && (
            <span className="absolute left-0 top-2 rounded-r bg-nf-red px-1.5 py-0.5 text-[0.6rem] font-bold uppercase">{title.badge}</span>
          )}
          {lock && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </span>
          )}
        </button>
        {/* hover actions (desktop) */}
        {!lock && (
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-end gap-1.5 p-2 opacity-0 transition group-hover/card:opacity-100 md:flex">
            <button
              onClick={() => play(title)}
              aria-label="Play"
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-white/80"
            >
              <Play className="h-4 w-4 fill-black" />
            </button>
            <button
              onClick={() => S.toast(S.toggleList(profile.slug, title.id) ? "Added to My List" : "Removed from My List")}
              aria-label="My List"
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/70 hover:border-white"
            >
              {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        )}
        {progress !== undefined && (
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
            <span className="block h-full bg-nf-red" style={{ width: `${progress * 100}%` }} />
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ row */
function RowView({
  profile,
  heading,
  titles,
  onOpen,
  kind = "standard",
}: {
  profile: Profile;
  heading: string;
  titles: Title[];
  onOpen: (t: Title) => void;
  kind?: "standard" | "top10" | "continue";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const S = useStore();
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: "smooth" });
  if (!titles.length) return null;
  return (
    <section className="group/row relative py-1 md:py-2">
      <h2 className="mb-2 px-4 text-[1.05rem] font-semibold text-[#e5e5e5] md:mb-3 md:px-12 md:text-xl">{heading}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute inset-y-0 left-0 z-30 hidden w-12 items-center justify-center bg-black/50 opacity-0 transition hover:bg-black/70 group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
        <div
          ref={ref}
          className="no-scrollbar flex snap-x gap-2 overflow-x-auto px-4 py-6 md:-my-4 md:gap-2.5 md:px-12 md:py-10"
        >
          {titles.map((t, i) => {
            const pr = S.progress[profile.slug]?.[t.id]?.pct;
            const seed = kind === "continue" && pr === undefined ? 0.2 + ((i * 17) % 50) / 100 : undefined;
            return (
              <Card
                key={t.id}
                profile={profile}
                title={t}
                onOpen={onOpen}
                rank={kind === "top10" ? i + 1 : undefined}
                progress={kind === "continue" ? (pr ?? seed) : undefined}
              />
            );
          })}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute inset-y-0 right-0 z-30 hidden w-12 items-center justify-center bg-black/50 opacity-0 transition hover:bg-black/70 group-hover/row:opacity-100 md:flex"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ info modal */
function InfoModal({ profile, title, onClose, onOpen }: { profile: Profile; title: Title; onClose: () => void; onOpen: (t: Title) => void }) {
  const { S, locked, play } = useHelpers(profile);
  const router = useRouter();
  const inList = (S.myList[profile.slug] ?? []).includes(title.id);
  const liked = (S.liked[profile.slug] ?? []).includes(title.id);
  const lock = locked(title);
  const more = profile.titles.filter((t) => t.id !== title.id && !t.finale).slice(0, 6);
  const pr = S.progress[profile.slug]?.[title.id];

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-black/75 md:px-6 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto min-h-full w-full max-w-3xl overflow-hidden bg-[#181818] shadow-2xl md:min-h-0 md:rounded-lg"
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-video">
          <Photo id={title.thumb} pos={title.thumbPos} large />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />
          <button onClick={onClose} aria-label="Close" className="pt-safe absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#181818]">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
            <h2 className="font-logo text-5xl uppercase leading-none md:text-7xl">{title.title}</h2>
            <p className="mt-2 text-sm text-white/80">{title.tagline}</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => play(title)}
                className="flex h-11 items-center gap-2 rounded bg-white px-6 font-bold text-black hover:bg-white/85"
              >
                {lock ? <Lock className="h-5 w-5" /> : <Play className="h-6 w-6 fill-black" />}
                {lock ? "Locked" : pr && pr.pct < 0.95 ? "Resume" : "Play"}
              </button>
              <button
                onClick={() => S.toast(S.toggleList(profile.slug, title.id) ? "Added to My List" : "Removed from My List")}
                aria-label="My List"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 bg-black/50 hover:border-white"
              >
                {inList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
              <button
                onClick={() => S.toast(S.toggleLike(profile.slug, title.id) ? "Rated: I love this 💛" : "Rating removed")}
                aria-label="Like"
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-black/50 hover:border-white ${liked ? "border-white" : "border-white/50"}`}
              >
                <ThumbsUp className={`h-5 w-5 ${liked ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-5 pb-8 pt-2 md:grid-cols-[2fr_1fr] md:px-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-[#46d369]">{title.match}% Match</span>
              <span className="text-white/70">{title.year}</span>
              <span className="rounded-sm border border-white/50 px-1.5 text-xs">{title.maturity}</span>
              <span className="text-white/70">{title.episodes.length > 1 ? `${title.episodes.length} Episodes` : formatRuntime(titleRuntimeMs(title.episodes))}</span>
              <span className="rounded-sm border border-white/50 px-1 text-[0.6rem]">HD</span>
            </div>
            <p className="mt-1 text-xs text-white/60">{title.maturityNote}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed">{title.synopsis}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-white/50">Starring: </span>{title.starring.join(", ")}</p>
            <p><span className="text-white/50">Genres: </span>{title.genres.join(", ")}</p>
            <p><span className="text-white/50">This is: </span>{title.type}</p>
          </div>
        </div>

        {title.episodes.length > 1 && (
          <div className="pb-4">
            <h3 className="px-5 pb-2 text-xl font-bold md:px-10">Episodes</h3>
            {title.episodes.map((ep, i) => (
              <EpisodeRow
                key={i}
                ep={ep}
                index={i}
                fallback={title.thumb}
                active={false}
                onPick={() => {
                  if (lock) return play(title);
                  audio.unlock();
                  S.setStreak(0);
                  S.setLastProfile(profile.slug);
                  router.push(`/watch/${profile.slug}/${title.id}?e=${i}`);
                }}
              />
            ))}
          </div>
        )}

        <div className="px-5 pb-10 md:px-10">
          <h3 className="pb-3 text-xl font-bold">More Like This</h3>
          <div className="grid grid-cols-3 gap-2">
            {more.map((t) => (
              <button key={t.id} onClick={() => onOpen(t)} className="relative aspect-[2/3] overflow-hidden rounded bg-nf-raised sm:aspect-video">
                <Photo id={t.thumb} pos={t.thumbPos} />
                <span className="absolute inset-x-0 bottom-0 bg-black/70 p-1.5 text-left font-logo text-base uppercase leading-none">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ messages */
const KIND_LABEL: Record<MessageKind, string> = {
  wish: "Birthday Wishes",
  letter: "Letters",
  poem: "Poems",
  playful: "Playful",
  fairytale: "Fairytale Notes",
  future: "For Your Future",
  sweet: "Sweet Things",
};

function LetterModal({ profile, msg, onClose, onNav }: { profile: Profile; msg: Message; onClose: () => void; onNav: (d: 1 | -1) => void }) {
  const [opened, setOpened] = useState(false);
  useEffect(() => setOpened(false), [msg.id]);
  const fontCls = profile.font === "script" ? "font-script text-[1.5rem] leading-snug md:text-3xl" : "font-serif text-[1.25rem] leading-relaxed md:text-2xl";
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-[#181818] shadow-2xl">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60">
          <X className="h-5 w-5" />
        </button>
        {!opened ? (
          <button onClick={() => { setOpened(true); audio.unlock(); audio.sparkle(); }} className="flex flex-col items-center gap-5 px-8 py-20">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} className="flex h-28 w-40 items-center justify-center rounded-md border border-white/30 bg-white/5">
              <Mail className="h-14 w-14" style={{ color: profile.accent }} />
            </motion.div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">{KIND_LABEL[msg.kind]}</p>
            <p className="text-2xl font-bold">{msg.title}</p>
            <span className="rounded bg-white px-6 py-2.5 font-bold text-black">Tap to open</span>
          </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative flex-1 overflow-y-auto">
            {msg.photo && (
              <div className="relative h-48 w-full">
                <Photo id={msg.photo} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
              </div>
            )}
            <div className="space-y-4 px-6 pb-8 pt-6 md:px-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: profile.accent }}>{msg.title}</h3>
              {msg.paragraphs.map((p, i) => (
                <p key={i} className={`${fontCls} whitespace-pre-line text-white/95`}>{p}</p>
              ))}
              <p className={`${fontCls} pt-2 text-right italic`} style={{ color: profile.accent }}>{msg.signoff}</p>
            </div>
          </motion.div>
        )}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm">
          <button onClick={() => onNav(-1)} className="flex items-center gap-1 rounded px-3 py-2 hover:bg-white/10"><ChevronLeft className="h-4 w-4" /> Previous</button>
          <button onClick={() => onNav(1)} className="flex items-center gap-1 rounded px-3 py-2 hover:bg-white/10">Next <ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </motion.div>
  );
}

function MessagesView({ profile }: { profile: Profile }) {
  const [filter, setFilter] = useState<MessageKind | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const kinds = Array.from(new Set(profile.messages.map((m) => m.kind)));
  const list = profile.messages.filter((m) => filter === "all" || m.kind === filter);
  return (
    <div className="px-4 pb-24 pt-28 md:px-12 md:pt-32">
      <h1 className="text-3xl font-bold md:text-5xl">Letters &amp; Little Notes</h1>
      <p className="mt-2 text-white/60">{profile.messages.length} messages, written only for {profile.name}.</p>
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
        {(["all", ...kinds] as const).map((k) => (
          <button key={k} onClick={() => setFilter(k)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${filter === k ? "border-white bg-white text-black" : "border-white/40 text-white/80"}`}>
            {k === "all" ? "All" : KIND_LABEL[k]}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m, i) => (
          <button key={m.id} onClick={() => setOpen(i)} className="flex items-start gap-4 rounded-md bg-[#2a2a2a] p-4 text-left transition hover:bg-[#333]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/40"><Mail className="h-5 w-5" style={{ color: profile.accent }} /></span>
            <span className="min-w-0">
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/50">{KIND_LABEL[m.kind]}</span>
              <span className="mt-0.5 block truncate text-lg font-bold">{m.title}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-white/65">{m.paragraphs[0]}</span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && list[open] && (
          <LetterModal profile={profile} msg={list[open]} onClose={() => setOpen(null)} onNav={(d) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length))} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ grids */
function Grid({ profile, titles, onOpen, empty }: { profile: Profile; titles: Title[]; onOpen: (t: Title) => void; empty?: string }) {
  if (!titles.length) return <p className="px-4 pt-6 text-white/60 md:px-12">{empty}</p>;
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 px-4 md:grid-cols-5 md:gap-3 md:px-12">
      {titles.map((t) => (
        <div key={t.id} className="[&>div>div]:w-full [&>div]:block">
          <Card profile={profile} title={t} onOpen={onOpen} />
        </div>
      ))}
    </div>
  );
}

function NewAndHot({ profile }: { profile: Profile }) {
  const S = useStore();
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 md:pt-32">
      <h1 className="text-3xl font-bold md:text-4xl">Coming Soon</h1>
      <div className="mt-6 space-y-8">
        {profile.comingSoon.map((c) => {
          const key = `${profile.slug}:${c.title}`;
          const on = S.reminders.includes(key);
          return (
            <div key={key}>
              <div className="relative aspect-video overflow-hidden rounded">
                <Photo id={c.photo} pos={c.photoPos} />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">{c.when}</p>
                  <p className="font-logo text-3xl uppercase">{c.title}</p>
                </div>
                <button onClick={() => S.toast(S.toggleReminder(key) ? "We'll remind you 🔔" : "Reminder removed")} className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                  {on ? "Reminder set" : "Remind me"}
                </button>
              </div>
              <p className="mt-1 text-sm text-white/70">{c.synopsis}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ navbar */
function Navbar({ profile, tab, onSearch }: { profile: Profile; tab: Tab; onSearch: () => void }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState<null | "bell" | "profile">(null);
  const router = useRouter();
  const S = useStore();
  const taps = useRef(0);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const egg = () => {
    taps.current++;
    if (taps.current >= 5) {
      taps.current = 0;
      S.unlockFinale(profile.slug);
      audio.unlock();
      audio.sparkle();
      S.toast("You found the secret. The final episode is unlocked ✨");
    }
  };
  return (
    <>
      <header className={`pt-safe fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
        <div className="flex items-center gap-4 px-4 py-3 md:gap-8 md:px-12 md:py-4">
          <div className="text-[1.75rem] md:text-[2rem]" onClick={egg}>
            <Logo />
          </div>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {TABS.map((t) => (
              <Link key={t.id} href={href(profile.slug, t.id)} className={tab === t.id ? "font-bold" : "text-[#e5e5e5] hover:text-[#b3b3b3]"}>
                {t.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4 md:gap-5">
            <button onClick={onSearch} aria-label="Search"><Search className="h-6 w-6" /></button>
            <div className="relative">
              <button onClick={() => setMenu(menu === "bell" ? null : "bell")} aria-label="Notifications"><Bell className="h-6 w-6" /></button>
              {menu === "bell" && (
                <div className="absolute right-0 top-9 w-72 border-t-2 border-white bg-black/95 shadow-2xl">
                  {profile.notices.map((n, i) => (
                    <div key={i} className="flex gap-3 border-b border-white/10 p-3">
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded"><Photo id={n.photo} /></div>
                      <div className="text-xs"><p>{n.text}</p><p className="mt-1 text-white/50">{n.when}</p></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setMenu(menu === "profile" ? null : "profile")} className="flex items-center gap-1" aria-label="Profiles">
                <Avatar profile={profile} className="h-8 w-8" />
                <ChevronDown className="hidden h-4 w-4 md:block" />
              </button>
              {menu === "profile" && (
                <div className="absolute right-0 top-11 w-56 border-t-2 border-white bg-black/95 py-2 text-sm shadow-2xl">
                  {PROFILES.filter((p) => p.slug !== profile.slug).map((p) => (
                    <button key={p.slug} onClick={() => { S.setLastProfile(p.slug); router.push(`/browse/${p.slug}`); setMenu(null); }} className="flex w-full items-center gap-3 px-3 py-2 hover:underline">
                      <Avatar profile={p} className="h-8 w-8" /> {p.name}
                    </button>
                  ))}
                  <div className="my-1 border-t border-white/20" />
                  <button onClick={() => router.push("/")} className="block w-full px-3 py-2 text-left hover:underline">Who&apos;s watching?</button>
                  <button onClick={() => { S.setIntroDone(false); router.push("/"); }} className="block w-full px-3 py-2 text-left hover:underline">Replay intro</button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* mobile pills */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2 md:hidden">
          {TABS.filter((t) => t.id !== "home").map((t) => (
            <Link key={t.id} href={href(profile.slug, t.id)} className={`shrink-0 rounded-full border px-3.5 py-1 text-sm ${tab === t.id ? "border-white bg-white/15" : "border-white/40"}`}>
              {t.label}
            </Link>
          ))}
        </div>
      </header>
      {menu && <div className="fixed inset-0 z-40" onClick={() => setMenu(null)} />}
    </>
  );
}

function BottomNav({ profile, tab }: { profile: Profile; tab: Tab }) {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 flex border-t border-white/10 bg-[#121212]/95 backdrop-blur md:hidden">
      {TABS.map((t) => {
        const I = t.icon;
        return (
          <Link key={t.id} href={href(profile.slug, t.id)} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[0.62rem] ${tab === t.id ? "text-white" : "text-white/50"}`}>
            <I className="h-6 w-6" />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ billboard */
function Billboard({ profile, title, onOpen }: { profile: Profile; title: Title; onOpen: (t: Title) => void }) {
  const { S, play } = useHelpers(profile);
  const inList = (S.myList[profile.slug] ?? []).includes(title.id);
  const pr = S.progress[profile.slug]?.[title.id];
  const buttons = (
    <div className="flex items-center gap-2.5">
      <button onClick={() => play(title)} className="flex h-11 items-center gap-2 rounded bg-white px-7 font-bold text-black hover:bg-white/85 md:h-12 md:px-9 md:text-lg">
        <Play className="h-6 w-6 fill-black" /> {pr && pr.pct < 0.95 ? "Resume" : "Play"}
      </button>
      <button onClick={() => onOpen(title)} className="flex h-11 items-center gap-2 rounded bg-white/25 px-5 font-bold backdrop-blur hover:bg-white/15 md:h-12 md:px-7 md:text-lg">
        <Info className="h-5 w-5" /> More Info
      </button>
      <button
        onClick={() => S.toast(S.toggleList(profile.slug, title.id) ? "Added to My List" : "Removed from My List")}
        aria-label="My List"
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 bg-black/40 hover:border-white md:hidden"
      >
        {inList ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>
    </div>
  );
  return (
    <section className="relative">
      {/* mobile: poster card */}
      <div className="px-5 pb-2 pt-[7.2rem] md:hidden">
        <div className="relative mx-auto aspect-[3/4] max-h-[62dvh] w-full overflow-hidden rounded-lg shadow-2xl">
          <Photo id={title.thumb} pos={title.thumbPos} large priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-4 text-center">
            <p className="text-[0.62rem] uppercase tracking-[0.35em]" style={{ color: profile.accent }}>{profile.welcome.eyebrow}</p>
            <h1 className="font-logo text-5xl uppercase leading-[0.9]">{title.title}</h1>
            <p className="text-xs text-white/80">{title.genres.join(" • ")}</p>
            {buttons}
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-sm text-center text-sm text-white/75">{profile.welcome.line}</p>
      </div>
      {/* desktop: billboard */}
      <div className="relative hidden h-[88vh] min-h-[560px] overflow-hidden md:block">
        <MoodBg mood="night" />
        <div className="absolute inset-y-0 right-0 w-[52%]">
          <Photo id={title.thumb} pos={title.thumbPos} large priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/85 to-transparent" />
        <div className="vignette-bottom absolute inset-x-0 bottom-0 h-1/3" />
        <div className="absolute bottom-[26%] left-12 max-w-xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: profile.accent }}>{profile.welcome.eyebrow}</p>
          <h1 className="font-logo text-8xl uppercase leading-[0.85] [text-shadow:0_4px_30px_rgba(0,0,0,0.6)]">{title.title}</h1>
          <p className="font-serif text-2xl leading-snug text-white/90">{profile.welcome.line}</p>
          <p className="max-w-lg text-lg leading-snug text-white/85">{title.synopsis}</p>
          {buttons}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ search */
function SearchOverlay({ profile, onClose, onOpen }: { profile: Profile; onClose: () => void; onOpen: (t: Title) => void }) {
  const [q, setQ] = useState("");
  const res = profile.titles.filter((t) => `${t.title} ${t.tagline} ${t.genres.join(" ")} ${t.type}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] overflow-y-auto bg-[#141414] pt-safe">
      <div className="flex items-center gap-3 border-b border-white/20 px-4 py-4 md:px-12">
        <Search className="h-6 w-6 text-white/60" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Titles, genres, moods…" className="flex-1 bg-transparent text-lg outline-none placeholder:text-white/40" />
        <button onClick={onClose} aria-label="Close search"><X className="h-6 w-6" /></button>
      </div>
      <Grid profile={profile} titles={res} onOpen={(t) => { onClose(); onOpen(t); }} empty="Nothing matches that… but you are still the best thing on here." />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ main */
export function Browse({ profile, tab }: { profile: Profile; tab: Tab }) {
  const S = useStore();
  const [info, setInfo] = useState<Title | null>(null);
  const [search, setSearch] = useState(false);
  const hero = profile.titles.find((t) => t.id === profile.heroId) ?? profile.titles[0];

  useEffect(() => {
    S.setLastProfile(profile.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.slug]);

  const continueIds = useMemo(() => {
    const real = Object.entries(S.progress[profile.slug] ?? {})
      .filter(([, p]) => p.pct < 0.95)
      .sort((a, b) => b[1].pct - a[1].pct)
      .map(([id]) => id);
    return real.length ? real : profile.continueSeed;
  }, [S.progress, profile]);

  const myList = titlesByIds(profile, S.myList[profile.slug] ?? []);
  const stories = profile.titles.filter((t) => !["Letter", "Poem"].includes(t.type));

  let body: React.ReactNode;
  if (tab === "home") {
    body = (
      <>
        <Billboard profile={profile} title={hero} onOpen={setInfo} />
        <div className="relative z-10 space-y-2 pb-28 md:-mt-[14vh] md:space-y-4 md:pb-16">
          {profile.rows.map((r) => (
            <RowView
              key={r.id}
              profile={profile}
              heading={r.title}
              kind={r.kind}
              titles={r.kind === "continue" ? titlesByIds(profile, continueIds) : titlesByIds(profile, r.titleIds)}
              onOpen={setInfo}
            />
          ))}
          <footer className="px-4 pt-10 text-center text-xs text-white/40 md:px-12 md:text-left">
            {profile.name}&apos;s universe · An original series of one · Made with love for {profile.name}
          </footer>
        </div>
      </>
    );
  } else if (tab === "stories") {
    body = (
      <div className="pb-28 pt-28 md:pt-32">
        <h1 className="px-4 text-3xl font-bold md:px-12 md:text-5xl">Stories</h1>
        <Grid profile={profile} titles={stories} onOpen={setInfo} />
      </div>
    );
  } else if (tab === "letters") {
    body = <MessagesView profile={profile} />;
  } else if (tab === "new") {
    body = <NewAndHot profile={profile} />;
  } else {
    body = (
      <div className="pb-28 pt-28 md:pt-32">
        <h1 className="px-4 text-3xl font-bold md:px-12 md:text-5xl">My List</h1>
        <Grid profile={profile} titles={myList} onOpen={setInfo} empty="Nothing saved yet. Tap + on anything you want to keep." />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#141414]">
      <Navbar profile={profile} tab={tab} onSearch={() => setSearch(true)} />
      <motion.main key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {body}
      </motion.main>
      <BottomNav profile={profile} tab={tab} />
      <AnimatePresence>{info && <InfoModal key={info.id} profile={profile} title={info} onClose={() => setInfo(null)} onOpen={setInfo} />}</AnimatePresence>
      <AnimatePresence>{search && <SearchOverlay profile={profile} onClose={() => setSearch(false)} onOpen={setInfo} />}</AnimatePresence>
    </div>
  );
}
