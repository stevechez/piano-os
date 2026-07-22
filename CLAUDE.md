# CLAUDE.md

## PianoOS Development Guide

This document provides product context and engineering guidance for AI-assisted development.

Read this document before making implementation decisions.

---

# Product Mission

PianoOS helps adults become musicians by teaching piano through chords, musical patterns, harmony, practical theory, and real songs.

The application is not a traditional sheet music education platform.

Our primary goal is helping users understand music.

---

# Product Philosophy

Always optimize for:

- Musical understanding
- Confidence
- Creativity
- Simplicity
- Adult learners

Never optimize solely for:

- Lesson completion
- Gamification
- Memorization
- Child-oriented experiences

---

# Guiding Principles

## Music First

Every feature should help users make music.

Theory exists to explain music.

---

## Songs Are The Curriculum

Songs are not rewards.

Songs are how users learn.

---

## Understanding Before Memorization

Teach:

Why.

Not simply:

What.

---

## AI Is A Coach

The AI should:

- Encourage
- Explain
- Personalize
- Guide

The AI should not become a generic chatbot.

---

## Adults Are The Customer

Design for adults.

The experience should feel:

- Calm
- Professional
- Beautiful
- Intelligent

Avoid:

- Cartoon graphics
- Childish copy
- Excessive gamification

---

# Documentation Authority

When making product decisions, consult documentation in this order:

1. docs/01-product-vision.md
2. docs/02-customer-persona.md
3. docs/03-learning-philosophy.md
4. docs/04-curriculum-architecture.md
5. docs/05-user-experience.md
6. docs/06-ai-piano-coach.md
7. docs/07-song-learning-engine.md
8. docs/08-technical-architecture.md
9. docs/09-business-model.md
10. docs/10-launch-strategy.md

If implementation conflicts with documentation, the documentation wins.

---

# Technology Stack

Framework

- Next.js App Router

Language

- TypeScript

Package Manager

- pnpm

Styling

- Tailwind CSS

Components

- shadcn/ui

Icons

- lucide-react

Database

- Supabase

Deployment

- Vercel

---

# Architecture Principles

Keep the architecture:

- Simple
- Modular
- Maintainable
- Well documented

Avoid premature optimization.

Do not introduce unnecessary abstraction.

Prefer readability over cleverness.

---

# Code Standards

Always:

- Use TypeScript strict mode.
- Favor server components where appropriate.
- Keep components small and composable.
- Prefer composition over inheritance.
- Use descriptive naming.
- Keep business logic outside UI components.
- Document complex decisions.

---

# UI Philosophy

The interface should feel like:

- A premium instrument
- A private piano teacher
- Apple-quality software
- Calm and focused

Avoid visual clutter.

Whitespace is a feature.

---

# Future Capabilities

The architecture should support:

- AI coaching
- MIDI keyboard input
- Personalized practice
- Song adaptation
- Progress tracking
- Audio analysis
- Mobile applications

Do not build these until required.

---

# Decision Making

When multiple solutions exist, prefer the one that:

1. Improves musical understanding.
2. Reduces cognitive load.
3. Helps adults succeed faster.
4. Keeps the codebase maintainable.

---

# Repository Goals

Every commit should move PianoOS closer to becoming:

> The operating system for adult piano learning.

Every feature should answer:

"Does this help someone become a better musician?"

If the answer is no, reconsider the feature.

---

# MVP Focus

Current priorities:

- Product foundation
- Curriculum architecture
- Learning experience
- Core application structure

Current non-goals:

- Large song catalog
- Marketplace
- Social features
- Mobile applications
- Advanced MIDI analysis

Stay focused on validating the learning philosophy before expanding scope.

---

CLAUDE.md

+

docs/INDEX.md

+

docs/00-38

---

End of Document
