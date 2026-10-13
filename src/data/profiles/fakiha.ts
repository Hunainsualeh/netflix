import type { Profile } from "@/lib/types";

export const fakiha: Profile = {
  slug: "fakiha",
  name: "Fakiha",
  subtitle: "The Most Beautiful Girl",
  avatar: "golden",
  avatarPos: "50% 22%",
  accent: "#d4a24c",
  font: "serif",
  music: "warm",
  heroId: "the-most-beautiful-girl",

  welcome: {
    eyebrow: "TONIGHT, ON FAKIHA",
    line: "Every title here has exactly one star. She just pressed play.",
  },

  studioIntro: {
    kicker: "A FAKIHA ORIGINAL",
    line: "Filmed entirely in the light she walks into.",
  },

  stillWatching: {
    headline: "Are you still watching?",
    body: "We checked, and yes: it is still a film about the most beautiful girl in the world, and she is still the one holding the remote. Take your time. We will keep the lights low and the credits long.",
    yes: "Yes, keep the beauty rolling",
    no: "Let me glow elsewhere",
  },

  rows: [
    { id: "continue", title: "Continue Watching for Fakiha", kind: "continue", titleIds: [] },
    {
      id: "trending",
      title: "Trending in Fakiha's Universe",
      kind: "top10",
      titleIds: [
        "the-most-beautiful-girl",
        "golden-hour",
        "portrait-of-a-smile",
        "nine-frames",
        "eyes-like-midnight",
        "her-hair-in-the-wind",
        "ode-to-fakiha",
      ],
    },
    {
      id: "beautiful",
      title: "Because You're Beautiful",
      titleIds: [
        "eyes-like-midnight",
        "her-hair-in-the-wind",
        "portrait-of-a-smile",
        "golden-hour",
        "nine-frames",
      ],
    },
    {
      id: "special",
      title: "Reasons You're Special",
      titleIds: [
        "read-this-when-you-doubt-it",
        "the-most-beautiful-girl",
        "portrait-of-a-smile",
        "a-letter-to-the-girl-in-the-photograph",
      ],
    },
    {
      id: "originals",
      title: "Birthday Originals",
      titleIds: [
        "the-most-beautiful-girl",
        "golden-hour",
        "nine-frames",
        "ode-to-fakiha",
        "eyes-like-midnight",
      ],
    },
    {
      id: "favorites",
      title: "My Favorites",
      titleIds: [
        "portrait-of-a-smile",
        "her-hair-in-the-wind",
        "read-this-when-you-doubt-it",
        "golden-hour",
      ],
    },
    {
      id: "letters",
      title: "Letters & Little Notes",
      titleIds: [
        "a-letter-to-the-girl-in-the-photograph",
        "read-this-when-you-doubt-it",
        "ode-to-fakiha",
      ],
    },
    { id: "finale", title: "The Finale", titleIds: ["the-final-episode"] },
  ],

  continueSeed: ["the-most-beautiful-girl", "golden-hour", "portrait-of-a-smile", "ode-to-fakiha"],

  titles: [
    // ───────────────────────── 1. HERO SERIES ─────────────────────────
    {
      id: "the-most-beautiful-girl",
      title: "The Most Beautiful Girl",
      tagline: "One face. Four episodes. Zero competition.",
      type: "Series",
      synopsis:
        "A four-part cinematic study of the face that quietly stops rooms: the eyes, the smile, the little nose, the soft cheeks, the hair. Critics (one critic, writing this) call it impossible to watch without smiling.",
      year: 2026,
      maturity: "18+",
      maturityNote: "excessive beauty, heavy blushing, sudden smiling",
      match: 100,
      genres: ["Cinematic", "Romance", "Feel-good"],
      starring: ["Fakiha"],
      thumb: "golden",
      thumbPos: "50% 22%",
      badge: "Top 10",
      episodes: [
        {
          title: "The Eyes That Start the Story",
          synopsis: "Before there was a plot, there were her eyes. The camera simply could not look anywhere else.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE ONE", headline: "The Eyes That Start the Story", mood: "night", particles: "stars" },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "Every film needs an opening shot.",
                "This one did not have to search for it.",
                "It opens on her eyes.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "in",
              particles: "sparkles",
              lines: [
                "Brown, with a little green hiding in the middle.",
                "Like tea held up to a window at sunrise.",
              ],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "They do not just look at things.",
                "They arrive at them.",
                "Slowly, warmly, and with total attention.",
                "Whatever she looks at feels, for a second, like the only thing that exists.",
              ],
            },
            {
              kind: "photo",
              photo: "eyes",
              motion: "right",
              particles: "sparkles",
              lines: ["The brows frame them like a signature.", "Bold, certain, and unmistakably hers."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "stars",
              lines: [
                "Stars are famous for being bright.",
                "But even they would pause, mid-twinkle, to be looked at the way she looks.",
              ],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["End of episode one.", "The next one has a smile in it, so maybe sit down first."],
            },
          ],
        },
        {
          title: "A Smile, In Slow Motion",
          synopsis: "Scientists could not explain it. The cinematographer simply gave up and slowed everything down.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE TWO", headline: "A Smile, In Slow Motion", mood: "dawn", particles: "sparkles" },
            {
              kind: "text",
              mood: "dawn",
              lines: [
                "It begins at one corner of her lips.",
                "Just a hint, like a rumor.",
                "Then the whole face agrees with it.",
              ],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "in",
              particles: "sparkles",
              lines: ["And there it is.", "The smile that makes the room forget what it was talking about."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "Her cheeks lift, soft and rosy, like they were built to hold a smile.",
                "Like they have been practicing for years to be this kind of beautiful.",
              ],
            },
            {
              kind: "photo",
              photo: "kurta-smile",
              motion: "left",
              particles: "petals",
              lines: ["Soft cheeks. Quiet lips.", "A smile that sounds like a small, happy song."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "The strangest part is what it does to everyone else.",
                "They start smiling too, and have no idea why.",
                "That is not a coincidence. That is her power.",
              ],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: ["Rolling credits, slowly.", "Because nobody wants this scene to end."],
            },
          ],
        },
        {
          title: "Nose, Cheeks, and Other Masterpieces",
          synopsis: "A loving inspection of the small details. The adorable ones. The ones nobody else appreciates enough.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE THREE", headline: "Nose, Cheeks, and Other Masterpieces", mood: "ember", particles: "fireflies" },
            {
              kind: "text",
              mood: "ember",
              lines: [
                "Great artists are known for their details.",
                "So allow me to point at a few.",
              ],
            },
            {
              kind: "photo",
              photo: "kurta-face",
              motion: "in",
              particles: "sparkles",
              lines: [
                "Exhibit A: the nose.",
                "Small, soft, and perfectly adorable, like the full stop at the end of a happy sentence.",
              ],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "out",
              particles: "petals",
              lines: ["Exhibit B: the cheeks.", "Warm as the first slice of sunlight on a winter morning."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "Exhibit C: the little freckles that appear when the light is kind.",
                "Tiny constellations, drawn on by someone who really cared.",
              ],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "right",
              particles: "fireflies",
              lines: ["Exhibit D: that red lip, worn like a small and confident declaration.", "The art world has no words. Neither do I."],
            },
            {
              kind: "text",
              mood: "dawn",
              lines: [
                "None of these details are separate.",
                "Together they make one face, and one face makes one girl who looks like she belongs on the poster of the best movie ever made.",
              ],
            },
          ],
        },
        {
          title: "The Hair, The Light, The Girl",
          synopsis: "The season finale. Long dark hair, soft golden light, and the exact moment the narrator runs out of adjectives.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE FOUR  ·  SEASON FINALE", headline: "The Hair, The Light, The Girl", mood: "night", particles: "fireflies" },
            {
              kind: "text",
              mood: "night",
              particles: "fireflies",
              lines: [
                "Her hair falls like the last page of a very good night.",
                "Long, dark, and endlessly glossy.",
              ],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "left",
              particles: "fireflies",
              lines: ["It catches the light and keeps it.", "Like it knows exactly how to hold something precious."],
            },
            {
              kind: "photo",
              photo: "eyes",
              motion: "in",
              particles: "sparkles",
              lines: ["Black with a shine of blue and green in it,", "like midnight with the stars left switched on."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "sparkles",
              lines: [
                "And then there is the way she looks when she is just being herself.",
                "No pose. No effort. No filter in the world that could improve it.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "out",
              particles: "stars",
              lines: ["This is the shot the whole series was building toward.", "The most beautiful girl, in her own golden light."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "Season finale. No cliffhanger.",
                "Only an answer, finally said out loud:",
                "She is the most beautiful girl in the world, and the film cannot prove otherwise.",
              ],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 2. GOLDEN HOUR ─────────────────────────
    {
      id: "golden-hour",
      title: "Golden Hour",
      tagline: "The light was already beautiful. Then she stood in it.",
      type: "Film",
      synopsis:
        "A three-part short film about the one hour of the day when the world looks its best, and the girl who makes it look even better. Sunsets reportedly asked for notes.",
      year: 2026,
      maturity: "16+",
      maturityNote: "dazzling light, unexpected sighing, glowing",
      match: 99,
      genres: ["Cinematic", "Dreamy", "Romance"],
      starring: ["Fakiha"],
      thumb: "kurta-hand",
      thumbPos: "40% 20%",
      badge: "New",
      episodes: [
        {
          title: "Before the Sun Gets Ideas",
          synopsis: "A quiet morning, a soft glow, and a girl who makes the day wait for her.",
          scenes: [
            { kind: "title", eyebrow: "PART ONE", headline: "Before the Sun Gets Ideas", mood: "dawn", particles: "fireflies" },
            {
              kind: "text",
              mood: "dawn",
              lines: [
                "The sun has a rule: arrive on time, rise gently, never steal the show.",
                "Then it saw her and forgot all three.",
              ],
            },
            {
              kind: "photo",
              photo: "kurta-hand",
              motion: "in",
              particles: "sparkles",
              lines: ["Chin resting on her hand, like the world is a book she is not in a hurry to finish."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "There is a calm about her that photographs do not fully capture.",
                "But even so, look how they try.",
              ],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "right",
              particles: "petals",
              lines: ["Soft white, deep black hair, one red lip,", "a palette no painter has managed to improve."],
            },
            {
              kind: "text",
              mood: "dawn",
              lines: ["The sun climbed anyway.", "But it kept looking back."],
            },
          ],
        },
        {
          title: "The Light Leans In",
          synopsis: "Noon, afternoon, and every other time of day politely agrees that she looks best in all of them.",
          scenes: [
            { kind: "title", eyebrow: "PART TWO", headline: "The Light Leans In", mood: "ember", particles: "sparkles" },
            {
              kind: "text",
              mood: "ember",
              lines: [
                "Photographers talk about chasing the light.",
                "With her, the light does the chasing.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "left",
              particles: "sparkles",
              lines: ["It slides across her cheekbones and decides to stay.", "Who could blame it?"],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "There is a green wall behind her in this frame.",
                "It is the only time a wall has ever looked proud.",
              ],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "in",
              particles: "fireflies",
              lines: ["A small, shy smile, and the whole afternoon goes warm."],
            },
            {
              kind: "text",
              mood: "dawn",
              lines: [
                "If beauty were weather, she would be the first clear day after a long rain.",
                "Everyone steps outside. Everyone looks up.",
              ],
            },
          ],
        },
        {
          title: "Sunset, Reconsidered",
          synopsis: "The sky works all day to paint its final act. She walks in. The sky quietly rewrites the script.",
          scenes: [
            { kind: "title", eyebrow: "PART THREE", headline: "Sunset, Reconsidered", mood: "sunset", particles: "petals" },
            {
              kind: "text",
              mood: "sunset",
              lines: [
                "Sunsets have a reputation.",
                "People drive for hours to see one.",
                "I think they might be jealous of anyone who glows without needing the sky.",
              ],
            },
            {
              kind: "photo",
              photo: "floral-full",
              motion: "in",
              particles: "petals",
              lines: ["Flowers at her wrists, flowers in the print of her dress,", "and she is still the loveliest thing in the picture."],
            },
            {
              kind: "photo",
              photo: "floral-wrist",
              motion: "right",
              particles: "petals",
              lines: ["The roses on her wrists are practising their petals.", "They will never bloom like this."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "The day ends. The stars arrive.",
                "And somewhere in all that darkness, one girl is still glowing.",
              ],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: ["Golden hour, concluded.", "She was the reason it was golden."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 3. PORTRAIT OF A SMILE ─────────────────────────
    {
      id: "portrait-of-a-smile",
      title: "Portrait of a Smile",
      tagline: "A small curve. A very large effect.",
      type: "Series",
      synopsis:
        "Two episodes devoted to one thing: the way her smile arrives, lingers, and rearranges everyone nearby. Contains no plot. Needs none.",
      year: 2026,
      maturity: "U",
      maturityNote: "involuntary grinning, cheek ache",
      match: 98,
      genres: ["Feel-good", "Portrait", "Romance"],
      starring: ["Fakiha"],
      thumb: "smile",
      thumbPos: "40% 28%",
      badge: "Recently Added",
      episodes: [
        {
          title: "How It Begins",
          synopsis: "The anatomy of a smile, from the first flicker to the full glow.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE ONE", headline: "How It Begins", mood: "dawn", particles: "sparkles" },
            {
              kind: "text",
              mood: "dawn",
              lines: ["Step one: something amuses her.", "Step two: her eyes get there first."],
            },
            {
              kind: "photo",
              photo: "kurta-smile",
              motion: "in",
              particles: "sparkles",
              lines: ["Step three: the lips follow, a little bashful, a little proud."],
            },
            {
              kind: "text",
              mood: "ember",
              lines: [
                "Step four: the cheeks round out, soft as peaches in June.",
                "Step five: the world quietly turns the volume down so it can watch.",
              ],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "right",
              particles: "fireflies",
              lines: ["Step six: she tilts her head, just a little.", "That is the moment it becomes unfair."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["No one has ever recovered from step six.", "We are all still standing there, smiling back."],
            },
          ],
        },
        {
          title: "What It Does to a Room",
          synopsis: "A field study of how one smile changes the temperature of everything.",
          scenes: [
            { kind: "title", eyebrow: "EPISODE TWO", headline: "What It Does to a Room", mood: "ember", particles: "fireflies" },
            {
              kind: "text",
              mood: "ember",
              lines: [
                "Observation one: lights seem warmer.",
                "Observation two: strangers become friendlier.",
              ],
            },
            {
              kind: "photo",
              photo: "kurta-face",
              motion: "left",
              particles: "petals",
              lines: ["Observation three: even the heaviest day seems lighter by about one smile's weight."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "Researchers are still studying how a face can do this.",
                "I have a theory, and it is only one word long: Fakiha.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "in",
              particles: "sparkles",
              lines: ["Her lips, coral-soft, hold the whole secret.", "She will never tell. She just smiles."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["Findings conclusive.", "Keep smiling, Fakiha. The room depends on it."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 4. SHORT: EYES ─────────────────────────
    {
      id: "eyes-like-midnight",
      title: "Eyes Like Midnight",
      tagline: "A short film with nobody in it but her gaze.",
      type: "Short",
      synopsis:
        "Seven minutes of pure eye contact with a camera that blinks first. A moody, tender character study of the brown-green eyes that could outshine a skyline.",
      year: 2026,
      maturity: "18+",
      maturityNote: "intense gazing, lingering stares",
      match: 99,
      genres: ["Moody", "Cinematic", "Romance"],
      starring: ["Fakiha"],
      thumb: "eyes",
      thumbPos: "35% 16%",
      badge: "Exclusive",
      episodes: [
        {
          title: "Eyes Like Midnight",
          synopsis: "She looks at the lens. The lens forgets how to focus.",
          scenes: [
            { kind: "title", eyebrow: "A SHORT FILM", headline: "Eyes Like Midnight", mood: "night", particles: "stars" },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["Midnight is supposed to be the dark part of the day.", "Somebody forgot to tell her eyes."],
            },
            {
              kind: "photo",
              photo: "eyes",
              motion: "in",
              particles: "sparkles",
              lines: ["There is a whole season of weather in a single glance.", "Calm, curious, and just a little bit playful."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "Her lashes sweep down like theatre curtains,",
                "and every time they lift, the show begins again.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "right",
              particles: "stars",
              lines: ["Two small, bright worlds,", "each with its own warm sun inside."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "I have looked at many beautiful things.",
                "None of them looked back like this.",
              ],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["Fade to black.", "The stars in her eyes stay on."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 5. SHORT: HAIR ─────────────────────────
    {
      id: "her-hair-in-the-wind",
      title: "Her Hair in the Wind",
      tagline: "A silk-black short, shot in gentle motion.",
      type: "Short",
      synopsis:
        "A quiet short film about long dark hair, the way it moves, the way it shines, and the way the whole frame follows it. No wind machines were harmed. None were needed.",
      year: 2026,
      maturity: "U",
      maturityNote: "mild swooning, hair envy",
      match: 97,
      genres: ["Dreamy", "Visual", "Feel-good"],
      starring: ["Fakiha"],
      thumb: "white-selfie",
      thumbPos: "30% 22%",
      episodes: [
        {
          title: "Her Hair in the Wind",
          synopsis: "Seven quiet scenes. One cascade of black silk. A very impressed breeze.",
          scenes: [
            { kind: "title", eyebrow: "A SHORT FILM", headline: "Her Hair in the Wind", mood: "forest", particles: "fireflies" },
            {
              kind: "text",
              mood: "forest",
              particles: "fireflies",
              lines: ["There is a kind of black that is not the absence of color.", "It is the presence of her hair."],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "left",
              particles: "fireflies",
              lines: ["It falls past her shoulder like a river that has somewhere calm to be."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "In the light it turns blue, then green, then something with no name.",
                "A whole night sky, brushed and combed.",
              ],
            },
            {
              kind: "photo",
              photo: "eyes",
              motion: "right",
              particles: "sparkles",
              lines: ["Every strand has a highlight.", "Every highlight looks like it is telling a secret."],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "out",
              particles: "petals",
              lines: ["And it frames her face like a curtain parting,", "just before the best part of the play."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: ["The wind was only passing through.", "It stayed to watch."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 6. LETTER ─────────────────────────
    {
      id: "a-letter-to-the-girl-in-the-photograph",
      title: "A Letter to the Girl in the Photograph",
      tagline: "Written slowly. Read gently.",
      type: "Letter",
      synopsis:
        "A single letter, read aloud in your head, addressed to the girl in the frame and the girl who is looking at the frame. Bring tissues, or at least a smile.",
      year: 2026,
      maturity: "A+",
      maturityNote: "tender feelings, a few happy tears",
      match: 99,
      genres: ["Letter", "Heartfelt", "Emotional"],
      starring: ["Fakiha"],
      thumb: "kurta-hand",
      thumbPos: "40% 22%",
      badge: "New",
      episodes: [
        {
          title: "Dear Fakiha",
          synopsis: "A letter to the girl you are, and the girl you don't always see.",
          scenes: [
            { kind: "title", eyebrow: "A LETTER", headline: "Dear Fakiha", mood: "ember", particles: "fireflies" },
            {
              kind: "letter",
              photo: "kurta-hand",
              motion: "still",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "I wanted to write to you the way people used to write: slowly, with the good pen, and with no plan to be clever.",
                "I keep looking at your photographs, and every time I do, I find something I missed. A little glint in your eye. The way your hand rests against your chin as if you are thinking of something kind.",
              ],
            },
            {
              kind: "letter",
              mood: "night",
              particles: "stars",
              lines: [
                "You are beautiful, and I know you have heard that before. But I want you to hear it from someone who is not trying to win anything.",
                "Your beauty is not loud. It does not announce itself. It simply shows up, calm and complete, and the whole room rearranges around it.",
              ],
            },
            {
              kind: "letter",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "On the days you do not feel it, please remember that the camera always does. The light does too. And so do I.",
                "Happy birthday. May you spend this whole year being looked at the way you deserve: with wonder, and for a long time.",
              ],
              signoff: "Yours, from the quiet side of the screen",
            },
          ],
        },
      ],
    },

    // ───────────────────────── 7. LETTER ─────────────────────────
    {
      id: "read-this-when-you-doubt-it",
      title: "Read This When You Doubt It",
      tagline: "For the days the mirror is wrong.",
      type: "Letter",
      synopsis:
        "A pocket-sized emergency letter for the moments when you forget what you look like to everyone else. Keep it close. Re-watch as needed.",
      year: 2026,
      maturity: "U",
      maturityNote: "sudden confidence, uncontrollable smiling",
      match: 100,
      genres: ["Letter", "Feel-good", "Uplifting"],
      starring: ["Fakiha"],
      thumb: "floral-wrist",
      thumbPos: "40% 20%",
      episodes: [
        {
          title: "Open in Case of Doubt",
          synopsis: "A short, firm, loving reminder from someone who has looked at you very closely.",
          scenes: [
            { kind: "title", eyebrow: "A LETTER", headline: "Read This When You Doubt It", mood: "night", particles: "stars" },
            {
              kind: "letter",
              mood: "night",
              particles: "stars",
              lines: [
                "If you are reading this, the mirror has probably said something unkind, and I want to formally object.",
                "The mirror gets one angle. I get to see how you look when you are laughing, when you are thinking, when you are being kind to someone and do not realize anyone noticed.",
              ],
            },
            {
              kind: "letter",
              photo: "floral-wrist",
              motion: "in",
              mood: "garden",
              particles: "petals",
              lines: [
                "From where I stand, you are the most beautiful girl, and it is not a close contest.",
                "Your eyes could light a hallway. Your smile could end an argument. Your hair looks like it was made for slow-motion.",
              ],
            },
            {
              kind: "letter",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "So here is the plan: take a breath, lift your chin, and let yourself be looked at.",
                "You are allowed to take up space as bright as you are.",
              ],
              signoff: "Re-read as often as needed",
            },
          ],
        },
      ],
    },

    // ───────────────────────── 8. POEM ─────────────────────────
    {
      id: "ode-to-fakiha",
      title: "Ode to Fakiha",
      tagline: "Twenty-four lines. One subject. No notes.",
      type: "Poem",
      synopsis:
        "A visual poem in six stanzas, read to the rhythm of her best features. Reading time: as long as you like. Looking time: forever.",
      year: 2026,
      maturity: "13+",
      maturityNote: "poetic swooning, dramatic sighing",
      match: 98,
      genres: ["Poetry", "Romance", "Cinematic"],
      starring: ["Fakiha"],
      thumb: "white-selfie",
      thumbPos: "25% 20%",
      badge: "Exclusive",
      episodes: [
        {
          title: "Ode to Fakiha",
          synopsis: "A poem, performed one stanza at a time.",
          scenes: [
            { kind: "title", eyebrow: "A POEM", headline: "Ode to Fakiha", mood: "night", particles: "stars" },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["Your eyes: two lanterns", "carried gently through the dark.", "Wherever they land,", "the night remembers it can glow."],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: ["Your smile: a small door", "that opens onto morning.", "We stand outside it, hoping", "to be the reason it opens."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: ["Your nose: a tiny, perfect period,", "the sweetest punctuation.", "Your cheeks: the soft place", "where all the warmth collects."],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "right",
              particles: "fireflies",
              lines: ["Your hair: a midnight river,", "running calm along your shoulder,", "with every ripple lit."],
            },
            {
              kind: "text",
              mood: "forest",
              particles: "fireflies",
              lines: ["And you, the whole of it,", "a quiet kind of miracle,", "the sort you only believe in", "because you are standing in front of it."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["That is the poem.", "It is short because it is true.", "Truth never needs the long version."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 9. SLIDESHOW ─────────────────────────
    {
      id: "nine-frames",
      title: "Nine Frames",
      tagline: "Nine photographs. Nine reasons the camera is in love.",
      type: "Slideshow",
      synopsis:
        "A gallery walk through nine portraits of Fakiha, each captioned by a very biased curator. No frame is the worst one. Every frame is somebody's favorite.",
      year: 2026,
      maturity: "A+",
      maturityNote: "gallery-grade gorgeousness",
      match: 99,
      genres: ["Gallery", "Visual", "Feel-good"],
      starring: ["Fakiha"],
      thumb: "floral-full",
      thumbPos: "35% 8%",
      badge: "New",
      episodes: [
        {
          title: "Frames One to Five",
          synopsis: "The first half of the exhibition: quiet portraits and loud beauty.",
          scenes: [
            { kind: "title", eyebrow: "THE EXHIBITION", headline: "Nine Frames", mood: "night", particles: "sparkles" },
            {
              kind: "photo",
              photo: "golden",
              motion: "in",
              particles: "sparkles",
              lines: ["FRAME ONE", "The golden light, politely asking if it can stay."],
            },
            {
              kind: "photo",
              photo: "eyes",
              motion: "right",
              particles: "sparkles",
              lines: ["FRAME TWO", "A glance, with a teddy bear looking suspiciously jealous."],
            },
            {
              kind: "photo",
              photo: "smile",
              motion: "left",
              particles: "fireflies",
              lines: ["FRAME THREE", "A shy smile in soft pink. Gentle, and immediately unforgettable."],
            },
            {
              kind: "photo",
              photo: "kurta-face",
              motion: "out",
              particles: "petals",
              lines: ["FRAME FOUR", "Rose-colored, rosy-cheeked, and effortlessly lovely."],
            },
            {
              kind: "photo",
              photo: "kurta-smile",
              motion: "in",
              particles: "sparkles",
              lines: ["FRAME FIVE", "Look at that smile. Please look. Take as long as you need."],
            },
          ],
        },
        {
          title: "Frames Six to Nine",
          synopsis: "The second half: festive, flowered, and finally a little bit wise.",
          scenes: [
            { kind: "title", eyebrow: "THE EXHIBITION, PART TWO", headline: "Four More Frames", mood: "ember", particles: "fireflies" },
            {
              kind: "photo",
              photo: "kurta-hand",
              motion: "right",
              particles: "fireflies",
              lines: ["FRAME SIX", "Chin on her hand, mind somewhere pleasantly far away."],
            },
            {
              kind: "photo",
              photo: "white-selfie",
              motion: "left",
              particles: "stars",
              lines: ["FRAME SEVEN", "White lace, black hair, red lip. A study in perfect contrast."],
            },
            {
              kind: "photo",
              photo: "floral-wrist",
              motion: "in",
              particles: "petals",
              lines: ["FRAME EIGHT", "Flowers at her wrists. The flowers wish they were her."],
            },
            {
              kind: "photo",
              photo: "floral-full",
              motion: "out",
              particles: "petals",
              lines: ["FRAME NINE", "Full-length, festive, radiant. The grand finale of the gallery."],
            },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: ["The exhibition is now closed.", "The curator would like to add: all nine are the best one."],
            },
          ],
        },
      ],
    },

    // ───────────────────────── 10. FINALE ─────────────────────────
    {
      id: "the-final-episode",
      title: "The Final Episode",
      tagline: "The one we saved for last.",
      type: "Special",
      synopsis:
        "Everything on FAKIHA was built to lead here. One last scene, one last message, and a birthday that deserves to be marked by something very bright.",
      year: 2026,
      maturity: "All Ages",
      maturityNote: "birthday joy, confetti, sincere feelings",
      match: 100,
      genres: ["Special", "Birthday", "Heartfelt"],
      starring: ["Fakiha"],
      thumb: "golden",
      thumbPos: "50% 20%",
      badge: "Finale",
      finale: true,
      episodes: [
        {
          title: "Happy Birthday, Fakiha",
          synopsis: "The most beautiful girl in the world, on the most important day of her year.",
          scenes: [
            { kind: "title", eyebrow: "THE FINAL EPISODE", headline: "Happy Birthday, Fakiha", mood: "night", particles: "stars" },
            {
              kind: "text",
              mood: "night",
              particles: "stars",
              lines: [
                "You have watched the eyes, the smile, the hair, the light.",
                "You have read the letters and the little notes.",
                "Now, a last word.",
              ],
            },
            {
              kind: "photo",
              photo: "golden",
              motion: "in",
              particles: "sparkles",
              lines: ["Look at her one more time.", "That is the girl this whole place was built for."],
            },
            {
              kind: "text",
              mood: "ember",
              particles: "fireflies",
              lines: [
                "Beauty is easy to describe and impossible to catch.",
                "I have tried for all of this film, and I know I have only caught the edges.",
              ],
            },
            {
              kind: "text",
              mood: "dawn",
              particles: "sparkles",
              lines: [
                "So here is the thing I most want you to keep.",
                "You are not beautiful because of how you look.",
                "You look beautiful because of who you are, and the light has always known it.",
              ],
            },
            {
              kind: "finale",
              photo: "smile",
              motion: "in",
              mood: "night",
              particles: "confetti",
              birthdayTune: true,
              headline: "Happy Birthdayyyyy, Fakiha.",
              lines: [
                "May this year be as kind to you as you are to everyone.",
                "May every room you enter light up a little, the way it always does.",
                "You are the prettiesttttt, the warmest, and the most special girl in the world.",
                "And no, you cannot argue with this, because the film has ended and I get the last word.",
              ],
              signoff: "Forever your biggest fan 🎂",
            },
          ],
        },
      ],
    },
  ],

  messages: [
    {
      id: "wish-sunrise",
      kind: "wish",
      title: "A Birthday Wish, Quickly",
      photo: "kurta-smile",
      paragraphs: [
        "Happy birthday, Fakiha. May today feel like the first warm morning after a long cold week.",
        "Eat the cake, accept the compliments, and let the whole day revolve around you. It is allowed.",
      ],
      signoff: "With a very big smile",
    },
    {
      id: "wish-smile-credit",
      kind: "wish",
      title: "For Your Smile, On Your Day",
      paragraphs: [
        "Happy birthday to the girl whose smile should come with a warning label.",
        "May you get a full year of reasons to use it.",
      ],
      signoff: "From the front row",
    },
    {
      id: "wish-candle",
      kind: "wish",
      title: "Make a Wish (I Already Made Mine)",
      photo: "golden",
      paragraphs: [
        "When you blow out the candles, wish for anything you want. I used mine up already.",
        "I wished that you would always know how brightly you shine. Now the wish is yours to keep too.",
      ],
      signoff: "Quietly, from your side of the room",
    },
    {
      id: "letter-eyes-first",
      kind: "letter",
      title: "A Letter About Your Eyes",
      photo: "eyes",
      paragraphs: [
        "Dear Fakiha,",
        "I tried to start this letter with something clever, but then I looked at your eyes again and every clever idea sat down and went quiet.",
        "They are brown, but that is like saying the sea is wet. There is gold at the edges, a little green in the heart, and a depth in them that makes a simple glance feel like a full conversation.",
        "When you look at someone, you give them all of it. No half-attention, no wandering. They feel seen, and I think that is the real reason people light up around you.",
        "So on your birthday, I want you to know that the world is lucky to be looked at by those eyes, and I am a very lucky person for having noticed.",
        "Happy birthday.",
      ],
      signoff: "Gratefully yours",
    },
    {
      id: "letter-the-quiet-kind",
      kind: "letter",
      title: "The Quiet Kind of Beautiful",
      photo: "kurta-hand",
      paragraphs: [
        "Dear Fakiha,",
        "There is loud beauty, the kind that walks in and demands to be looked at. And there is quiet beauty, the kind that you only notice after a moment, and then cannot stop noticing.",
        "Yours is the quiet kind. It sits in the curve of your hand against your chin, in the softness around your mouth when you are about to smile, in the way your hair falls without any help at all.",
        "I have always thought that quiet beauty is the stronger one. It does not need an audience. It simply goes on being true, whether anyone is watching or not.",
        "I hope this year gives you every reason to believe it. Not because I said so, but because the evidence has been right in front of you the whole time.",
      ],
      signoff: "Always paying attention",
    },
    {
      id: "letter-photographs",
      kind: "letter",
      title: "What the Photographs Cannot Say",
      photo: "white-selfie",
      paragraphs: [
        "Dear Fakiha,",
        "The photographs are lovely. I have spent more time with them than I will admit in public. The red lip, the black hair, the golden light, the little teddy bear who keeps appearing as if he has been assigned to guard you.",
        "But I want to be honest about their limits. A photo cannot hold the sound of your laugh, or the exact second your eyes soften when you are amused.",
        "A photo is a still. You are a motion picture, running every minute, with a score nobody wrote.",
        "So as you turn another year older, I hope you keep moving the way you do. The frame can barely keep up, and that is a wonderful problem to have.",
        "Happy birthday, and thank you for being impossible to capture fully.",
      ],
      signoff: "Your devoted cinematographer",
    },
    {
      id: "poem-small-things",
      kind: "poem",
      title: "Small Things I Have Noticed",
      photo: "smile",
      paragraphs: [
        "The dimple of light\nthat lives on your cheek\nwhen the afternoon\nis in a generous mood.",
        "The way your brows\nlift a little, like question marks\nthat already know\nthey are the answer.",
        "Your lips, soft coral,\nholding back a laugh\nthe way a cloud\nholds a little rain.",
        "And the quiet math of you:\none small nose, two bright eyes,\na thousand reasons\nI keep looking.",
      ],
      signoff: "Written on the back of a very good day",
    },
    {
      id: "poem-midnight-hair",
      kind: "poem",
      title: "Midnight, With Shine",
      photo: "white-selfie",
      paragraphs: [
        "Your hair is the hour\nafter the party ends,\nwhen the world is hushed\nand the stars are only for friends.",
        "It runs along your shoulder\nlike a river of black silk,\ncatching every lantern\nand returning it as milk.",
        "I have seen the ocean at night.\nI have seen a raven's wing.\nNeither had your softness,\nneither learned to sing.",
      ],
      signoff: "Signed, a small admirer of long hair",
    },
    {
      id: "playful-official-notice",
      kind: "playful",
      title: "Official Notice from the Department of Prettiness",
      photo: "eyes",
      paragraphs: [
        "ATTENTION, FAKIHA: it has come to our attention that you are, in fact, prettiesttttt.",
        "This is not a drill. This is also not up for debate. The committee has reviewed your eyes, your smile, your cheeks, your nose, and your hair, and unanimously voted yes.",
        "You are hereby required to accept compliments without arguing, eat at least one extra slice of cake, and say \"thank you\" instead of \"stop it.\"",
        "Failure to comply will result in more compliments. The department wishes you a beautifulllll birthdayyyyy.",
      ],
      signoff: "Stamped and sealed, Dept. of Prettiness",
    },
    {
      id: "fairytale-the-queen-of-the-quiet-garden",
      kind: "fairytale",
      title: "The Girl Who Made the Garden Bloom Early",
      photo: "floral-wrist",
      paragraphs: [
        "Once upon a morning, a garden woke up three weeks ahead of spring.",
        "The gardener was baffled. The roses were already open. The jasmine was already perfuming the air. Even the shy little buds by the gate had unfurled, all turned in the same direction.",
        "They were facing a girl with flowers at her wrists and a smile that had walked in without any announcement.",
        "\"We could not wait,\" the garden whispered. \"We had to see her.\"",
        "And that is the whole fairytale. There is no dragon, no spell. Just a girl so lovely that the flowers lost their patience, and a birthday on which they are blooming again.",
      ],
      signoff: "As told by one very impressed rose",
    },
    {
      id: "future-for-the-year-ahead",
      kind: "future",
      title: "Wishes for the Year Ahead",
      photo: "floral-full",
      paragraphs: [
        "I wish you health first, because everything else is built on it: deep sleep, strong days, and the kind of energy that makes ordinary mornings feel like beginnings.",
        "I wish you happiness that does not need a reason. The kind that turns up on a Tuesday while you are doing nothing, and sits beside you like an old friend.",
        "I wish you peace on the days that are loud, and courage on the days that ask something of you.",
        "I wish you a future with room in it: for your dreams, your laughter, and the plans that have not even occurred to you yet.",
        "And I wish you people who treat you the way you treat the world: gently, generously, and as though you are rare. Because you are.",
      ],
      signoff: "With every good wish I own",
    },
    {
      id: "sweet-the-thing-about-you",
      kind: "sweet",
      title: "The Thing About You",
      photo: "kurta-face",
      paragraphs: [
        "The thing about you is that you make people feel taller, softer, and a little more likely to believe in good days.",
        "You do it without trying. It is in the way you listen with your whole face and the way you light up at small things.",
        "People think beauty is just how someone looks. With you, it is also how the day feels after you have been in it.",
        "That is the real birthday gift I wanted to point out: you have been giving it to everyone around you, all year, for free.",
      ],
      signoff: "Thank you, with all my warmth",
    },
  ],

  comingSoon: [
    {
      title: "Fakiha: The Next Chapter",
      when: "Coming soon, one day at a time",
      synopsis: "A new year, a new season, the same unmatched lead. Plot twists have been requested. Only the good kind.",
      photo: "golden",
      photoPos: "50% 20%",
    },
    {
      title: "The Laughing Cut",
      when: "Coming next birthday",
      synopsis: "A behind-the-scenes feature filmed entirely in the middle of her laugh. Expect cheek aches and ruined composure.",
      photo: "smile",
      photoPos: "40% 26%",
    },
    {
      title: "Still the Most Beautiful: Season 2",
      when: "Renewed for another year",
      synopsis: "Audiences demanded more. The critic has already written the review, and it still just says: yes.",
      photo: "white-selfie",
      photoPos: "25% 20%",
    },
  ],

  notices: [
    {
      text: "New episode available: \"The Eyes That Start the Story\" is waiting for you.",
      when: "Just now",
      photo: "eyes",
    },
    {
      text: "Because you smiled today, we recommended 'Portrait of a Smile.'",
      when: "5 minutes ago",
      photo: "smile",
    },
    {
      text: "Reminder: you are the most beautiful girl in the world. This message will not be deleted.",
      when: "Today",
      photo: "golden",
    },
  ],
};
