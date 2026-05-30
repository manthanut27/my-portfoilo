SITE TYPE : Single-Page Application (React Router v6 with hash/scroll navigation)
ROUTES    : / (main SPA) · /shadow (secret page)
NAV MODEL : Scroll-to-section (no page reloads for section nav)

3.1 ROUTE STRUCTURE
/
├── #hero
├── #about
├── #skills
├── #projects
├── #terminal
└── #contact

/shadow          ← standalone minimal page, no shared layout

3.2 SECTION HIERARCHY & CONTENT INVENTORY
ROOT LAYOUT
├── LoadingScreen (conditional, sessionStorage-gated)
│   ├── VariantA — CinematicReveal
│   │   ├── Phase 1: 「創造」(800ms)
│   │   ├── Phase 2: 「構築」(800ms)
│   │   ├── Phase 3: MANTHAN UTEKAR (800ms)
│   │   └── Phase 4: BUILD. SHIP. REPEAT. (800ms)
│   └── VariantB — InkSplash
│       ├── Phase 1: black ink on white (1600ms)
│       └── Phase 2: invert to violet ink on dark (1600ms)
│
├── Navbar (fixed, always visible)
│   ├── Logo — MU (scrolls to #hero)
│   ├── NavLinks — About · Skills · Projects · Terminal · Contact
│   │   └── ActiveLink (IntersectionObserver-driven)
│   ├── ScrollProgressBar (top edge, 3px)
│   ├── ResumeButton (PDF download)
│   └── MuteToggle (speaker icon)
│
├── HeroSection (#hero)
│   ├── BadgeRow
│   │   ├── BuildingBadge — "⚡ BUILDING: FITMIRROR"
│   │   └── AvailabilityBadge — Supabase-driven
│   ├── NameReveal
│   │   ├── "MANTHAN" (Syne 800, navy, slide-up)
│   │   └── "UTEKAR" (Syne 800, orange-red, slide-up)
│   ├── TypewriterTagline (3 rotating strings)
│   ├── LiveAgeCounter (ticks every 1s)
│   ├── CTARow
│   │   ├── ViewMyWorkButton (scroll to #projects)
│   │   └── DownloadCVButton (PDF)
│   ├── DecorativeElement
│   │   ├── OuterDashedRing (slowSpin 24s)
│   │   ├── MiddleRing (slowSpinReverse 16s)
│   │   ├── InnerRing (static)
│   │   ├── BlobPink (#FFA6B5, float animation)
│   │   ├── BlobLavender (#E9CFF6, floatB animation)
│   │   ├── BlobCyan (#C0F0F5, float animation)
│   │   ├── AccentDotGrape (#572981)
│   │   ├── AccentDotCherry (#710523)
│   │   └── MUMonogram (center)
│   └── ScrollIndicator (hides after 100px scroll)
│
├── MarqueeStrip (between every section)
│
├── AboutSection (#about)
│   ├── BioParagraph
│   ├── StatCards (4x frosted glass)
│   │   ├── ProjectsShipped (static: 6)
│   │   ├── HackathonWon (static: 1)
│   │   ├── FreelanceClients (static: 2)
│   │   └── EvaBloomCommits (GitHub API)
│   ├── GitHubLiveStats
│   │   ├── StarsCount (API)
│   │   ├── ReposCount (API)
│   │   └── ContributionsCount (API)
│   ├── ContributionHeatmap (52×7 grid, client-only)
│   └── TokyoCityBlock (Three.js GLB / CSS fallback)
│
├── MarqueeStrip
│
├── SkillsSection (#skills)
│   ├── SectionLabel ("SKILLS", Space Mono 74px)
│   ├── OrbitSystem (Three.js desktop / CSS mobile)
│   │   ├── InnerRing (React · Next.js · Node.js · Python)
│   │   ├── MiddleRing (Supabase · PostgreSQL · Prisma · Redis · Express · Tailwind)
│   │   └── OuterRing (GSAP · Three.js · Framer Motion · GitHub Actions · Vite · Vercel · Razorpay · Zod)
│   └── CenterMonogram (MU, slow rotate)
│
├── MarqueeStrip
│
├── ProjectsSection (#projects)
│   ├── SectionLabel
│   ├── HorizontalScrollTrack
│   │   ├── ProjectCard — Eva Bloom
│   │   │   ├── ProjectImage
│   │   │   ├── StatusBadge (LIVE)
│   │   │   ├── TechPills (React · Node · Supabase · Prisma · Razorpay · Resend · Redis)
│   │   │   ├── Description (hover reveal)
│   │   │   └── LinkButtons (Live Demo · GitHub)
│   │   ├── ProjectCard — BMW M4 GT3
│   │   │   ├── ProjectImage (3D showcase screenshot)
│   │   │   ├── StatusBadge (LIVE)
│   │   │   ├── TechPills (Next.js · R3F · GSAP · Framer · Tailwind)
│   │   │   ├── Description (hover reveal)
│   │   │   └── LinkButtons (Live Demo · GitHub)
│   │   ├── ProjectCard — FitMirror
│   │   │   ├── ProjectImage (concept)
│   │   │   ├── StatusBadge (COMING SOON)
│   │   │   ├── TechPills (TBD)
│   │   │   └── Description
│   │   └── ProjectCard — Tokyo SPA
│   │       ├── ProjectImage
│   │       ├── StatusBadge (COMING SOON)
│   │       ├── TechPills (React · GSAP · Tailwind)
│   │       └── Description
│   └── ScrollProgressBar (#FE6334)
│
├── MarqueeStrip
│
├── TerminalSection (#terminal)
│   ├── MacOSTitleBar
│   ├── ScanlineOverlay
│   ├── ModeSelector (Mode 1 / 2 / 3 tabs)
│   ├── TerminalBody
│   │   ├── Mode1 — CinematicStory (auto-type on scroll)
│   │   ├── Mode2 — CLI (input + output + history)
│   │   └── Mode3 — Stats (ASCII bar + GitHub count)
│   └── GlitchOverlay (fires randomly 30–40s)
│
├── MarqueeStrip
│
├── ContactSection (#contact)
│   ├── SectionHeading
│   ├── ContactForm
│   │   ├── NameField
│   │   ├── EmailField
│   │   ├── MessageField (with char counter)
│   │   └── SubmitButton
│   ├── SuccessState (replaces form)
│   ├── ErrorState (inline, form persists)
│   └── SocialLinks (GitHub · LinkedIn · Email)
│
└── Footer
    ├── Copyright
    └── MadeWithLine (e.g. "built with React + GSAP + too much chai")

/shadow — ShadowPage
├── ShadowText ("you found the shadow. not many do.")
└── (nothing else)

3.3 DATA SOURCES PER SECTION
SectionData SourceFetch TriggerCache StrategyHero — AvailabilitySupabase RESTOn mountNo cache (always fresh)About — Eva Bloom CommitsGitHub API /repos/manthanut27/eva-bloomOn mountlocalStorage, 1hr TTLAbout — GitHub StatsGitHub API /users/manthanut27On mountlocalStorage, 1hr TTLAbout — HeatmapGitHub contributions APIOn mountlocalStorage, 1hr TTLContact FormVercel Edge Function → ResendOn user submitNo cacheSound PreferencelocalStorage portfolio_soundOn mountPersisted indefinitelyLoading Screen FlagsessionStorage portfolio_loadedOn mountSession onlyHiring Manager ModeReact state (in-memory)On button clickNot persisted

3.4 NAVIGATION FLOWS
ENTRY FLOWS
├── Direct URL "/" → LoadingScreen → Hero
├── Direct URL "/shadow" → ShadowPage (no loading screen)
├── Refresh "/" (same session) → Hero (no loading screen)
└── External link to "/#projects" → Hero (scroll blocked until loading exits)

INTERNAL NAVIGATION
├── Navbar links → smooth scroll to section ID
├── "VIEW MY WORK" CTA → smooth scroll to #projects
├── Social links → new tab (GitHub / LinkedIn / mailto)
├── Project LIVE links → new tab
└── "Back to top" (footer) → scroll to #hero

DEAD ENDS (intentional)
├── /shadow → no exit links (press Back)
└── COMING SOON project links → no action

3.5 SECTION ORDER & SCROLL SEQUENCE
Order  Section         BG Color   Kanji Transition Label
──────────────────────────────────────────────────────────
  0    LoadingScreen   varies     —
  1    Hero            #FDE047    —
  M    MarqueeStrip    #FE6334    —
  2    About           #D9F99D    創 / CREATE
  M    MarqueeStrip    #FE6334    —
  3    Skills          #C0F0F5    技 / SKILLS
  M    MarqueeStrip    #FE6334    —
  4    Projects        #FFA6B5    作 / WORK
  M    MarqueeStrip    #FE6334    —
  5    Terminal        #E9CFF6    端 / TERMINAL
  M    MarqueeStrip    #FE6334    —
  6    Contact         #CBEF9A    連 / CONNECT
       Footer          #FEE832    —