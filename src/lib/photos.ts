import type { PhotoId } from "./types";

export interface PhotoInfo {
  src: string;
  /** Larger variant where one exists. */
  large: string;
  /** Default crop focus (her face). */
  pos: string;
  alt: string;
}

const p = (file: string, large: string | undefined, pos: string, alt: string): PhotoInfo => ({
  src: `/photos/${file}.webp`,
  large: `/photos/${large ?? file}.webp`,
  pos,
  alt,
});

export const PHOTOS: Record<PhotoId, PhotoInfo> = {
  eyes: p("eyes-640", "eyes-1241", "40% 18%", "Fakiha with a red teddy bear"),
  smile: p("smile-640", "smile-1241", "40% 24%", "Fakiha in a pink floral kurta"),
  golden: p("golden-640", "golden-1140", "50% 22%", "Fakiha in golden light"),
  "kurta-face": p("kurta-face-579", undefined, "30% 18%", "Fakiha in a rose kurta"),
  "kurta-smile": p("kurta-smile-579", undefined, "40% 22%", "Fakiha smiling"),
  "kurta-hand": p("kurta-hand-580", undefined, "40% 22%", "Fakiha portrait"),
  "floral-full": p("floral-full-582", undefined, "35% 10%", "Fakiha in a festive outfit with floral jewellery"),
  "floral-wrist": p("floral-wrist-582", undefined, "40% 18%", "Fakiha with floral bracelets"),
  "white-selfie": p("white-selfie-582", undefined, "25% 20%", "Fakiha in white with a red lip"),
};
