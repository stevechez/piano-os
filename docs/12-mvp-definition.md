# PianoOS — MVP Definition

**Document:** 12-mvp-definition.md  
**Version:** 1.0  
**Status:** Foundation  
**Created:** July 2026

---

# Purpose

This document defines the Minimum Viable Product (MVP) for PianoOS.

The objective of the MVP is not to build the complete vision.

The objective is to validate that adults prefer learning piano through chords, musical patterns, songs, and practical musicianship rather than a notation-first approach.

Every feature included in the MVP must support this objective.

Anything that does not directly contribute to validating the learning philosophy should be deferred.

---

# MVP Success Statement

PianoOS v1 succeeds if a new student can:

- Create an account
- Complete onboarding
- Learn foundational musical concepts
- Play recognizable songs
- Understand basic chord theory
- Feel confident enough to continue learning

The MVP is successful when users say:

> "For the first time, I actually understand what I'm playing."

---

# Product Goals

The MVP should answer five questions:

1. Does this teaching philosophy resonate with adult learners?
2. Can beginners learn songs through chords instead of notation?
3. Does personalized guidance improve retention?
4. Will students practice consistently?
5. Will users pay for this experience?

---

# Target Audience

Primary audience:

Adults between approximately 35–65 who:

- Purchased a digital piano or keyboard
- Tried learning before
- Feel overwhelmed by traditional methods
- Want practical musicianship

The MVP is **not** designed for:

- Young children
- Conservatory students
- Classical performance preparation
- Formal examination systems

---

# Core User Journey

## Step 1

Landing Page

↓

## Step 2

Create Account

↓

## Step 3

Onboarding Assessment

↓

## Step 4

Personal Learning Path

↓

## Step 5

First Lesson

↓

## Step 6

First Song

↓

## Step 7

Daily Practice

↓

## Step 8

Continue Learning

---

# Required Features

## Authentication

- Sign Up
- Sign In
- Password Reset
- User Profile

---

## Onboarding

Collect:

- Piano experience
- Musical goals
- Favorite genres
- Favorite artists
- Available practice time

Generate a personalized starting point.

---

## Dashboard

Display:

- Continue Learning
- Today's Practice
- Current Course
- Recent Progress
- Recommended Next Lesson

---

## Curriculum

Include a structured curriculum with approximately 20–30 lessons.

Initial modules:

1. Piano Foundations
2. Chord Language
3. Playing Songs
4. Musical Patterns

---

## Lessons

Every lesson includes:

- Explanation
- Visual examples
- Keyboard diagrams
- Guided practice
- Summary
- Suggested next lesson

---

## Songs

Initial library should contain approximately 20–30 carefully selected songs.

Songs should demonstrate:

- Common chord progressions
- Emotional movement
- Practical accompaniment
- Musical patterns

Every song should include:

- Difficulty
- Chords
- Key
- Learning objectives

---

## Progress Tracking

Track:

- Lessons completed
- Songs completed
- Practice sessions
- Streaks
- Learning milestones

---

## Practice Mode

Students should receive:

- Daily recommendations
- Practice reminders
- Suggested review lessons

---

# AI Features

The MVP should include limited AI.

AI should:

- Explain concepts
- Recommend lessons
- Answer curriculum-related questions
- Generate practice plans

AI should **not** attempt to replace the curriculum.

---

# Required Screens

Landing Page

Authentication

Dashboard

Lesson Player

Song Player

Practice Dashboard

Progress Dashboard

User Profile

Settings

Help

---

# Suggested Database Tables

users

profiles

courses

modules

lessons

songs

lesson_progress

song_progress

practice_sessions

practice_plans

ai_conversations

user_preferences

---

# MVP Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend

- Supabase

Authentication

- Supabase Auth

Database

- PostgreSQL

Deployment

- Vercel

---

# Explicitly Out of Scope

The following are intentionally excluded from v1:

- MIDI input
- Audio recognition
- Mobile applications
- Teacher marketplace
- Community features
- Live lessons
- Video calls
- Song marketplace
- Social sharing
- Achievements and badges
- Complex gamification
- Leaderboards
- AI composition
- AI song generation
- Multi-user collaboration

These ideas may become future roadmap items.

---

# Design Principles

The MVP should feel:

- Calm
- Premium
- Modern
- Musical
- Focused

Avoid unnecessary visual complexity.

Every screen should have a single primary objective.

---

# Educational Principles

Every lesson should answer:

- What is this?
- Why does it matter?
- How do I use it?
- Where will I see it again?

Understanding always comes before memorization.

---

# MVP Success Metrics

Primary metrics:

- Onboarding completion rate
- First lesson completion
- First song completion
- Seven-day retention
- Thirty-day retention
- Weekly practice frequency
- Subscription conversion

Secondary metrics:

- AI Coach usage
- Average practice duration
- Course completion
- Student satisfaction

---

# MVP Exit Criteria

The MVP is complete when:

✓ A new user can complete onboarding.

✓ A user can complete the first curriculum.

✓ A user can learn multiple songs.

✓ Progress is saved.

✓ AI provides personalized guidance.

✓ The application is stable and production-ready.

---

# Definition of Success

The MVP is successful if students consistently report:

"I finally understand how music works."

rather than

"I finished another lesson."

---

# Final Constraint

When considering a new feature, ask:

**Does this help validate PianoOS's core learning philosophy?**

If the answer is "No,"

it belongs in a future release.

---

> **North Star**

> Build the smallest product capable of creating confident musicians.
