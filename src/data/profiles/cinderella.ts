import type { Mood, ParticleKind, PhotoId, Profile, Scene, SceneMotion } from "@/lib/types";

const card = (eyebrow: string, headline: string, mood: Mood = "castle", particles: ParticleKind = "sparkles"): Scene => ({
  kind: "title",
  eyebrow,
  headline,
  mood,
  particles,
});

const text = (lines: string[], mood: Mood = "castle", particles: ParticleKind = "sparkles", eyebrow?: string): Scene => ({
  kind: "text",
  lines,
  mood,
  particles,
  eyebrow,
});

const pic = (
  photo: PhotoId,
  lines: string[],
  motion: SceneMotion = "in",
  mood: Mood = "castle",
  particles: ParticleKind = "sparkles",
  eyebrow?: string,
): Scene => ({ kind: "photo", photo, lines, motion, mood, particles, eyebrow });

const letter = (
  lines: string[],
  signoff: string,
  mood: Mood = "night",
  particles: ParticleKind = "stars",
  photo?: PhotoId,
): Scene => ({ kind: "letter", lines, signoff, mood, particles, photo, motion: "in" });

export const cinderella: Profile = {
  slug: "cinderella",
  name: "Cinderella",
  subtitle: "My real-life fairytale",
  avatar: "floral-full",
  avatarPos: "40% 0%",
  avatarZoom: 2,
  accent: "#d9b86c",
  font: "serif",
  music: "fairytale",
  heroId: "once-upon-a-fakiha",
  welcome: {
    eyebrow: "A kingdom opens its gates",
    line: "Welcome home, princess. The lanterns were lit hours ago, and every one of them was waiting for you.",
  },
  studioIntro: {
    kicker: "A FAKIHA ORIGINAL",
    line: "Once upon a time, there was a girl the whole forest talked about…",
  },
  stillWatching: {
    headline: "The clock is striking midnight…",
    body: "Don't run, princess. In this story the spell doesn't break at midnight, and the carriage stays a carriage. Still reading, or shall the castle tuck you in?",
    yes: "Keep the spell going",
    no: "Return to the castle",
  },
  rows: [
    { id: "continue", title: "Continue Watching for Cinderella", kind: "continue", titleIds: [] },
    {
      id: "top",
      title: "A Fairytale Called You",
      kind: "top10",
      titleIds: [
        "once-upon-a-fakiha",
        "the-garden-that-was-jealous",
        "midnight-and-the-glass-slipper",
        "the-royal-portrait-gallery",
        "the-star-that-lost-a-contest",
        "a-poem-for-the-princess",
        "the-castle-wakes-up",
      ],
    },
    {
      id: "midnight",
      title: "Midnight Stories",
      titleIds: ["midnight-and-the-glass-slipper", "the-star-that-lost-a-contest", "the-castle-wakes-up", "letter-from-the-tower"],
    },
    {
      id: "gallery",
      title: "The Royal Gallery",
      titleIds: ["the-royal-portrait-gallery", "a-poem-for-the-princess", "the-garden-that-was-jealous"],
    },
    {
      id: "originals",
      title: "Birthday Originals",
      titleIds: ["once-upon-a-fakiha", "the-castle-wakes-up", "the-garden-that-was-jealous", "midnight-and-the-glass-slipper"],
    },
    {
      id: "favorites",
      title: "My Favorites",
      titleIds: ["a-poem-for-the-princess", "the-star-that-lost-a-contest", "letter-for-the-morning-after-midnight", "once-upon-a-fakiha"],
    },
    {
      id: "letters",
      title: "Letters & Little Notes",
      titleIds: ["letter-from-the-tower", "letter-for-the-morning-after-midnight", "a-poem-for-the-princess"],
    },
    { id: "finale", title: "The Finale", titleIds: ["the-final-episode"] },
  ],
  continueSeed: ["once-upon-a-fakiha", "the-garden-that-was-jealous", "midnight-and-the-glass-slipper"],
  titles: [
    {
      id: "once-upon-a-fakiha",
      title: "Once Upon a Fakiha",
      tagline: "Every fairytale begins with a girl. This one begins with you.",
      type: "Series",
      synopsis:
        "In a kingdom where flowers hold meetings about her and the stars take notes, one princess walks through the evening without knowing she is the plot. A four-part fairytale told entirely in her honour.",
      year: 2026,
      maturity: "A+",
      maturityNote: "flowers visibly jealous, mild spellbinding",
      match: 100,
      genres: ["Fairytale", "Fantasy", "Romance"],
      starring: ["Fakiha"],
      thumb: "floral-full",
      thumbPos: "35% 10%",
      badge: "Exclusive",
      episodes: [
        {
          title: "The Girl the Forest Talked About",
          synopsis: "The trees have been whispering for years. Tonight, someone finally listens.",
          scenes: [
            card("CHAPTER ONE", "The Girl the Forest Talked About", "forest", "fireflies"),
            text(
              [
                "Once upon a time, beyond seven hills and one very curious river,",
                "there lived a girl whose name made the wind slow down.",
                "The wind liked to hear it properly.",
              ],
              "forest",
              "fireflies",
            ),
            text(
              [
                "The old oaks leaned together at night, branches touching,",
                "and passed her name from tree to tree like a secret",
                "too good to keep, too precious to say loudly.",
              ],
              "forest",
              "fireflies",
            ),
            pic(
              "kurta-hand",
              ["Here she is. The one the forest means.", "A face that makes the moon check its own reflection."],
              "left",
              "night",
              "stars",
            ),
            text(
              [
                "Her eyes, the storytellers say, were two lanterns left on for travellers,",
                "the kind of light that tells a lost thing: you are almost home.",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "And so the story starts here, with the very first thing it knows:",
                "you were never an ordinary girl in an ordinary tale.",
              ],
              "dawn",
              "sparkles",
            ),
          ],
        },
        {
          title: "The Invitation Written in Starlight",
          synopsis: "An envelope arrives with no stamp and no sender, only a tiny, impossible glow.",
          scenes: [
            card("CHAPTER TWO", "The Invitation Written in Starlight", "night", "stars"),
            text(
              [
                "One evening, an envelope drifted down the chimney,",
                "weightless as a thought and warm as a held hand.",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "Inside, a single line, written in handwriting made of stars:",
                "“You are expected at the castle. Wear whatever makes you feel like yourself.”",
              ],
              "night",
              "stars",
            ),
            pic(
              "floral-full",
              [
                "So she wore the softest rose and gold,",
                "flowers at her wrists, because even jewellery wanted to be a garden near her.",
              ],
              "out",
              "garden",
              "petals",
              "THE DRESS",
            ),
            pic(
              "floral-wrist",
              ["Fresh blossoms, tied by hand.", "They bloomed a little extra when she put them on. Nobody asked them to."],
              "right",
              "garden",
              "petals",
            ),
            text(
              [
                "The mirror, which had seen many guests, went very quiet.",
                "Then it said, in a voice it had never used before: “Oh.”",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "And the carriage outside, which had been a pumpkin that morning,",
                "decided it was extremely honoured to be involved.",
              ],
              "dawn",
              "sparkles",
            ),
          ],
        },
        {
          title: "The Ballroom Forgets to Dance",
          synopsis: "Hundreds of guests. One entrance. A hush that rolls across the marble like a wave.",
          scenes: [
            card("CHAPTER THREE", "The Ballroom Forgets to Dance", "castle", "sparkles"),
            text(
              [
                "The violins were halfway through a waltz when she stepped inside.",
                "Then the violins, quite simply, lost their place.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "Chandeliers trembled. Not from the music.",
                "A hundred small flames leaned toward the door like sunflowers.",
              ],
              "castle",
              "sparkles",
            ),
            pic(
              "golden",
              [
                "Light found her before anyone could announce her.",
                "It settled in her hair like it had been searching for a home all evening.",
              ],
              "in",
              "ember",
              "sparkles",
              "THE ENTRANCE",
            ),
            text(
              [
                "The queen forgot her speech. The knights forgot their posture.",
                "A very important duke forgot he was important.",
              ],
              "castle",
              "sparkles",
            ),
            pic(
              "smile",
              ["And then she smiled.", "Somewhere far off, a clock decided it could wait a little longer."],
              "left",
              "dawn",
              "petals",
            ),
            text(
              [
                "The ballroom remembered how to dance eventually.",
                "But every person in it danced a little facing her direction, just in case.",
              ],
              "castle",
              "sparkles",
            ),
          ],
        },
        {
          title: "Happily, Starting Today",
          synopsis: "The clock strikes midnight, and nothing disappears. That's the twist.",
          scenes: [
            card("CHAPTER FOUR", "Happily, Starting Today", "dawn", "petals"),
            text(
              [
                "At midnight, the great clock began to strike.",
                "Everyone held their breath for the spell to end.",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "Twelve bells rang. The gown stayed a gown.",
                "The flowers stayed in bloom. The glow stayed in her eyes.",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "Because it was never a spell.",
                "It was only the truth, finally dressed up enough for everyone to see.",
              ],
              "dawn",
              "sparkles",
            ),
            pic(
              "kurta-smile",
              ["Happy birthdayyyyy, princess.", "This is the first page of a very long year, and every page is yours."],
              "in",
              "dawn",
              "petals",
              "THE END? NEVER.",
            ),
            text(
              [
                "So, dear reader, dear girl, dear heart of the whole story:",
                "turn the page. The castle is lit. The next chapter is already smiling.",
              ],
              "garden",
              "petals",
            ),
          ],
        },
      ],
    },
    {
      id: "the-garden-that-was-jealous",
      title: "The Garden That Was Jealous",
      tagline: "Roses do not like being second prettiest.",
      type: "Series",
      synopsis:
        "The royal garden has bloomed in peace for a hundred years, until a girl walks through and every petal files a formal complaint. A comedy of envy, in three acts.",
      year: 2026,
      maturity: "PG",
      maturityNote: "petty roses, a sulking tulip, one dramatic daisy",
      match: 99,
      genres: ["Fantasy", "Comedy", "Garden"],
      starring: ["Fakiha", "Very Offended Roses"],
      thumb: "floral-wrist",
      thumbPos: "40% 20%",
      badge: "Top 10",
      episodes: [
        {
          title: "Meeting of the Petals",
          synopsis: "An emergency session is called beneath the old willow.",
          scenes: [
            card("ACT ONE", "Meeting of the Petals", "garden", "petals"),
            text(
              [
                "At dawn the roses called an emergency meeting.",
                "Agenda, item one: the girl who just walked past.",
              ],
              "garden",
              "petals",
            ),
            text(
              [
                "“She did not even try,” said the tulips.",
                "“She was just walking,” said the lilies.",
                "“Walking!” gasped the entire back row.",
              ],
              "garden",
              "petals",
            ),
            pic(
              "floral-wrist",
              [
                "Exhibit A: the bracelets of fresh blossoms she wore.",
                "The flowers on her wrists were, frankly, being smug about it.",
              ],
              "left",
              "garden",
              "petals",
              "EXHIBIT A",
            ),
            text(
              [
                "The motion was put to a vote: shall we out-bloom her?",
                "Result: impossible. Result: also, the vote was held in a blush.",
              ],
              "garden",
              "petals",
            ),
          ],
        },
        {
          title: "The Great Bloom-Off",
          synopsis: "Every petal in the kingdom pulls out all the stops.",
          scenes: [
            card("ACT TWO", "The Great Bloom-Off", "garden", "petals"),
            text(
              [
                "The roses turned a shade of red they had been saving for emergencies.",
                "The sunflowers stood on tiptoe. Sunflowers have no tiptoes. They tried anyway.",
              ],
              "garden",
              "petals",
            ),
            text(
              [
                "The lavender perfumed the whole valley.",
                "The jasmine opened at noon, which is illegal.",
              ],
              "garden",
              "petals",
            ),
            pic(
              "smile",
              ["And then she laughed, just a small one, at a bee that landed on her sleeve.", "Every flower in the garden lost on the spot."],
              "in",
              "garden",
              "petals",
              "THE VERDICT",
            ),
            text(
              [
                "Because beauty, the judges noted, is not a performance.",
                "It is what happens when kindness and light share a face.",
              ],
              "dawn",
              "sparkles",
            ),
            text(
              [
                "The roses were quiet for a long time.",
                "Then the oldest one whispered: “Fine. She wins. Can we at least be her bouquet?”",
              ],
              "garden",
              "petals",
            ),
          ],
        },
        {
          title: "A Truce Made of Pollen",
          synopsis: "The garden surrenders, with great ceremony and extremely small flags.",
          scenes: [
            card("ACT THREE", "A Truce Made of Pollen", "garden", "petals"),
            text(
              [
                "The garden signed a peace treaty that evening,",
                "written in dew, witnessed by one embarrassed butterfly.",
              ],
              "garden",
              "petals",
            ),
            text(
              [
                "Article one: the flowers shall never again attempt to compare.",
                "Article two: if she passes, all heads must bow, politely.",
              ],
              "garden",
              "petals",
            ),
            pic(
              "kurta-face",
              ["Article three: the roses may keep their pride,", "as long as they admit who it belongs to."],
              "right",
              "dawn",
              "petals",
              "FINE PRINT",
            ),
            text(
              [
                "So if you ever wonder why flowers lean when you walk by,",
                "that is not the wind, beautifulllll girl. That is admiration.",
              ],
              "garden",
              "petals",
            ),
            text(
              [
                "Happy birthday from the whole garden,",
                "every petal, every thorn, every very tired bee.",
              ],
              "garden",
              "petals",
            ),
          ],
        },
      ],
    },
    {
      id: "midnight-and-the-glass-slipper",
      title: "Midnight & the Glass Slipper",
      tagline: "She left one shoe behind. The whole kingdom has been looking for the girl ever since.",
      type: "Film",
      synopsis:
        "A feature-length fairytale in two parts: the night a slipper made of moonlight goes missing, and the long, beautiful search for the only foot it could ever fit.",
      year: 2026,
      maturity: "16+",
      maturityNote: "dramatic staircases, extreme enchantment",
      match: 98,
      genres: ["Fairytale", "Romance", "Mystery"],
      starring: ["Fakiha", "One Glass Slipper"],
      thumb: "white-selfie",
      thumbPos: "25% 22%",
      badge: "New",
      episodes: [
        {
          title: "Part One: The Staircase at Twelve",
          synopsis: "Twelve strokes, one staircase, one fallen slipper.",
          scenes: [
            card("PART ONE", "The Staircase at Twelve", "night", "stars"),
            text(
              [
                "The first stroke of midnight rang across the castle.",
                "She turned on the staircase, and the whole night turned with her.",
              ],
              "night",
              "stars",
            ),
            pic(
              "white-selfie",
              ["Soft white, a red lip like a single drop of courage,", "hair dark as the hour itself."],
              "in",
              "night",
              "stars",
              "THE LAST LOOK",
            ),
            text(
              [
                "By the sixth stroke, she was halfway down.",
                "By the ninth, a slipper slid from her foot and chimed against the marble.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "Nobody picked it up right away.",
                "They were all too busy staring at the place she had just been.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "When the twelfth bell sounded, the stairs were empty,",
                "the air smelled faintly of roses, and the story had its mystery.",
              ],
              "night",
              "fireflies",
            ),
          ],
        },
        {
          title: "Part Two: The Only Foot in the Kingdom",
          synopsis: "Every door. Every foot. One perfect fit.",
          scenes: [
            card("PART TWO", "The Only Foot in the Kingdom", "dawn", "sparkles"),
            text(
              [
                "The prince, the pages, the poets, the palace cat:",
                "all of them went door to door with a slipper on a velvet pillow.",
              ],
              "dawn",
              "sparkles",
            ),
            text(
              [
                "They tried it on a thousand feet. It was too tight for some,",
                "too loose for others, too ordinary for all of them.",
              ],
              "dawn",
              "sparkles",
            ),
            pic(
              "eyes",
              ["And then they reached her door,", "and the slipper began to glow before anyone had knocked."],
              "left",
              "ember",
              "fireflies",
              "THE LAST DOOR",
            ),
            text(
              [
                "It fit like it had been waiting. Like the slipper itself had been",
                "following her footsteps in the dark, hoping to be chosen.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "So here is the thing the kingdom learned that day:",
                "some people are not found. They simply arrive, and everything else is measured against them.",
              ],
              "castle",
              "sparkles",
            ),
            pic(
              "golden",
              ["Happy birthday to the only girl the slipper ever agreed to.", "The search is over. The shoe has chosen."],
              "out",
              "ember",
              "sparkles",
            ),
          ],
        },
      ],
    },
    {
      id: "the-star-that-lost-a-contest",
      title: "The Star That Lost a Contest",
      tagline: "One small star. One impossible comparison. A lot of dignity lost.",
      type: "Short",
      synopsis:
        "A star who has spent ten thousand years being the brightest thing in the sky looks down for the first time. Five minutes of heartbreak and sparkle.",
      year: 2026,
      maturity: "U",
      maturityNote: "mild envy, one wounded star",
      match: 97,
      genres: ["Fairytale", "Comedy", "Sky"],
      starring: ["Fakiha", "One Very Small Star"],
      thumb: "eyes",
      thumbPos: "40% 16%",
      episodes: [
        {
          title: "The Star That Lost a Contest",
          synopsis: "A star glances down and loses all of its confidence.",
          scenes: [
            card("A SHORT FILM", "The Star That Lost a Contest", "night", "stars"),
            text(
              [
                "There was once a star named Little Vesper,",
                "who had never lost a staring contest in her life.",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "She twinkled at sailors. She sparkled at poets.",
                "Everyone below said the same thing: nothing shines like her.",
              ],
              "night",
              "stars",
            ),
            pic(
              "eyes",
              ["Then one night she glanced down and met a pair of eyes.", "Warm, dark, impossibly alive. Vesper blinked first."],
              "in",
              "night",
              "stars",
              "THE STARE",
            ),
            text(
              [
                "“That’s not fair,” she whispered to the moon.",
                "“How is she doing that with only two?”",
              ],
              "night",
              "stars",
            ),
            text(
              [
                "The moon, who had seen everything, just shrugged softly.",
                "“Some light isn’t borrowed from anywhere. It begins in her.”",
              ],
              "night",
              "fireflies",
            ),
            text(
              [
                "Little Vesper still shines every night, a little humbler now,",
                "wishing, quietly, that she could be half as bright. Happy birthday, Fakiha.",
              ],
              "night",
              "stars",
            ),
          ],
        },
      ],
    },
    {
      id: "the-castle-wakes-up",
      title: "The Castle Wakes Up",
      tagline: "Every stone has been waiting for this birthday.",
      type: "Short",
      synopsis:
        "At sunrise, the whole castle realises what day it is. Chandeliers polish themselves, the fountain practices a song, and the gargoyles try, very badly, to smile.",
      year: 2026,
      maturity: "U",
      maturityNote: "overexcited furniture, tasteful confetti",
      match: 98,
      genres: ["Fantasy", "Comedy", "Celebration"],
      starring: ["Fakiha", "The Entire Castle"],
      thumb: "golden",
      thumbPos: "50% 24%",
      badge: "Recently Added",
      episodes: [
        {
          title: "The Castle Wakes Up",
          synopsis: "A castle in a tremendous state of birthday.",
          scenes: [
            card("A SHORT FILM", "The Castle Wakes Up", "dawn", "sparkles"),
            text(
              [
                "Dawn crept over the towers, and the castle opened one stone eye.",
                "Then it sat bolt upright. “It’s TODAY!” said the drawbridge.",
              ],
              "dawn",
              "sparkles",
            ),
            text(
              [
                "The chandeliers began polishing themselves.",
                "The staircases arranged themselves into a straighter, more flattering line.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "The fountain practiced a song in the courtyard,",
                "got the high note wrong, and tried again with great courage.",
              ],
              "garden",
              "petals",
            ),
            pic(
              "golden",
              ["The sunrise itself arrived early, in its best gold,", "just to light her room first."],
              "right",
              "ember",
              "sparkles",
              "THE FIRST LIGHT",
            ),
            text(
              [
                "The gargoyles were told to smile. They did their best.",
                "It was not pretty, but it was sincere, which is the real magic.",
              ],
              "castle",
              "sparkles",
            ),
            text(
              [
                "So wake up slowly, princess, there is no hurry in a castle that loves you.",
                "Happy birthdayyyyy. Everything here was done for you.",
              ],
              "dawn",
              "petals",
            ),
          ],
        },
      ],
    },
    {
      id: "letter-from-the-tower",
      title: "A Letter from the Tower",
      tagline: "The oldest tower in the kingdom has something to say.",
      type: "Letter",
      synopsis:
        "Delivered by a very out-of-breath raven: a short, tender letter written from the highest window of the castle, to the girl who made the view worth the climb.",
      year: 2026,
      maturity: "U",
      maturityNote: "sincere, slightly misty, deeply fond",
      match: 99,
      genres: ["Letter", "Fairytale", "Heartfelt"],
      starring: ["Fakiha"],
      thumb: "kurta-hand",
      thumbPos: "40% 20%",
      episodes: [
        {
          title: "A Letter from the Tower",
          synopsis: "Read it slowly. It was written slowly.",
          scenes: [
            card("DELIVERED BY RAVEN", "A Letter from the Tower", "night", "stars"),
            letter(
              [
                "Dear Cinderella, I am writing this from the top of the tallest tower, where the wind has strong opinions and the stars feel close enough to borrow.",
                "From up here, the whole kingdom looks small. Except you. You somehow remain the biggest thing I notice, in the best possible way.",
                "There is a strange rule in fairytales: the princess is always beautiful, and everyone just says so. I want to do better. I want to tell you what the beauty is made of.",
              ],
              "",
              "night",
              "stars",
              "kurta-hand",
            ),
            letter(
              [
                "It is in the way you tuck your hair back when you are thinking. It is in the soft, stubborn kindness you pretend is nothing. It is in your eyes, which I would trust to guide a ship home.",
                "Any tower can see far. Only you make me want to look closer.",
                "So on your birthday I send you this: a raven, a wish, and a promise that the light in the highest window is always, always on for you.",
              ],
              "Yours from the highest window, with a tired raven and a full heart",
              "night",
              "fireflies",
            ),
          ],
        },
      ],
    },
    {
      id: "letter-for-the-morning-after-midnight",
      title: "Letter for the Morning After Midnight",
      tagline: "For when the party ends and you wonder if it was real.",
      type: "Letter",
      synopsis:
        "Written to be opened the morning after the ball, when the music has stopped and the world looks ordinary again. A reminder that the magic never left the room, because it never lived in the room.",
      year: 2026,
      maturity: "U",
      maturityNote: "gentle, warm, may cause sudden smiling",
      match: 100,
      genres: ["Letter", "Romance", "Heartfelt"],
      starring: ["Fakiha"],
      thumb: "smile",
      thumbPos: "40% 26%",
      episodes: [
        {
          title: "Letter for the Morning After Midnight",
          synopsis: "Open when the candles are cold and the sun is just warming up.",
          scenes: [
            card("OPEN IN THE MORNING", "Letter for the Morning After Midnight", "dawn", "petals"),
            letter(
              [
                "Good morning, my favourite chapter. If you are reading this, the candles are out, the dresses are folded, and the world has gone back to looking like a normal Tuesday.",
                "I want to tell you something important before the day begins: the magic did not leave. It was never in the chandeliers or the carriage. It travels with you, like a quiet little weather system.",
                "People walk into rooms and call it ordinary light. Then you come in, and the whole room has to rethink the word.",
              ],
              "",
              "dawn",
              "petals",
              "smile",
            ),
            letter(
              [
                "So wear the morning the way you wore the evening. Your smile does not need a ballroom. Your laugh does not need an audience. The sun has already seen you and is fully on your side.",
                "May this birthday be the soft kind of loud: all warmth, all sparkle, nothing that asks you to pretend.",
                "And whenever you doubt it, remember the garden, the stars, the stairs, the slipper. They all voted. It was unanimous.",
              ],
              "Forever yours, long after midnight",
              "dawn",
              "sparkles",
            ),
          ],
        },
      ],
    },
    {
      id: "a-poem-for-the-princess",
      title: "A Poem for the Princess",
      tagline: "Four stanzas. One girl. A great deal of rhyming restraint.",
      type: "Poem",
      synopsis:
        "A short poem, read aloud by candlelight to an audience of sleepy moths. Each stanza takes one thing about her and refuses to leave it alone.",
      year: 2026,
      maturity: "U",
      maturityNote: "rhyme, soft lighting, extreme sincerity",
      match: 99,
      genres: ["Poetry", "Fairytale", "Romance"],
      starring: ["Fakiha"],
      thumb: "kurta-face",
      thumbPos: "30% 20%",
      episodes: [
        {
          title: "A Poem for the Princess",
          synopsis: "Read slowly, by candlelight.",
          scenes: [
            card("A POEM", "For the Princess", "night", "fireflies"),
            pic(
              "kurta-face",
              [
                "Her eyes are lanterns left for lost things,",
                "her brows, two quiet brushstrokes drawn with care,",
                "and every dusk, the moon looks down and sighs:",
                "“I tried to make that. I could not get it there.”",
              ],
              "in",
              "night",
              "fireflies",
              "I. THE LANTERNS",
            ),
            pic(
              "eyes",
              [
                "Her hair falls like a midnight river,",
                "dark and slow and full of shine,",
                "and every stray strand tells the evening:",
                "“I would like to be called hers, not mine.”",
              ],
              "left",
              "night",
              "stars",
              "II. THE RIVER",
            ),
            pic(
              "smile",
              [
                "Her smile arrives like morning in a garden,",
                "no trumpet, just a hush of gold,",
                "and the daisies turn their faces over,",
                "to ask what makes the day so bold.",
              ],
              "right",
              "garden",
              "petals",
              "III. THE MORNING",
            ),
            pic(
              "white-selfie",
              [
                "So here is a birthday, wrapped in rhyme,",
                "not nearly enough, but sent with all my heart:",
                "may every year be soft with starlight,",
                "and every ending be a start.",
              ],
              "out",
              "dawn",
              "sparkles",
              "IV. THE WISH",
            ),
            text(
              ["The candle has burned a little lower now.", "The moths applaud, softly, with their wings."],
              "night",
              "fireflies",
            ),
          ],
        },
      ],
    },
    {
      id: "the-royal-portrait-gallery",
      title: "The Royal Portrait Gallery",
      tagline: "Nine portraits. Every one of them keeps smiling back.",
      type: "Slideshow",
      synopsis:
        "Walk the long hall of the castle gallery, where every painting has been replaced by the same irresistible subject. Hushed footsteps recommended.",
      year: 2026,
      maturity: "A+",
      maturityNote: "frames visibly proud, curator overwhelmed",
      match: 100,
      genres: ["Gallery", "Fairytale", "Portrait"],
      starring: ["Fakiha"],
      thumb: "kurta-smile",
      thumbPos: "40% 24%",
      badge: "Top 10",
      episodes: [
        {
          title: "Hall One: The Morning Wing",
          synopsis: "Five portraits. Tread softly.",
          scenes: [
            card("THE GALLERY", "Hall One: The Morning Wing", "castle", "sparkles"),
            pic(
              "smile",
              ["Portrait I: “The Quiet Morning.”", "Painted in pink and certainty, she looks at you like you’re already forgiven."],
              "in",
              "dawn",
              "petals",
              "PORTRAIT I",
            ),
            pic(
              "golden",
              ["Portrait II: “Crown of Gold Hour.”", "The sun refused to leave the frame, and the painter stopped arguing."],
              "right",
              "ember",
              "sparkles",
              "PORTRAIT II",
            ),
            pic(
              "kurta-smile",
              ["Portrait III: “The Half-Smile That Started a Rumour.”", "Scholars still debate what it means. Everyone agrees it’s lovely."],
              "left",
              "castle",
              "sparkles",
              "PORTRAIT III",
            ),
            pic(
              "kurta-face",
              ["Portrait IV: “Rose in Repose.”", "Even the painted roses on her sleeve lean in to listen."],
              "out",
              "garden",
              "petals",
              "PORTRAIT IV",
            ),
            pic(
              "eyes",
              ["Portrait V: “Eyes of the Evening.”", "The gallery keeps this one lit all night. Visitors stand very still."],
              "in",
              "night",
              "stars",
              "PORTRAIT V",
            ),
          ],
        },
        {
          title: "Hall Two: The Evening Wing",
          synopsis: "Four more, and one last announcement.",
          scenes: [
            card("THE GALLERY", "Hall Two: The Evening Wing", "night", "stars"),
            pic(
              "white-selfie",
              ["Portrait VI: “Snow, Ink and a Single Red.”", "A study in contrasts, with absolutely no weak points."],
              "left",
              "night",
              "stars",
              "PORTRAIT VI",
            ),
            pic(
              "kurta-hand",
              ["Portrait VII: “The Thinking Girl.”", "Artists call it a masterpiece. She would call it Tuesday."],
              "right",
              "castle",
              "sparkles",
              "PORTRAIT VII",
            ),
            pic(
              "floral-wrist",
              ["Portrait VIII: “Bracelets of the Garden.”", "Fresh petals, still unsure how they got so lucky."],
              "in",
              "garden",
              "petals",
              "PORTRAIT VIII",
            ),
            pic(
              "floral-full",
              ["Portrait IX: “The Princess in Full Bloom.”", "The largest frame in the hall. It still feels a little too small."],
              "out",
              "castle",
              "sparkles",
              "PORTRAIT IX",
            ),
            text(
              [
                "The curator has one more thing to say before closing:",
                "the gallery is not complete, because you are still being painted, daily, in everyone who loves you.",
              ],
              "castle",
              "sparkles",
            ),
          ],
        },
      ],
    },
    {
      id: "the-final-episode",
      title: "The Final Episode",
      tagline: "Every fairytale saves its best line for the end.",
      type: "Special",
      synopsis:
        "The last page of the book, written in a hand that shakes a little from feeling too much. Unlocks only for the girl who has seen the rest of the kingdom.",
      year: 2026,
      maturity: "A+",
      maturityNote: "a very large amount of love",
      match: 100,
      genres: ["Finale", "Fairytale", "Romance"],
      starring: ["Fakiha"],
      thumb: "floral-full",
      thumbPos: "35% 12%",
      badge: "Finale",
      finale: true,
      episodes: [
        {
          title: "And She Lived Brilliantly Ever After",
          synopsis: "The one message the whole story was walking toward.",
          scenes: [
            card("THE LAST PAGE", "And She Lived Brilliantly Ever After", "castle", "sparkles"),
            text(
              [
                "We have walked the forest, the garden, the ballroom and the stair.",
                "We have counted the stars, and they came up one short of enough.",
              ],
              "night",
              "stars",
            ),
            pic(
              "floral-full",
              [
                "And all of it, every petal, every bell, every borrowed bit of light,",
                "was only ever practice for describing you.",
              ],
              "in",
              "castle",
              "petals",
              "THE LAST CHAPTER",
            ),
            text(
              [
                "No tower, no crown, no glass slipper made you a princess.",
                "You were the reason the kingdom learned the word.",
              ],
              "dawn",
              "sparkles",
            ),
            text(
              [
                "So here is the thing I wanted to say, in my plainest, truest voice:",
                "you are loved, fully, loudly, and without any condition at all.",
              ],
              "dawn",
              "sparkles",
            ),
            {
              kind: "finale",
              headline: "HAPPY BIRTHDAYYYYY, MY CINDERELLA",
              lines: [
                "May every door you walk toward open before you knock.",
                "May your happiness be loud and your health be steady and your dreams be impatient to meet you.",
                "And may you always know that in the story of my world, you were never a part. You were the whole book.",
              ],
              signoff: "Happily ever after starts today, and it has your name on every page.",
              photo: "golden",
              motion: "in",
              mood: "ember",
              particles: "confetti",
              birthdayTune: true,
            },
          ],
        },
      ],
    },
  ],
  messages: [
    {
      id: "wish-flowers-jealous",
      kind: "wish",
      title: "A Wish Made on a Dandelion",
      paragraphs: [
        "I blew on the fluffiest dandelion I could find and sent one wish out over the meadow: that your birthday be soft, sparkly, and entirely yours.",
        "The seeds drifted toward you. Please catch at least one.",
      ],
      signoff: "With a pocketful of wishes",
      photo: "floral-wrist",
    },
    {
      id: "wish-pumpkin-carriage",
      kind: "wish",
      title: "Your Carriage Has Arrived",
      paragraphs: [
        "Happy birthdayyyyy, princess! The carriage is waiting, polished and impatient. Wherever you want to go this year, it has already decided to take you.",
      ],
      signoff: "From the very proud pumpkin",
    },
    {
      id: "letter-the-lantern-keeper",
      kind: "letter",
      title: "To the Girl Who Carries the Light",
      paragraphs: [
        "Some people light up a room by being loud. You do it by being kind, quietly, over and over, until the whole place feels warmer than when you walked in.",
        "I have watched you handle a hard day with more grace than most fairy-tale heroines get a whole book to learn. You never asked for applause. You just kept walking, and the road kept brightening.",
        "On your birthday I want you to know that your softness is not a weakness. It is the reason the forest lets you through. It is the reason the stars lean closer.",
        "I hope this year is gentle with you in all the ways you are gentle with everyone else. I hope someone saves you the best seat. I hope the cake is exactly the right size, which is to say, too big.",
        "And I hope you know, down to the quietest corner of your heart, that you are someone's favourite person to think about. Mine, at the very least. Always.",
      ],
      signoff: "Yours, from just outside the lantern light",
      photo: "kurta-hand",
    },
    {
      id: "letter-what-the-mirror-says",
      kind: "letter",
      title: "What the Mirror Wishes You Could See",
      paragraphs: [
        "The mirror in the castle has a confession: it has never been able to show you properly. It gets the colours right and the shape right, but it misses the part that matters.",
        "It cannot show the way a room changes when you laugh. It cannot show the courage in the way you keep trying. It cannot show how many people breathe a little easier when you are near.",
        "If I could hold up one mirror that told the truth, it would show a girl with starlight in her eyes, a smile like a first morning, and a heart that never once learned how to be careless with others.",
        "That girl is real. She is the one reading this. Be kind to her today, as kind as she has always been to everyone else.",
        "Happy birthday, to the most beautifulllll view the mirror has never quite managed to capture.",
      ],
      signoff: "Written on the back of a mirror, in steam",
      photo: "white-selfie",
    },
    {
      id: "poem-midnight-river",
      kind: "poem",
      title: "Midnight River",
      paragraphs: [
        "Your hair is a river after dark,\nslow, and silver where it bends,\nand every secret the moon has kept\nit pours out where the water ends.",
        "I would sit forever on that bank,\nno boat, no map, no plan,\njust listening to the river tell me\nhow beautiful a girl can be, and how much more than she can.",
      ],
      signoff: "Scribbled on a leaf, left on the water",
      photo: "eyes",
    },
    {
      id: "poem-the-flowers-complaint",
      kind: "poem",
      title: "The Rose's Complaint",
      paragraphs: [
        "Said the rose to the rain, “I have petals and pride,\nI have thorns I can wield when I must,\nbut she passed through the garden with nothing to hide\nand I wilted from envy and dust.”",
        "Said the rain to the rose, “Do not take it so hard,\nshe has ruined the tulips as well.\nShe is simply the light that the whole yard is for,\nand the rest of us all know it. Farewell.”",
      ],
      signoff: "Overheard, and written down, in the garden",
      photo: "floral-wrist",
    },
    {
      id: "playful-royal-decree",
      kind: "playful",
      title: "Royal Decree of the Birthday Kingdom",
      paragraphs: [
        "HEAR YE, HEAR YE! By order of the whole castle: today, Princess Fakiha is permitted to eat dessert first, nap in the middle, and ignore any rule that has ever been inconvenient.",
        "Any guard who looks at her with anything but adoration shall be reassigned to polishing the stairs. The stairs are very long.",
        "The carriage is on standby. The cake has been told to behave. The roses have been told to stop gossiping.",
        "Signed, sealed, and blushing, by the Council of Very Devoted Subjects.",
      ],
      signoff: "Stamped with the biggest wax seal we could find",
    },
    {
      id: "fairytale-the-first-sight",
      kind: "fairytale",
      title: "The Night I Understood Fairytales",
      paragraphs: [
        "I used to think the stories exaggerated. Nobody could really make a whole room go quiet, I thought. Nobody could really make the stars look a little embarrassed.",
        "Then I saw you, and every fairytale I had ever doubted turned out to be a modest, understated account of something real.",
        "So thank you, princess, for making me a believer. I would apologise to the storybooks, but they are too busy blushing on your behalf.",
      ],
      signoff: "Your humble, converted reader",
      photo: "smile",
    },
    {
      id: "fairytale-slipper-note",
      kind: "fairytale",
      title: "A Note Tucked Inside the Slipper",
      paragraphs: [
        "If you find this, it means the slipper fit, which I always knew it would. Nothing else in the kingdom was ever going to be good enough for your feet, or your steps, or the way you walk into a place and make it feel like it was waiting.",
        "I wrote this note small, so it would not weigh down your shoe. But the feeling behind it is the biggest thing I know.",
        "Happy birthday, my princess. Walk gently. Dance a lot. And do not look back at midnight: nothing is chasing you except good things.",
      ],
      signoff: "Folded very small, kept very close",
      photo: "golden",
    },
    {
      id: "fairytale-moon-and-stars",
      kind: "fairytale",
      title: "What the Stars Whispered Last Night",
      paragraphs: [
        "Last night I asked the stars about you. They went quiet, then they all spoke at once, the way people do when they love the same thing.",
        "One said, “She is the reason I try.” Another said, “She makes me feel unfinished.” The smallest one just sighed and said, “I would trade every year of my light for one of her mornings.”",
        "I thought you should know what the sky is saying about you. It is not a secret anymore. Happy birthdayyyyy, my glittering, gorgeous girl.",
      ],
      signoff: "Translated from Starlight, by a very attentive listener",
      photo: "eyes",
    },
    {
      id: "future-the-years-ahead",
      kind: "future",
      title: "For the Years Waiting at Your Door",
      paragraphs: [
        "I wish you a year where your health is a quiet, steady friend: strong mornings, deep sleep, the kind of energy that lets you laugh until your stomach hurts.",
        "I wish you happiness that does not need an excuse. The ordinary kind, over tea, on a random afternoon, when you suddenly realise you are exactly where you want to be.",
        "I wish your dreams the kindest kind of impatience, arriving early, arriving whole, and arriving knowing your name. May every door you have ever wanted to knock on open before your hand reaches it.",
        "And may the people around you be as good to you as you are to them. You deserve a life that gives back every ounce of the warmth you spend.",
      ],
      signoff: "Wishing you everything, in advance",
      photo: "golden",
    },
    {
      id: "sweet-small-things",
      kind: "sweet",
      title: "Small Things That Make You Special",
      paragraphs: [
        "The way your eyes soften when you are listening properly. The tiny, secret ways your nose scrunches when something is funny. The faint pink of your cheeks when someone says something kind.",
        "Big things get the headlines, but I am in love with the small ones. Anyone can admire a sunset. It takes real attention to notice how someone puts their hair behind their ear.",
        "So happy birthday to the girl made of small, beautiful details, every one of them worth a whole, separate poem. I am working on all of them. It may take a lifetime.",
      ],
      signoff: "Collector of your small wonders",
      photo: "kurta-smile",
    },
  ],
  comingSoon: [
    {
      title: "Cinderella: The Next Chapter",
      when: "Coming every day this year",
      synopsis: "More mornings, more sparkle, and absolutely no clocks. The sequel nobody asked for, because everybody has been begging for it.",
      photo: "golden",
      photoPos: "50% 24%",
    },
    {
      title: "The Garden Strikes Back",
      when: "Next spring",
      synopsis: "The flowers have regrouped, rehearsed a new bloom, and still lost. Season two of a very one-sided rivalry.",
      photo: "floral-wrist",
      photoPos: "40% 20%",
    },
    {
      title: "Once Upon Another Birthday",
      when: "Same day, next year",
      synopsis: "A brand-new fairytale, written the moment this one ends. Preorder: one smile, delivered in person.",
      photo: "smile",
      photoPos: "40% 26%",
    },
  ],
  notices: [
    { text: "The castle just added a brand-new original: Once Upon a Fakiha.", when: "Just now", photo: "floral-full" },
    { text: "The roses have filed another complaint. It was upheld, as always.", when: "2h ago", photo: "floral-wrist" },
    { text: "A star named Vesper sent you a very small, very sincere wish.", when: "Yesterday", photo: "eyes" },
  ],
};
