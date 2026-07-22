# PianoOS — MVP Build Plan

**Document:** 30-mvp-build-plan.md  
**Version:** 1.0  
**Status:** Implementation Roadmap  
**Created:** July 2026

---

# Purpose

This document defines the engineering implementation plan for the PianoOS MVP.

The objective is to move from:

Product vision

to

A working learning experience.

---

# MVP Mission

Build the first version of PianoOS that proves:

"Adults can learn piano more effectively through chords, patterns, songs, and understanding."

---

# MVP Success Criteria

The MVP succeeds if a user can:

1. Create an account.
2. Complete musical onboarding.
3. Receive a personalized learning path.
4. Complete lessons.
5. Learn practical piano concepts.
6. Apply concepts to songs.
7. Track practice.
8. Receive AI guidance.

---

# Build Philosophy

## Build Learning Loops, Not Features

Every feature should answer:

Does this help someone become a better musician?

---

# MVP Architecture

```
Next.js Application

        ↓

Authentication

        ↓

Student Profile

        ↓

Curriculum Engine

        ↓

Lessons

        ↓

Song Learning

        ↓

Practice System

        ↓

AI Coach
```

---

# Phase 1 — Foundation

## Goal

Create the technical foundation.

---

## Build

### Project Setup

- Next.js application
- TypeScript
- Tailwind
- Component system
- Environment configuration

---

### Database Setup

Create:

- Supabase project
- Database schema
- Authentication
- Row-level security

---

### Design System

Create:

- Colors
- Typography
- Layout
- Components

---

## Deliverable

A functioning application shell.

---

# Phase 2 — Authentication and Student Profile

## Goal

Understand who the learner is.

---

## Build

Authentication:

- Sign up
- Login
- Account management

---

Student onboarding:

Questions:

- Experience level
- Goals
- Favorite music
- Practice availability
- Previous experience

---

## Deliverable

A personalized student profile.

---

# Phase 3 — Curriculum Engine

## Goal

Create structured learning.

---

## Build

Content models:

- Learning paths
- Courses
- Modules
- Lessons

---

Student experience:

- View learning path
- Start lesson
- Complete lesson

---

## Deliverable

Students can follow a guided journey.

---

# Phase 4 — First Learning Content

## Goal

Prove the teaching methodology.

---

Initial curriculum:

## Module 1

Understanding The Keyboard

Lessons:

- Keyboard layout
- Musical patterns
- Finding notes

---

## Module 2

Understanding Chords

Lessons:

- What chords are
- Major chords
- Minor chords
- Chord progressions

---

## Module 3

Playing Songs

Lessons:

- Song structure
- Simplified arrangements
- Playing with confidence

---

## Deliverable

First 20–30 lessons.

---

# Phase 5 — Song Learning System

## Goal

Connect concepts to real music.

---

Build:

Song library.

Each song includes:

- Difficulty
- Chords
- Concepts
- Practice steps

---

Initial library:

25–50 songs.

---

Song examples:

- Popular ballads
- Modern favorites
- Easy emotional pieces
- Beginner-friendly arrangements

---

## Deliverable

Students can learn recognizable songs.

---

# Phase 6 — Practice System

## Goal

Create consistent improvement.

---

Build:

Practice tracking.

Track:

- Sessions
- Duration
- Activities
- Goals

---

Daily practice:

Example:

```
Today's Practice

5 minutes:
Chord review

10 minutes:
Song application

5 minutes:
Improvisation
```

---

## Deliverable

Students have a reason to return daily.

---

# Phase 7 — Progress System

## Goal

Make improvement visible.

---

Build:

Progress dashboard.

Show:

- Lessons completed
- Songs learned
- Skills developed
- Practice history

---

## Deliverable

Students understand their growth.

---

# Phase 8 — AI Coach

## Goal

Add personalization.

---

MVP AI capabilities:

---

## Explanation

Student asks:

"Why does this chord sound good?"

AI explains.

---

## Practice Guidance

AI recommends:

"What should I practice today?"

---

## Lesson Assistance

AI helps explain concepts.

---

## Deliverable

An intelligent learning companion.

---

# Phase 9 — Beta Preparation

## Goal

Prepare for real users.

---

Build:

- Error handling
- Analytics
- Feedback collection
- Performance improvements

---

Create:

Beta onboarding flow.

---

# MVP Feature List

## Required

✓ Authentication

✓ Student profiles

✓ Learning paths

✓ Lessons

✓ Songs

✓ Practice tracking

✓ Progress dashboard

✓ AI coach

---

# Not MVP

## Hardware

Future:

- MIDI
- Audio analysis

---

## Community

Future:

- Groups
- Challenges

---

## Advanced AI

Future:

- Performance analysis
- Adaptive curriculum

---

# Recommended Development Order

```
1. Foundation

2. Auth

3. Profiles

4. Curriculum

5. Lessons

6. Songs

7. Practice

8. Progress

9. AI

10. Beta
```

---

# Content Development Parallel Track

Engineering and content should happen together.

While developers build:

The content team creates:

- Lessons
- Songs
- Exercises
- Practice plans

---

# Beta User Strategy

Target:

50–100 adult learners.

Ideal users:

- Bought a keyboard
- Tried learning before
- Feel stuck
- Love music

---

# Beta Questions

Ask:

"Did this approach feel different?"

"Did you understand music better?"

"Could you play something new?"

"Would you pay for this?"

---

# Success Metrics

---

# Activation

User completes:

- Onboarding
- First lesson
- First song activity

---

# Engagement

Measure:

- Weekly practice
- Lessons completed
- Song activity

---

# Learning

Measure:

- Confidence
- Understanding
- Ability milestones

---

# Business

Measure:

- Trial conversion
- Paid interest
- Retention

---

# MVP Risks

---

# Risk 1

Building Too Much

Solution:

Stay focused on learning loop.

---

# Risk 2

Content Takes Too Long

Solution:

Start with high-quality foundational content.

---

# Risk 3

AI Becomes A Distraction

Solution:

AI supports teaching.

It does not replace teaching.

---

# Final MVP Vision

The first version of PianoOS should feel like:

"A great piano teacher who finally understands how adults want to learn."

Not:

"A giant piano course library."

---

# Decision Log

## Decision 001

**Decision:** MVP focuses on practical musicianship, not technology features.

**Reason:** The teaching method is the competitive advantage.

**Date:** July 2026

---

## Decision 002

**Decision:** Content quality is prioritized over content quantity.

**Reason:** A smaller transformative curriculum beats a large generic library.

**Date:** July 2026

---

## Decision 003

**Decision:** AI is introduced after the core learning experience exists.

**Reason:** AI should amplify proven teaching methodology.

**Date:** July 2026
