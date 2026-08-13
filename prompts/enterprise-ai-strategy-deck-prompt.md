# Prompt: Enterprise AI Market-Entry Strategy Deck

> Copy everything below the line into your model of choice to generate the deck.
> The prompt is self-contained: role, segment definitions, named competitors,
> analytical frameworks, EU/US lens, and a slide-by-slide blueprint.

---

## ROLE

You are a senior McKinsey engagement manager preparing a partner-level strategy
deck for a founder deciding **where to start a company in enterprise AI**. The
deck is pure strategy — market structure, opportunity mapping, and a clear
recommendation on where to begin. No product specs, no financial model beyond
directional unit economics. Apply the Pyramid Principle: every slide has an
action title that states the "so what," and the storyline reads as a coherent
argument from the titles alone. All analysis must be MECE.

## CORE THESIS TO TEST (not to assume)

Across every customer size, **voice-based customer interaction (inbound calls,
reception, customer support) is the wedge**: it is high-volume, measurable,
painful today (missed calls = lost revenue), and newly solvable with
speech-native LLMs. The deck must test where this wedge is strongest, where it
is already crowded, and what the expansion path is after the wedge lands.

## MARKET SEGMENTATION — THREE COMPANY SIZES

Structure the entire market view around three buyer segments. Use these
definitions (state them explicitly on a slide, and refine them if you can argue
for better cut-offs):

### 1. Corporates / Large Enterprise (> €1B revenue, > 5,000 FTE)
- How they buy AI: directly from foundation-model labs — **OpenAI, Anthropic,
  Mistral, Google** — increasingly delivered with **forward-deployed engineers
  (FDEs)**, Palantir-style, embedded in the account. Alternatively they buy
  vertical AI agent vendors: **Sierra** (Bret Taylor's AI customer-agent
  company), **Wonderful.ai** (multilingual AI support agents, strong in
  non-English European markets), **Decagon, Parloa, PolyAI, Cresta** for
  voice/contact-center AI.
- Analyze: is there room for a new entrant here at all, or is this a
  labs-plus-FDE and well-funded-agent-vendor game where a new company is
  outgunned? What niches remain (regulated industries, sovereign/EU-cloud
  requirements, long-tail languages, legacy telephony estates)?

### 2. Mid-sized companies (define as ~€10M–€1B revenue, ~50–5,000 FTE; state your refined definition)
- How they embrace AI: no ML teams, no FDE budgets. They adopt via
  **AI workflow/orchestration platforms and integrators**. Anchor the analysis
  on two named Dutch players and position them precisely:
  - **Lleverage** (Amsterdam): AI-native workflow automation ("describe a
    process, get an automation") aimed at mid-market operations teams —
    the "Zapier/UiPath successor" motion.
  - **Orq.ai** (Amsterdam): Generative-AI collaboration / LLMOps platform for
    software and product teams *building* AI features — tooling layer, not
    end-user automation.
  - Explain what each targets, what that reveals about where mid-market demand
    is forming, and whether a voice-first wedge complements or collides with
    them.
- Analyze: does the mid-market buy platforms, outcomes, or agencies? Who is the
  economic buyer? What does the voice wedge look like here (customer service
  team of 5–50 seats, not a contact center of 500)?

### 3. Small businesses (< 50 FTE; local service providers)
- Archetypes to use throughout: **physiotherapy practices** and **eye care /
  optometry centers** (also dental, veterinary, salons as comparators).
- How they buy: a **"business in a box"** — one vertical product that answers
  the phone, books appointments, handles recalls/reminders, takes payments, and
  fills the schedule. No integration project, no prompt engineering; priced per
  location per month.
- Wedges to develop in detail:
  - **Physiotherapists**: AI voice front desk — practices miss a large share of
    inbound calls mid-treatment; every missed call is a missed booking.
    Quantify the missed-call economics.
  - **Eye care centers**: **customer support as the wedge** — order status,
    appointment scheduling, insurance/reimbursement questions, contact-lens
    reorders — then expand into recall campaigns and retail upsell.
- Analyze existing players in AI receptionists / vertical SMB agents so the
  white space is real, not assumed.

## INDUSTRY OPPORTUNITY ANALYSIS

Build a systematic industry screen — this is the analytical heart of the deck:

1. Score ~12–15 industries (e.g., healthcare practices [physio, eye care,
   dental], legal, accounting/tax, insurance, banking, logistics, real estate,
   hospitality, home services/trades, automotive dealers & service, utilities,
   public sector, retail/e-commerce, travel) on two axes:
   - **Automation potential**: share of work that is repetitive,
     language-heavy, phone/document-based; regulatory tolerance; data
     availability.
   - **AI competition intensity today**: funded startups, incumbent software
     vendors adding AI, lab/FDE attention.
2. Render this as a **2×2 opportunity map** (high automation potential × low
   competition = target quadrant). Name the industries sitting in each
   quadrant and call out the 3–4 in the golden quadrant.
3. Add a **heatmap table**: industry × (automation potential, competition,
   voice-wedge fit, willingness to pay, regulatory drag) with EU and US scored
   separately where they differ.

## EUROPE vs USA — TREAT AS DIFFERENT MARKETS

For every segment and industry, distinguish EU and US dynamics; where they
diverge, say so explicitly and show it on the maps:

- **US**: larger contracts, faster adoption, but the most crowded competitive
  field (Sierra, Decagon, and hundreds of YC voice-agent startups); private-pay
  healthcare makes SMB health verticals lucrative.
- **Europe**: language fragmentation (a moat for multilingual voice — this is
  Wonderful.ai's play), **EU AI Act** and GDPR as both drag and moat, data
  residency / sovereign-cloud demand (Mistral's structural advantage),
  insurer-reimbursed physiotherapy (NL: ~3,000+ practices, insurer-driven
  admin burden), national health-system differences per country, lower SMB
  software spend but far less AI competition.
- Conclude per segment: is Europe-first a disadvantage or an underpriced
  advantage for this specific wedge?

## DECK BLUEPRINT (~20 slides — follow this structure)

1. Executive summary — the recommendation up front (Situation–Complication–Resolution)
2. The enterprise AI stack in 2026 — labs, infra/tooling, agents, vertical apps; where value is accruing
3. Market segmentation — the three buyer sizes, definitions, and how each buys AI
4. Segment deep-dive: Corporates — labs + FDEs vs. agent vendors (Sierra, Wonderful.ai); why a new entrant struggles here
5. Segment deep-dive: Mid-market — adoption via platforms; Lleverage and Orq.ai positioning map
6. Segment deep-dive: Small business — business-in-a-box; anatomy of the offer
7. The voice wedge — why voice, why now, and what "wedge → land → expand" looks like per segment
8. Industry screen methodology — axes and scoring criteria
9. Industry 2×2 opportunity map — EU
10. Industry 2×2 opportunity map — US
11. Industry heatmap table — EU vs US, side by side, divergences highlighted
12. White-space call-outs — 3–4 high-potential / low-competition combinations, with evidence
13. Deep-dive: physiotherapy practices — market size (EU focus, NL as beachhead), missed-call economics, competitive scan
14. Deep-dive: eye care centers — customer-support wedge, expansion path, competitive scan
15. Competitive landscape map — all named players (Sierra, Wonderful.ai, Decagon, Parloa, PolyAI, Lleverage, Orq.ai, AI-receptionist players) plotted by segment × layer of the stack
16. Business-model comparison — per-seat vs per-location vs outcome pricing; directional unit economics per segment
17. Segment attractiveness scorecard — market size, winnability, speed to revenue, defensibility, capital required
18. Recommendation — which segment, which vertical, which geography to start with, and why (explicit reasoning against the alternatives)
19. Sequencing roadmap — beachhead → expansion (vertical adjacency vs geographic adjacency), 0–6–18-month horizons, go/no-go criteria at each gate
20. Risks & pre-emptive answers — platform risk (labs moving down-market), incumbent PMS/EHR vendors adding voice, pricing compression, EU AI Act timeline

## OUTPUT REQUIREMENTS

- Every slide: action title (a full sentence stating the insight), the visual
  (describe or render the 2×2 / heatmap / map precisely), 3–5 supporting
  bullets, and a "so what" line.
- Maps and matrices must have named companies and industries in every quadrant
  — no empty frameworks.
- Where you estimate numbers (market sizes, call volumes, pricing), state the
  assumption and label it as an estimate; directional accuracy over false
  precision.
- Be opinionated: end with ONE clear recommendation on where to begin, argued
  against the runner-up options, not a menu.
- Tone: crisp consulting prose, no hype; write for a partner review.
