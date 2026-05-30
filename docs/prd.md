SECTION 1: PRODUCT REQUIREMENTS ───
PROJECT     : manthan-utekar-portfolio
VERSION     : 1.0.0
AUTHOR      : Manthan Utekar
TYPE        : Personal Portfolio — Static SPA + Edge Functions
STACK       : React 18 · Vite 5 · Tailwind CSS v4 · GSAP 3 · Framer Motion 11 · Three.js r165
HOSTING     : Vercel (frontend + edge functions)
LAST UPDATED: 2026-05-30

1.1 PURPOSE
Build a production-grade personal portfolio SPA that:

Converts recruiter visits into interview calls for fresher frontend/full-stack roles
Demonstrates technical depth through the site itself (animations, 3D, integrations)
Showcases 4 projects: Eva Bloom, BMW M4 GT3, FitMirror (WIP), Tokyo SPA (WIP)
Supports a Hiring Manager Mode that strips all creative elements into a clean professional layout


1.2 TARGET USERS
PersonaGoalKey SectionTechnical RecruiterEvaluate candidate fit in under 10 secondsHero → availability badge → ResumeHiring ManagerValidate technical skill and project qualityProjects → GitHub stats → TerminalFellow DeveloperExplore implementation and easter eggsTerminal CLI · /shadow · Konami codeFreelance ClientAssess design sense and contactHero → Projects → Contact form

1.3 FUNCTIONAL REQUIREMENTS
FR-01 · Loading Screen

REQ-01a: On first visit per session, render one of two loading screens selected at random (50/50)
REQ-01b: Screen A — cinematic text reveal sequence: 「創造」→ 「構築」→ MANTHAN UTEKAR → BUILD. SHIP. REPEAT.
REQ-01c: Screen B — two-phase ink splash animation: black ink on white inverts to violet ink on dark
REQ-01d: Total duration: 3200ms, then smooth transition into site
REQ-01e: sessionStorage flag portfolio_loaded prevents re-show within same browser session
REQ-01f: After exit, force scroll position to top before revealing site

FR-02 · Navbar

REQ-02a: Fixed top, backdrop blur, z-index above all content
REQ-02b: MU logo in Syne 800 weight
REQ-02c: Active section highlight driven by IntersectionObserver watching all section roots
REQ-02d: Active nav link shows orange-red #FE6334 underline (2px bottom border)
REQ-02e: Scroll progress bar fills across top of viewport (width = scrollY / maxScroll * 100%)
REQ-02f: RESUME button opens PDF in new tab
REQ-02g: Mute toggle persists sound preference to localStorage
REQ-02h: Mobile (<768px): hamburger icon → full-screen overlay menu with staggered link reveal

FR-03 · Hero Section

REQ-03a: Background color #FDE047 (Fizzi yellow), full viewport height
REQ-03b: "⚡ BUILDING: FITMIRROR" badge — static text, hardcoded
REQ-03c: Availability badge text and color driven by Supabase site_config table field availability_status (values: open | busy)

open → #FE6334 bg, text "OPEN TO WORK"
busy → #0c4a6e bg, text "CURRENTLY BUSY"


REQ-03d: Staggered name reveal — MANTHAN (navy #0c4a6e) slides up 700ms · UTEKAR (orange-red #FE6334) slides up 700ms with 150ms offset · tagline fades in · typewriter starts
REQ-03e: Live age counter: real-time tick every 1000ms from DOB 2006-12-27T00:00:00 local time
REQ-03f: Typewriter effect cycles through 3 subtitle strings (interval: 3000ms, backspace speed: 40ms/char, type speed: 60ms/char)

"Full-Stack Developer · React · Node.js · Supabase"
"Building Eva Bloom · India's Jewelry Store"
"Currently open to full-time roles in Mumbai / Remote"


REQ-03g: VIEW MY WORK button → smooth scroll to #projects · DOWNLOAD CV → download PDF
REQ-03h: Decorative element right side: MU monogram with floating Fizzi-colored blobs and concentric spinning rings (CSS only, no Three.js)
REQ-03i: Scroll indicator: vertical 1px line + "SCROLL" label, opacity:0 → 1 at 1.2s after mount
REQ-03j: Scroll indicator hides when user has scrolled > 100px

FR-04 · About Section

REQ-04a: Background color #D9F99D (Fizzi lime)
REQ-04b: Bio paragraph (~80 words), hardcoded
REQ-04c: Four stat cards (frosted glass):

Projects Shipped (hardcoded: 6)
Hackathon Won (hardcoded: 1 — Hawkathon 2026)
Freelance Clients (hardcoded: 2)
Eva Bloom Commits — live from GitHub API


REQ-04d: Live GitHub stats via REST API (GET /users/manthanut27):

Public Repos · Total Stars (sum across repos) · Contributions (current year via contributions API)
Cache in localStorage key gh_stats with TTL 3600000ms (1 hour)
Fallback: show last cached values or skeleton loaders


REQ-04e: GitHub contribution heatmap — 52×7 grid, color scale using Fizzi palette:

0 commits: rgba(12,74,110,0.08)
1–3: #CBEF9A
4–7: #D9F99D
8–14: #FE6334 at 0.6 opacity
15+: #FE6334
Source: GitHub contributions API (cached same as above)
Mounted guard: render only client-side (prevent SSR/hydration mismatch)


REQ-04f: Tokyo city block 3D scene (Three.js GLB) — scroll-triggered Y-axis rotation via GSAP ScrollTrigger; auto-fallback to CSS illustration on mobile
REQ-04g: Section background #D9F99D scrolls into #C0F0F5 (Skills section) via GSAP background color tween on section boundary

FR-05 · Skills Section

REQ-05a: Background color #C0F0F5
REQ-05b: Section label: "SKILLS" in Space Mono 74px all-caps, navy #0c4a6e
REQ-05c: Three concentric orbit rings rendered in Three.js (desktop/high) or CSS (mobile/low):

Inner ring: 4 skills, 30s clockwise, radius 120px
Middle ring: 6 skills, 50s counter-clockwise, radius 210px
Outer ring: 8 skills, 70s clockwise, radius 300px


REQ-05d: Skill assignment:

Inner (4): React · Next.js · Node.js · Python (learning)
Middle (6): Supabase · PostgreSQL · Prisma · Redis · Express · Tailwind
Outer (8): GSAP · Three.js · Framer Motion · GitHub Actions · Vite · Vercel · Razorpay · Zod


REQ-05e: Each orb: 52px diameter, white bg with 0.5px border, tech icon SVG centered
REQ-05f: Orb hover state: scale 1.4×, show skill name label + color-coded proficiency bar below orb (duration 200ms ease)

Proficiency bar colors: #FFA6B5 (learning) · #E9CFF6 (intermediate) · #FE6334 (confident)


REQ-05g: Center: MU monogram, 60px, slow 20s rotation
REQ-05h: Mobile fallback: 3-column CSS grid, all 18 orbs, same hover state, no Three.js import

FR-06 · Projects Section

REQ-06a: Background color #FFA6B5
REQ-06b: Horizontal scroll track — draggable via mouse/touch
REQ-06c: Violet progress bar (replaced by #FE6334 in Fizzi palette) shows scroll progress within track
REQ-06d: 4 project cards:

CardStatusAccent ColorLinkEva BloomLIVE#572981 grapeEva Bloom URLBMW M4 GT3LIVE#710523 cherryBMW project URLFitMirrorCOMING SOON#4B7002 watermelondisabledTokyo SPACOMING SOON#690B3D berrydisabled

REQ-06e: Card rest state: perspectiveY 6deg, translateY 0
REQ-06f: Card hover state: perspectiveY 0deg, translateY -8px, scale 1.02 (200ms ease-out)
REQ-06g: Card hover reveals: description slides up from below · buttons reveal with 80ms stagger · tech pills brighten
REQ-06h: Mouse shimmer: radial gradient tracks cursor position inside card via mousemove listener
REQ-06i: Each card's left border uses that project's accent color (4px solid)
REQ-06j: LIVE badge: #FE6334 bg · COMING SOON badge: #0c4a6e bg, #FDE047 text

FR-07 · Terminal Section

REQ-07a: Background color #E9CFF6 (lavender)
REQ-07b: macOS-style title bar (traffic lights: red/amber/green circles + centered title "manthan@portfolio")
REQ-07c: Scanline CSS overlay (repeating-linear-gradient, 2px lines, opacity 0.03)
REQ-07d: Random glitch effect fires every 30–40 seconds (randomized interval): briefly shifts terminal content 2–4px in X and Y, drops opacity to 0.85, recovers in 150ms
REQ-07e: Three modes — default entry is Mode 1:

Mode 1 (Cinematic): auto-types 8 story lines on scroll-into-view, character by character, blinking cursor
Mode 2 (CLI): full command input, arrow-key history (last 20 commands), defined command set
Mode 3 (Stats): animated ASCII progress bar, live GitHub commits count, static funny stats


REQ-07f: Mode 2 command set:

CommandOutputhelpList all commands with descriptionsskillsFormatted skill list by categoryprojectsProject list with status and linkscontactEmail + social linksstatsGitHub stats + funny static statschatSwitches to AI chat mode (future: calls Claude API)japaneseSwitches terminal language to Japanese for 5sclearClears terminal output

REQ-07g: Easter egg: typing japanese switches output language for exactly 5000ms then reverts
REQ-07h: Glitch fires independently of mode

FR-08 · Contact Section

REQ-08a: Background color #CBEF9A
REQ-08b: Section heading in Syne 800, 88px, navy
REQ-08c: Frosted glass contact form: Name · Email · Message fields
REQ-08d: Client-side validation:

Name: required, min 2 chars
Email: required, valid email regex
Message: required, min 10 chars, max 1000 chars


REQ-08e: On submit: POST to /api/contact Vercel Edge Function → Resend API → email to manthan's address
REQ-08f: Success state: form replaced by success message + animated checkmark
REQ-08g: Error state: inline error below form, red text, retry button
REQ-08h: Social links: GitHub (manthanut27) · LinkedIn (utkmanthan) · Email (direct mailto)

FR-09 · Global Features

REQ-09a: Scrolling marquee strip between every section — content: tech skills and BUILD·SHIP·REPEAT · background: #FE6334 · text: #FDE047
REQ-09b: SVG brushstroke ink dividers between sections — each unique, 5 variants
REQ-09c: Section transitions: kanji character + English label fades in with scale 0.8→1 between sections (triggered by IntersectionObserver)
REQ-09d: Sound system:

Ambient loop: low-volume background track (looping, muted by default)
Keyboard click sound: plays on each keypress in terminal Mode 2
Mute toggle persists state to localStorage key portfolio_sound


REQ-09e: Konami Code easter egg (↑↑↓↓←→←→BA): full-screen #FDE047 overlay for 3000ms
REQ-09f: /shadow route: ultra-minimal page, Space Mono only, black/white, text: "you found the shadow. not many do."
REQ-09g: Hiring Manager Mode: fixed bottom-right button "👔 Hiring Manager Mode" · toggles:

Hides: marquee strips, ink dividers, terminal section, orb 3D rings, sound button, easter eggs
Shows: clean single-column layout, all content sections in order, professional typography only




1.4 NON-FUNCTIONAL REQUIREMENTS
Performance
TierDetection3D/ParticlesThree.jsHighGPU score > 0.5 AND cores ≥ 4 AND RAM ≥ 4GBFull 3D + 3000 particlesImportedMidGPU score 0.2–0.5 OR cores 2–3Simplified 3D + 1500 particlesImportedLowGPU score < 0.2CSS 2D fallback onlyNot importedMobilewindow.innerWidth < 768Full 2D CSS onlyNever imported

Detection: detect-gpu + navigator.hardwareConcurrency + navigator.deviceMemory
All heavy assets (Three.js, GLBs, Spline) loaded via IntersectionObserver lazy loading
GitHub API responses cached in localStorage, TTL 1 hour
Target: LCP < 2.5s on desktop 4G, FID < 100ms, CLS < 0.1

SEO

Full Open Graph tags (og:title, og:description, og:image, og:url)
Twitter card meta (summary_large_image)
Person structured data schema (JSON-LD)
sitemap.xml listing all routes including /shadow
robots.txt: allow all, sitemap reference
site.webmanifest with icon set

Accessibility

All images: descriptive alt text
All icon-only buttons: aria-label
Keyboard navigation: Tab order logical across all interactive elements
Reduced motion: @media (prefers-reduced-motion: reduce) disables all GSAP/Framer animations, shows static versions
Color contrast: all text on Fizzi bg colors passes WCAG AA (4.5:1 minimum)

Responsive

Desktop (1280px+): full experience
Tablet (768px–1279px): 2D CSS fallbacks, no Three.js, all animations preserved
Mobile (375px–767px): full 2D, no Three.js, all sections intact, hamburger nav


1.5 SUCCESS METRICS
MetricTargetLighthouse Performance≥ 90 desktop, ≥ 75 mobileLighthouse SEO100Lighthouse Accessibility≥ 95Contact form delivery rate100% (Resend)GitHub API cache hit rate> 80% (1hr TTL)Loading screen shown per sessionExactly once