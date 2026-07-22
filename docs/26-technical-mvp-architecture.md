# PianoOS — Technical MVP Architecture

**Document:** 26-technical-mvp-architecture.md  
**Version:** 1.0  
**Status:** MVP Foundation  
**Created:** July 2026

---

# Purpose

This document defines the technical architecture for the PianoOS MVP.

The goal is to build the smallest system that validates the core product thesis:

"Adults can learn piano more effectively through understanding chords, patterns, songs, and personalized guidance."

---

# MVP Technical Philosophy

## Build The Learning System First

The MVP is not a technology showcase.

The MVP should prove:

- Students engage with the method.
- Students complete lessons.
- Students learn concepts.
- Students feel progress.

---

# MVP Scope

The first version includes:

```
Authentication

↓

Student Profile

↓

Curriculum System

↓

Lessons

↓

Song Learning

↓

Practice Tracking

↓

AI Learning Assistant

↓

Progress Dashboard
```

---

# Technology Stack

---

# Frontend

Framework:

Next.js

---

Language:

TypeScript

---

Styling:

Tailwind CSS

---

UI:

Shadcn UI

---

Icons:

Lucide

---

# Backend

Recommended:

Supabase

Provides:

- Authentication
- PostgreSQL database
- Storage
- Row-level security

---

# AI Layer

Initial:

LLM API integration

Responsibilities:

- Explanations
- Recommendations
- Practice guidance

---

# Future:

AI abstraction layer supporting:

- Multiple providers
- Model selection
- Cost controls

---

# Application Architecture

```
PianoOS

├── Marketing Site
│
├── Student App
│
├── AI Layer
│
├── Content System
│
└── Database
```

---

# Suggested Directory Structure

```
piano-os/

├── app/
│
├── components/
│
├── features/
│
├── lib/
│
├── content/
│
├── hooks/
│
├── types/
│
├── supabase/
│
└── docs/
```

---

# Feature Architecture

Features should be organized by domain.

Example:

```
features/

├── auth

├── onboarding

├── lessons

├── songs

├── practice

├── progress

├── ai-coach

└── profile
```

---

# Database Architecture

Initial entities:

---

# Users

Stores:

- Account information
- Preferences
- Subscription status

---

# Student Profiles

Stores:

- Experience level
- Goals
- Favorite music
- Practice availability

---

# Lessons

Stores:

- Curriculum content
- Objectives
- Difficulty

---

# Songs

Stores:

- Song information
- Difficulty
- Learning objectives

---

# Practice Sessions

Stores:

- Date
- Duration
- Activities completed

---

# Progress Records

Stores:

- Concepts learned
- Songs completed
- Milestones

---

# AI Conversations

Stores:

- User questions
- AI responses
- Learning context

---

# MVP Data Model

```
User

 ↓

Student Profile

 ↓

Learning Path

 ↓

Lessons

 ↓

Songs

 ↓

Practice

 ↓

Progress
```

---

# Content Architecture

Content should be data-driven.

Avoid hardcoding lessons into components.

---

Example:

Lesson object:

```
{
 title:
 "Understanding Major Chords",

 level:
 "Beginner",

 objective:
 "Learn how chords create emotion",

 exercises:
 [],

 songs:
 []
}
```

---

# Song Architecture

Song object:

```
{
 title:

 artist:

 difficulty:

 key:

 chords:

 concepts:

 practiceSteps:
 []
}
```

---

# AI Architecture

MVP AI should be simple.

---

# AI Inputs

Provide:

- Student profile
- Current lesson
- Progress history
- User question

---

# AI Outputs

Provide:

- Explanation
- Recommendation
- Practice suggestion

---

# AI Boundary

AI should not:

- Create curriculum randomly
- Replace lesson structure
- Provide unlimited unrelated answers

---

# MVP User Flow

```
Sign Up

↓

Complete Musical Profile

↓

Receive Learning Path

↓

Complete First Lesson

↓

Learn First Song Concept

↓

Practice

↓

View Progress

↓

Ask AI Coach
```

---

# MVP Screens

---

# Marketing

Pages:

- Homepage
- Philosophy
- How It Works
- Pricing
- Founder Story

---

# Student App

Pages:

- Dashboard
- Learning Path
- Lesson Player
- Song Library
- Practice Session
- Progress
- AI Coach

---

# MVP Exclusions

Not included:

---

# MIDI

Reason:

Requires additional complexity.

---

# Audio Analysis

Reason:

Requires advanced ML.

---

# Community

Reason:

Validate learning first.

---

# Large Song Catalog

Reason:

Quality matters more than quantity.

---

# Advanced AI

Reason:

Need learning data first.

---

# Development Phases

---

# Phase 1

Foundation

Build:

- Next.js app
- Authentication
- Database
- Design system

---

# Phase 2

Learning Experience

Build:

- Lessons
- Curriculum
- Songs

---

# Phase 3

Practice System

Build:

- Practice sessions
- Progress tracking

---

# Phase 4

AI Integration

Build:

- AI Coach
- Recommendations

---

# Phase 5

Polish

Improve:

- UX
- Content
- Feedback loops

---

# Technical Success Criteria

MVP succeeds if:

A user can:

1. Create an account.
2. Complete onboarding.
3. Receive a learning path.
4. Complete lessons.
5. Learn songs.
6. Practice consistently.
7. Feel measurable progress.

---

# Architecture Principles

## Principle 1

Simple systems beat premature complexity.

---

## Principle 2

Content quality is more important than technology.

---

## Principle 3

The architecture should support future intelligence.

---

## Principle 4

Build for learning outcomes.

Not feature lists.

---

# Final Vision

The MVP is not building the final PianoOS.

It is building the first version that proves:

"Adults can finally learn piano in a way that makes sense."

---

# Decision Log

## Decision 001

**Decision:** MVP focuses on curriculum, songs, practice, and AI guidance.

**Reason:** These components validate the core learning hypothesis.

**Date:** July 2026

---

## Decision 002

**Decision:** Hardware and advanced AI are future expansion layers.

**Reason:** The learning methodology must be proven first.

**Date:** July 2026
