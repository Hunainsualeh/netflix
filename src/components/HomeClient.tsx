"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PROFILES } from "@/data";
import { audio } from "@/lib/audio";
import { BRAND, isBirthdayToday, nextBirthday } from "@/lib/config";
import { useStore } from "@/lib/store";
import { Logo, SplashLogo } from "./Logo";
import { Avatar } from "./Photo";
import { Particles } from "./Particles";

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, nextBirthday().getTime() - now);
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor(diff / 36e5) % 24],
    ["Min", Math.floor(diff / 6e4) % 60],
    ["Sec", Math.floor(diff / 1e3) % 60],
  ] as const;
  return (
    <div className="flex gap-3 sm:gap-5">
      {parts.map(([l, v]) => (
        <div key={l} className="flex w-16 flex-col items-center rounded bg-white/10 py-3 sm:w-24">
          <span className="font-logo text-4xl tabular-nums sm:text-6xl">{String(v).padStart(2, "0")}</span>
          <span className="text-[0.6rem] uppercase tracking-widest text-white/60 sm:text-xs">{l}</span>
        </div>
      ))}
    </div>
  );
}

function Intro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"tap" | "logo" | "premiere">("tap");
  const today = isBirthdayToday();

  useEffect(() => {
    if (stage !== "logo") return;
    const id = setTimeout(() => setStage("premiere"), 4200);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-center">
      <AnimatePresence mode="wait">
        {stage === "tap" && (
          <motion.button
            key="tap"
            exit={{ opacity: 0 }}
            onClick={() => {
              audio.unlock();
              audio.tudum();
              setStage("logo");
            }}
            className="flex flex-col items-center gap-6"
          >
            <span className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full border-2 border-white/60">
              <Play className="h-10 w-10 fill-white" />
            </span>
            <span className="text-sm uppercase tracking-[0.4em] text-white/70">Press play</span>
          </motion.button>
        )}
        {stage === "logo" && (
          <motion.div key="logo" exit={{ opacity: 0 }}>
            <SplashLogo />
          </motion.div>
        )}
        {stage === "premiere" && (
          <motion.div
            key="prem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            {today && <Particles kind="confetti" />}
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-nf-red">A {BRAND} Original</p>
            {today ? (
              <>
                <h1 className="font-logo text-6xl leading-none sm:text-9xl">
                  Happy
                  <br />
                  Birthday
                </h1>
                <p className="font-serif text-3xl text-white/90 sm:text-4xl">It&apos;s today, Fakiha. Premiering now.</p>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl sm:text-5xl">Your premiere begins in</h1>
                <Countdown />
              </>
            )}
            <button
              onClick={() => {
                if (today) audio.birthday();
                onDone();
              }}
              className="mt-2 flex items-center gap-2 rounded bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-white/85"
            >
              <Play className="h-5 w-5 fill-black" /> {today ? "Enter" : "Open it early"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Gate() {
  const router = useRouter();
  const S = useStore();
  const [picked, setPicked] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);

  const pick = (slug: string) => {
    if (edit) {
      S.toast("These profiles are locked. They were made just for you.");
      return;
    }
    audio.unlock();
    S.setLastProfile(slug);
    setPicked(slug);
    setTimeout(() => router.push(`/browse/${slug}`), 1300);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0b0304] [background-image:radial-gradient(ellipse_at_top,rgba(120,18,24,0.75),rgba(11,3,4,1)_70%)]">
      <header className="px-5 py-5 text-3xl sm:px-12 sm:text-4xl">
        <Logo />
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex min-h-[80dvh] w-full max-w-4xl flex-col items-center justify-center px-5 pb-16"
      >
        <h1 className="mb-8 text-3xl font-medium sm:text-5xl">{picked ? "" : "Who's watching?"}</h1>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:w-full sm:justify-center sm:gap-8">
          {PROFILES.map((p) => (
            <motion.button
              key={p.slug}
              onClick={() => pick(p.slug)}
              animate={{
                opacity: picked && picked !== p.slug ? 0 : 1,
                scale: picked === p.slug ? 1.15 : 1,
              }}
              transition={{ duration: 0.6 }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative">
                <Avatar
                  profile={p}
                  className="h-32 w-32 border-2 border-transparent transition group-hover:scale-105 group-hover:border-white group-active:scale-95 sm:h-36 sm:w-36"
                />
                {edit && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <Pencil className="h-8 w-8" />
                  </span>
                )}
              </div>
              <span className="text-lg text-white/60 group-hover:text-white">{p.name}</span>
            </motion.button>
          ))}
        </div>
        {picked ? (
          <div className="mt-12 nf-spinner" />
        ) : (
          <button
            onClick={() => setEdit((v) => !v)}
            className="mt-14 border border-white/50 px-6 py-2 text-sm uppercase tracking-[0.2em] text-white/60 transition hover:border-white hover:text-white"
          >
            {edit ? "Done" : "Manage Profiles"}
          </button>
        )}
      </motion.main>
    </div>
  );
}

export function HomeClient() {
  const S = useStore();
  if (!S.ready) return <div className="fixed inset-0 bg-black" />;
  return S.introDone ? <Gate /> : <Intro onDone={() => S.setIntroDone(true)} />;
}
