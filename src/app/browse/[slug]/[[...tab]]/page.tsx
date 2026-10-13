import { notFound } from "next/navigation";
import { Browse } from "@/components/browse/Browse";
import { PROFILES, getProfile } from "@/data";

const TABS = ["home", "stories", "letters", "new", "list"] as const;

export function generateStaticParams() {
  return PROFILES.flatMap((p) => [{ slug: p.slug, tab: [] }, ...TABS.slice(1).map((t) => ({ slug: p.slug, tab: [t] }))]);
}

export default async function BrowsePage({ params }: { params: Promise<{ slug: string; tab?: string[] }> }) {
  const { slug, tab } = await params;
  const profile = getProfile(slug);
  const t = (tab?.[0] ?? "home") as (typeof TABS)[number];
  if (!profile || !TABS.includes(t) || (tab && tab.length > 1)) notFound();
  return <Browse profile={profile} tab={t} />;
}
