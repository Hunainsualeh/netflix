import type { Profile, ProfileSlug, Title } from "@/lib/types";
import { fakiha } from "./profiles/fakiha";
import { senorita } from "./profiles/senorita";
import { cinderella } from "./profiles/cinderella";
import { kuchuPuchu } from "./profiles/kuchu-puchu";

export const PROFILES: Profile[] = [fakiha, senorita, cinderella, kuchuPuchu];

export const PROFILE_SLUGS = PROFILES.map((p) => p.slug);

export function getProfile(slug: string): Profile | undefined {
  return PROFILES.find((p) => p.slug === slug);
}

export function getTitle(profile: Profile, id: string): Title | undefined {
  return profile.titles.find((t) => t.id === id);
}

export function titlesByIds(profile: Profile, ids: string[]): Title[] {
  return ids.map((id) => getTitle(profile, id)).filter((t): t is Title => Boolean(t));
}

export function isProfileSlug(s: string): s is ProfileSlug {
  return PROFILES.some((p) => p.slug === s);
}

/** Titles that are not the finale, in catalogue order. */
export function regularTitles(profile: Profile) {
  return profile.titles.filter((t) => !t.finale);
}

/** Number of titles to watch before the finale unlocks. */
export const FINALE_UNLOCK_AT = 3;
