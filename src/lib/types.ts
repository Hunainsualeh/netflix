export type ProfileSlug = "fakiha" | "senorita" | "cinderella" | "kuchu-puchu";

export type PhotoId =
  | "eyes"
  | "smile"
  | "golden"
  | "kurta-face"
  | "kurta-smile"
  | "kurta-hand"
  | "floral-full"
  | "floral-wrist"
  | "white-selfie";

/** Background atmosphere behind text scenes (dark base + soft moving glow). */
export type Mood =
  | "night"
  | "dawn"
  | "sunset"
  | "ocean"
  | "forest"
  | "garden"
  | "castle"
  | "candy"
  | "ember";

export type ParticleKind = "stars" | "petals" | "fireflies" | "sparkles" | "bubbles" | "confetti" | "none";

export type SceneMotion = "in" | "out" | "left" | "right" | "still";

export type SceneKind = "title" | "text" | "photo" | "letter" | "finale" | "video";

export interface Scene {
  kind: SceneKind;
  /** Small spaced-out line above the main text, e.g. "CHAPTER ONE". */
  eyebrow?: string;
  /** Large headline (title cards, finale). */
  headline?: string;
  /**
   * Text revealed one block at a time. For `text`/`photo` scenes these are short lines;
   * for `letter` scenes each entry is a paragraph.
   */
  lines?: string[];
  /** Letter sign-off, revealed last. */
  signoff?: string;
  photo?: PhotoId;
  motion?: SceneMotion;
  mood?: Mood;
  particles?: ParticleKind;
  /** Local MP4 under /public (e.g. "/videos/clip.mp4"). Used when kind === "video". */
  video?: string;
  /** Override the computed duration (ms). */
  duration?: number;
  /** Play the Happy Birthday melody when this scene starts. */
  birthdayTune?: boolean;
}

export interface Episode {
  title: string;
  synopsis: string;
  scenes: Scene[];
}

export type TitleType = "Series" | "Film" | "Short" | "Letter" | "Poem" | "Special" | "Slideshow";

export interface Title {
  id: string;
  title: string;
  /** One-liner shown on hover previews and cards. */
  tagline: string;
  type: TitleType;
  synopsis: string;
  year: number;
  /** Cute maturity rating, e.g. "18+" */
  maturity: string;
  /** What the rating is for, e.g. "excessive beauty, heavy blushing" */
  maturityNote: string;
  /** Netflix-style "98% Match" */
  match: number;
  genres: string[];
  starring: string[];
  thumb: PhotoId;
  /** CSS object-position for card crops, e.g. "50% 20%" */
  thumbPos?: string;
  badge?: "New" | "Top 10" | "Exclusive" | "Recently Added" | "Finale";
  episodes: Episode[];
  /** Locked until enough has been watched (or the logo easter egg is found). */
  finale?: boolean;
}

export type RowKind = "standard" | "top10" | "continue";

export interface Row {
  id: string;
  title: string;
  kind?: RowKind;
  titleIds: string[];
}

export type MessageKind = "wish" | "letter" | "poem" | "playful" | "fairytale" | "future" | "sweet";

export interface Message {
  id: string;
  kind: MessageKind;
  title: string;
  paragraphs: string[];
  signoff: string;
  photo?: PhotoId;
}

export interface ComingSoon {
  title: string;
  when: string;
  synopsis: string;
  photo: PhotoId;
  photoPos?: string;
}

export interface Notice {
  text: string;
  when: string;
  photo: PhotoId;
}

export type SceneFont = "serif" | "script" | "sans";

export interface Profile {
  slug: ProfileSlug;
  name: string;
  /** Short line under the avatar on hover / in dropdown. */
  subtitle: string;
  avatar: PhotoId;
  avatarPos: string;
  /** Optional zoom into the face for full-body photos (pivots on the top of the photo). */
  avatarZoom?: number;
  /** Accent used for avatar frame and subtle highlights (never gradients). */
  accent: string;
  font: SceneFont;
  music: "warm" | "dreamy" | "fairytale" | "playful";
  /** id of the billboard title. */
  heroId: string;
  welcome: { eyebrow: string; line: string };
  /** Shown before the very first story in this profile ("A FAKIHA Original…"). */
  studioIntro: { kicker: string; line: string };
  stillWatching: { headline: string; body: string; yes: string; no: string };
  rows: Row[];
  /** Ids of titles pre-filled in "Continue Watching" (with fake progress) until real progress exists. */
  continueSeed: string[];
  titles: Title[];
  messages: Message[];
  comingSoon: ComingSoon[];
  notices: Notice[];
}
