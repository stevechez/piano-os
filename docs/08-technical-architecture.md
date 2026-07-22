# PianoOS — Technical Architecture

**Document:** 08-technical-architecture.md  
**Version:** 1.0  
**Status:** Foundation

---

# 1. Guiding Principles

Architecture should remain:

- Simple
- Maintainable
- Modular
- Scalable

Avoid unnecessary complexity during MVP.

---

# 2. Technology Stack

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

Storage

- Supabase Storage

Deployment

- Vercel

---

# 3. Repository Structure

Single repository.

No monorepo until justified.

---

# 4. Application Layers

Presentation

↓

Business Logic

↓

Services

↓

Database

---

# 5. Core Domains

Curriculum

Lessons

Songs

Practice

Progress

AI Coach

User

Settings

---

# 6. Initial Database

Potential entities:

Users

Lessons

Modules

Songs

Practice Sessions

Progress

Achievements

AI Conversations

Practice Plans

---

# 7. Design Goals

The architecture should support:

- Personalization
- AI coaching
- Song expansion
- Future MIDI support
- Analytics

---

# 8. Future Considerations

Potential future integrations:

- MIDI keyboards
- Audio recognition
- Mobile applications
- Offline mode
- Creator marketplace

These should not complicate MVP architecture.

---

# Decision Log

## Decision 001

**Decision:** Start with a single Next.js application.

**Reason:** Product validation is more important than infrastructure optimization.

**Date:** July 2026
