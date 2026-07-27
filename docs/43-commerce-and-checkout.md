# PianoOS — Commerce & Checkout

**Document:** 43-commerce-and-checkout.md
**Version:** 1.0
**Status:** Foundation
**Created:** July 2026

---

# Purpose

This document describes how PianoOS turns a Module 1 completion into a paying, signed-in customer, and how billing state stays in sync with Stripe afterward.

It extends `42-mvp-user-flow.md`, which owns the free experience up through `/learn/complete`. This document owns everything from "Unlock PianoOS" onward.

---

# Product Framing

PianoOS has no free tier beyond Module 1 and no standalone signup form. There is one paid product (PianoOS), sold monthly or annually, and one purchase moment: the "Unlock PianoOS" panel at `/learn/complete`, reached only after finishing the five free lessons.

An account is a side effect of paying, not a prerequisite for it. Nobody creates a PianoOS account without also becoming a subscriber — see `42-mvp-user-flow.md` Decision 003.

Copy throughout this flow avoids transactional SaaS language ("Create an account," "Purchase Subscription") in favor of language that matches the product's promise: "Continue your musical journey," "Unlock PianoOS."

---

# Pricing

Defined centrally in `src/lib/stripe/pricing.ts` — the only place plan names, prices, and copy live in code. Actual Stripe Price IDs are never hardcoded; they're read from environment variables (`STRIPE_PRICE_MONTHLY`, `STRIPE_PRICE_ANNUAL`) at the point of use.

| Plan | Price | Notes |
|---|---|---|
| Monthly | $19.00 / month | |
| Annual | $149.00 / year | ~35% cheaper than monthly; shown with a "Save 35%" badge |

---

# Flow

```
/learn/complete
      ↓ "Unlock PianoOS" (plan already selected: monthly or annual)
Stripe Checkout (hosted, mode: subscription)
      ↓ payment succeeds
/checkout/confirm?session_id=...  (page; loading.tsx shown while this runs)
      ↓
ensureAccountForCustomer()  — create Supabase user + profile if needed
      ↓
generateLink(magiclink) → /auth/confirm?token_hash=...&type=magiclink&next=/learn?welcome=1
      ↓
verifyOtp() establishes a real cookie session
      ↓
/learn?welcome=1  (now authenticated; local progress syncs up automatically)
```

In parallel, Stripe delivers webhook events to `/api/webhooks/stripe` for the same checkout. The two code paths race on purpose — whichever runs first does the provisioning, and the other one's calls are safe no-ops. Nothing in this flow depends on which one wins.

The `?welcome=1` on the final redirect tells `/learn` this is the moment right after a purchase, not a routine return visit — see `44-learning-curriculum-architecture.md`.

---

# Checkout

`src/lib/stripe/actions.ts` — `createCheckoutSession(planId)` is a server action that creates a Stripe Checkout Session in `mode: "subscription"` for the selected plan's price, then redirects the browser to Stripe's hosted page. `success_url` points at `/checkout/confirm`; `cancel_url` returns to `/learn/complete` so an abandoned checkout just lands back on the unlock panel.

`src/components/commerce/UnlockPanel.tsx` renders the two plans as selectable cards (annual selected by default) and calls `createCheckoutSession` directly from a client transition — no `<form>`, since plan selection is local UI state.

---

# Account Provisioning

The passwordless, race-safe account creation lives in `src/lib/stripe/provisioning.ts` and is called from both the checkout-complete route and the webhook handler:

**`ensureAccountForCustomer({ email, stripeCustomerId })`** — looks for an existing profile first by `stripe_customer_id`, then by `email`, so a returning customer resubscribing never gets a duplicate account. If neither match exists, it creates a new Supabase auth user via `admin.auth.admin.createUser()` (`email_confirm: true`, no password set) and upserts a `profiles` row with the Stripe customer id attached.

**Sign-in** happens without the customer ever seeing a password: `/checkout/confirm` calls `admin.auth.admin.generateLink({ type: "magiclink", email })` and redirects to `/auth/confirm?token_hash=...&type=magiclink`, which calls `supabase.auth.verifyOtp()` server-side to establish a real cookie session before redirecting into `/learn`.

**Returning customers** who need to sign back in later (new device, cleared cookies) use the magic-link option on `/login` — the same `signInWithOtp` mechanism, just re-entered through the login form instead of the post-checkout redirect. This depends on a one-time Supabase Dashboard change to the "Magic Link" email template (pointing it at `/auth/confirm?token_hash={{ .TokenHash }}&type=email` instead of Supabase's default hosted verify page); until that's configured, magic-link *login* (as opposed to the post-checkout auto-sign-in, which doesn't use email delivery at all) won't complete correctly.

---

# Webhooks

`src/app/api/webhooks/stripe/route.ts` verifies the `stripe-signature` header via `stripe.webhooks.constructEvent`, then handles six event types:

- `checkout.session.completed` — for subscription-mode sessions, provisions the account and records the subscription
- `customer.subscription.created` / `.updated` / `.deleted` — upserts subscription state
- `invoice.payment_succeeded` / `.payment_failed` — re-fetches and re-upserts the associated subscription (covers renewals and dunning without a separate code path)

**Idempotency:** every event id is checked against `processed_stripe_events` before processing and recorded only after processing succeeds. Recording before processing was an early mistake caught during development — it would silently drop any event whose handler threw, since Stripe's retry would then see it as already done. The check and the record are deliberately two separate functions (`wasEventAlreadyProcessed`, `recordEventProcessed`) for this reason.

**Event-ordering races:** `upsertSubscriptionFromStripe` looks up the owning user by `stripe_customer_id` and no-ops silently if no profile exists yet. This makes it safe for a `customer.subscription.created` event to arrive before `checkout.session.completed` has finished provisioning the account — whichever handler runs once the account exists is the one that records the subscription.

---

# Data Model

Extends `profiles` (from `27-*` / Phase 2) with `email`, `stripe_customer_id` (unique), `subscription_status`, `subscription_plan` — a denormalized mirror of the customer's current billing state, kept in sync by every webhook/provisioning call, so most of the app can answer "is this user subscribed" with a single-row read instead of a Stripe API call.

`subscriptions` holds the full per-subscription history (id, price, plan, status, `current_period_end`, `cancel_at_period_end`) — RLS allows a user to `SELECT` their own rows; all writes go through the service-role client.

`processed_stripe_events` is a service-role-only table (RLS enabled, zero policies) used purely as the idempotency ledger described above.

---

# Billing Management

`/account` (protected route — the only route gated by the auth middleware besides its own layout) shows plan, status, renewal or cancellation date, and a "Manage Billing" button. That button calls `createPortalSession()`, which creates a Stripe Billing Portal session and redirects there — cancellation, plan switches, and payment-method updates all happen inside Stripe's hosted portal, not in custom PianoOS UI.

---

# Explicit Non-Goals

Out of scope for this pass, per the original commerce handoff:

- Coupons, discounts, or promotional codes
- Referrals or affiliate tracking
- Team or multi-seat plans
- Gift purchases
- A marketplace or add-on products
- Family accounts

These can layer on top of this foundation later without restructuring it — pricing, checkout, provisioning, and webhooks are already separated into their own modules for exactly that reason.

---

# Decision Log

## Decision 001

**Decision:** Account creation happens automatically on successful payment, via a passwordless Supabase user created server-side — never through a standalone signup form.

**Reason:** A free signup step between "I want this" and "I have this" is pure friction with no product benefit once there's no free tier to sign up for. The checkout form (email, payment) already collects everything needed to create the account.

**Date:** July 2026

## Decision 002

**Decision:** Account/subscription provisioning is implemented as shared, fully idempotent functions called from both the webhook handler and the checkout success-page redirect, rather than picking one as the single source of truth.

**Reason:** Stripe does not guarantee webhook delivery ordering relative to a browser's redirect to `success_url`. Rather than adding retry/polling logic to make one path wait on the other, every operation (`ensureAccountForCustomer`, `upsertSubscriptionFromStripe`) was written so either call order produces the same end state.

**Date:** July 2026

## Decision 003

**Decision:** Stripe's hosted Billing Portal handles all subscription management (cancel, switch plan, update card) — PianoOS builds no custom billing UI beyond a summary view and a link into the portal.

**Reason:** Payment method handling and plan-change proration logic are exactly the kind of code an early-stage product shouldn't own. The portal is fully hosted and PCI scope stays entirely with Stripe.

**Date:** July 2026

## Decision 004

**Decision:** The checkout success handler was moved from a route handler (`/api/checkout/complete`) to a page (`/checkout/confirm`) with a sibling `loading.tsx`.

**Reason:** This step runs several sequential Stripe/Supabase calls (retrieve session, provision account, upsert subscription, generate a magic link) before it can redirect on to `/auth/confirm`. A route handler has no rendering phase, so the browser showed nothing at all during that wait — a real gap in an otherwise-polished purchase flow. As a page, Next's `loading.tsx` convention renders instantly and stays up for the whole await chain, giving the customer a branded "Setting up your account…" moment instead of a blank pause. Purely a presentation change — the provisioning logic itself is unchanged.

**Date:** July 2026
