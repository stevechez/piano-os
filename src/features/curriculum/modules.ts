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

export const MODULE_8_ID = "module-8";

/**
 * Module 8: Borrowed Chords. Modal mixture / reharmonization, kept
 * beginner-appropriate: borrowing a chord from a key's parallel minor (F
 * Minor and B♭ Major, borrowed into C major) for color, rather than full
 * jazz reharmonization or modal playing. Built without a Phase handoff,
 * per docs/46 Decision 010 -- derived from `11-roadmap.md`'s Phase 9
 * "Advanced Musicianship" ("Advanced harmony," "Modal playing,"
 * "Reharmonization"), the first curriculum drawn from that phase.
 *
 * Deliberately distinct from Module 4's vi-chord substitution (also a
 * kind of reharmonization, but a diatonic chord) and Module 6's melody
 * harmonization (which chord under a fixed melody note) -- this module's
 * chords come from *outside* the key entirely. Reuses ChoiceInteraction,
 * NoteSequenceInteraction, and PlayProgressionInteraction only -- the
 * fourth module (after 4, 5, and 7) needing zero new interaction
 * primitives. Lesson 6 deliberately calls back to the student's own song
 * from Module 7, reharmonizing its ending rather than introducing an
 * unrelated example.
 */
export const MODULE_8: Module = {
  id: MODULE_8_ID,
  index: 8,
  title: "Borrowed Chords",
  subtitle: "Color From Outside Your Key",
  lessons: [
    {
      id: "the-chord-from-next-door",
      index: 1,
      title: "The Chord From Next Door",
      steps: [
        {
          id: "chord-from-next-door",
          concept: {
            heading: "Every key has a neighbor chord that isn't supposed to belong.",
            body: "F Major belongs to C major's key. Compare it to F Minor, which doesn't — but gets borrowed anyway.",
          },
          discovery: {
            heading: "That's a borrowed chord.",
            body: "Swapping a major chord for its minor twin pulls in color from a related key — one of the simplest reharmonization tricks there is.",
          },
        },
      ],
    },
    {
      id: "hearing-the-difference",
      index: 2,
      title: "Hearing the Difference",
      steps: [
        {
          id: "hearing-the-difference",
          concept: {
            heading: "Same journey, different chord in the middle.",
            body: "C to a middle chord and back to C. Compare the diatonic middle chord to the borrowed one.",
          },
          discovery: {
            heading: "The borrowed version doesn't sound wrong.",
            body: "It sounds like it means something. That emotional shift is the whole reason to borrow a chord in the first place.",
          },
        },
      ],
    },
    {
      id: "the-chord-from-even-further-away",
      index: 3,
      title: "The Chord From Even Further Away",
      steps: [
        {
          id: "chord-from-further-away",
          concept: {
            heading: "There's another neighbor chord, from even further outside the key.",
            body: "Compare G Major, which belongs to C major, to B♭ Major, which doesn't.",
          },
          discovery: {
            heading: "B♭ Major isn't in C major's key at all.",
            body: "It's borrowed from C's parallel minor. It gives an ending real weight without ever using a chord that sounds 'wrong.'",
          },
        },
      ],
    },
    {
      id: "building-a-borrowed-chord",
      index: 4,
      title: "Building a Borrowed Chord",
      steps: [
        {
          id: "building-borrowed-chord",
          concept: {
            heading: "Where does F Minor actually come from?",
            body: "Build it yourself: root, then minor third, then fifth.",
          },
          discovery: {
            heading: "Same formula as every minor chord you've built.",
            body: "It's not a special chord. It's a familiar shape, borrowed from a different key.",
          },
        },
      ],
    },
    {
      id: "borrowing-in-a-real-progression",
      index: 5,
      title: "Borrowing in a Real Progression",
      steps: [
        {
          id: "borrowing-in-progression",
          concept: {
            heading: "Play a full progression that borrows, for real.",
            body: "C, F Minor, G, back to C. Play each chord yourself, in order.",
          },
          discovery: {
            heading: "The borrowed chord didn't derail it.",
            body: "It gave the progression a moment of shadow before the light came back. That's a real reharmonized progression, and you just played it.",
          },
        },
      ],
    },
    {
      id: "reharmonizing-your-songs-ending",
      index: 6,
      title: "Reharmonizing Your Song's Ending",
      steps: [
        {
          id: "reharmonizing-your-ending",
          concept: {
            heading: "Remember the song you wrote in Module 7?",
            body: "Its ending has another option. Compare your original ending to a borrowed one.",
          },
          discovery: {
            heading: "Same song, same final chord — a different road there.",
            body: "Reharmonizing isn't rewriting your song. It's discovering it had more than one voice all along.",
          },
        },
      ],
    },
    {
      id: "when-to-borrow",
      index: 7,
      title: "When to Borrow",
      steps: [
        {
          id: "when-to-borrow",
          concept: {
            heading: "Compare a plain progression to the same one with one chord borrowed.",
            body: "All diatonic, then the same loop with a single borrowed chord swapped in.",
          },
          discovery: {
            heading: "One borrowed chord stands out.",
            body: "If every chord were borrowed, none of them would. Restraint is what makes the technique work.",
          },
        },
      ],
    },
    {
      id: "you-can-hear-outside-the-key-now",
      index: 8,
      title: "You Can Hear Outside the Key Now",
      steps: [
        {
          id: "hear-outside-key-now",
          concept: {
            heading: "Play it yourself, start to finish.",
            body: "C, F Minor, B♭, back to C. Every chord borrowed on purpose.",
          },
          discovery: {
            heading: "You are no longer limited to the seven chords inside a key.",
            body: "You can reach outside it, on purpose, whenever a moment calls for it. That's not a beginner's boundary anymore.",
          },
        },
      ],
    },
  ],
};

export const MODULE_9_ID = "module-9";

/**
 * Module 9: A New Color: Playing in Mixolydian. The curriculum's first
 * modal content -- a single mode (Mixolydian: a major scale with a
 * flattened 7th) introduced as one different note away from something
 * the student already knows, rather than a wall of new modal theory.
 * Built without a Phase handoff, per docs/46 Decision 011 -- derived
 * from `11-roadmap.md`'s Phase 9 "Advanced Musicianship" ("Modal
 * playing"), continuing Module 8's exploration of that phase.
 *
 * Deliberately reuses Module 6's `FreePlayInteraction` "safety net"
 * framing with a new note set, and Module 8's `bFlatMajor` chord (the
 * bVII of C major, which is also Mixolydian's defining color chord) --
 * no new chords needed, only a new progression (`mixolydianVamp`) built
 * from chords that already existed. Reuses ChoiceInteraction,
 * NoteSequenceInteraction, PlayProgressionInteraction, and
 * FreePlayInteraction exclusively -- the fifth module (after 4, 5, 7,
 * and 8) needing zero new interaction primitives.
 */
export const MODULE_9: Module = {
  id: MODULE_9_ID,
  index: 9,
  title: "A New Color: Playing in Mixolydian",
  subtitle: "One Different Note, A Whole New Mood",
  lessons: [
    {
      id: "one-note-changes-everything",
      index: 1,
      title: "One Note Changes Everything",
      steps: [
        {
          id: "one-note-changes-everything",
          concept: {
            heading: "Scales aren't just major or minor.",
            body: "Compare a major scale to a Mixolydian scale — listen for what's different.",
          },
          discovery: {
            heading: "One flattened 7th. That's the entire difference.",
            body: "A single half-step change to one note is the whole distance between major and Mixolydian — and it changes the whole character.",
          },
        },
      ],
    },
    {
      id: "building-the-mixolydian-scale",
      index: 2,
      title: "Building the Mixolydian Scale",
      steps: [
        {
          id: "building-mixolydian-scale",
          concept: {
            heading: "Build it yourself, one note at a time.",
            body: "Root to octave, the Mixolydian way.",
          },
          discovery: {
            heading: "Same shape as a major scale.",
            body: "Except the 7th step is a half-step lower. You already knew the shape — this is just one note moved.",
          },
        },
      ],
    },
    {
      id: "the-mixolydian-vamp",
      index: 3,
      title: "The Mixolydian Vamp",
      steps: [
        {
          id: "mixolydian-vamp",
          concept: {
            heading: "This scale has its own natural chord move.",
            body: "Play it yourself: C, B♭, C, B♭.",
          },
          discovery: {
            heading: "That's the Mixolydian mode, in motion.",
            body: "I to ♭VII and back is a sound you've heard in dozens of songs — now you know why it works.",
          },
        },
      ],
    },
    {
      id: "a-new-safety-net",
      index: 4,
      title: "A New Safety Net",
      steps: [
        {
          id: "new-safety-net",
          concept: {
            heading: "Every note in this scale sounds good over this vamp.",
            body: "Play freely — the Mixolydian scale is looping underneath.",
          },
          discovery: {
            heading: "That's your new safety net.",
            body: "A different color from Module 6's, but the same permission to experiment.",
          },
        },
      ],
    },
    {
      id: "same-chords-different-mood",
      index: 5,
      title: "Same Chords, Different Mood",
      steps: [
        {
          id: "same-chords-different-mood",
          concept: {
            heading: "The chord underneath doesn't change.",
            body: "Compare a melody built from your original safety net to one built from this new one.",
          },
          discovery: {
            heading: "Same harmony, different color.",
            body: "The scale you choose to improvise with shapes the mood as much as the chords do.",
          },
        },
      ],
    },
    {
      id: "grooving-in-mixolydian",
      index: 6,
      title: "Grooving in Mixolydian",
      steps: [
        {
          id: "grooving-in-mixolydian",
          concept: {
            heading: "Rhythm still matters here too.",
            body: "Compare a steady groove to a syncopated one under the vamp.",
          },
          discovery: {
            heading: "The mode gives you the notes. Rhythm is still yours to shape.",
            body: "A new scale doesn't replace everything else you've learned about rhythm — it adds to it.",
          },
        },
      ],
    },
    {
      id: "ending-on-the-root",
      index: 7,
      title: "Ending on the Root",
      steps: [
        {
          id: "ending-on-the-root",
          concept: {
            heading: "Compare two ways to end the same vamp.",
            body: "Ending on the B♭ chord versus resolving back to C.",
          },
          discovery: {
            heading: "Modal music can hang in the air on purpose.",
            body: "But choosing when to resolve, and when not to, is still your call — the mode doesn't decide that for you.",
          },
        },
      ],
    },
    {
      id: "you-can-hear-in-more-than-one-color-now",
      index: 8,
      title: "You Can Hear in More Than One Color Now",
      steps: [
        {
          id: "hear-in-more-than-one-color",
          concept: {
            heading: "One more time — freely, in this new color.",
            body: "The Mixolydian vamp is looping underneath. Play however you like.",
          },
          discovery: {
            heading: "You have more than one way to hear the same key now.",
            body: "The safety net scale, borrowed chords, and now a whole different mode. That's not memorization anymore. That's musicianship.",
          },
        },
      ],
    },
  ],
};

export const MODULE_10_ID = "module-10";

/**
 * Module 10: Putting It All Together. A deliberate course-correction, not
 * more new theory -- Modules 8 and 9 pushed into genuinely advanced
 * territory (borrowed chords, a full mode), and docs/46's Validation
 * Gate flagged that directly as the curriculum's deepest departure yet
 * from its own "adult beginner" persona. Rather than pushing further,
 * this module is a synthesis and performance capstone: it teaches
 * exactly one new structural idea (a bridge -- the vi-IV-I-V a huge
 * number of songs use) and otherwise combines skills the student already
 * has (Module 7's song, Module 6's improvisation, Module 8's borrowed
 * chords, Module 2's dynamics) into one complete, performable piece.
 * Built without a Phase handoff, per docs/46 Decision 012 -- derived
 * from `11-roadmap.md`'s Phase 9 "Composition" and "Performance," rather
 * than continuing further into "Advanced harmony" or "Modal playing."
 *
 * Needs zero new chords and zero new interaction primitives -- the
 * sixth module (after 4, 5, 7, 8, and 9) to need none, reusing
 * `ChoiceInteraction`, `PlayProgressionInteraction`, and
 * `FreePlayInteraction` exclusively. The three new progressions
 * (`myBridge`, `myVerseIntoBridge`, `myCompletePiece`) are all built
 * from chords already in `chords.ts`.
 */
export const MODULE_10: Module = {
  id: MODULE_10_ID,
  index: 10,
  title: "Putting It All Together",
  subtitle: "Your Complete Performance Piece",
  lessons: [
    {
      id: "a-third-section-the-bridge",
      index: 1,
      title: "A Third Section: The Bridge",
      steps: [
        {
          id: "third-section-bridge",
          concept: {
            heading: "Verse and chorus aren't the whole story.",
            body: "Most songs have a third section that goes somewhere different before the final chorus. Play it yourself: Am, F, C, G.",
          },
          discovery: {
            heading: "That's a bridge.",
            body: "Same four chords as ever, borrowed and reordered — it feels like a detour, right before coming home.",
          },
        },
      ],
    },
    {
      id: "bridge-into-final-chorus",
      index: 2,
      title: "Bridge Into Final Chorus",
      steps: [
        {
          id: "bridge-into-chorus",
          concept: {
            heading: "Compare two ways to reach your final chorus.",
            body: "Looping your chorus a second time, versus letting the bridge lead into it instead.",
          },
          discovery: {
            heading: "The bridge earns the final chorus.",
            body: "Repetition alone doesn't build the same kind of payoff — the detour is what makes coming home feel like something.",
          },
        },
      ],
    },
    {
      id: "a-color-for-the-bridge",
      index: 3,
      title: "A Color for the Bridge",
      steps: [
        {
          id: "color-for-bridge",
          concept: {
            heading: "The bridge can borrow color too.",
            body: "Compare the plain bridge to one with a borrowed chord.",
          },
          discovery: {
            heading: "A little shadow makes the arrival feel brighter.",
            body: "One borrowed chord in the bridge makes the final chorus land even harder — the same lesson from Module 8, now serving your own song.",
          },
        },
      ],
    },
    {
      id: "your-solo-section",
      index: 4,
      title: "Your Solo Section",
      steps: [
        {
          id: "your-solo-section",
          concept: {
            heading: "The bridge is also where a solo often lives.",
            body: "Play freely over it, using the safety net notes.",
          },
          discovery: {
            heading: "That's a real solo section.",
            body: "Built on Module 6's safety net, placed inside your own song's structure. Not a separate exercise — part of the piece.",
          },
        },
      ],
    },
    {
      id: "verse-into-your-bridge",
      index: 5,
      title: "Verse Into Your Bridge",
      steps: [
        {
          id: "verse-into-bridge",
          concept: {
            heading: "Play the transition for real.",
            body: "Your verse, moving into your new bridge.",
          },
          discovery: {
            heading: "That handoff is the hardest part of song structure to get right.",
            body: "And you just played it — your own verse, leading somewhere new, on purpose.",
          },
        },
      ],
    },
    {
      id: "landing-somewhere-unexpected",
      index: 6,
      title: "Landing Somewhere Unexpected",
      steps: [
        {
          id: "landing-somewhere-unexpected",
          concept: {
            heading: "Compare two ways to end your piece.",
            body: "Landing on the expected chord versus landing on an unexpected one.",
          },
          discovery: {
            heading: "That doesn't feel wrong. It feels like a choice.",
            body: "Landing somewhere unexpected is the difference between a mistake and a decision — and you're the one making it.",
          },
        },
      ],
    },
    {
      id: "performing-with-intention",
      index: 7,
      title: "Performing with Intention",
      steps: [
        {
          id: "performing-with-intention",
          concept: {
            heading: "The same bridge, played two different ways.",
            body: "Compare a quiet build to an immediate climax.",
          },
          discovery: {
            heading: "Both are valid performance choices.",
            body: "Which one you pick shapes how the whole piece lands — dynamics aren't decoration, they're a decision every time you sit down to play.",
          },
        },
      ],
    },
    {
      id: "your-complete-performance",
      index: 8,
      title: "Your Complete Performance",
      steps: [
        {
          id: "complete-performance",
          concept: {
            heading: "Play the whole thing, start to finish.",
            body: "Your verse, your bridge, your chorus.",
          },
          discovery: {
            heading: "Ten modules of understanding, one complete performance.",
            body: "This is the piece you built — every section, every choice, genuinely yours.",
          },
        },
      ],
    },
  ],
};

export const MODULE_11_ID = "module-11";

/**
 * Module 11: Training Your Ear. Another deliberate pullback, like Module
 * 10 -- not new theory, but a practical-skill module that makes
 * everything already taught more usable: recognizing intervals, chord
 * qualities, borrowed chords, the Mixolydian mode, rhythm, and the
 * student's own song chords by ear alone, without notation or visual
 * cues. Built without a Phase handoff, per docs/46 Decision 013.
 *
 * Introduces `EarTrainingInteraction`, a new primitive that generalizes
 * the "listen, then guess from a fixed set of options, wrong answers
 * retry" shape Module 3's bespoke `MajorOrMinorEarInteraction` already
 * used once -- Module 11 needs that shape eight times, past the
 * genuine-second-repetition threshold this codebase extracts shared
 * primitives at. `MajorOrMinorEarInteraction` itself is deliberately
 * left untouched rather than refactored onto the new primitive: it
 * already works, and refactoring already-shipped, already-verified
 * curriculum wasn't asked for.
 *
 * Every lesson tests recognition of content from an earlier module
 * (Module 1's intervals, Module 4's suspended chords, Module 8's
 * borrowed chords, Module 9's Mixolydian mode, Module 6's rhythm,
 * Module 7's own song) rather than introducing new harmonic vocabulary
 * -- a direct response to the Validation Gate's concern that Modules
 * 8-9 pushed too far past the "adult beginner" persona.
 */
export const MODULE_11: Module = {
  id: MODULE_11_ID,
  index: 11,
  title: "Training Your Ear",
  subtitle: "Recognizing What You Hear",
  lessons: [
    {
      id: "which-interval-is-it",
      index: 1,
      title: "Which Interval Is It?",
      steps: [
        {
          id: "which-interval-is-it",
          concept: {
            heading: "You've built these intervals before.",
            body: "Now recognize them by ear alone — no keyboard hints, just listening.",
          },
          discovery: {
            heading: "That's ear training.",
            body: "The gap between building an interval and recognizing it by ear is real — and you just closed it.",
          },
        },
      ],
    },
    {
      id: "wider-intervals",
      index: 2,
      title: "Wider Intervals",
      steps: [
        {
          id: "wider-intervals",
          concept: {
            heading: "Two wider intervals.",
            body: "Listen for the difference between a fifth and a full octave.",
          },
          discovery: {
            heading: "The space between notes has its own sound.",
            body: "A fifth and an octave feel different in your ear the same way they feel different under your hand.",
          },
        },
      ],
    },
    {
      id: "triad-or-suspended",
      index: 3,
      title: "Triad or Suspended?",
      steps: [
        {
          id: "triad-or-suspended",
          concept: {
            heading: "Two chords, one root.",
            body: "Can you hear the difference between a plain triad and a suspended chord?",
          },
          discovery: {
            heading: "That tension has a sound of its own.",
            body: "A suspended chord's unresolved feeling isn't just a concept from Module 4 anymore — you can hear it now.",
          },
        },
      ],
    },
    {
      id: "borrowed-or-diatonic",
      index: 4,
      title: "Borrowed or Diatonic?",
      steps: [
        {
          id: "borrowed-or-diatonic",
          concept: {
            heading: "You built these chords in Module 8.",
            body: "Now recognize them without seeing which is which.",
          },
          discovery: {
            heading: "The color you learned to borrow has its own sound.",
            body: "You don't need to see the chord name to hear that something's been borrowed from outside the key.",
          },
        },
      ],
    },
    {
      id: "major-scale-or-mixolydian",
      index: 5,
      title: "Major Scale or Mixolydian?",
      steps: [
        {
          id: "major-or-mixolydian",
          concept: {
            heading: "The one-note difference from Module 9.",
            body: "Now tested by ear.",
          },
          discovery: {
            heading: "One flattened note, and you can hear it now.",
            body: "That's the whole test — the same single difference that defines the mode, recognized without seeing a single key.",
          },
        },
      ],
    },
    {
      id: "steady-or-syncopated",
      index: 6,
      title: "Steady or Syncopated?",
      steps: [
        {
          id: "steady-or-syncopated",
          concept: {
            heading: "Same note, four times.",
            body: "Is the rhythm steady, or syncopated?",
          },
          discovery: {
            heading: "Rhythm has a sound too, not just a feel.",
            body: "You've played both from Module 6 — now you can name which one you're hearing, without playing along.",
          },
        },
      ],
    },
    {
      id: "your-own-chord-by-ear",
      index: 7,
      title: "Your Own Chord, By Ear",
      steps: [
        {
          id: "your-own-chord-by-ear",
          concept: {
            heading: "One of the four chords from your own song is playing.",
            body: "Which one?",
          },
          discovery: {
            heading: "You know your own song by ear now.",
            body: "Not because you memorized where your fingers go — because you recognize how each chord actually sounds.",
          },
        },
      ],
    },
    {
      id: "you-can-hear-it-now",
      index: 8,
      title: "You Can Hear It Now",
      steps: [
        {
          id: "you-can-hear-it-now",
          concept: {
            heading: "One more round of each.",
            body: "An interval, a chord, a scale. Everything you've trained your ear on.",
          },
          discovery: {
            heading: "You can hear it now.",
            body: "Every one of these used to require seeing a keyboard. None of them do anymore.",
          },
        },
      ],
    },
  ],
};

export const MODULE_12_ID = "module-12";

/**
 * Module 12: Playing In Any Key. A genuinely new, practical theme --
 * transposition -- introduced not as more harmonic vocabulary but as
 * proof that everything already learned (chord formulas, the student's
 * own song, borrowed chords, improvisation) is a set of *relationships*,
 * portable to any starting note, not a fixed set of memorized positions.
 * Built without a Phase handoff, per docs/46 Decision 014.
 *
 * The student's Module 7 song (C-Am-F-G verse, F-G-C chorus) is
 * transposed into G major (G-Em-C-D verse, C-D-G chorus) -- every chord
 * involved (gMajor, eMinor, cMajor, dMajor, cMinor) already exists in
 * `chords.ts`; only three new progressions were needed. Reuses
 * `ChoiceInteraction`, `NoteSequenceInteraction`,
 * `PlayProgressionInteraction`, `EarTrainingInteraction`, and
 * `FreePlayInteraction` exclusively -- the eighth module (after 4, 5, 7,
 * 8, 9, 10, and 11) needing zero new interaction primitives.
 */
export const MODULE_12: Module = {
  id: MODULE_12_ID,
  index: 12,
  title: "Playing In Any Key",
  subtitle: "Same Patterns, Different Starting Point",
  lessons: [
    {
      id: "the-same-shape-a-new-starting-point",
      index: 1,
      title: "The Same Shape, A New Starting Point",
      steps: [
        {
          id: "same-shape-new-starting-point",
          concept: {
            heading: "A major chord is always built the same way.",
            body: "Root, third, fifth. Compare C Major to G Major.",
          },
          discovery: {
            heading: "Same formula, different starting point.",
            body: "That's the whole idea behind playing in a new key.",
          },
        },
      ],
    },
    {
      id: "building-in-g-major",
      index: 2,
      title: "Building In G Major",
      steps: [
        {
          id: "building-in-g-major",
          concept: {
            heading: "Build G Major yourself.",
            body: "The same way you've built every other major chord.",
          },
          discovery: {
            heading: "Root, third, fifth — it never changes.",
            body: "No matter which key you're in, the formula holds.",
          },
        },
      ],
    },
    {
      id: "your-progression-moved",
      index: 3,
      title: "Your Progression, Moved",
      steps: [
        {
          id: "progression-moved",
          concept: {
            heading: "The exact progression from your own song, moved to a new key.",
            body: "C, Am, F, G becomes G, Em, C, D. Play it yourself.",
          },
          discovery: {
            heading: "Same relationships. Same feeling. Just higher.",
            body: "Every interval between the chords stayed exactly the same — only the starting point changed.",
          },
        },
      ],
    },
    {
      id: "which-key-fits-your-voice",
      index: 4,
      title: "Which Key Fits Your Voice?",
      steps: [
        {
          id: "which-key-fits-your-voice",
          concept: {
            heading: "The same song, in two different keys.",
            body: "Compare how each one feels.",
          },
          discovery: {
            heading: "There's no 'correct' key.",
            body: "Only the one that fits your voice or your mood best. That's why musicians transpose.",
          },
        },
      ],
    },
    {
      id: "same-pattern-new-key",
      index: 5,
      title: "Same Pattern, New Key?",
      steps: [
        {
          id: "same-pattern-new-key",
          concept: {
            heading: "Same pattern moved to a new key, or a genuinely different pattern?",
            body: "Listen and decide.",
          },
          discovery: {
            heading: "A moved pattern still sounds like itself.",
            body: "Your ear can tell the difference between a transposed relationship and an actually different one — that's real recognition, not memorization.",
          },
        },
      ],
    },
    {
      id: "a-borrowed-chord-transposed",
      index: 6,
      title: "A Borrowed Chord, Transposed",
      steps: [
        {
          id: "borrowed-chord-transposed",
          concept: {
            heading: "The borrowed-chord trick from Module 8 works in any key.",
            body: "Compare the diatonic IV in G to its borrowed minor twin.",
          },
          discovery: {
            heading: "Same technique, new key.",
            body: "Understanding a relationship means you can use it anywhere — not just in the one key you first learned it in.",
          },
        },
      ],
    },
    {
      id: "your-song-in-a-new-key",
      index: 7,
      title: "Your Song, In A New Key",
      steps: [
        {
          id: "song-in-new-key",
          concept: {
            heading: "Play your whole song — verse and chorus — in this new key.",
            body: "Play every chord yourself, start to finish.",
          },
          discovery: {
            heading: "That's the same song you wrote in Module 7.",
            body: "Same relationships, same structure, entirely transposable.",
          },
        },
      ],
    },
    {
      id: "you-can-play-anywhere-now",
      index: 8,
      title: "You Can Play Anywhere Now",
      steps: [
        {
          id: "play-anywhere-now",
          concept: {
            heading: "Improvise over your progression again.",
            body: "This time, in G.",
          },
          discovery: {
            heading: "The safety net moved with the key.",
            body: "Everything you've learned is portable — that's what understanding a pattern really means.",
          },
        },
      ],
    },
  ],
};

export const MODULE_13_ID = "module-13";

/**
 * Module 13: Playing in a Minor Key. Every prior module treated a minor
 * chord as a visitor inside a major key -- the relative minor (Module
 * 4's vi chord), a borrowed color (Module 8), a mode's flavor (Module
 * 9). This module reframes the exact same four chords the student has
 * used since onboarding (Am, F, C, G) around A minor as the tonic
 * itself -- a genuinely new listening perspective, not new vocabulary.
 * Built without a Phase handoff, per docs/46 Decision 015.
 *
 * Needs exactly one new chord (`eMajor` -- the harmonic-minor raised
 * leading tone a minor key borrows for a stronger cadence than its own
 * natural, minor five chord) and two new progressions
 * (`myMinorHomeProgression`, `myMinorCadence`), both built mostly from
 * chords already in `chords.ts` (aMinor, fMajor, cMajor, gMajor,
 * dMinor). Reuses `ChoiceInteraction`, `NoteSequenceInteraction`,
 * `PlayProgressionInteraction`, and `FreePlayInteraction` exclusively --
 * the ninth module (after 4, 5, 7, 8, 9, 10, 11, and 12) needing zero
 * new interaction primitives.
 */
export const MODULE_13: Module = {
  id: MODULE_13_ID,
  index: 13,
  title: "Playing in a Minor Key",
  subtitle: "Same Chords, A Different Home",
  lessons: [
    {
      id: "the-same-four-chords-a-new-home",
      index: 1,
      title: "The Same Four Chords, A New Home",
      steps: [
        {
          id: "same-four-chords-new-home",
          concept: {
            heading: "Four chords you already know.",
            body: "Am, F, C, G. Compare which one they land on.",
          },
          discovery: {
            heading: "Same four chords. A completely different home.",
            body: "Nothing about the chords changed — only which one felt like arriving.",
          },
        },
      ],
    },
    {
      id: "a-minors-own-progression",
      index: 2,
      title: "A Minor's Own Progression",
      steps: [
        {
          id: "minor-home-progression",
          concept: {
            heading: "Play a progression genuinely centered on A minor.",
            body: "Am, F, C, G, back to Am. Play each chord yourself.",
          },
          discovery: {
            heading: "That's a minor key doing what a major key does.",
            body: "Establishing home, wandering, and returning — the same journey, built on a minor tonic instead.",
          },
        },
      ],
    },
    {
      id: "the-minor-iv-chord",
      index: 3,
      title: "The Minor iv Chord",
      steps: [
        {
          id: "minor-iv-chord",
          concept: {
            heading: "Every key has its own iv chord.",
            body: "Compare D Major to D Minor — only one belongs here.",
          },
          discovery: {
            heading: "D Minor is A minor's iv chord.",
            body: "The same relationship major keys have with their IV — just built from a minor scale instead.",
          },
        },
      ],
    },
    {
      id: "building-the-natural-v",
      index: 4,
      title: "Building the Natural v",
      steps: [
        {
          id: "building-natural-v",
          concept: {
            heading: "Build A minor's own five chord.",
            body: "Root to fifth, the same way you've built every chord.",
          },
          discovery: {
            heading: "E Minor is the 'natural' five chord in A minor.",
            body: "Softer than the version most songs actually use — which is exactly what the next lesson is about.",
          },
        },
      ],
    },
    {
      id: "the-stronger-pull",
      index: 5,
      title: "The Stronger Pull",
      steps: [
        {
          id: "stronger-pull",
          concept: {
            heading: "Compare two ways to resolve to A minor.",
            body: "The natural five chord versus its major twin.",
          },
          discovery: {
            heading: "That single raised note pulls much harder toward home.",
            body: "It's why so many minor-key songs borrow this one chord instead of using the softer, natural version.",
          },
        },
      ],
    },
    {
      id: "your-solo-in-a-minor-key",
      index: 6,
      title: "Your Solo, In A Minor Key",
      steps: [
        {
          id: "solo-in-minor-key",
          concept: {
            heading: "Improvise freely.",
            body: "This safety net is built for a minor home.",
          },
          discovery: {
            heading: "The safety net moved to a whole new home.",
            body: "Not just a new starting note — a genuinely different center of gravity.",
          },
        },
      ],
    },
    {
      id: "choosing-your-home-deliberately",
      index: 7,
      title: "Choosing Your Home, Deliberately",
      steps: [
        {
          id: "choosing-your-home",
          concept: {
            heading: "The same four chords, arranged fully.",
            body: "Two different homes. Compare them.",
          },
          discovery: {
            heading: "Neither home is more correct.",
            body: "Which one you choose is a real musical decision — the same chords can tell two different stories.",
          },
        },
      ],
    },
    {
      id: "you-have-two-homes-now",
      index: 8,
      title: "You Have Two Homes Now",
      steps: [
        {
          id: "two-homes-now",
          concept: {
            heading: "Play the classic minor-key cadence yourself.",
            body: "Am, Dm, E Major, back to Am.",
          },
          discovery: {
            heading: "That's the sound of resolution in a minor key.",
            body: "You have two homes now — major and minor — and you know how to arrive at either one.",
          },
        },
      ],
    },
  ],
};

export const MODULE_14_ID = "module-14";

/**
 * Module 14: Writing a Minor Key Song. A synthesis module tying Module
 * 7's songwriting capstone together with Module 13's minor-key reframing
 * -- the student writes a second original song, structurally identical
 * in shape to Module 7's (choose chords, verse, chorus, melody, ending,
 * arrangement, capstone) but genuinely different in mood, since it's
 * centered on A minor. Built without a Phase handoff, per docs/46
 * Decision 016.
 *
 * Needs zero new chords -- aMinor, fMajor, dMinor, and eMajor all
 * already exist in `chords.ts` -- only three new progressions
 * (`myMinorVerse`, `myMinorChorus`, `myMinorSong`), deliberately a
 * different chord order than Module 13's cadence so this song has its
 * own identity. Reuses `ChoiceInteraction`, `PlayProgressionInteraction`,
 * and `FreePlayInteraction` exclusively -- the tenth module (after 4, 5,
 * 7, 8, 9, 10, 11, 12, and 13) needing zero new interaction primitives.
 */
export const MODULE_14: Module = {
  id: MODULE_14_ID,
  index: 14,
  title: "Writing a Minor Key Song",
  subtitle: "A Second Song, A Different Mood",
  lessons: [
    {
      id: "choosing-your-minor-chords",
      index: 1,
      title: "Choosing Your Minor Chords",
      steps: [
        {
          id: "choosing-minor-chords",
          concept: {
            heading: "Four chords for a different mood this time.",
            body: "Am, F, Dm, and E. Try each one.",
          },
          discovery: {
            heading: "That's your palette for a song that lives in minor.",
            body: "Same idea as Module 7 — choosing, not just following — a different mood entirely.",
          },
        },
      ],
    },
    {
      id: "your-minor-verse",
      index: 2,
      title: "Your Minor Verse",
      steps: [
        {
          id: "minor-verse",
          concept: {
            heading: "Put those chords in an order — your minor verse.",
            body: "Play each chord yourself, in order: Am, F, Dm, E.",
          },
          discovery: {
            heading: "That's a verse with a genuinely different center of gravity.",
            body: "Same skill as Module 7. A completely different feeling.",
          },
        },
      ],
    },
    {
      id: "your-minor-chorus",
      index: 3,
      title: "Your Minor Chorus",
      steps: [
        {
          id: "minor-chorus",
          concept: {
            heading: "A chorus needs its own identity here too.",
            body: "Play this shorter order yourself: Dm, E, Am.",
          },
          discovery: {
            heading: "Resolving to Am, not a major chord.",
            body: "That's the sound this whole song lives in.",
          },
        },
      ],
    },
    {
      id: "a-melody-in-minor",
      index: 4,
      title: "A Melody In Minor",
      steps: [
        {
          id: "melody-in-minor",
          concept: {
            heading: "Your minor verse is looping underneath.",
            body: "Play a melody over it, freely.",
          },
          discovery: {
            heading: "That's the same improvising instinct from Module 6.",
            body: "Now shaping a minor mood instead of a major one.",
          },
        },
      ],
    },
    {
      id: "a-minor-ending",
      index: 5,
      title: "A Minor Ending",
      steps: [
        {
          id: "minor-ending",
          concept: {
            heading: "Every song needs an ending, in any key.",
            body: "Compare fading out to a strong final chord.",
          },
          discovery: {
            heading: "A minor ending can resolve just as firmly as a major one.",
            body: "The finality is a choice you make — not something the key decides for you.",
          },
        },
      ],
    },
    {
      id: "verse-into-minor-chorus",
      index: 6,
      title: "Verse Into Minor Chorus",
      steps: [
        {
          id: "verse-into-minor-chorus",
          concept: {
            heading: "Compare looping your verse to letting it move into your chorus.",
            body: "Same structure. A minor mood.",
          },
          discovery: {
            heading: "That structural lift works the same way it did in Module 7.",
            body: "Song form isn't tied to major or minor — it's a shape you can build in either one.",
          },
        },
      ],
    },
    {
      id: "naming-your-minor-sound",
      index: 7,
      title: "Naming Your Minor Sound",
      steps: [
        {
          id: "naming-minor-sound",
          concept: {
            heading: "The same song, played two ways.",
            body: "Compare a simple arrangement to a fuller one.",
          },
          discovery: {
            heading: "Arrangement choices matter here just as much as in major.",
            body: "Maybe more — since the mood is already doing so much of the work.",
          },
        },
      ],
    },
    {
      id: "you-wrote-a-second-song",
      index: 8,
      title: "You Wrote a Second Song",
      steps: [
        {
          id: "wrote-second-song",
          concept: {
            heading: "Play it start to finish.",
            body: "Your minor verse, into your minor chorus.",
          },
          discovery: {
            heading: "You've written two songs now, in two different moods.",
            body: "That's not luck. That's understanding, applied twice.",
          },
        },
      ],
    },
  ],
};

export const MODULE_15_ID = "module-15";

/**
 * Module 15: Reading a Chord Chart. Deliberately not staff notation --
 * CLAUDE.md is explicit that PianoOS is "not a traditional sheet music
 * education platform" and to "teach patterns before notation." A chord
 * chart (just chord names, in order, no staff, no individual notes) is
 * the notation real musicians actually use for exactly this kind of
 * music, and it's a written form of a pattern the student already
 * holds, not a competing system to learn from scratch. Built without a
 * Phase handoff, per docs/46 Decision 017.
 *
 * Introduces `ChordChartInteraction`, a new primitive: unlike
 * `PlayProgressionInteraction`, the keyboard gives no highlighted-key
 * hint -- recalling each chord's notes from its written name alone is
 * the entire point. Every chart reuses chords already in `chords.ts`
 * (including a chart -- Lesson 4 -- that combines chords in an order
 * never previously used together, a genuine first sight-read). Zero new
 * chords needed.
 */
export const MODULE_15: Module = {
  id: MODULE_15_ID,
  index: 15,
  title: "Reading a Chord Chart",
  subtitle: "The Way Real Musicians Write Songs Down",
  lessons: [
    {
      id: "what-a-chart-looks-like",
      index: 1,
      title: "What a Chart Looks Like",
      steps: [
        {
          id: "what-a-chart-looks-like",
          concept: {
            heading: "A chord chart just lists the chords, in order.",
            body: "No staff, no individual notes — just names. Read this one and play it.",
          },
          discovery: {
            heading: "That's a real chord chart.",
            body: "If you can recall the chord from its name, you can play from any chart.",
          },
        },
      ],
    },
    {
      id: "repeated-chords",
      index: 2,
      title: "Repeated Chords",
      steps: [
        {
          id: "repeated-chords",
          concept: {
            heading: "Sometimes a chord repeats before the chart moves on.",
            body: "Read this chart, chord by chord.",
          },
          discovery: {
            heading: "A repeat in the chart isn't a shortcut.",
            body: "It means play it again, deliberately — the chart is telling you exactly what to do, twice.",
          },
        },
      ],
    },
    {
      id: "reading-sevenths-and-suspensions",
      index: 3,
      title: "Reading Sevenths and Suspensions",
      steps: [
        {
          id: "reading-sevenths-suspensions",
          concept: {
            heading: "Chart symbols include the chord type too.",
            body: "Not just the letter. Read G7 and Csus4.",
          },
          discovery: {
            heading: "The '7' and 'sus4' weren't decoration.",
            body: "They told you exactly which notes to recall — the same chords from Module 4, now read from a page instead of a lesson.",
          },
        },
      ],
    },
    {
      id: "sight-reading-a-new-chart",
      index: 4,
      title: "Sight-Reading a New Chart",
      steps: [
        {
          id: "sight-reading-new-chart",
          concept: {
            heading: "This chart is one you've never played before.",
            body: "Read it and play it for the first time.",
          },
          discovery: {
            heading: "That's sight-reading.",
            body: "You didn't need to hear it first — the chart told you everything.",
          },
        },
      ],
    },
    {
      id: "a-chart-in-a-new-key",
      index: 5,
      title: "A Chart In A New Key",
      steps: [
        {
          id: "chart-in-new-key",
          concept: {
            heading: "Read this chart.",
            body: "It might look familiar.",
          },
          discovery: {
            heading: "That's your song, transposed.",
            body: "You read it exactly the same way, letter by letter, in any key.",
          },
        },
      ],
    },
    {
      id: "reading-your-own-songs-chart",
      index: 6,
      title: "Reading Your Own Song's Chart",
      steps: [
        {
          id: "reading-own-song-chart",
          concept: {
            heading: "Read your own song's full chart, start to finish.",
            body: "Verse into chorus.",
          },
          discovery: {
            heading: "You wrote this song in Module 7.",
            body: "Now you could hand someone else the chart, and they could play it too.",
          },
        },
      ],
    },
    {
      id: "a-minor-chart",
      index: 7,
      title: "A Minor Chart",
      steps: [
        {
          id: "minor-chart",
          concept: {
            heading: "Read a chart in a minor key.",
            body: "Your Module 14 song, on the page.",
          },
          discovery: {
            heading: "Minor charts read exactly the same way.",
            body: "The notation doesn't care what mood the chord makes.",
          },
        },
      ],
    },
    {
      id: "you-can-read-anything-now",
      index: 8,
      title: "You Can Read Anything Now",
      steps: [
        {
          id: "read-anything-now",
          concept: {
            heading: "One more chart.",
            body: "Everything you've learned, all in one page.",
          },
          discovery: {
            heading: "You can read anything now.",
            body: "A chart is just chord names in order — and you know how to turn any name into music.",
          },
        },
      ],
    },
  ],
};

export const MODULE_16_ID = "module-16";

/**
 * Module 16: Spreading Your Sound. A genuinely new technique -- open/
 * spread voicings -- kept deliberately simple: move exactly one note of
 * a chord you already know up or down an octave to give it more room.
 * Distinct from Module 3's chord inversions (which changes which note
 * sits on the bottom, but keeps every note within the same octave);
 * this changes how much *space* the chord occupies. Built without a
 * Phase handoff, per docs/46 Decision 018.
 *
 * Needs three new chord entries (`cMajorSpread`, `fMajorSpread`,
 * `gMajorSpread`) -- each an existing triad with one note moved an
 * octave, kept within `PlayProgressionInteraction`'s fixed C3-C5
 * keyboard range -- and one new progression (`spreadCadence`). Reuses
 * `ChoiceInteraction`, `NoteSequenceInteraction`, `EarTrainingInteraction`,
 * and `PlayProgressionInteraction` exclusively -- the tenth module
 * (after 4, 5, 7, 8, 9, 10, 12, 13, and 14) needing zero new interaction
 * primitives.
 */
export const MODULE_16: Module = {
  id: MODULE_16_ID,
  index: 16,
  title: "Spreading Your Sound",
  subtitle: "A Chord Can Fill More Space",
  lessons: [
    {
      id: "a-chord-bunched-together",
      index: 1,
      title: "A Chord, Bunched Together",
      steps: [
        {
          id: "chord-bunched-together",
          concept: {
            heading: "Every chord you've played so far has been bunched together.",
            body: "Compare that to spreading the same notes out.",
          },
          discovery: {
            heading: "Same three notes. A completely fuller sound.",
            body: "That's a spread voicing — nothing new to learn about the chord itself, just where its notes sit.",
          },
        },
      ],
    },
    {
      id: "building-a-spread-voicing",
      index: 2,
      title: "Building a Spread Voicing",
      steps: [
        {
          id: "building-spread-voicing",
          concept: {
            heading: "Build a spread voicing yourself.",
            body: "Root low, fifth and third up high.",
          },
          discovery: {
            heading: "That's the same chord, just given room to breathe.",
            body: "Moving one note an octave is the entire technique.",
          },
        },
      ],
    },
    {
      id: "spreading-a-minor-chord",
      index: 3,
      title: "Spreading a Minor Chord",
      steps: [
        {
          id: "spreading-minor-chord",
          concept: {
            heading: "Try it with a minor chord too.",
            body: "Compare close A Minor to a spread version.",
          },
          discovery: {
            heading: "The technique works with any chord.",
            body: "It's about space, not chord quality — major, minor, doesn't matter.",
          },
        },
      ],
    },
    {
      id: "ending-on-a-spread-chord",
      index: 4,
      title: "Ending On a Spread Chord",
      steps: [
        {
          id: "ending-on-spread-chord",
          concept: {
            heading: "Compare two ways to finish a progression.",
            body: "A close final chord versus a spread one.",
          },
          discovery: {
            heading: "A spread ending is one of the simplest ways to feel complete.",
            body: "The same three notes, arriving with noticeably more presence.",
          },
        },
      ],
    },
    {
      id: "spreading-your-own-songs-chorus",
      index: 5,
      title: "Spreading Your Own Song's Chorus",
      steps: [
        {
          id: "spreading-own-chorus",
          concept: {
            heading: "Your own chorus from Module 7.",
            body: "Bunched, then spread.",
          },
          discovery: {
            heading: "Same song. A noticeably fuller sound.",
            body: "Just by rearranging where the notes sit — nothing about the chords themselves changed.",
          },
        },
      ],
    },
    {
      id: "spread-voicing-by-ear",
      index: 6,
      title: "Spread Voicing, By Ear",
      steps: [
        {
          id: "spread-voicing-by-ear",
          concept: {
            heading: "Listen and decide.",
            body: "Is this chord close together, or spread out?",
          },
          discovery: {
            heading: "You can hear the difference now, not just see it.",
            body: "Spacing has its own sound.",
          },
        },
      ],
    },
    {
      id: "playing-a-spread-chord-yourself",
      index: 7,
      title: "Playing a Spread Chord Yourself",
      steps: [
        {
          id: "playing-spread-chord",
          concept: {
            heading: "Build one more spread voicing yourself.",
            body: "F Major, spread this time.",
          },
          discovery: {
            heading: "One more spread voicing, built by hand.",
            body: "The same technique, a different chord — this is a real tool now, not a one-off trick.",
          },
        },
      ],
    },
    {
      id: "you-can-fill-the-room-now",
      index: 8,
      title: "You Can Fill the Room Now",
      steps: [
        {
          id: "fill-the-room-now",
          concept: {
            heading: "Play a full cadence, spread.",
            body: "F, G, back to C — every chord given room to breathe.",
          },
          discovery: {
            heading: "You can fill the room now.",
            body: "Any chord you already know can sound this way — you just have to give it the space.",
          },
        },
      ],
    },
  ],
};

export const MODULE_17_ID = "module-17";

/**
 * Module 17: Keeping Steady Time. A rhythm-focused module returning to
 * ground Module 2 first touched (its "Rhythm Creates Music" lesson) --
 * not new harmonic content, but a practical, honestly-measured skill:
 * real timestamp-based tap accuracy against a metronome, the same
 * mechanic Module 2's bespoke RhythmTapInteraction already proved out
 * safely in production. Built without a Phase handoff, per docs/46
 * Decision 019.
 *
 * Introduces `TempoTapInteraction`, generalizing RhythmTapInteraction's
 * exact mechanic (BPM, tolerance window, downbeat accent) into a
 * reusable primitive with configurable tempo and tap count -- past the
 * genuine-second-repetition threshold this codebase extracts shared
 * primitives at. `RhythmTapInteraction` itself is left untouched rather
 * than refactored onto the new primitive, consistent with how
 * `MajorOrMinorEarInteraction` was left alone when `EarTrainingInteraction`
 * was extracted in Module 11. Also reuses `EarTrainingInteraction` and
 * `ChoiceInteraction` for the two lessons that don't need real tapping.
 */
export const MODULE_17: Module = {
  id: MODULE_17_ID,
  index: 17,
  title: "Keeping Steady Time",
  subtitle: "Rhythm You Can Feel and Measure",
  lessons: [
    {
      id: "a-steadier-beat",
      index: 1,
      title: "A Steadier Beat",
      steps: [
        {
          id: "steadier-beat",
          concept: {
            heading: "Tap along with a steady, slow beat.",
            body: "Nothing to play yet — just find the pulse.",
          },
          discovery: {
            heading: "That's your internal clock, warming up.",
            body: "Every rhythm skill you've built starts from being able to feel a beat that isn't rushing or dragging.",
          },
        },
      ],
    },
    {
      id: "a-faster-beat",
      index: 2,
      title: "A Faster Beat",
      steps: [
        {
          id: "faster-beat",
          concept: {
            heading: "Now try a faster tempo.",
            body: "Same tapping, a quicker pulse.",
          },
          discovery: {
            heading: "Same skill, just quicker.",
            body: "Tempo is a dial, not a wall — the feel doesn't change, only the speed.",
          },
        },
      ],
    },
    {
      id: "counting-yourself-in",
      index: 3,
      title: "Counting Yourself In",
      steps: [
        {
          id: "counting-yourself-in",
          concept: {
            heading: "Before you play, you count yourself in.",
            body: "Tap a count-in, the way you would before starting a song.",
          },
          discovery: {
            heading: "That count-in is a real habit, not a formality.",
            body: "It's how you and anyone playing with you arrive at the first note already in time.",
          },
        },
      ],
    },
    {
      id: "steady-or-rushed",
      index: 4,
      title: "Steady or Rushed?",
      steps: [
        {
          id: "steady-or-rushed",
          concept: {
            heading: "Listen to four clicks.",
            body: "Is the tempo steady, or does it rush ahead?",
          },
          discovery: {
            heading: "You can hear unsteady time, not just feel it.",
            body: "That's the same ear you've trained since Module 11 — now pointed at rhythm instead of pitch.",
          },
        },
      ],
    },
    {
      id: "practicing-slow-on-purpose",
      index: 5,
      title: "Practicing Slow On Purpose",
      steps: [
        {
          id: "practicing-slow",
          concept: {
            heading: "The same short phrase, two speeds.",
            body: "Performance tempo, then practice tempo.",
          },
          discovery: {
            heading: "Slow practice isn't a lesser version of the real thing.",
            body: "It's how the real thing gets built — most real progress happens well under performance speed.",
          },
        },
      ],
    },
    {
      id: "your-tempo-your-choice",
      index: 6,
      title: "Your Tempo, Your Choice",
      steps: [
        {
          id: "your-tempo-your-choice",
          concept: {
            heading: "Your own progression, at two different tempos.",
            body: "A relaxed feel, then a driving one.",
          },
          discovery: {
            heading: "Neither is correct.",
            body: "Tempo is a mood, the same way dynamics are — your call every time you sit down to play.",
          },
        },
      ],
    },
    {
      id: "keeping-time-through-your-own-song",
      index: 7,
      title: "Keeping Time Through Your Own Song",
      steps: [
        {
          id: "keeping-time-own-song",
          concept: {
            heading: "Keep time the way you would through a real song.",
            body: "Longer this time — a full phrase's worth.",
          },
          discovery: {
            heading: "That's the tempo your own Module 7 song could live at.",
            body: "Not a drill anymore — a rehearsal for playing it for real.",
          },
        },
      ],
    },
    {
      id: "you-can-keep-time-now",
      index: 8,
      title: "You Can Keep Time Now",
      steps: [
        {
          id: "can-keep-time-now",
          concept: {
            heading: "One more time, all the way through.",
            body: "The longest count yet.",
          },
          discovery: {
            heading: "You can keep time now.",
            body: "Not just play notes in the right order — hold a steady pulse under all of it.",
          },
        },
      ],
    },
  ],
};

export const MODULE_18_ID = "module-18";

/**
 * Module 18: Introduction to the Blues. A fresh, highly motivating
 * angle: not a new chord type or key relationship, but a real,
 * widely-recognized musical FORM -- the 12-bar blues -- built from
 * dominant seventh versions of chords the student already knows. Built
 * without a Phase handoff, per docs/46 Decision 020.
 *
 * Needs two new chords (`c7`, `f7` -- the blues' I7 and IV7, completing
 * the I7-IV7-V7 set alongside Module 4's `g7`) and three new
 * progressions (`bluesOpening`, `bluesMiddle`, `twelveBarBlues`). The
 * capstone lesson plays the real, complete 12-bar form (with its actual
 * repeated bars) rather than a compressed stand-in, since the whole
 * point is that the student has played the authentic structure.
 * Reuses `ChoiceInteraction`, `NoteSequenceInteraction`,
 * `PlayProgressionInteraction`, `EarTrainingInteraction`, and
 * `FreePlayInteraction` exclusively -- the eleventh module (after 4, 5,
 * 7, 8, 9, 10, 12, 13, 14, and 16) needing zero new interaction
 * primitives.
 */
export const MODULE_18: Module = {
  id: MODULE_18_ID,
  index: 18,
  title: "Introduction to the Blues",
  subtitle: "The Most Recognizable Form in Music",
  lessons: [
    {
      id: "the-blues-three-chords",
      index: 1,
      title: "The Blues' Three Chords",
      steps: [
        {
          id: "blues-three-chords",
          concept: {
            heading: "The blues is built from three chords you already know.",
            body: "Dominant seventh versions of C, F, and G. Try each one.",
          },
          discovery: {
            heading: "That's the entire harmonic vocabulary of the blues.",
            body: "Three dominant 7th chords, endlessly rearranged.",
          },
        },
      ],
    },
    {
      id: "building-a-dominant-seventh",
      index: 2,
      title: "Building a Dominant Seventh",
      steps: [
        {
          id: "building-dominant-seventh",
          concept: {
            heading: "Build C7 yourself.",
            body: "A major triad, plus one more note.",
          },
          discovery: {
            heading: "That flattened seventh is the sound of the blues.",
            body: "The same 'tension wants to resolve' feeling from Module 4's G7 — just now the home chord itself.",
          },
        },
      ],
    },
    {
      id: "the-first-four-bars",
      index: 3,
      title: "The First Four Bars",
      steps: [
        {
          id: "first-four-bars",
          concept: {
            heading: "Play the first four bars of a 12-bar blues.",
            body: "C7, F7, back to C7 twice.",
          },
          discovery: {
            heading: "That quick move to F and back is called a 'quick change.'",
            body: "One of the blues' most common opening moves.",
          },
        },
      ],
    },
    {
      id: "the-turnaround",
      index: 4,
      title: "The Turnaround",
      steps: [
        {
          id: "the-turnaround",
          concept: {
            heading: "Compare two ways to end a blues chorus.",
            body: "Landing on the home chord versus landing on the turnaround.",
          },
          discovery: {
            heading: "That's a turnaround.",
            body: "Landing on G7 instead of C7 is what pulls the whole form back around to bar 1.",
          },
        },
      ],
    },
    {
      id: "hearing-the-blues-shuffle",
      index: 5,
      title: "Hearing the Blues Shuffle",
      steps: [
        {
          id: "blues-shuffle",
          concept: {
            heading: "The blues has its own rhythmic feel too.",
            body: "Listen for the shuffle.",
          },
          discovery: {
            heading: "That uneven, swung feel is as much a part of the blues as the chords are.",
            body: "Rhythm and harmony both carry the style.",
          },
        },
      ],
    },
    {
      id: "soloing-over-the-blues",
      index: 6,
      title: "Soloing Over the Blues",
      steps: [
        {
          id: "soloing-over-blues",
          concept: {
            heading: "Improvise over the blues.",
            body: "Using this five-note blues scale.",
          },
          discovery: {
            heading: "That clash between a minor scale and dominant chords is the sound of the blues.",
            body: "The safety net from Module 6, tuned specifically for this style.",
          },
        },
      ],
    },
    {
      id: "the-full-form",
      index: 7,
      title: "The Full Form",
      steps: [
        {
          id: "the-full-form",
          concept: {
            heading: "Play the middle of the form.",
            body: "The move to F, back to C, then to G.",
          },
          discovery: {
            heading: "You're now most of the way through a real 12-bar blues.",
            body: "One section left.",
          },
        },
      ],
    },
    {
      id: "you-can-play-the-blues-now",
      index: 8,
      title: "You Can Play the Blues Now",
      steps: [
        {
          id: "play-the-blues-now",
          concept: {
            heading: "Play the entire 12-bar blues, start to finish.",
            body: "Every bar, in order.",
          },
          discovery: {
            heading: "That's a real 12-bar blues.",
            body: "The most recognizable form in music, and you just played all of it.",
          },
        },
      ],
    },
  ],
};

export const MODULE_19_ID = "module-19";

/**
 * Module 19: Waltz Time: Playing in 3. A genuinely new concept -- meter
 * -- everything so far implicitly counted in groups of four; this
 * module introduces 3/4 time (a waltz feel) and the classic "oom-pah-pah"
 * bass pattern that goes with it. Built without a Phase handoff, per
 * docs/46 Decision 021.
 *
 * Adds an additive, backward-compatible `beatsPerMeasure` prop to
 * Module 17's `TempoTapInteraction` (default 4, so every Module 17
 * lesson that doesn't pass it is unaffected) rather than introducing a
 * new primitive. Needs zero new chords or progressions -- reuses
 * chords already in `chords.ts` and callbacks to the student's own
 * Module 7 and Module 14 songs. Reuses `TempoTapInteraction`,
 * `NoteSequenceInteraction`, `ChoiceInteraction`, and
 * `EarTrainingInteraction` exclusively.
 */
export const MODULE_19: Module = {
  id: MODULE_19_ID,
  index: 19,
  title: "Waltz Time: Playing in 3",
  subtitle: "When Songs Count in Three, Not Four",
  lessons: [
    {
      id: "counting-to-three",
      index: 1,
      title: "Counting to Three",
      steps: [
        {
          id: "counting-to-three",
          concept: {
            heading: "Most of what you've played counts in groups of four.",
            body: "Try counting in groups of three instead.",
          },
          discovery: {
            heading: "That's 3/4 time — a waltz feel.",
            body: "ONE-two-three, ONE-two-three.",
          },
        },
      ],
    },
    {
      id: "a-waltz-bass-pattern",
      index: 2,
      title: "A Waltz Bass Pattern",
      steps: [
        {
          id: "waltz-bass-pattern",
          concept: {
            heading: "Build the classic 'oom-pah-pah' waltz bass pattern.",
            body: "Bass, then two chord hits, twice.",
          },
          discovery: {
            heading: "That pattern practically invented the waltz.",
            body: "Bass on beat one, chord on beats two and three — simple, and everywhere once you notice it.",
          },
        },
      ],
    },
    {
      id: "your-own-song-in-waltz-time",
      index: 3,
      title: "Your Own Song, In Waltz Time",
      steps: [
        {
          id: "own-song-waltz-time",
          concept: {
            heading: "Your own chorus from Module 7.",
            body: "In two different meters.",
          },
          discovery: {
            heading: "Same chords. A completely different feel.",
            body: "The meter shapes a song as much as the chords do.",
          },
        },
      ],
    },
    {
      id: "a-full-waltz-measure",
      index: 4,
      title: "A Full Waltz Measure",
      steps: [
        {
          id: "full-waltz-measure",
          concept: {
            heading: "Two full measures of three.",
            body: "Tap along.",
          },
          discovery: {
            heading: "You're locking into 3/4 now, not just tolerating it.",
            body: "The count is starting to feel like home.",
          },
        },
      ],
    },
    {
      id: "3-4-or-4-4",
      index: 5,
      title: "3/4 or 4/4?",
      steps: [
        {
          id: "three-or-four",
          concept: {
            heading: "Listen to the accents.",
            body: "Is this counted in three, or in four?",
          },
          discovery: {
            heading: "That's meter.",
            body: "Recognizing whether the strong beat comes every three counts or every four.",
          },
        },
      ],
    },
    {
      id: "waltzing-through-a-minor-key",
      index: 6,
      title: "Waltzing Through a Minor Key",
      steps: [
        {
          id: "waltzing-minor-key",
          concept: {
            heading: "Your minor progression from Module 14.",
            body: "Straight, then waltzed.",
          },
          discovery: {
            heading: "Meter doesn't care whether you're in major or minor.",
            body: "It's an independent layer, on top of whatever key or mood you've already chosen.",
          },
        },
      ],
    },
    {
      id: "building-a-longer-waltz-pattern",
      index: 7,
      title: "Building a Longer Waltz Pattern",
      steps: [
        {
          id: "longer-waltz-pattern",
          concept: {
            heading: "Same pattern, a different chord.",
            body: "Build it on G Major this time.",
          },
          discovery: {
            heading: "The waltz bass generalizes to any key.",
            body: "It's a shape, not a one-time trick tied to a single chord.",
          },
        },
      ],
    },
    {
      id: "you-can-play-in-three-now",
      index: 8,
      title: "You Can Play in Three Now",
      steps: [
        {
          id: "play-in-three-now",
          concept: {
            heading: "Three full measures, all the way through.",
            body: "The longest count yet, in three.",
          },
          discovery: {
            heading: "You can play in three now.",
            body: "Not every song counts in four — and you're no longer thrown by the ones that don't.",
          },
        },
      ],
    },
  ],
};

export const MODULE_20_ID = "module-20";

/**
 * Module 20: The Complete Chart Reader. A 20th-module milestone that
 * doesn't introduce anything new -- it extends Module 15's chart-
 * reading skill across everything learned since (Modules 16-19, plus a
 * few earlier progressions that had never actually been read from a
 * chart before): the blues, spread voicings, the ii-V-I, a borrowed-
 * chord turn, the Mixolydian vamp, the student's own minor song, and a
 * final chart that mixes several of these together. Built without a
 * Phase handoff, per docs/46 Decision 022.
 *
 * Needs zero new chords or progressions -- every chart is a hardcoded
 * chord-id array using chords already in `chords.ts`. Reuses
 * `ChordChartInteraction` exclusively, across all 8 lessons -- the
 * twelfth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, and 18)
 * needing zero new interaction primitives.
 */
export const MODULE_20: Module = {
  id: MODULE_20_ID,
  index: 20,
  title: "The Complete Chart Reader",
  subtitle: "Every New Sound, On the Page",
  lessons: [
    {
      id: "reading-the-blues",
      index: 1,
      title: "Reading the Blues",
      steps: [
        {
          id: "reading-the-blues",
          concept: {
            heading: "Read the entire 12-bar blues from its chart.",
            body: "No PlayProgressionInteraction hints this time — just the chord names.",
          },
          discovery: {
            heading: "You just sight-read a real 12-bar blues.",
            body: "The form from Module 18, recalled entirely from its written chords.",
          },
        },
      ],
    },
    {
      id: "reading-spread-voicings",
      index: 2,
      title: "Reading Spread Voicings",
      steps: [
        {
          id: "reading-spread-voicings",
          concept: {
            heading: "Read a chart marked for spread voicings.",
            body: "The chart tells you the voicing, not just the chord.",
          },
          discovery: {
            heading: "A chart can carry more than just chord names.",
            body: "It told you exactly how to voice each chord from Module 16, and you recalled the shape.",
          },
        },
      ],
    },
    {
      id: "reading-the-ii-v-i",
      index: 3,
      title: "Reading the ii-V-I",
      steps: [
        {
          id: "reading-two-five-one",
          concept: {
            heading: "Read harmony's most common move.",
            body: "Dm, G7, C — straight from the chart.",
          },
          discovery: {
            heading: "That's the ii-V-I from Module 4, read instead of remembered from a lesson.",
            body: "The most common chord move in music, and you can read it cold.",
          },
        },
      ],
    },
    {
      id: "reading-a-borrowed-turn",
      index: 4,
      title: "Reading a Borrowed Turn",
      steps: [
        {
          id: "reading-borrowed-turn",
          concept: {
            heading: "Read a chart with a borrowed chord in it.",
            body: "C, Fm, G, C.",
          },
          discovery: {
            heading: "The chart didn't flag anything as unusual.",
            body: "It just wrote the chord — Module 8's borrowing technique reads exactly like any other chord change.",
          },
        },
      ],
    },
    {
      id: "reading-the-mixolydian-vamp",
      index: 5,
      title: "Reading the Mixolydian Vamp",
      steps: [
        {
          id: "reading-mixolydian-vamp",
          concept: {
            heading: "Read the vamp that defines a whole mode.",
            body: "C, B♭, C, B♭.",
          },
          discovery: {
            heading: "Module 9's Mixolydian sound, recalled from two chord names.",
            body: "The mode lives in the chords — the chart just has to name them.",
          },
        },
      ],
    },
    {
      id: "reading-your-second-song",
      index: 6,
      title: "Reading Your Second Song",
      steps: [
        {
          id: "reading-second-song",
          concept: {
            heading: "Read your minor-key song from Module 14.",
            body: "Verse into chorus, entirely from the page.",
          },
          discovery: {
            heading: "You wrote this song. Now you can read it back.",
            body: "The same piece, in two different forms — memory and notation — and either one gets you there.",
          },
        },
      ],
    },
    {
      id: "reading-a-minor-cadence",
      index: 7,
      title: "Reading a Minor Cadence",
      steps: [
        {
          id: "reading-minor-cadence",
          concept: {
            heading: "Read the classic minor-key resolution.",
            body: "Am, Dm, E, Am.",
          },
          discovery: {
            heading: "That's Module 13's cadence, read cold.",
            body: "The raised leading tone reads just like any other chord — the chart doesn't need to explain the theory for you to play it.",
          },
        },
      ],
    },
    {
      id: "you-can-read-anything-still",
      index: 8,
      title: "You Can Read Anything, Still",
      steps: [
        {
          id: "read-anything-still",
          concept: {
            heading: "One chart, several ideas mixed together.",
            body: "A dominant seventh, a borrowed chord, and a spread voicing, back to back.",
          },
          discovery: {
            heading: "You can read anything, still.",
            body: "Twenty modules of vocabulary, and a chart is still just names in order — you know how to turn every one of them into music.",
          },
        },
      ],
    },
  ],
};

export const MODULE_21_ID = "module-21";

/**
 * Module 21: The Circle of Fifths. A genuinely understanding-focused
 * module, squarely in CLAUDE.md's "teach understanding before
 * memorization" mandate -- it gives the student the unifying
 * conceptual map behind things they've already experienced piecemeal:
 * why transposing to G (Module 12) felt natural, why the ii-V-I
 * (Module 4) resolves so satisfyingly (it's a walk back toward home
 * along the circle), and why borrowed chords (Module 8) work (a short
 * trip to a neighboring spot). Built without a Phase handoff, per
 * docs/46 Decision 023.
 *
 * Needs zero new chords or progressions -- every lesson reuses chords
 * already in `chords.ts` (including a comparison, Lesson 5, that pairs
 * two chords -- G Major and F Minor -- never directly compared against
 * each other before) plus the existing `twoFiveOne` and `classicPop`
 * progressions. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`,
 * `PlayProgressionInteraction`, and `ChordChartInteraction` exclusively
 * -- the thirteenth module (after 4, 5, 7, 8, 9, 10, 12, 13, 14, 16,
 * 18, and 20) needing zero new interaction primitives.
 */
export const MODULE_21: Module = {
  id: MODULE_21_ID,
  index: 21,
  title: "The Circle of Fifths",
  subtitle: "The Map Behind Everything You've Played",
  lessons: [
    {
      id: "one-step-away",
      index: 1,
      title: "One Step Away",
      steps: [
        {
          id: "one-step-away",
          concept: {
            heading: "G major is one step from C on the circle of fifths.",
            body: "You already transposed your song there, in Module 12.",
          },
          discovery: {
            heading: "That's why it felt so natural.",
            body: "Neighboring keys on the circle share almost every note.",
          },
        },
      ],
    },
    {
      id: "building-the-first-few-steps",
      index: 2,
      title: "Building the First Few Steps",
      steps: [
        {
          id: "first-few-steps",
          concept: {
            heading: "The circle of fifths is built by counting up a fifth, again and again.",
            body: "Play the first three roots.",
          },
          discovery: {
            heading: "C, G, D — each one a fifth above the last.",
            body: "That's the whole circle, one step at a time.",
          },
        },
      ],
    },
    {
      id: "two-steps-away",
      index: 3,
      title: "Two Steps Away",
      steps: [
        {
          id: "two-steps-away",
          concept: {
            heading: "Compare a one-step neighbor to a two-step neighbor.",
            body: "C to G, then C to D.",
          },
          discovery: {
            heading: "The farther around the circle, the fewer notes two keys share.",
            body: "And the more different they sound.",
          },
        },
      ],
    },
    {
      id: "getting-further-away",
      index: 4,
      title: "Getting Further Away",
      steps: [
        {
          id: "getting-further-away",
          concept: {
            heading: "Now compare C's close neighbor to one much further around the circle.",
            body: "C to G, then C to A.",
          },
          discovery: {
            heading: "That's a much bigger trip.",
            body: "Almost nothing in common — which is exactly why it sounds so different.",
          },
        },
      ],
    },
    {
      id: "your-borrowed-chords-on-the-circle",
      index: 5,
      title: "Your Borrowed Chords, On the Circle",
      steps: [
        {
          id: "borrowed-on-circle",
          concept: {
            heading: "Remember Module 8's borrowed chords?",
            body: "Compare a step on the major side of the circle to a step on the borrowed minor side.",
          },
          discovery: {
            heading: "Every borrowed chord you've used has been a short trip.",
            body: "To a nearby spot on the circle, not a random detour.",
          },
        },
      ],
    },
    {
      id: "finding-your-way-home",
      index: 6,
      title: "Finding Your Way Home",
      steps: [
        {
          id: "finding-your-way-home",
          concept: {
            heading: "Play the ii-V-I again.",
            body: "This time, notice it's a walk back toward home on the circle.",
          },
          discovery: {
            heading: "D to G to C is two steps back toward home, one at a time.",
            body: "That's why it resolves so satisfyingly — you're literally walking home.",
          },
        },
      ],
    },
    {
      id: "charting-the-circle",
      index: 7,
      title: "Charting the Circle",
      steps: [
        {
          id: "charting-the-circle",
          concept: {
            heading: "Read a chart that walks three steps around the circle.",
            body: "C, G, D.",
          },
          discovery: {
            heading: "Reading the circle is no different from reading any other chart.",
            body: "It's just names, in an order that now means something to you.",
          },
        },
      ],
    },
    {
      id: "you-can-see-the-map-now",
      index: 8,
      title: "You Can See the Map Now",
      steps: [
        {
          id: "see-the-map-now",
          concept: {
            heading: "Play the very first progression you ever learned, one more time.",
            body: "C, G, Am, F.",
          },
          discovery: {
            heading: "Home, one step forward, the relative minor, one step back.",
            body: "You couldn't see the map before. Now you can.",
          },
        },
      ],
    },
  ],
};

export const MODULE_22_ID = "module-22";

/**
 * Module 22: The Circle's Minor Side. The natural part 2 of Module 21 --
 * every major key on the circle has a relative minor twin sitting at
 * the same position (an inner ring), and this module completes the
 * map by showing three such pairings: C/Am (Module 13), G/Em (Module
 * 12's key), and a new one, D/Bm. Built without a Phase handoff, per
 * docs/46 Decision 024.
 *
 * Needs exactly one new chord (`bMinor` -- D major's relative minor,
 * completing a third circle pairing) and zero new progressions,
 * reusing Module 13's `myMinorHomeProgression` and `myMinorCadence`
 * directly. Reuses `ChoiceInteraction`, `NoteSequenceInteraction`,
 * `PlayProgressionInteraction`, `EarTrainingInteraction`, and
 * `ChordChartInteraction` exclusively -- the fourteenth module (after
 * 4, 5, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, and 21) needing zero new
 * interaction primitives.
 */
export const MODULE_22: Module = {
  id: MODULE_22_ID,
  index: 22,
  title: "The Circle's Minor Side",
  subtitle: "Every Major Key Has a Minor Twin",
  lessons: [
    {
      id: "every-major-key-has-a-minor-twin",
      index: 1,
      title: "Every Major Key Has a Minor Twin",
      steps: [
        {
          id: "major-minor-twins",
          concept: {
            heading: "C Major and A Minor share every single note in their scales.",
            body: "That's not a coincidence.",
          },
          discovery: {
            heading: "They're relative keys.",
            body: "The same spot on the circle — major on the outside, minor on the inside.",
          },
        },
      ],
    },
    {
      id: "g-majors-minor-twin",
      index: 2,
      title: "G Major's Minor Twin",
      steps: [
        {
          id: "g-major-minor-twin",
          concept: {
            heading: "G major's inner-ring twin is E minor.",
            body: "Compare them.",
          },
          discovery: {
            heading: "Same relationship, one step around the circle.",
            body: "Every major key has this same minor shadow.",
          },
        },
      ],
    },
    {
      id: "d-majors-minor-twin",
      index: 3,
      title: "D Major's Minor Twin",
      steps: [
        {
          id: "d-major-minor-twin",
          concept: {
            heading: "One more pair.",
            body: "D major's inner-ring twin is B minor.",
          },
          discovery: {
            heading: "You're not memorizing new pairs one at a time anymore.",
            body: "You're recognizing a pattern that holds for every key on the circle.",
          },
        },
      ],
    },
    {
      id: "building-b-minor",
      index: 4,
      title: "Building B Minor",
      steps: [
        {
          id: "building-b-minor",
          concept: {
            heading: "Build B Minor yourself.",
            body: "Root to fifth.",
          },
          discovery: {
            heading: "Same minor-triad formula as always.",
            body: "Just starting on B this time.",
          },
        },
      ],
    },
    {
      id: "walking-the-inner-ring",
      index: 5,
      title: "Walking the Inner Ring",
      steps: [
        {
          id: "walking-inner-ring",
          concept: {
            heading: "Play your Module 13 progression again.",
            body: "This time, hear it as walking the inner ring around A minor's spot.",
          },
          discovery: {
            heading: "That's the minor ring in motion.",
            body: "The same chords, understood now as a place on the map, not just a sound.",
          },
        },
      ],
    },
    {
      id: "major-home-or-minor-home",
      index: 6,
      title: "Major Home or Minor Home?",
      steps: [
        {
          id: "major-home-or-minor-home",
          concept: {
            heading: "Same F and G leading in.",
            body: "Listen to where it lands — major home, or minor home?",
          },
          discovery: {
            heading: "You can hear which twin a progression is heading toward.",
            body: "Before it even arrives.",
          },
        },
      ],
    },
    {
      id: "reading-the-inner-ring",
      index: 7,
      title: "Reading the Inner Ring",
      steps: [
        {
          id: "reading-inner-ring",
          concept: {
            heading: "Read a chart with two major/minor twin pairs in it.",
            body: "G, Em, D, Bm.",
          },
          discovery: {
            heading: "Reading the inner ring is exactly like reading the outer one.",
            body: "The chart never has to explain which ring a chord belongs to.",
          },
        },
      ],
    },
    {
      id: "you-know-the-whole-circle-now",
      index: 8,
      title: "You Know the Whole Circle Now",
      steps: [
        {
          id: "know-whole-circle-now",
          concept: {
            heading: "Play the classic minor-key cadence one more time.",
            body: "Am, Dm, E, back to Am.",
          },
          discovery: {
            heading: "You know the whole circle now.",
            body: "Both rings, major and minor, and how they sit together — not as separate facts, but as one map.",
          },
        },
      ],
    },
  ],
};

export const MODULES: Module[] = [MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5, MODULE_6, MODULE_7, MODULE_8, MODULE_9, MODULE_10, MODULE_11, MODULE_12, MODULE_13, MODULE_14, MODULE_15, MODULE_16, MODULE_17, MODULE_18, MODULE_19, MODULE_20, MODULE_21, MODULE_22];

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
