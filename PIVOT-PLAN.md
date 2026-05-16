# Container Slack Space Marketplace — Pivot Plan

## The Big Idea
A pure matchmaking marketplace where shippers with booked containers post available slack space (by CBM/kg) and fillers (SMEs, individuals) book that space. You never touch the cargo.

---

## PHASE 0: Foundations (Now — Week 1)

### 0.1 Business Registration
- [ ] Register company in Kenya (e.g., "SpaceShare Ltd" or whatever name)
- [ ] Get KRA PIN
- [ ] Register for VAT (digital marketplace supply = 16% on commission)
- [ ] Open business bank account (in USD + KES)
- [ ] Sign up for Stripe (or PesaFlow/Pesapal if Stripe is limited in KE)

### 0.2 Legal
- [ ] Draft Terms of Service (marketplace intermediary, not carrier)
- [ ] Draft Privacy Policy
- [ ] Confirm with lawyer: as a pure matchmaker, you don't need a freight forwarding license
- [ ] Set up liability disclaimers (you don't own/handle cargo)

### 0.3 Define The First Route
- [ ] START WITH ONE LANE ONLY: **China (Shenzhen/Ningbo/Shanghai) → Mombasa**
- [ ] Reason: This is Kenya's #1 import corridor, easy to find forwarders
- [ ] Later lanes: Mombasa → Nairobi (trucking), Mombasa → Kampala, China → Dar es Salaam

### 0.4 Understand Pricing
- [ ] Research current LCL rates: China → Mombasa = ~$50-120/CBM
- [ ] Research FCL rates: 20ft container = ~$1,500-2,500
- [ ] Set price guidance: fillers should pay ~40-60% less than LCL
- [ ] Decide commission model: 10% per booking (initial), €15/CBM fixed fee (later)

---

## PHASE 1: Supply Acquisition (Week 2 — Week 6)

### 1.1 Identify Target Shippers
- [ ] List freight forwarding companies operating China → Mombasa routes
  - Sources: KIFWA directory, Google Maps, LinkedIn, Kenya Shipping Gazette
  - Target: 20-30 forwarders in Nairobi/Mombasa
- [ ] List clearing agents who also arrange shipping
- [ ] List manufacturers/importers who ship full containers regularly (excess space)
- [ ] Create a spreadsheet: company name, contact, email, phone, estimated containers/month

### 1.2 Outreach Strategy
- [ ] Personal approach (not cold email): visit Industrial Area (Nairobi) / Mombasa port area
- [ ] Pitch: "We bring you fillers for the space you're already shipping empty. No cost to list. 0% commission for 6 months."
- [ ] Initial target: sign up 5 forwarders who ship at least 2 containers/month each
- [ ] Offer: free listing, free marketing, dedicated account manager (you)

### 1.3 Manual Onboarding
- [ ] For each forwarder, manually create their first 5 listings
- [ ] Information to collect:
  - Container type (20ft, 40ft, 40HC)
  - Available CBM (cubic meters)
  - Origin port and destination port
  - Departure date and cutoff date
  - Price per CBM ($)
  - Container number (if already booked)
  - Shipping line (Maersk, MSC, CMA CGM, etc.)
  - Any restrictions (hazardous, food, etc.)
- [ ] Take photos of the container type if possible
- [ ] Get their KRA PIN and business docs for verification

### 1.4 Supply Target
- [ ] Week 2-3: 5 forwarders, 10 container listings
- [ ] Week 4-6: 15 forwarders, 50+ container listings per week
- [ ] Key metric: at least 20 listings available at any given time

---

## PHASE 2: Demand Acquisition (Week 4 — Week 8)

### 2.1 Identify Target Fillers
- [ ] SMEs importing goods from China (electronics, spare parts, textiles, furniture, cosmetics)
- [ ] Sources: 
  - Kenya Manufacturers Association directory
  - EPZ (Export Processing Zone) companies
  - TikTok/Instagram sellers importing from China
  - Traders at Nairobi's industrial markets
  - LinkedIn (search "procurement" "importer" "sourcing" Kenya)

### 2.2 Build Filler Pipeline
- [ ] Collect emails via a simple landing page: "Get early access — ship from China at 50% less"
- [ ] Run a Google/LinkedIn ad targeting Kenyan importers
- [ ] Join WhatsApp groups for Kenyan importers/traders
- [ ] Manual outreach: call 100 potential fillers

### 2.3 Onboarding Fillers
- [ ] First 50 fillers: free booking, 0% markup
- [ ] Simplify signup: phone number + business name is enough initially
- [ ] Concierge service: you personally match them to available container space
- [ ] Don't automate matching until you've done 20+ matches manually

### 2.4 The First Transactions
- [ ] Manually match first 10 bookings
  - Talk to filler: "What are you shipping? How much space?"
  - Talk to forwarder: "This filler has 5 CBM for your container departing Tuesday"
  - Connect them, let them handle logistics directly
  - Your platform records the booking + facilitates payment
- [ ] After 10 successful matches, refine the process
- [ ] Aim for: 30+ bookings in first 2 months

---

## PHASE 3: Product (Weeks 1 — 8, in parallel)

### 3.1 MVP Features (Priority Order)

**Week 1-2 (repurpose existing codebase):**
- [ ] **Container Listing Form** (`/shipments/create`)
  - Fields: origin port, destination port, departure date, cutoff date, container type (dropdown: 20ft/40ft/40HC), available CBM, price per CBM, shipping line, restrictions
  - Auto-calculates: total price = CBM × price per CBM
  - Status: draft → published → booked → departed → arrived
- [ ] **Listing Browse/Search** (`/matching`)
  - Search by: origin port, destination port, date range, max price
  - Filter by: container type, shipping line
  - Display: price per CBM, fill rate (e.g., "32/67 CBM filled"), departure countdown
- [ ] **User Roles** (update AuthContext)
  - Shipper role: can create listings, manage bookings
  - Filler role: can browse, request booking

**Week 3-4:**
- [ ] **Booking Request Flow**
  - Filler selects listing → enters CBM needed → sends request
  - Shipper receives notification → approves/declines
  - On approval: booking created, filler receives confirmation
- [ ] **Dashboard Enhancements**
  - Shipper: "My Listings" + "Booking Requests" + "Active Bookings"
  - Filler: "My Bookings" + "Past Shipments"
- [ ] **In-Platform Chat** (basic text between shipper and filler for coordination)

**Week 5-6:**
- [ ] **Payment Escrow** (via Stripe Connect)
  - Filler pays → platform holds → shipper confirms departure → release to shipper
  - Platform takes commission automatically
- [ ] **Verification System**
  - Business docs upload (KRA PIN, certificate of incorporation)
  - Verification badge on profiles
- [ ] **Ratings & Reviews**
  - Both sides rate each other after delivery

### 3.2 What NOT to Build Yet
- ❌ Real-time tracking (not needed, forwarders handle this)
- ❌ Automated matching algorithm (manual concierge is better initially)
- ❌ Mobile app (web-only is fine for MVP)
- ❌ Multi-currency (USD only to start)
- ❌ Insurance marketplace (add later)

---

## PHASE 4: Operations (Week 4 — Ongoing)

### 4.1 First 100 Bookings Playbook

| Booking # | Approach |
|---|---|
| 1-10 | Concierge: you do everything manually |
| 11-30 | Semi-automated: fillers browse but you still facilitate payment |
| 31-100 | Platform-led: automated booking + payment, you just monitor |

### 4.2 Key Metrics to Track

| Metric | Target |
|---|---|
| Listings available per week | 20+ |
| Fillers signed up | 100+ |
| Booking requests per listing | 3+ |
| Conversion (request → booking) | 50%+ |
| Time from listing to booked | < 7 days |
| Average CBM per booking | 5-15 CBM |
| Average booking value ($) | $300-1,000 |
| Platform take rate | 8-10% |
| Filler retention (2nd booking) | 30%+ |

### 4.3 The Backend Problem
- [ ] Backend directory is empty — need an API
- [ ] Options:
  - **Option A (fastest):** Next.js API routes (already exists at `src/app/api/`)
  - **Option B (scalable):** Separate backend (Node.js/NestJS or Python/FastAPI)
  - **Option C (database):** Supabase (PostgreSQL + auth + storage in one)
- [ ] **Recommendation:** Use Next.js API routes + Supabase. Fastest path to MVP.

---

## PHASE 5: Growth (Month 3 — Month 6)

### 5.1 Expand Supply
- [ ] Add 10 more forwarders
- [ ] Sign up 2-3 shipping lines directly (Maersk, MSC have digital teams)
- [ ] Create referral program: existing shippers get 1% commission for referring others

### 5.2 Expand Demand
- [ ] Content marketing: "How to save 50% on shipping from China" blog posts
- [ ] WhatsApp broadcast to importer groups
- [ ] Google Ads on keywords: "cheap shipping China to Kenya", "LCL Kenya", "shared container"
- [ ] Partner with Kenya Manufacturers Association, KIFWA

### 5.3 Add Routes
- [ ] Route 2: Mombasa → Nairobi (trucking slack space)
- [ ] Route 3: Mombasa → Kampala, Uganda
- [ ] Route 4: China → Dar es Salaam, Tanzania
- [ ] Each new route = repeat Phase 1 (seed supply first)

### 5.4 Revenue Milestones

| Month | GMV (Gross Merchandise Value) | Revenue (10% take rate) |
|---|---|---|
| Month 1-2 | $0-5,000 (testing) | $0 (free period) |
| Month 3-4 | $15,000-30,000 | $1,500-3,000 |
| Month 5-6 | $50,000-100,000 | $5,000-10,000 |
| Month 7-12 | $200,000-500,000 | $20,000-50,000 |

---

## PHASE 6: Defensibility (Month 6+)

### 6.1 Build Network Effects
- More listings → more fillers → more bookings → more forwarders want to list
- Ratings → trust → higher conversion
- Data on popular routes → predict demand → help forwarders plan

### 6.2 Add Moats
- [ ] Integrated customs clearance booking (partner with KIFWA agents)
- [ ] Insurance via partner (for cargo damage)
- [ ] Trucking/drayage booking (port to warehouse)
- [ ] Analytics for shippers: "You shipped 15 CBM empty last month. That's $1,200 lost."

### 6.3 Geographic Expansion
- [ ] East Africa: Tanzania, Uganda, Rwanda, DRC
- [ ] West Africa: Mombasa → Lagos, Mombasa → Tema
- [ ] Eventually: bidirectionality (Africa → China slack space too)

---

## RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Forwarders won't list | High | High | Start free, concierge onboarding, show them demand |
| Fillers won't trust | Medium | High | Verified profiles, escrow payments, start with personal network |
| Payment integration fails | Low | High | Use Stripe Connect (battle-tested), have Pesapal as backup |
| Regulatory issues | Low | Medium | Marketplace intermediary ≠ freight forwarder; consult lawyer |
| Competitor enters KE | Medium | Medium | Move fast, build local relationships (moat) |
| Low quality listings | Medium | Medium | Manual curation, minimum info requirements |

---

## IMMEDIATE NEXT STEPS (This Week)

1. [ ] Register company + KRA PIN
2. [ ] Set up Stripe account
3. [ ] Visit 5 freight forwarders in person (Industrial Area/Mombasa)
4. [ ] Build MVP: Container listing form + browse page
5. [ ] Set up database (Supabase: containers, users, bookings tables)
6. [ ] Get first 3 forwarders to commit listings
7. [ ] Get first 10 fillers via personal network

---

*"A marketplace that works in one corridor is infinitely more valuable than one that's mediocre everywhere."*
