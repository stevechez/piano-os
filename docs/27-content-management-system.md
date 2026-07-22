# PianoOS — Content Management System Strategy

**Document:** 27-content-management-system.md  
**Version:** 1.0  
**Status:** Foundation  
**Created:** July 2026

---

# Purpose

This document defines the content management strategy for PianoOS.

The goal is to create a scalable system for managing:

- Lessons
- Songs
- Exercises
- Learning paths
- Practice activities
- AI learning context

---

# Core Principle

## Content Is The Product

The application delivers the experience.

The content creates the transformation.

Therefore, content must be:

- Structured
- Searchable
- Versioned
- Reusable
- Adaptable

---

# Content Architecture Philosophy

PianoOS should separate:

```
Content

from

Presentation
```

The same lesson content should be able to appear in:

- Web application
- Mobile application
- AI Coach
- Future devices

---

# Content Hierarchy

The learning system follows:

```
Learning Path

      ↓

Course

      ↓

Module

      ↓

Lesson

      ↓

Exercise

      ↓

Practice Activity

      ↓

Song Application
```

---

# Content Types

---

# 1. Learning Paths

Purpose:

Define student journeys.

Examples:

- Beginner Piano Path
- Chord Player Path
- Singer-Songwriter Path
- Emotional Piano Path
- Returning Player Path

---

Data:

```
Learning Path

name

description

target_user

difficulty

modules
```

---

# 2. Courses

Purpose:

Organize major learning areas.

Examples:

- Piano Foundations
- Chord Mastery
- Playing Songs
- Improvisation

---

# 3. Modules

Purpose:

Group related concepts.

Example:

Course:

Chord Mastery

Module:

Major Chords

Lessons:

- What is a chord?
- Building major chords
- Playing chord progressions

---

# 4. Lessons

Purpose:

Teach one meaningful concept.

A lesson contains:

- Objective
- Explanation
- Demonstration
- Practice
- Song connection

---

# Lesson Structure

```
Lesson

Title

Goal

Concept

Explanation

Examples

Exercises

Songs

Practice Assignment
```

---

# 5. Exercises

Purpose:

Build specific skills.

Examples:

- Chord changes
- Rhythm patterns
- Scale exercises
- Ear training

---

# 6. Songs

Purpose:

Apply learning.

Songs contain:

- Metadata
- Difficulty
- Concepts
- Arrangements
- Practice steps

---

# Song Schema

Example:

```
Song

title

artist

genre

difficulty

key

chords

concepts

arrangements

practice_steps
```

---

# 7. Practice Activities

Purpose:

Create daily practice.

Examples:

- Review C major chords
- Practice inversion changes
- Apply pattern to song

---

# Content Metadata

Every content item should include:

---

# Difficulty

Levels:

- Beginner
- Developing
- Intermediate
- Advanced

---

# Skills

Examples:

- Chords
- Rhythm
- Harmony
- Improvisation

---

# Musical Goals

Examples:

- Play songs
- Accompany singing
- Create arrangements

---

# Prerequisites

Defines:

"What should the student know first?"

---

# Content Relationships

The system should understand relationships.

Example:

```
C Major Chords

appears in:

↓

Let It Be

↓

Someone Like You

↓

A Thousand Years
```

---

# AI Content Layer

The AI should have access to structured content.

AI should understand:

- Available lessons
- Student requirements
- Song relationships
- Learning progression

---

# Example AI Query

Student:

"I want to play emotional piano."

AI searches:

Skills:

- Ballad patterns
- Major 7 chords
- Broken chords

Songs:

- Similar arrangements

Lessons:

- Appropriate pathway

---

# Content Storage Options

---

# Option 1 — Database Content

Store lessons in PostgreSQL.

Advantages:

- Easy querying
- Personalization
- Relationships

---

# Option 2 — Markdown Content

Store lessons as files.

Advantages:

- Easy editing
- Version control
- Developer friendly

---

# Option 3 — Hybrid Approach

Recommended.

Use:

Markdown/Git for curriculum source

+

Database for user progress

---

# Recommended MVP Architecture

```
docs/content/

├── lessons/

├── songs/

├── exercises/

└── pathways/
```

Content files become source of truth.

Database stores:

- Progress
- Completion
- Personalization

---

# Content Versioning

Content changes over time.

The system should track:

- Version
- Updates
- Improvements

Example:

Lesson:

Major Chords

Version:

1.2

Changes:

Improved explanation.

---

# Content Quality Workflow

Every piece of content goes through:

```
Create

↓

Review

↓

Test With Students

↓

Analyze Results

↓

Improve
```

---

# Future CMS

Long term:

A dedicated content management system.

Capabilities:

- Lesson editor
- Song editor
- AI content assistant
- Student analytics
- Publishing workflow

---

# AI-Assisted Content Creation

Future AI support:

Generate:

- Practice exercises
- Explanations
- Variations
- Difficulty adaptations

Human review remains required.

---

# MVP Content Requirements

Initial content:

---

# Curriculum

20–30 foundational lessons

---

# Songs

25–50 carefully selected songs

---

# Practice Activities

100+ reusable exercises

---

# Learning Paths

3–5 starting pathways

---

# Content Principles

## Principle 1

Never hardcode learning content into UI.

---

## Principle 2

Every concept should connect to music.

---

## Principle 3

Content should be reusable.

---

## Principle 4

AI should understand the curriculum structure.

---

## Principle 5

The library should grow without rebuilding the app.

---

# Final Vision

PianoOS becomes a musical knowledge platform.

The system understands:

- What concepts exist
- How they connect
- Which songs teach them
- How each student progresses

The result:

A continuously improving AI-powered piano education system.

---

# Decision Log

## Decision 001

**Decision:** Content must be separated from application code.

**Reason:** PianoOS requires a scalable curriculum system.

**Date:** July 2026

---

## Decision 002

**Decision:** Hybrid content architecture is preferred for MVP.

**Reason:** Markdown provides flexibility while databases manage personalization.

**Date:** July 2026
