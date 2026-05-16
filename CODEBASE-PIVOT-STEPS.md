# Codebase Pivot: Local Group Shipping → Container Slack Space Marketplace

## Current State
- Next.js 14 app (App Router, TypeScript, Tailwind)
- Types: `User`, `Shipment`, `ShipmentGroup`, `Match` — all local Kenya shipping
- Pages: landing, matching, dashboard, profile, shipments/create, auth
- Data: localStorage (no real backend)

## Target State
Two-sided marketplace: **Shippers** (with container space) post listings → **Fillers** (with cargo) book space

---

## STEP 1: Rewrite Types (`src/types/index.ts`)

Replace everything with the new domain model:

**New types needed:**
- `User` — add `role: 'shipper' | 'filler' | 'both'`
- `ContainerListing` — the core object
  - `id`, `shipperId`, `originPort`, `destinationPort`, `departureDate`, `cutoffDate`
  - `containerType: '20ft' | '40ft' | '40HC'`
  - `totalCbm` (e.g., 67.3 for 40HC), `availableCbm` (slack space)
  - `pricePerCbm` (USD), `shippingLine`, `notes`, `restrictions`
  - `status: 'draft' | 'published' | 'fully_booked' | 'departed' | 'arrived'`
  - `createdAt`, `updatedAt`
- `Booking` — a filler's request to use space
  - `id`, `listingId`, `fillerId`, `cbmBooked`, `totalPrice`, `status`
  - `status: 'pending' | 'approved' | 'paid' | 'shipped' | 'delivered' | 'cancelled'`
- `Message` — in-platform chat between shipper & filler

**What to remove:** `Shipment`, `ShipmentGroup`, `Match` (old local shipping model)

---

## STEP 2: Rewrite Auth Context (`src/contexts/AuthContext.tsx`)

**Changes:**
- Add `role: 'shipper' | 'filler'` to signup data and User type
- Update localStorage keys from `shipshare_*` to `containershare_*`
- Add a `user.role` field so the app knows what to show

---

## STEP 3: Rewrite Landing Page (`src/app/page.tsx`)

Keep the layout/navbar/footer structure, but change:
- **Hero:** "Ship Smarter — Fill Empty Container Space" instead of "Save Money by Shipping Together"
- **Mock data:** Show container listings (Mombasa→Nairobi, China→Mombasa) instead of group shipments
- **Steps:** "1. Find Space → 2. Book → 3. Ship" instead of "Enter Your Route → Join a Group → Save Money"
- **Stats:** "50K+ CBM Filled", "2,000+ Containers Listed", "1,500+ Businesses" instead of KES savings
- **CTA buttons:** "List Your Space" (shipper) + "Find Space" (filler) instead of old ones

---

## STEP 4: Rewrite Matching Page (`src/app/matching/page.tsx`)

This becomes the **Container Search & Browse** page:

- **Search/filter bar:**
  - Origin port dropdown (Shenzhen, Ningbo, Shanghai, Mombasa, etc.)
  - Destination port dropdown (Mombasa, Nairobi ICD, Dar es Salaam, etc.)
  - Date range picker
  - Container type filter (20ft / 40ft / 40HC)
  - Max price per CBM slider
- **Listing cards:** Show container cards instead of group cards
  - Route: Shenzhen → Mombasa
  - Available: 32 / 67 CBM (with progress bar)
  - Price: $42/CBM
  - Departure: May 22, 2026
  - Shipping line: Maersk
  - "Book Space" button
- **Popular corridors** section: China→Mombasa, Mombasa→Nairobi, etc.
- **Remove:** old group data, old business partners (G4S, DHL Kenya, etc.)

---

## STEP 5: Rewrite Dashboard (`src/app/dashboard/page.tsx`)

Split into two views based on `user.role`:

**Shipper view (if role = 'shipper'):**
- "My Listings" table: container listings with status
- "Booking Requests" section: pending requests from fillers
- Active bookings
- Quick stats: containers listed, CBM sold, total earned
- CTA: "Post New Space" button

**Filler view (if role = 'filler'):**
- "My Bookings" table: booked space with status
- Saved searches / recent listings
- Quick stats: total CBM shipped, money saved vs LCL
- CTA: "Find Space" button

---

## STEP 6: Rewrite Shipments/Create (`src/app/shipments/create/page.tsx`)

This becomes **"List Your Container Space"** :

- Replace the old 4-step wizard with a single form:
  - **Step 1: Route** — Origin port, destination port
  - **Step 2: Container** — Container type (20ft/40ft/40HC), total CBM, available CBM
  - **Step 3: Pricing** — Price per CBM (USD), departure date, cutoff date
  - **Step 4: Details** — Shipping line, container number (optional), restrictions (hazardous? food? oversize?)
- Remove: old package types (document/small/medium/large/fragile), old corridors (Nairobi→Mombasa etc.)

---

## STEP 7: Rewrite Profile (`src/app/profile/page.tsx`)

Add:
- Role selection: "I want to..." → "List container space" (shipper) / "Find space to ship" (filler) / "Both"
- Business verification fields (KRA PIN, certificate of incorporation) for shippers
- Trust score / verification badge display

---

## STEP 8: Set Up Database (New — Backend)

Since `Backend/` is empty, create a real backend:

**Option: Supabase (recommended — fastest)**

Tables:
```sql
-- users (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('shipper', 'filler', 'both')),
  business_name TEXT,
  kra_pin TEXT,
  verified BOOLEAN DEFAULT false,
  trust_score DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- container_listings
CREATE TABLE container_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipper_id UUID REFERENCES profiles(id),
  origin_port TEXT NOT NULL,
  destination_port TEXT NOT NULL,
  container_type TEXT CHECK (container_type IN ('20ft', '40ft', '40HC')),
  total_cbm DECIMAL NOT NULL,
  available_cbm DECIMAL NOT NULL,
  price_per_cbm DECIMAL NOT NULL,
  departure_date DATE NOT NULL,
  cutoff_date DATE NOT NULL,
  shipping_line TEXT,
  container_number TEXT,
  restrictions TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bookings
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES container_listings(id),
  filler_id UUID REFERENCES profiles(id),
  cbm_booked DECIMAL NOT NULL,
  total_price DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Alternative (simpler for MVP):** Use Next.js API routes + JSON file or SQLite.

---

## STEP 9: Create API Routes (`src/app/api/`)

Currently only has `api/auth/`. Add:

| Route | Method | Purpose |
|---|---|---|
| `api/listings` | GET | List/search container listings |
| `api/listings` | POST | Create new listing (shipper) |
| `api/listings/[id]` | GET | Single listing details |
| `api/listings/[id]` | PATCH | Update listing status |
| `api/bookings` | POST | Create booking request (filler) |
| `api/bookings` | GET | Get user's bookings |
| `api/bookings/[id]` | PATCH | Approve/decline booking |
| `api/messages` | GET/POST | Listing chat |

---

## STEP 10: Add Payment Integration (New)

- `src/lib/stripe.ts` — Stripe Connect setup
- Escrow flow: Filler pays → platform holds → Shipper confirms departure → funds released
- Commission: platform takes 10%, sends 90% to shipper

---

## STEP 11: Update Navbar & Sidebar (`src/components/layout/`)

**Navbar changes:**
- Update nav links: "Find Space" (was "Matching"), "List Space" (new), "How It Works" (update content)
- Show role-based CTAs: shippers see "List Your Space", fillers see "Find Space"

**Sidebar changes (for logged-in):**
- Shipper: Dashboard, My Listings, Booking Requests, Messages, Profile
- Filler: Dashboard, My Bookings, Browse Space, Messages, Profile

---

## STEP 12: Update How It Works & Pricing Pages

- `how-it-works/` — Rewrite for container sharing model
- `pricing/` — Show commission structure (10% per booking, or €15/CBM)

---

## STEP 13: Remove Obsolete Files (Cleanup)

Delete or repurpose:
- Old mock data referencing G4S, DHL Kenya, Sendy — replace with shipping line names (Maersk, MSC, CMA CGM, COSCO)
- Old KES pricing references → replace with USD
- Old "group" terminology → replace with "listing" / "space"

---

## Summary: What Gets Modified

| File | Action |
|---|---|
| `src/types/index.ts` | Full rewrite |
| `src/contexts/AuthContext.tsx` | Add role field |
| `src/app/page.tsx` | Full rewrite |
| `src/app/matching/page.tsx` | Full rewrite |
| `src/app/dashboard/page.tsx` | Full rewrite |
| `src/app/shipments/create/page.tsx` | Full rewrite |
| `src/app/profile/page.tsx` | Add role + verification |
| `src/app/how-it-works/page.tsx` | Rewrite content |
| `src/app/pricing/page.tsx` | Rewrite for commission model |
| `src/app/layout.tsx` | Update metadata/title |
| `src/components/layout/Navbar.tsx` | New nav items |
| `src/components/layout/Sidebar.tsx` | Role-based nav |
| `src/app/api/auth/` | Extend for role |
| `src/app/api/listings/` | **New** |
| `src/app/api/bookings/` | **New** |
| `src/lib/stripe.ts` | **New** |
| `Backend/` | Set up database (Supabase) |

---

## Order To Execute

1. Types → 2. Auth → 3. Navbar → 4. Landing page → 5. Matching page → 6. Dashboard → 7. Create Listing → 8. Profile → 9. Database → 10. API routes → 11. Payments → 12. How it works / Pricing → 13. Cleanup

Each step is independent enough to do one at a time. Want me to start with Step 1 (rewriting the types)?
