"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FINALE_UNLOCK_AT, getProfile, getTitle, regularTitles } from "@/data";
import { useStore } from "@/lib/store";
import { Player } from "./Player";

export function WatchClient({ slug, titleId }: { slug: string; titleId: string }) {
  const profile = getProfile(slug)!;
  const title = getTitle(profile, titleId)!;
  const sp = useSearchParams();
  const S = useStore();

  if (!S.ready) return <div className="fixed inset-0 bg-black" />;

  if (title.finale) {
    const ids = new Set(regularTitles(profile).map((t) => t.id));
    const seen = (S.watched[slug] ?? []).filter((id) => ids.has(id)).length;
    if (!S.unlocked[slug] && seen < FINALE_UNLOCK_AT) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black px-6 text-center">
          <Lock className="mb-4 h-10 w-10 text-white/70" />
          <h1 className="text-2xl font-bold">Not quite yet</h1>
          <p className="mt-2 max-w-sm text-white/70">
            Watch {FINALE_UNLOCK_AT - seen} more {FINALE_UNLOCK_AT - seen === 1 ? "title" : "titles"} to unlock the final episode.
          </p>
          <Link href={`/browse/${slug}`} className="mt-6 rounded bg-white px-6 py-3 font-bold text-black">
            Back to browsing
          </Link>
        </div>
      );
    }
  }

  const e = Number(sp.get("e") ?? 0);
  return (
    <Player
      key={titleId}
      profile={profile}
      title={title}
      startEp={Number.isFinite(e) ? Math.max(0, e) : 0}
      resume={sp.get("r") === "1"}
    />
  );
}
