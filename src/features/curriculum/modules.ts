import type { Module } from "./types";

/**
 * The Learning Curriculum — paid content, unlocked at checkout. See
 * docs/44-learning-curriculum-architecture.md. Onboarding (onboarding.ts)
 * is deliberately separate: it isn't a Module.
 */

export const MODULE_1_ID = "module-1";

/**
 * Module 1: Piano Foundations. All 8 lessons exist — Lessons 5-8 were built
 * under an explicit founder override of the validation gate; see
 * docs/46-curriculum-authoring-guide.md Decision 003. Lesson 1 deliberately
 * has two steps (unlike every onboarding lesson, which has one) to
 * exercise that part of the engine for real; Lessons 7 and 8 also use
 * multiple steps for the same reason each step needs.
 *
 * The whole module is one continuous chain of reuse, not eight unrelated
 * topics:
 * - Lessons 1-2 teach the black-key landmark for finding any note without
 *   counting.
 * - Lessons 3-4 apply that same "note relationship, not position" idea to
 *   octaves and intervals.
 * - Lesson 5 names the interval pattern that makes a major scale (which
 *   also explains *why* Lesson 1's black-key groups fall where they do).
 * - Lesson 6 shows a chord is just scale degrees 1-3-5, generalized past
 *   the one chord (C Major) taught in onboarding.
 * - Lesson 7 shows the entire major/minor distinction is one note, lowered
 *   a half step.
 * - Lesson 8 is pure application: build three chords in keys never seen
 *   before, using only the formulas from 5-7.
 */
export const MODULE_1: Module = {
  id: MODULE_1_ID,
  index: 1,
  title: "Piano Foundations",
  subtitle: "See Music Differently",
  lessons: [
    {
      id: "keyboard-patterns",
      index: 1,
      title: "Keyboard Patterns",
      steps: [
        {
          id: "keyboard-patterns-pairs",
          concept: {
            heading: "What are we learning?",
            body: "The black keys aren't scattered randomly. They cluster into two repeating shapes — a group of two, and a group of three. Let's find the groups of two first.",
          },
          discovery: {
            heading: "That's your first landmark.",
            body: "Every group of two black keys has C sitting just to its left. You don't need to count up from the bottom of the keyboard to find C — you just need to recognize this shape.",
          },
        },
        {
          id: "keyboard-patterns-triplets",
          concept: {
            heading: "Now the other shape.",
            body: "The rest of the black keys cluster in threes. Find every group of three.",
          },
          discovery: {
            heading: "Two shapes. That's the whole keyboard.",
            body: "Every black key on an 88-key piano belongs to one of these two groups. Once you can see them, you can find any note without ever counting individual keys.",
          },
        },
      ],
    },
    {
      id: "finding-notes",
      index: 2,
      title: "Finding Notes",
      steps: [
        {
          id: "finding-notes",
          concept: {
            heading: "Put the landmark to work.",
            body: "F always sits just to the left of a group of three black keys — the shape you just learned to spot. Find every F on the keyboard using that landmark, not by counting.",
          },
          discovery: {
            heading: "You found it by pattern, not by counting.",
            body: "This is the actual skill: recognizing shapes instead of memorizing 88 individual key positions. Every note has a landmark like this one.",
          },
        },
      ],
    },
    {
      id: "octaves",
      index: 3,
      title: "Octaves",
      steps: [
        {
          id: "octaves",
          concept: {
            heading: "You've seen this repeat before.",
            body: "Every C on the keyboard looks the same — you already found that. That repeat has a name: an octave. Same note, doubled in pitch. Pick any note, then find its octave.",
          },
          discovery: {
            heading: "Same note, twice.",
            body: "An octave is the most 'in tune with itself' sound in music — that's why two Cs an octave apart still sound like the same note, just higher or lower. Every note on the keyboard has one.",
          },
        },
      ],
    },
    {
      id: "intervals",
      index: 4,
      title: "Intervals",
      steps: [
        {
          id: "intervals",
          concept: {
            heading: "Not every distance sounds the same.",
            body: "Two different notes played together create a distance — an interval. You've already played one: C to G, the first jump in the progression you know. That distance is called a fifth.",
          },
          discovery: {
            heading: "Chords are built from distances like this.",
            body: "A fifth is one of the building blocks every chord you've played is made from. Once you can hear and find an interval, you're most of the way to building a chord from scratch.",
          },
        },
      ],
    },
    {
      id: "major-scale",
      index: 5,
      title: "The Major Scale",
      steps: [
        {
          id: "major-scale",
          concept: {
            heading: "One pattern, not seven notes to memorize.",
            body: "A major scale isn't seven random notes — it's one repeating pattern of steps: whole, whole, half, whole, whole, whole, half. The half-steps happen exactly where there's no black key between two white keys — the same landmark from Lesson 1. Play through the pattern starting on C.",
          },
          discovery: {
            heading: "Same pattern, any starting note.",
            body: "You just played a major scale by following a step pattern, not by memorizing 'C-D-E-F-G-A-B-C.' That exact whole-whole-half-whole-whole-whole-half pattern works starting from any note on the keyboard — that's what makes it a major scale, everywhere.",
          },
        },
      ],
    },
    {
      id: "building-major-chord",
      index: 6,
      title: "Building Any Major Chord",
      steps: [
        {
          id: "building-major-chord",
          concept: {
            heading: "You already know this chord's formula.",
            body: "C Major is the 1st, 3rd, and 5th note of the C major scale you just played. That's the whole formula: root, third, fifth. Let's build a major chord you haven't played yet — G Major — the exact same way, starting from G.",
          },
          discovery: {
            heading: "One formula. Every major chord.",
            body: "Root, then the note a major third up, then the note a fifth up from the root — that's every major chord that exists, in any key. You didn't need to be taught 'G Major' specifically. You built it.",
          },
        },
      ],
    },
    {
      id: "major-vs-minor",
      index: 7,
      title: "Major vs Minor",
      steps: [
        {
          id: "major-vs-minor-major",
          concept: {
            heading: "Build A Major first.",
            body: "Same formula as G Major, new root: root, third, fifth, starting on A.",
          },
          discovery: {
            heading: "That's A Major — bright, resolved.",
            body: "Hold that sound in your ear. One small change is about to turn it into something else entirely.",
          },
        },
        {
          id: "major-vs-minor-minor",
          concept: {
            heading: "Now lower just one note.",
            body: "Take that same A Major chord and lower only the third by a single half step. Everything else stays exactly the same. Play the result: A Minor.",
          },
          discovery: {
            heading: "That's the entire difference.",
            body: "Major and minor aren't two unrelated chord types to memorize separately — every minor chord is its major twin with the third lowered a half step. You just heard why A minor (from your first song) sounds different from A major.",
          },
        },
      ],
    },
    {
      id: "every-chord-you-need",
      index: 8,
      title: "Every Chord You Need",
      steps: [
        {
          id: "practice-d-major",
          concept: {
            heading: "Prove it to yourself.",
            body: "You now know both formulas: major is root-third-fifth from the scale; minor lowers that third a half step. Build D Major — a key you haven't touched yet.",
          },
          discovery: {
            heading: "Built, not looked up.",
            body: "Nobody showed you D Major's notes directly. You derived them from the formula.",
          },
        },
        {
          id: "practice-e-minor",
          concept: {
            heading: "Now a minor chord, new key.",
            body: "Build E Minor: root, lowered third, fifth.",
          },
          discovery: {
            heading: "Same move, different root.",
            body: "Lower the third a half step from E Major's shape, and you're already there.",
          },
        },
        {
          id: "practice-c-minor",
          concept: {
            heading: "One more, for confidence.",
            body: "Build C Minor: root, lowered third, fifth.",
          },
          discovery: {
            heading: "You can build any major or minor chord that exists.",
            body: "Two formulas, applied to any root note on the keyboard: root-third-fifth for major, and the same shape with the third lowered a half step for minor. That's every chord — not memorized one at a time, but understood once.",
          },
        },
      ],
    },
  ],
};

export const MODULE_2_ID = "module-2";

/**
 * Module 2: Playing Real Music. Where Module 1 answered "how does music
 * work," Module 2 turns that understanding into fluency: moving between
 * chords smoothly, keeping time, recognizing a second common progression,
 * two-hand coordination, dynamics, a complete song, and landmark recall
 * without visual hints. See docs/46-curriculum-authoring-guide.md Decision
 * 004 for why this was built in parallel with real user testing rather
 * than waiting for it.
 *
 * Deliberately reuses Module 1's chords and onboarding's progression
 * mechanic rather than introducing new ones where the original already
 * fits (Lesson 1's C Major / A Minor pair, Lesson 4's C Major). Where the
 * learning objective is genuinely new — timing (Lesson 2), real dynamics
 * (Lesson 5) — it gets a genuinely new interaction instead of a forced
 * reuse.
 */
export const MODULE_2: Module = {
  id: MODULE_2_ID,
  index: 2,
  title: "Playing Real Music",
  subtitle: "From Understanding To Fluency",
  lessons: [
    {
      id: "smooth-chord-changes",
      index: 1,
      title: "Smooth Chord Changes",
      steps: [
        {
          id: "smooth-change-cmajor",
          concept: {
            heading: "Start where you already are.",
            body: "Play C Major — the same shape you've built before.",
          },
          discovery: {
            heading: "Hold that shape in your hand.",
            body: "You're about to change to a different chord — but not as much of your hand needs to move as you'd expect.",
          },
        },
        {
          id: "smooth-change-aminor",
          concept: {
            heading: "Now change to A Minor — the efficient way.",
            body: "Experienced players move as little as possible between chords. C and E are in both C Major and A Minor — leave them exactly where they are. Only one note has to move.",
          },
          discovery: {
            heading: "That's smooth chord changing.",
            body: "Two notes never moved. You only repositioned what actually needed to change. That's the whole skill — not memorizing new hand shapes for every chord, but noticing what's already shared.",
          },
        },
      ],
    },
    {
      id: "rhythm-creates-music",
      index: 2,
      title: "Rhythm Creates Music",
      steps: [
        {
          id: "rhythm-tap",
          concept: {
            heading: "The beat matters more than the note.",
            body: "A slightly wrong note in time sounds like music. The right note with no sense of time doesn't. Listen to the beat, then tap along with it.",
          },
          discovery: {
            heading: "You just felt a pulse, not counted one.",
            body: "That's the goal — rhythm becomes something you feel and lock into, not something you calculate note by note. Every lesson from here builds on keeping that same steady pulse.",
          },
        },
      ],
    },
    {
      id: "most-common-song-pattern",
      index: 3,
      title: "The Most Common Song Pattern",
      steps: [
        {
          id: "recognizing-pattern",
          concept: {
            heading: "A different pattern, just as familiar.",
            body: "You already know C → G → Am → F. Here's another progression that shows up in just as many songs — click each chord in order to hear it.",
          },
          discovery: {
            heading: "You've heard this one everywhere too.",
            body: "This is the opening pattern of “Twist and Shout.” Two different progressions, thousands of songs between them — recognizing the pattern is recognizing the song.",
          },
        },
      ],
    },
    {
      id: "playing-with-both-hands",
      index: 4,
      title: "Playing With Both Hands",
      steps: [
        {
          id: "two-hands",
          concept: {
            heading: "One hand at a time, together.",
            body: "A simple bass note in your left hand, the full chord in your right. Play the bass note first, then add the chord on top.",
          },
          discovery: {
            heading: "That's a fuller sound, and it's not complicated.",
            body: "Two hands doesn't mean two hard parts. The left hand's job here was one note. That's enough to make a chord sound complete.",
          },
        },
      ],
    },
    {
      id: "dynamics",
      index: 5,
      title: "Dynamics",
      steps: [
        {
          id: "dynamics",
          concept: {
            heading: "Music isn't just correct notes.",
            body: "The exact same chord can feel completely different depending on how it's played. Play C Major softly, then play it loudly.",
          },
          discovery: {
            heading: "Same notes. Different feeling.",
            body: "Nothing about the chord changed — only how much weight you put behind it. That's dynamics: expression layered on top of the notes you already know.",
          },
        },
      ],
    },
    {
      id: "first-complete-song",
      index: 6,
      title: "Your First Complete Song",
      steps: [
        {
          id: "first-complete-song",
          concept: {
            heading: "Everything so far, in one song.",
            body: "The progression from Lesson 3 is the backbone of a real song. Play through it yourself, chord by chord.",
          },
          discovery: {
            heading: "That's a complete song, played with understanding.",
            body: "Not a fragment, not a demo — the actual opening of a song you'll recognize. You played it because you understood the pattern underneath it, not because you memorized a sequence of clicks.",
          },
        },
      ],
    },
    {
      id: "playing-without-looking",
      index: 7,
      title: "Playing Without Looking",
      steps: [
        {
          id: "landmark-recall",
          concept: {
            heading: "Prove the landmark stuck.",
            body: "Back in Module 1, you found every F using the black-key landmark, with a highlight guiding you. This time, there's no highlight — just the landmark.",
          },
          discovery: {
            heading: "You didn't need to see it to find it.",
            body: "That's keyboard awareness — the actual skill behind musicians who don't stare at their hands. You already had it. This just proved it.",
          },
        },
      ],
    },
    {
      id: "celebration",
      index: 8,
      title: "Celebration",
      steps: [
        {
          id: "module-review",
          concept: {
            heading: "Look at what you can actually do now.",
            body: "Smooth chord changes. A steady beat. A second progression, recognized on sight. Two-handed playing. Dynamics. A complete song. Keyboard awareness without looking. Play through the progression one more time — this one's just for you.",
          },
          discovery: {
            heading: "You're not learning piano anymore. You're playing it.",
            body: "Every one of those skills compounds — they don't reset with the next thing you learn. Module 3 builds on exactly this. For now: you can sit down at almost any piano and make real music. That was the whole point.",
          },
        },
      ],
    },
  ],
};

export const MODULE_3_ID = "module-3";

/**
 * Module 3: Expressing Yourself. Onboarding taught patterns, Module 1
 * taught how music is organized, Module 2 taught fluency — Module 3 is
 * where the student starts making musical decisions instead of only
 * executing given ones. Built without a Phase handoff document; the theme
 * comes from this file's own long-term vision (see
 * docs/46-curriculum-authoring-guide.md Decision 005) and CLAUDE.md's
 * "Creativity Is A Core Skill" principle, which names this exact
 * territory: inversions, fills, introductions, rhythm choices.
 *
 * Most lessons share one deliberate property: there is no wrong answer.
 * `ChoiceInteraction` completes once every option has been heard, not once
 * the "right" one is picked — the discovery is that both options are
 * valid, which is a different kind of understanding than everything
 * before this module taught.
 */
export const MODULE_3: Module = {
  id: MODULE_3_ID,
  index: 3,
  title: "Expressing Yourself",
  subtitle: "From Fluency To Your Own Voice",
  lessons: [
    {
      id: "chord-inversions",
      index: 1,
      title: "Chord Inversions",
      steps: [
        {
          id: "chord-inversions",
          concept: {
            heading: "The same chord has more than one shape.",
            body: "C Major is always C, E, and G — but which one is on the bottom can change. Try all three arrangements.",
          },
          discovery: {
            heading: "Same notes. Different shape, different feel.",
            body: "That's an inversion — the same three notes, reordered. Nothing about the chord's identity changed, only how it sits under your hand and how it sounds.",
          },
        },
      ],
    },
    {
      id: "adding-a-simple-fill",
      index: 2,
      title: "Adding a Simple Fill",
      steps: [
        {
          id: "adding-a-fill",
          concept: {
            heading: "A small detour makes it feel like yours.",
            body: "Compare the same chord change played plainly, and played with one small connecting note in between.",
          },
          discovery: {
            heading: "That's a fill.",
            body: "One extra note, placed between two chords you already know, is enough to make a change feel like a musical decision instead of a mechanical one.",
          },
        },
      ],
    },
    {
      id: "creating-your-own-introduction",
      index: 3,
      title: "Creating Your Own Introduction",
      steps: [
        {
          id: "create-your-intro",
          concept: {
            heading: "How you begin is already music.",
            body: "The same chord, started two different ways. Try both.",
          },
          discovery: {
            heading: "Neither one is the 'correct' way in.",
            body: "An introduction is the first decision you make in a song — and you just made two different, equally valid ones.",
          },
        },
      ],
    },
    {
      id: "choosing-your-own-rhythm",
      index: 4,
      title: "Choosing Your Own Rhythm",
      steps: [
        {
          id: "choose-your-rhythm",
          concept: {
            heading: "The same chords, felt differently.",
            body: "You already know this progression. Try it steady, then try it with an uneven, syncopated feel.",
          },
          discovery: {
            heading: "You just changed the feel without changing a single note.",
            body: "Rhythm is a choice layered on top of the notes, exactly like dynamics were. That's two ways now to make the same chords sound like you.",
          },
        },
      ],
    },
    {
      id: "ear-training-major-or-minor",
      index: 5,
      title: "Ear Training: Major or Minor?",
      steps: [
        {
          id: "major-or-minor-ear",
          concept: {
            heading: "Now do it by ear, not by building.",
            body: "You've built major and minor chords from formulas. This time, don't build anything — just listen, and say which one you're hearing.",
          },
          discovery: {
            heading: "You recognized it without seeing a single note.",
            body: "Building a chord and recognizing one by ear are two different skills. You now have both.",
          },
        },
      ],
    },
    {
      id: "playing-by-ear",
      index: 6,
      title: "Playing By Ear",
      steps: [
        {
          id: "play-by-ear",
          concept: {
            heading: "No sheet music. Just your ear.",
            body: "Listen to a short, familiar melody, then find it yourself on the keyboard.",
          },
          discovery: {
            heading: "You just transcribed music by ear.",
            body: "That's the actual skill behind musicians who can sit down and figure out a song they just heard — landmarks plus listening, nothing else.",
          },
        },
      ],
    },
    {
      id: "arranging-it-your-way",
      index: 7,
      title: "Arranging It Your Way",
      steps: [
        {
          id: "arrange-it-your-way",
          concept: {
            heading: "Put it all together.",
            body: "The same progression, arranged two different ways — one simple and steady, one embellished and syncopated.",
          },
          discovery: {
            heading: "That's an arrangement.",
            body: "Inversions, fills, rhythm, dynamics — every choice from this module compounds into how a song actually gets played. There's no single right arrangement, only the one you choose.",
          },
        },
      ],
    },
    {
      id: "your-musical-voice",
      index: 8,
      title: "Your Musical Voice",
      steps: [
        {
          id: "your-musical-voice",
          concept: {
            heading: "Play it, your way, one more time.",
            body: "Inversions. Fills. Introductions. Rhythm. Ear training. Playing by ear. Arranging. Play through the progression one final time.",
          },
          discovery: {
            heading: "You're not just playing music anymore. You're expressing something.",
            body: "Every choice in this module was yours to make — and you made all of them. That's the whole point of Module 3, and it's what the rest of PianoOS keeps building from.",
          },
        },
      ],
    },
  ],
};

export const MODULE_4_ID = "module-4";

/**
 * Module 4: Beyond Major and Minor. Every chord so far has been a plain
 * major or minor triad. This module adds two new chord colors (the
 * dominant 7th, the suspended 4th) and the concept of diatonic harmony --
 * that a key generates a whole family of chords, not just the ones
 * already taught. Built without a Phase handoff, per docs/46
 * Decision 006.
 *
 * Every lesson reuses an existing interaction primitive
 * (NoteSequenceInteraction, ChoiceInteraction, or PlayProgressionInteraction)
 * -- the first module that needed zero new interaction types, which is
 * itself evidence the mechanic vocabulary built up over Modules 1-3 was
 * sufficient for genuinely new content.
 */
export const MODULE_4: Module = {
  id: MODULE_4_ID,
  index: 4,
  title: "Beyond Major and Minor",
  subtitle: "New Chords, New Colors",
  lessons: [
    {
      id: "seventh-chords",
      index: 1,
      title: "Seventh Chords",
      steps: [
        {
          id: "seventh-chord-build",
          concept: {
            heading: "One more note changes everything.",
            body: "Take the G Major chord you already know and add one note on top — a seventh. Build G7.",
          },
          discovery: {
            heading: "That sound wants to go somewhere.",
            body: "G7 feels unfinished on purpose — it's built to pull toward another chord. That pull is called tension.",
          },
        },
        {
          id: "seventh-chord-resolve",
          concept: {
            heading: "Let it resolve.",
            body: "That tension you just heard wants to land somewhere specific. Play C Major and feel it settle.",
          },
          discovery: {
            heading: "Tension, then release — that's resolution.",
            body: "G7 pulling into C Major is one of the strongest relationships in music. You just felt why it works, not just that it does.",
          },
        },
      ],
    },
    {
      id: "suspended-chords",
      index: 2,
      title: "Suspended Chords",
      steps: [
        {
          id: "suspended-chord-build",
          concept: {
            heading: "A different kind of unresolved.",
            body: "Take C Major and swap the middle note — the third — for the note right above it, a fourth. Build Csus4.",
          },
          discovery: {
            heading: "Neither major nor minor — and that's the point.",
            body: "Without a third, a chord has no happy or sad quality at all. It just floats, waiting to resolve.",
          },
        },
        {
          id: "suspended-chord-resolve",
          concept: {
            heading: "Resolve it, the same way.",
            body: "Just like G7 wanted to land on C Major, so does Csus4. Play C Major and let it settle.",
          },
          discovery: {
            heading: "Two different tensions, one resolution.",
            body: "A 7th and a suspension create tension in different ways, but both want to resolve to the same plain, stable chord. That's not a coincidence — it's how harmony works.",
          },
        },
      ],
    },
    {
      id: "where-chords-come-from",
      index: 3,
      title: "Where Chords Come From",
      steps: [
        {
          id: "diatonic-chords",
          concept: {
            heading: "A key isn't just one chord. It's a whole family.",
            body: "Every note in the C major scale can grow its own chord, using only notes from that same scale. Build one starting on D.",
          },
          discovery: {
            heading: "That chord was already inside the key.",
            body: "C Major, F Major, G Major, A Minor, and now D Minor all come from the exact same seven notes. A key isn't one sound — it's a family of related chords.",
          },
        },
      ],
    },
    {
      id: "the-two-five-one",
      index: 4,
      title: "The ii-V-I",
      steps: [
        {
          id: "two-five-one",
          concept: {
            heading: "Harmony's favorite move.",
            body: "D Minor, the chord you just discovered, leads beautifully into G7, which leads into C Major. Play through it yourself.",
          },
          discovery: {
            heading: "That's the ii-V-I — one of the most common progressions in music.",
            body: "Across pop, jazz, and everything between, this exact three-chord move shows up constantly. You built every piece of it yourself, from formulas you already knew.",
          },
        },
      ],
    },
    {
      id: "sevenths-have-shapes-too",
      index: 5,
      title: "Sevenths Have Shapes Too",
      steps: [
        {
          id: "seventh-inversions",
          concept: {
            heading: "You already know how to do this.",
            body: "Inversions aren't just for triads. Try G7 in root position, then its first inversion.",
          },
          discovery: {
            heading: "Same skill, richer chord.",
            body: "Nothing new to learn here — just proof that what you learned in Module 3 already applies to everything you learn after it.",
          },
        },
      ],
    },
    {
      id: "the-vi-chord-explained",
      index: 6,
      title: "The vi Chord, Explained",
      steps: [
        {
          id: "vi-chord",
          concept: {
            heading: "Remember A Minor from your very first song?",
            body: "C, then G, then two different possible endings from the same key. Try ending on F Major, then on A Minor.",
          },
          discovery: {
            heading: "That's why A Minor always fit.",
            body: "A Minor isn't a random substitute in a major-key song — it's the vi chord, diatonically related to C Major the same way D Minor and F Major are. That's the actual reason it always sounded right.",
          },
        },
      ],
    },
    {
      id: "a-richer-arrangement",
      index: 7,
      title: "A Richer Arrangement",
      steps: [
        {
          id: "richer-arrangement",
          concept: {
            heading: "One chord swap changes the whole color.",
            body: "The same Dm-G-C progression, played plainly, then with G7 in place of G.",
          },
          discovery: {
            heading: "One richer chord, and the whole progression feels different.",
            body: "You don't need to change a progression to make it feel new — sometimes one chord, upgraded, is enough.",
          },
        },
      ],
    },
    {
      id: "your-new-harmonic-vocabulary",
      index: 8,
      title: "Your New Harmonic Vocabulary",
      steps: [
        {
          id: "new-harmonic-vocabulary",
          concept: {
            heading: "Play through everything, one more time.",
            body: "Sevenths. Suspensions. Where chords come from. The ii-V-I. Play Dm, G7, and C one final time.",
          },
          discovery: {
            heading: "You just expanded your vocabulary, not started over.",
            body: "Every chord in this module was built from formulas and relationships you already had. That's how real musical growth works — not replacing what you know, but discovering how much further it already reaches.",
          },
        },
      ],
    },
  ],
};

export const MODULE_5_ID = "module-5";

/**
 * Module 5: Accompanying a Song. Everything so far has been about the
 * notes and chords themselves -- this module is about the *role* those
 * chords play when supporting a melody or a singer: broken chords,
 * alternating bass, the classic "oom-pah" pattern, song form (verse vs.
 * chorus), and filling space between phrases. Built without a Phase
 * handoff, per docs/46 Decision 007 -- derived from `11-roadmap.md`'s
 * Song Learning Engine and Accompaniment territory.
 *
 * Deliberately does not simulate following a real singer or live tempo
 * changes -- there's no audio input in this product yet (that's
 * MIDI/practice-intelligence territory, explicitly future work per
 * CLAUDE.md). Every lesson here reuses ChoiceInteraction,
 * NoteSequenceInteraction, or PlayProgressionInteraction -- no new
 * mechanics were needed, same as Module 4.
 */
export const MODULE_5: Module = {
  id: MODULE_5_ID,
  index: 5,
  title: "Accompanying a Song",
  subtitle: "From Chords To Real Support",
  lessons: [
    {
      id: "broken-chords",
      index: 1,
      title: "Broken Chords",
      steps: [
        {
          id: "broken-chords",
          concept: {
            heading: "A chord doesn't have to arrive all at once.",
            body: "Compare C Major played as a block, then played one note at a time.",
          },
          discovery: {
            heading: "Same notes. A completely different feel.",
            body: "That's a broken chord — the exact same notes, spread across time instead of stacked together. It's one of the simplest ways to make an accompaniment feel like it's flowing.",
          },
        },
      ],
    },
    {
      id: "the-alternating-bass",
      index: 2,
      title: "The Alternating Bass",
      steps: [
        {
          id: "alternating-bass",
          concept: {
            heading: "The left hand has its own pattern.",
            body: "Alternate between a chord's root and its fifth — the same relationship from Module 1's interval lesson, now used as a bassline.",
          },
          discovery: {
            heading: "That's a real accompaniment technique.",
            body: "Root, fifth, root, fifth is the backbone of countless piano parts — simple, steady, and it never competes with the melody.",
          },
        },
      ],
    },
    {
      id: "verse-and-chorus",
      index: 3,
      title: "Verse and Chorus",
      steps: [
        {
          id: "verse-and-chorus",
          concept: {
            heading: "Songs don't use one progression the whole way through.",
            body: "You know two progressions already. Compare them side by side — one built for a verse's feel, one for a chorus.",
          },
          discovery: {
            heading: "That contrast is song structure.",
            body: "A verse and a chorus often share a key but use different progressions, so the chorus lifts. You already had both halves of that contrast — you just hadn't heard them as roles yet.",
          },
        },
      ],
    },
    {
      id: "harmonizing-a-melody",
      index: 4,
      title: "Harmonizing a Melody",
      steps: [
        {
          id: "harmonizing-melody",
          concept: {
            heading: "One melody note, more than one right answer.",
            body: "The note E belongs to both C Major and A Minor. Harmonize it both ways.",
          },
          discovery: {
            heading: "The melody didn't change. The feeling did.",
            body: "Choosing which chord supports a melody note is a real musical decision, not a lookup — the same note can belong to a bright chord or a darker one.",
          },
        },
      ],
    },
    {
      id: "the-oom-pah-pattern",
      index: 5,
      title: "The Oom-Pah Pattern",
      steps: [
        {
          id: "oom-pah-pattern",
          concept: {
            heading: "Put the bass and the chord together.",
            body: "Bass note, then chord, then bass note, then chord — the alternating bass from Lesson 2, now with a chord riding on top of it.",
          },
          discovery: {
            heading: "That's the sound behind more songs than you'd guess.",
            body: "This exact bass-then-chord pattern is one of the most-used accompaniment shapes in piano music, across genres. You just built it from two skills you already had.",
          },
        },
      ],
    },
    {
      id: "filling-the-space",
      index: 6,
      title: "Filling the Space",
      steps: [
        {
          id: "filling-the-space",
          concept: {
            heading: "A pause doesn't have to be empty.",
            body: "Compare holding a chord through a pause versus adding a small fill in the gap.",
          },
          discovery: {
            heading: "That's what an accompanist does between phrases.",
            body: "When a singer takes a breath, that space is yours. A small fill — not a big one — keeps the music moving without stepping on the melody.",
          },
        },
      ],
    },
    {
      id: "a-full-arrangement",
      index: 7,
      title: "A Full Arrangement",
      steps: [
        {
          id: "full-arrangement",
          concept: {
            heading: "Put the whole toolkit together.",
            body: "The progression from your very first song, played plainly, then with the bass-and-chord pattern from this module.",
          },
          discovery: {
            heading: "Same chords. A real arrangement.",
            body: "Nothing about the harmony changed — only how you chose to play it. That choice is the difference between reciting chords and accompanying a song.",
          },
        },
      ],
    },
    {
      id: "you-can-accompany-anyone",
      index: 8,
      title: "You Can Accompany Anyone",
      steps: [
        {
          id: "accompany-anyone",
          concept: {
            heading: "Play it through, one more time.",
            body: "Broken chords. Alternating bass. Verse and chorus. Harmonizing a melody. The oom-pah pattern. Filling space. Play through the progression that started it all.",
          },
          discovery: {
            heading: "You're not just playing chords anymore. You're accompanying.",
            body: "Every technique in this module exists to support someone else's melody or voice — that's a different skill than playing alone, and you now have it.",
          },
        },
      ],
    },
  ],
};

export const MODULE_6_ID = "module-6";

/**
 * Module 6: Improvising Your Own Ideas. Every prior module was about
 * playing music that already existed -- chords, progressions,
 * accompaniment patterns. This module introduces the one genuinely new
 * mechanic in the curriculum's history: open-ended free play within a
 * "safety net" set of notes that always sounds good over a looping
 * backing chord, rather than a fixed sequence or a small discrete set of
 * options. Built without a Phase handoff, per docs/46 Decision 008 --
 * derived from `11-roadmap.md`'s Phase 8 "Musical Creativity"
 * (improvisation, harmonic variation), the part of that phase Module 3
 * ("Expressing Yourself") hadn't covered.
 *
 * Deliberately avoids claiming PianoOS can judge whether an improvised
 * idea is musically "good" -- there is no correct answer here, matching
 * the same "no wrong choice" premise Module 3 established with
 * ChoiceInteraction, just applied to genuinely open-ended play instead of
 * a discrete set of pre-defined options.
 */
export const MODULE_6: Module = {
  id: MODULE_6_ID,
  index: 6,
  title: "Improvising Your Own Ideas",
  subtitle: "From Playing Music To Making It",
  lessons: [
    {
      id: "call-and-response",
      index: 1,
      title: "Call and Response",
      steps: [
        {
          id: "call-and-response",
          concept: {
            heading: "Music is a conversation.",
            body: "Listen to this short phrase, then play it back — exactly as you heard it.",
          },
          discovery: {
            heading: "That's call and response.",
            body: "Listening, then answering, is the instinct every improviser starts from — before you ever play an idea of your own, you learn to really hear one.",
          },
        },
      ],
    },
    {
      id: "the-safety-net-scale",
      index: 2,
      title: "The Safety Net Scale",
      steps: [
        {
          id: "safety-net-scale",
          concept: {
            heading: "Every note here sounds good.",
            body: "These five notes are your safety net over this chord. Play freely — there's no wrong note to land on.",
          },
          discovery: {
            heading: "That's your permission to experiment.",
            body: "This is C major's pentatonic scale — the notes with no half-steps to stumble into. It's the same safety net real improvisers lean on before they ever learn the exceptions.",
          },
        },
      ],
    },
    {
      id: "question-and-answer",
      index: 3,
      title: "Question and Answer",
      steps: [
        {
          id: "question-and-answer",
          concept: {
            heading: "Here's a musical question.",
            body: "Now play your own answer, using any of the safety net notes.",
          },
          discovery: {
            heading: "You just improvised a real answer.",
            body: "That question-and-answer instinct — hear a musical idea, respond with your own — is the same one behind every real solo you've ever heard.",
          },
        },
      ],
    },
    {
      id: "rhythmic-variation",
      index: 4,
      title: "Rhythmic Variation",
      steps: [
        {
          id: "rhythmic-variation",
          concept: {
            heading: "Same three notes. Two different feels.",
            body: "Compare a steady rhythm to a syncopated one.",
          },
          discovery: {
            heading: "The notes never changed. The rhythm did.",
            body: "Rhythmic variation is one of the simplest improvisational tools you have — you don't need new notes to make a phrase feel completely different.",
          },
        },
      ],
    },
    {
      id: "adding-an-ornament",
      index: 5,
      title: "Adding an Ornament",
      steps: [
        {
          id: "adding-an-ornament",
          concept: {
            heading: "A plain phrase, then the same phrase with a little extra.",
            body: "Compare the plain version to one with a quick note added for color.",
          },
          discovery: {
            heading: "That's ornamentation.",
            body: "A quick passing note dropped into a simple phrase is decoration, not a new idea — one of the easiest ways to make something plain feel expressive.",
          },
        },
      ],
    },
    {
      id: "improvising-over-a-progression",
      index: 6,
      title: "Improvising Over a Progression",
      steps: [
        {
          id: "improvising-over-progression",
          concept: {
            heading: "The progression you already know is looping underneath.",
            body: "Play freely, using the safety net notes, for as long as you like.",
          },
          discovery: {
            heading: "That's no longer following someone else's music.",
            body: "You just improvised over the same progression from your very first song — C, G, Am, F. That's making it your own.",
          },
        },
      ],
    },
    {
      id: "two-ideas-back-to-back",
      index: 7,
      title: "Two Ideas Back to Back",
      steps: [
        {
          id: "two-ideas-back-to-back",
          concept: {
            heading: "Repeat an idea, or follow it with a new one.",
            body: "Compare playing the same short idea twice to playing two different ideas back to back.",
          },
          discovery: {
            heading: "That's how real melodies get built.",
            body: "Repetition creates familiarity. Contrast creates interest. Most musical ideas you actually enjoy listening to use both.",
          },
        },
      ],
    },
    {
      id: "you-are-already-improvising",
      index: 8,
      title: "You Are Already Improvising",
      steps: [
        {
          id: "you-are-already-improvising",
          concept: {
            heading: "One more time — freely, however you like.",
            body: "Call and response. The safety net scale. Question and answer. Rhythm and ornament. Play over the progression, your way.",
          },
          discovery: {
            heading: "You are already improvising.",
            body: "Every choice you just made — which note, when, how long — was yours. That's not a beginner exercise anymore. That's musicianship.",
          },
        },
      ],
    },
  ],
};

export const MODULE_7_ID = "module-7";

/**
 * Module 7: Writing Your Own Song. The capstone that everything since
 * Module 2 has been building toward -- chords, progressions,
 * accompaniment, and improvised melody, combined into one original
 * verse-into-chorus piece the student assembles themselves. Built
 * without a Phase handoff, per docs/46 Decision 009 -- derived from
 * `11-roadmap.md`'s Phase 8 "Musical Creativity" ("Songwriting basics"),
 * the one piece of that phase Module 6 hadn't covered.
 *
 * Deliberately reuses ChoiceInteraction, PlayProgressionInteraction, and
 * FreePlayInteraction only -- zero new interaction primitives, the third
 * module (after 4 and 5) to need none. `myVerse`/`myChorus`/`mySong` in
 * chords.ts are new progressions built from chords the student already
 * knows, with no songReference: the whole point is that this one belongs
 * to them, not to an existing song.
 */
export const MODULE_7: Module = {
  id: MODULE_7_ID,
  index: 7,
  title: "Writing Your Own Song",
  subtitle: "From Ideas To A Finished Piece",
  lessons: [
    {
      id: "choosing-your-chords",
      index: 1,
      title: "Choosing Your Chords",
      steps: [
        {
          id: "choosing-your-chords",
          concept: {
            heading: "Every song starts with a handful of chords.",
            body: "Four chords you already know. Try each one — these are what you'll build your song from.",
          },
          discovery: {
            heading: "That's your palette.",
            body: "C, Am, F, and G — nothing new here. What's new is that you're choosing them, not just following a lesson's order.",
          },
        },
      ],
    },
    {
      id: "your-verse",
      index: 2,
      title: "Your Verse",
      steps: [
        {
          id: "your-verse",
          concept: {
            heading: "Put those chords in an order — your verse.",
            body: "Play each chord yourself, in order: C, Am, F, G.",
          },
          discovery: {
            heading: "That's a verse.",
            body: "Same four chords as always, but this particular order is the one you're using — the first section of your song.",
          },
        },
      ],
    },
    {
      id: "your-chorus",
      index: 3,
      title: "Your Chorus",
      steps: [
        {
          id: "your-chorus",
          concept: {
            heading: "A chorus needs its own identity.",
            body: "Play this shorter, punchier order yourself: F, G, C.",
          },
          discovery: {
            heading: "That's the lift a chorus needs.",
            body: "Fewer chords, a stronger resolution back to C — that contrast with your verse is exactly what makes a chorus feel like a chorus.",
          },
        },
      ],
    },
    {
      id: "adding-a-melody",
      index: 4,
      title: "Adding a Melody",
      steps: [
        {
          id: "adding-a-melody",
          concept: {
            heading: "Your verse needs a melody on top.",
            body: "Your verse is looping underneath. Play a melody over it, freely, using the safety net notes.",
          },
          discovery: {
            heading: "That melody is part of your song now.",
            body: "You didn't just accompany a progression — you wrote a melodic line over your own verse, from Module 6's improvisation instinct.",
          },
        },
      ],
    },
    {
      id: "a-simple-ending",
      index: 5,
      title: "A Simple Ending",
      steps: [
        {
          id: "a-simple-ending",
          concept: {
            heading: "Every song needs an ending.",
            body: "Compare fading out to landing on one strong final chord.",
          },
          discovery: {
            heading: "Endings are a choice, not an afterthought.",
            body: "A fade feels unresolved and dreamy. A strong final chord feels finished. Neither is more correct — but your song needs one of them, deliberately.",
          },
        },
      ],
    },
    {
      id: "verse-into-chorus",
      index: 6,
      title: "Verse Into Chorus",
      steps: [
        {
          id: "verse-into-chorus",
          concept: {
            heading: "A verse on its own can feel like it's missing something.",
            body: "Compare looping the verse by itself to letting it move into the chorus.",
          },
          discovery: {
            heading: "That movement is song form.",
            body: "The verse alone just repeats. The verse moving into the chorus tells a story — tension, then release. That's structure, not decoration.",
          },
        },
      ],
    },
    {
      id: "naming-your-sound",
      index: 7,
      title: "Naming Your Sound",
      steps: [
        {
          id: "naming-your-sound",
          concept: {
            heading: "The same song, played two ways.",
            body: "Compare a simple arrangement of your song to a fuller one with a bass note under every chord.",
          },
          discovery: {
            heading: "That choice is your sound.",
            body: "The chords never changed. How you chose to play them — plain or full — is a real musical decision, and it's yours to make every time.",
          },
        },
      ],
    },
    {
      id: "you-wrote-a-song",
      index: 8,
      title: "You Wrote a Song",
      steps: [
        {
          id: "you-wrote-a-song",
          concept: {
            heading: "Play it start to finish.",
            body: "Your verse, into your chorus, to a real ending. Play every chord yourself.",
          },
          discovery: {
            heading: "You wrote a song.",
            body: "Every chord, every section, and the melody on top were choices you made. That's not an exercise anymore — that's a piece of music that's genuinely yours.",
          },
        },
      ],
    },
  ],
};

export const MODULES: Module[] = [MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5, MODULE_6, MODULE_7];

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((module) => module.id === moduleId);
}

export function getModuleLesson(moduleId: string, lessonId: string) {
  return getModule(moduleId)?.lessons.find((lesson) => lesson.id === lessonId);
}

export function getNextModuleLesson(moduleId: string, lessonId: string) {
  const module = getModule(moduleId);
  if (!module) return undefined;
  const current = module.lessons.find((lesson) => lesson.id === lessonId);
  if (!current) return undefined;
  return module.lessons.find((lesson) => lesson.index === current.index + 1);
}
