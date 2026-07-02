# Implementation Plan — ContainerShare (ShipShare)

## 1. Project Overview

### Objective

Build and launch a functional MVP of ContainerShare — a marketplace web application that connects shippers with spare container capacity to businesses needing affordable freight. The platform supports user authentication (shipper / filler roles), container listing management, a booking lifecycle with approval workflow, and a role-based dashboard with real-time stats.

### Background

ContainerShare addresses the problem of unused container capacity in the shipping industry. Shippers often sail with partially filled containers, while fillers struggle to find affordable space. The platform matches them directly, bypassing traditional freight forwarders. The tech stack was chosen for rapid iteration: Next.js 14 (App Router), Supabase (auth + database), Tailwind CSS (UI), and headless Chromium for E2E testing. After evaluating Clerk vs Supabase Auth, the team chose Supabase Auth for tighter database integration, simpler MVP setup, and zero marginal cost at the current scale.

---

## 2. Implementation Strategy

### Stages of Implementation

#### Stage 1: Exploration & Planning *(Complete)*

| Activity | Status |
|----------|--------|
| Identify core user roles and workflows (shipper, filler) | Done |
| Evaluate tech stack: Next.js, Supabase, Clerk vs Supabase Auth | Done — chose Supabase Auth |
| Define database schema (profiles, container_listings, bookings) | Done |
| Create project scaffold with Next.js 14 App Router | Done |
| Install and configure Tailwind CSS, UI components, Supabase SDK | Done |
| Install UI-UX Pro Max skill for design system guidance | Done |
| Write test plan | Done |
| Write implementation plan (this document) | Done |

#### Stage 2: Foundation — Auth & Infrastructure *(Complete)*

| Activity | Status |
|----------|--------|
| Set up Supabase project and database tables | Done |
| Implement server-side Supabase helpers (`server-supabase.ts`) | Done |
| Implement auth API routes (login, signup, logout, me) | Done |
| Implement AuthContext with session validation on mount | Done |
| Implement middleware for route protection | Done |
| Fix white-screen bug (lazy module initialization) | Done |
| Fix cookie-based auth flow (sb-access-token + sb-refresh-token) | Done |
| Fix `/api/auth/me` endpoint for server-side session validation | Done |
| Fix dashboard race condition (isInitializing state) | Done |

#### Stage 3: Core Features — Listings & Matching *(Mostly Complete)*

| Activity | Status |
|----------|--------|
| Create `container_listings` table in Supabase | Done |
| Implement listing CRUD API routes (GET, POST, PATCH) | Done — GET/POST in `listings/route.ts` |
| Implement single-listing GET + PATCH in `listings/[id]/route.ts` | Done |
| Create listing creation page (`/shipments/create`) | Done |
| Create listing detail page (`/shipments/[id]`) | Done |
| Create matching/browse page (`/matching`) | Done |
| Build filter UI (origin, destination, container type, price) | Pending — partial in API, UI not connected |
| Seed test data (3 sample listings) | Done |

#### Stage 4: Booking Lifecycle *(In Progress)*

| Activity | Status |
|----------|--------|
| Create `bookings` table in Supabase | Done |
| Implement booking CRUD API routes (GET, POST, PATCH) | Done — but PATCH not fully tested |
| Implement booking approve/decline (shipper action) | Done in dashboard UI |
| Implement CBM availability check on booking creation | Done in API |
| Prevent double-booking / over-booking | TBD |
| Implement booking status transitions (state machine) | TBD — valid transitions not enforced |
| Add booking to filler dashboard view | Done |

#### Stage 5: Dashboard & Analytics *(Mostly Complete)*

| Activity | Status |
|----------|--------|
| Build modern bento-grid dashboard layout | Done |
| Implement stat cards with progress bars and trend indicators | Done |
| Implement tab navigation (Overview, Listings, Bookings, Analytics) | Done |
| Implement role-based views (shipper vs filler) | Done |
| Implement listing cards in dashboard | Done |
| Implement booking request cards with Approve/Decline | Done |
| Implement empty states with CTAs | Done |
| Implement quick-actions panel | Done |
| Implement analytics tab (placeholder charts) | Done |

#### Stage 6: Public Pages & Polish *(Partial)*

| Activity | Status |
|----------|--------|
| Build landing page (`/`) | Done |
| Build How It Works page | Done |
| Build Pricing page | Done |
| Build login page | Done |
| Build signup page | Done |
| Build profile page | Done |
| Responsive design at common breakpoints | TBD — not systematically verified |
| Loading states and error states | Partially done |
| Final UI polish and consistency pass | Pending |

#### Stage 7: Testing & QA *(Not Started)*

| Activity | Status |
|----------|--------|
| Install Playwright | Pending |
| Write auth test suite (TC-AUTH) | Pending |
| Write middleware test suite (TC-MIDDLEWARE) | Pending |
| Write listings test suite (TC-LISTINGS) | Pending |
| Write bookings test suite (TC-BOOKINGS) | Pending |
| Write dashboard test suite (TC-DASHBOARD) | Pending |
| Write UI/responsive test suite (TC-UI) | Pending |
| Bug fixing and regression | Pending |
| Test report and sign-off | Pending |

#### Stage 8: Deployment & Handover *(Not Started)*

| Activity | Status |
|----------|--------|
| Configure production environment variables | Pending |
| Build production bundle (`npm run build`) | Pending — unknown if it builds cleanly |
| Deploy to hosting platform (Vercel recommended) | Pending |
| Configure custom domain and SSL | Pending |
| Set up CI pipeline (GitHub Actions) | Pending |
| Document deployment runbook | Pending |

### Milestones and Deliverables

| Milestone | Target Date | Deliverable |
|-----------|-------------|-------------|
| M1 — Auth & Infrastructure | Completed | Working auth flow, route protection, no white screen |
| M2 — Core Features | 3 days from now | Listings CRUD, matching page, seed data |
| M3 — Booking Lifecycle | 5 days from now | End-to-end book → approve → decline flow |
| M4 — Dashboard Complete | 7 days from now | All dashboard views, stats, empty states working |
| M5 — Testing Complete | 12 days from now | All 43 test scenarios passing, bug list closed |
| M6 — MVP Release | 15 days from now | Deployed to production, CI running, runbook written |

---

## 3. Tasks

| # | Task Description | Assigned To | Start | End | Dependencies |
|---|------------------|-------------|-------|-----|--------------|
| T1 | Complete listing detail page (`/shipments/[id]`) with edit capability | Developer | Day 1 | Day 2 | — |
| T2 | Connect filter UI on matching page to API query params | Developer | Day 2 | Day 3 | T1 |
| T3 | Implement booking status state machine enforcement in API | Developer | Day 3 | Day 4 | — |
| T4 | Prevent over-booking by updating `available_cbm` atomically | Developer | Day 4 | Day 5 | T3 |
| T5 | Responsive design verification pass (mobile/tablet/desktop) | Developer | Day 5 | Day 6 | — |
| T6 | Loading and error state audit across all pages | Developer | Day 6 | Day 7 | T5 |
| T7 | Install Playwright and configure test runner | QA | Day 7 | Day 8 | — |
| T8 | Write auth + middleware test suites | QA | Day 8 | Day 9 | T7 |
| T9 | Write listings + bookings test suites | QA | Day 9 | Day 11 | T8 |
| T10 | Write dashboard + UI test suites | QA | Day 11 | Day 12 | T9 |
| T11 | Bug fixing and regression (iterative) | Developer | Day 8 | Day 14 | T8, T9, T10 |
| T12 | Build production bundle and fix build errors | Developer | Day 12 | Day 13 | — |
| T13 | Deploy MVP to Vercel | Developer | Day 13 | Day 14 | T12 |
| T14 | Write deployment runbook and final report | Developer | Day 14 | Day 15 | T13 |

---

## 4. Resources Needed

### Software & Services

| Resource | Purpose | Estimated Cost |
|----------|---------|----------------|
| Supabase (Pro plan) | Database, Auth, Storage | $25/mo |
| Vercel (Pro plan) | Hosting, CI, Preview Deployments | $20/mo |
| GitHub | Version control, CI (GitHub Actions) | Free |
| Playwright | E2E test framework | Free |
| Custom domain (e.g., containershare.com) | Production URL | ~$12/yr |

### Development Environment

| Requirement | Notes |
|-------------|-------|
| Node.js v24+ | Already installed |
| npm / yarn | Already configured |
| Chromium | Already installed (used for puppeteer) |
| `.env.local` | Already configured with Supabase credentials |

### People

| Role | Commitment |
|------|------------|
| Developer (full-stack) | Full-time through MVP release |
| QA Engineer | Part-time during testing phase (Days 7–14) |
| Product Owner | 2–3 hrs/week for review and sign-off |

---

## 5. Risk Assessment and Contingency Plans

| Risk | Probability | Impact | Contingency |
|------|-------------|--------|-------------|
| **Build fails in production** (unresolved type errors, missing env vars) | Medium | High | Run `npm run build` early (Day 1) and keep it green; use Vercel preview deployments to catch issues per-PR |
| **Supabase RLS policy blocks legitimate queries** | Medium | High | Document all RLS policies in a `.sql` file; write a single integration test that exercises each query pattern; fix immediately if tests fail |
| **Booking CBM race condition** (two fillers book the last CBM simultaneously) | Low | Critical | Use Supabase `RPC` (stored procedure) with atomic `UPDATE ... SET available_cbm = available_cbm - $1 WHERE available_cbm >= $1`; fallback: application-level lock |
| **Auth cookie format change** (Supabase SDK update changes default cookie name) | Low | High | Pin `@supabase/auth-helpers-nextjs` to `0.15.0`; centralise cookie name constant; write a single auth smoke test |
| **Developer unavailable** | Low | Medium | Document setup steps in README; keep code review turnaround < 24h; cross-train QA on simple fixes |
| **Testing reveals critical blocker** | Medium | High | Triage immediately; if fix takes > 2 days, descope non-critical features (analytics charts, polish) to meet release date |

---

## 6. Monitoring and Evaluation

### Tracking

| Artifact | Tool | Frequency |
|----------|------|-----------|
| Task progress | GitHub Issues (Kanban board) | Daily |
| Build health | Vercel deployment status + `npm run build` | Every commit |
| Test results | Playwright HTML report | Every test run |
| Bug count and severity | GitHub Issues with labels (P0–P3) | Weekly triage |
| Remaining work vs. milestone dates | This document (updated) | Every 3 days |

### Evaluation Criteria

The MVP is considered ready for release when:

- [ ] All P0 and P1 bugs are fixed and verified
- [ ] Auth flow (signup → login → protected route → logout) works without errors in Chromium (headed and headless)
- [ ] A shipper can create a listing and see it on the matching page
- [ ] A filler can book space and the shipper can approve/decline
- [ ] The dashboard loads with correct stats for both roles
- [ ] `npm run build` exits with code 0
- [ ] All 43 test scenarios in the test plan pass
- [ ] Product Owner has signed off

### Post-MVP Evaluation

After release, the following metrics will be tracked to inform prioritisation of the next iteration:

| Metric | Target (30 days) |
|--------|------------------|
| User signups | ≥ 50 |
| Active listings | ≥ 20 |
| Booking requests created | ≥ 10 |
| Successful bookings (approved + paid) | ≥ 5 |
| Dashboard page load time (P75) | ≤ 2s |
| API error rate | ≤ 1% |
