import type { CSSProperties } from "react";
import { PHOTOS } from "@/lib/photos";
import type { PhotoId, Profile } from "@/lib/types";

/** Cover-cropped photo that fills its parent. */
export function Photo({
  id,
  pos,
  large = false,
  className = "",
  style,
  priority = false,
}: {
  id: PhotoId;
  pos?: string;
  large?: boolean;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  const p = PHOTOS[id];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={large ? p.large : p.src}
      alt={p.alt}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: pos ?? p.pos, ...style }}
    />
  );
}

export function Avatar({ profile, className = "" }: { profile: Profile; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[4px] bg-nf-raised ${className}`}>
      <Photo
        id={profile.avatar}
        pos={profile.avatarPos}
        large
        style={
          profile.avatarZoom
            ? { transform: `scale(${profile.avatarZoom})`, transformOrigin: `${parseFloat(profile.avatarPos)}% 0%` }
            : undefined
        }
      />
    </div>
  );
}
