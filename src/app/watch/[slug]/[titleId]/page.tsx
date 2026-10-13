import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PROFILES, getProfile, getTitle } from "@/data";
import { WatchClient } from "@/components/player/WatchClient";

export function generateStaticParams() {
  return PROFILES.flatMap((p) => p.titles.map((t) => ({ slug: p.slug, titleId: t.id })));
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string; titleId: string }> }) {
  const { slug, titleId } = await params;
  const profile = getProfile(slug);
  const title = profile && getTitle(profile, titleId);
  if (!profile || !title) notFound();
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <WatchClient slug={profile.slug} titleId={title.id} />
    </Suspense>
  );
}
