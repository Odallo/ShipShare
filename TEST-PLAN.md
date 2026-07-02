# Test Plan — ContainerShare (ShipShare)

## 1. Test Plan Identifier

**TP-CS-001** | Version 1.0 | June 2026

---

## 2. Introduction

### Purpose

This test plan defines the scope, approach, resources, and schedule for testing the ContainerShare (ShipShare) web application — a marketplace that connects shippers with spare container capacity to businesses needing affordable freight. The plan ensures that core functionality (authentication, listing management, booking workflow, and the dashboard) meets quality, reliability, and security standards before production release.

### Scope of Testing

#### In Scope

| Area | Details |
|------|---------|
| **Authentication** | User signup, login, logout, session persistence, and middleware-based route protection |
| **Listing Management** | Create, read, update listings; filter and search listings; shipper-only listing ownership |
| **Booking Workflow** | Create booking request; approve / decline booking (shipper); booking status lifecycle (pending → approved → paid → shipped → delivered / cancelled) |
| **Dashboard** | Stats aggregation (active listings, fill rate, earnings); tab navigation (Overview, Listings, Bookings, Analytics); role-based views (shipper vs filler) |
| **Public Pages** | Landing page, How It Works, Pricing, Matching (browse/list view) |
| **API Routes** | All 11 endpoints: auth (login/signup/logout/me), listings (GET/POST/PATCH), bookings (GET/POST/PATCH), seed |
| **Middleware** | Redirect unauthenticated requests from `/dashboard/*`, `/profile/*`, `/shipments/*` to `/auth/login` |
| **Responsive UI** | Layout renders correctly across breakpoints (mobile, tablet, desktop) |

#### Out of Scope

| Area | Rationale |
|------|-----------|
| Load / performance testing | Out of scope for MVP; will be addressed post-MVP |
| Security penetration testing | Basic security (JWT auth, HttpOnly cookies) is in place; full pen test is a separate engagement |
| Third-party integrations (payment gateway, email service) | Not yet implemented |
| Cross-browser testing beyond Chromium | Only Chromium-based browsers tested; Safari/Firefox deferred |
| Database migration testing | Schema managed via Supabase dashboard; no migration tooling |
| Mobile native app | Web-only MVP |
| Accessibility (WCAG) audit | Out of scope for initial release |

---

## 3. Test Objectives

1. **Verify that all authentication flows work correctly and securely** — signup creates a valid session, login sets HttpOnly cookies, protected routes reject unauthenticated requests, and logout clears the session.
2. **Confirm that listing CRUD operations behave correctly** — shippers can create, view, and update their own listings; anonymous users can browse published listings; shipper-only operations are enforced.
3. **Validate the booking lifecycle end-to-end** — filler books space → shipper approves → status transitions are correct; CBM availability updates appropriately; double-booking is prevented.
4. **Ensure the dashboard renders accurate real-time stats** — stat cards, listing cards, and booking request cards reflect current database state; role-based views show correct data.
5. **Check that the middleware enforces route protection** — navigation to `/dashboard`, `/profile`, `/shipments/*` without valid `sb-access-token` cookie redirects to `/auth/login`.
6. **Confirm that the UI is responsive and error states are handled** — empty states, loading spinners, and error messages appear correctly; layout does not break at common breakpoints.

---

## 4. Testing Approach

### Types of Testing

| Type | Description |
|------|-------------|
| **Functional Testing** | Verify each feature works against its specification — every API endpoint, every page component, every user interaction |
| **Integration Testing** | Test the interaction between components and the Supabase backend; ensure API routes correctly read cookies, verify JWTs, query the database, and return proper responses |
| **Regression Testing** | After each bug fix or feature addition, re-run the core auth and booking flow test suites to confirm nothing is broken |
| **Smoke Testing** | Brief sanity checks before each demo or release: login → browse listings → create booking → approve → verify dashboard |
| **UI / Visual Testing** | Responsive layout verification at 3 breakpoints (mobile 375px, tablet 768px, desktop 1280px) |

### Testing Methodology

| Aspect | Approach |
|--------|----------|
| **Primary Method** | **Automated** — API integration tests and E2E browser tests via Playwright |
| **Auth & Middleware** | Automated — cookie injection, session validation, redirect assertions |
| **UI Components** | Automated — Playwright component testing for critical interactions (booking approve/decline, tab switching) |
| **Exploratory** | Manual — ad-hoc testing of edge cases and visual polish before demos |
| **CI Integration** | Tests run on every PR via GitHub Actions (future setup) |

### Tools to be Used

| Tool | Purpose |
|------|---------|
| **Playwright** | E2E browser testing — auth flows, protected routes, dashboard rendering, booking lifecycle, responsive layout |
| **Node.js + built-in `fetch`** | API integration tests — direct HTTP calls to all 11 endpoints with cookie headers |
| **Supabase JS client** | Seed data setup and database state verification in test hooks |
| **GitHub Actions** | CI pipeline to run tests on push / PR (post-MVP setup) |
| **ESLint** | Static analysis for code quality (already configured) |
| **TypeScript** | Type-checking as a first line of defense |

---

## 5. Test Environment

| Component | Specification |
|-----------|---------------|
| **Application** | Next.js 14.0.4 dev server (`npm run dev` on `localhost:3000`) |
| **Database** | Supabase project (production-grade, shared instance) |
| **Browser** | Chromium (headless / headed) via Playwright |
| **Node.js** | v24.11.1 |
| **Operating System** | Linux (Pop!_OS) |
| **Environment Variables** | `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY` |
| **Test Data** | Seeded via `POST /api/seed` — creates 3 sample listings and a test user |

**Test Account:**
- Email: `odallo@shipshare.com`
- Password: `Demo123!`
- Role: `both` (shipper + filler)

---

## 6. Resource Requirements

### Roles and Responsibilities

| Role | Person | Responsibility |
|------|--------|----------------|
| **Test Lead** | — | Define test strategy, review test cases, triage failures |
| **QA Engineer** | — | Write and maintain automated tests in Playwright; report bugs |
| **Developer** | — | Fix bugs found during testing; participate in regression runs |
| **Product Owner** | — | Review test results, approve release, define acceptance criteria |

### Test Cases and Scenarios Overview

| Test Suite | # Scenarios | Description |
|------------|-------------|-------------|
| **TC-AUTH** | 8 | Signup (success, duplicate email, weak password), Login (valid, invalid, missing fields), Logout clears session, /api/auth/me returns user when authenticated and 401 when not |
| **TC-MIDDLEWARE** | 4 | Redirect to login for /dashboard, /profile, /shipments/create when no cookie; pass through when cookie present |
| **TC-LISTINGS** | 10 | Create listing (shipper), Create listing (filler — rejected), Browse all published listings, Filter by origin/destination/containerType/price, View single listing, Update listing (owner), Update listing (non-owner — rejected), Seed endpoint creates valid data |
| **TC-BOOKINGS** | 10 | Create booking (filler), Create booking (exceeds available CBM — rejected), Approve booking (shipper), Decline booking (shipper), View bookings as filler (own bookings only), View bookings as shipper (bookings on own listings), Booking status transitions are valid, Duplicate booking prevention |
| **TC-DASHBOARD** | 6 | Stat cards show correct values, Shipper view shows listing cards, Filler view shows booking cards, Tab navigation works, Empty states render when no data, Logout button works from dashboard |
| **TC-UI** | 5 | Responsive layout at 375/768/1280px, Loading states display during data fetch, Error states display on API failure, Navbar and sidebar navigation links work, Footer renders correctly |

**Total: ~43 test scenarios**

---

## 7. Schedule

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Test Planning** | 1 day | Approved test plan document |
| **Test Environment Setup** | 0.5 day | Playwright installed, seed script ready, test account configured |
| **Test Case Authoring** | 2 days | 10–15 Playwright test files covering all 43 scenarios |
| **Test Execution — Auth & Middleware** | 0.5 day | All TC-AUTH and TC-MIDDLEWARE passing |
| **Test Execution — Listings & Bookings** | 1 day | All TC-LISTINGS and TC-BOOKINGS passing |
| **Test Execution — Dashboard & UI** | 0.5 day | All TC-DASHBOARD and TC-UI passing |
| **Bug Fixing & Retesting** | 2 days | All critical/high bugs resolved, regressions pass |
| **Test Report & Sign-Off** | 0.5 day | Final test report, release recommendation |

**Total estimated duration: ~8 days**

---

## 8. Risk Identification and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| **Supabase service disruption** | All API tests that depend on the database will fail | Low | Implement retry logic; document offline fallback; switch to a local/test Supabase project |
| **Flaky E2E tests due to timing** | False positives in CI | Medium | Use Playwright's auto-waiting assertions; add generous timeouts; tag flaky tests and quarantine them |
| **Schema changes without migration files** | Tests break when schema is updated in Supabase dashboard | High | Document schema in test plan; version-control the schema DDL as `.sql` file; agree on schema freeze during test execution |
| **No dedicated test database** | Test data pollutes production data | High | Use a separate Supabase project (or a dedicated schema) for testing; seed and teardown between test runs |
| **Auth cookie format changes** | Middleware and API auth breaks | Medium | Centralize cookie name in a constant; write a single assertion that catches drift |
| **Incomplete test coverage for edge cases** | Bugs slip through to production | Medium | Prioritise happy-path and known edge cases for MVP; add edge cases iteratively |

---

## 9. Entry and Exit Criteria

### Entry Criteria (before testing begins)

- [ ] The application builds and runs without errors (`npm run dev` starts successfully)
- [ ] Supabase project is accessible and tables exist (`container_listings`, `bookings`, `profiles`)
- [ ] Environment variables are configured correctly
- [ ] Test account exists and can authenticate
- [ ] Playwright is installed and can launch Chromium in headless mode
- [ ] This test plan has been reviewed and approved

### Exit Criteria (to declare testing complete)

- [ ] All critical and high-priority test scenarios pass
- [ ] No open P0 (blocker) or P1 (critical) defects
- [ ] All fixed defects have been verified (re-tested) and closed
- [ ] Test report has been generated and reviewed
- [ ] Product Owner has signed off on release

---

## 10. Deliverables

| Deliverable | Format | Owner |
|-------------|--------|-------|
| **Test Plan** (this document) | `.md` | Test Lead |
| **Playwright Test Suite** | `.spec.ts` files in `e2e/` | QA Engineer |
| **API Integration Tests** | `.test.ts` files executed via Node | QA Engineer |
| **Test Execution Report** | HTML/JSON | Generated by Playwright |
| **Defect Log** | GitHub Issues | QA Engineer |
| **Release Recommendation** | Summary document | Test Lead |
