FORMAT  : As a [persona], I want [goal], so that [benefit]
PRIORITY: P0 = launch blocker · P1 = launch required · P2 = nice-to-have
STATUS  : All P0 and P1 stories required for v1.0.0

PERSONA A — TECHNICAL RECRUITER

US-001 · Loading Screen First Impression
As a recruiter, I want to see an engaging loading screen on first visit,
so that I immediately understand this candidate has strong frontend taste.
Acceptance Criteria:

 Loading screen renders within 200ms of page load
 Exactly one of two variants shown per session (random, 50/50)
 Screen A: three text phases complete in sequence with visible transitions
 Screen B: ink animation phases complete — white-to-dark invert visible
 Total duration is 3000–3400ms before site is revealed
 Refreshing the page in the same session does NOT show loading screen again
 Opening site in new tab shows loading screen again
 Smooth opacity/transform transition from loading screen to site (no flash)

Priority: P0

US-002 · Immediate Availability Signal
As a recruiter, I want to see whether the candidate is available for hire at a glance,
so that I don't waste time if they're not open.
Acceptance Criteria:

 Availability badge renders in Hero section above the fold
 Badge reads "OPEN TO WORK" when Supabase availability_status = 'open'
 Badge reads "CURRENTLY BUSY" when Supabase availability_status = 'busy'
 Badge color changes with status (orange-red for open, navy for busy)
 If Supabase fetch fails, badge defaults to "OPEN TO WORK" (optimistic default)
 Badge is visible on mobile without scrolling

Priority: P0

US-003 · Resume Download
As a recruiter, I want to download the candidate's resume in one click,
so that I can share it with the hiring team immediately.
Acceptance Criteria:

 RESUME button in navbar and DOWNLOAD CV button in hero both trigger download
 Download is a PDF file named Manthan_Utekar_Resume.pdf
 File opens in new tab (not forced download) on desktop
 Both buttons are visible without scrolling on desktop viewport
 File is served from Vercel CDN (not external link)

Priority: P0

US-004 · GitHub Activity Proof
As a recruiter, I want to see verified GitHub activity,
so that I can confirm the candidate writes real code consistently.
Acceptance Criteria:

 GitHub contribution heatmap renders in About section
 Heatmap shows 52 weeks × 7 days grid (364 cells minimum)
 Cells are color-coded by commit count using Fizzi palette scale
 Public repos count, total stars, and contributions this year are displayed
 Data is fetched from GitHub REST API (not hardcoded)
 If API fails or rate-limits, previously cached data is shown
 Skeleton loader shown during fetch (not blank space)
 Cache TTL is exactly 1 hour (3600000ms)
 Heatmap does not cause hydration mismatch (mounted guard in place)

Priority: P1

US-005 · Contact Form
As a recruiter, I want to send the candidate a message directly from the portfolio,
so that I don't have to leave the page to reach out.
Acceptance Criteria:

 Contact form has three fields: Name, Email, Message
 Submit button is disabled while form is invalid
 Name validates: required, min 2 chars, error shown inline
 Email validates: required, valid format, error shown inline
 Message validates: required, min 10 chars, max 1000 chars, char count shown
 On valid submit: loading state shown on button
 On success: form is replaced by success UI (no page reload)
 On API error: inline error message shown, form stays filled, retry possible
 Manthan receives email via Resend within 60 seconds
 Email includes sender name, email, and full message body

Priority: P0

PERSONA B — HIRING MANAGER

US-006 · Hiring Manager Mode
As a hiring manager who finds animations distracting, I want to toggle a clean layout,
so that I can evaluate the candidate's work without visual noise.
Acceptance Criteria:

 "👔 Hiring Manager Mode" button visible in bottom-right corner of every page
 On click: marquee strips disappear, ink dividers disappear, terminal section hidden, orbit rings replaced with skill grid, sound button hidden
 Professional layout renders all content sections in order, single column
 Toggle button changes label to "Exit Hiring Manager Mode" when active
 Click again: all creative elements restore, layout returns to default
 Preference is NOT persisted (resets on page reload — intentional)
 All project card information still accessible in HMM

Priority: P1

US-007 · Project Quality Evaluation
As a hiring manager, I want to see what projects the candidate has shipped,
so that I can assess real-world experience and technical maturity.
Acceptance Criteria:

 4 project cards visible in Projects section
 Each card shows: project name, description, tech stack pills, status badge, links
 LIVE badge on Eva Bloom and BMW M4 GT3
 COMING SOON badge on FitMirror and Tokyo SPA
 Live project links open in new tab
 Coming Soon project links are visually disabled (cursor: not-allowed, no navigation)
 Each card has a distinct accent color matching project identity
 Horizontal scroll is operable by keyboard (arrow keys) and touch

Priority: P0

US-008 · Skills Visibility
As a hiring manager, I want to see the candidate's technology stack clearly,
so that I can match them to open roles.
Acceptance Criteria:

 All 18 skills are visible (either via orbit rings or mobile grid)
 Skills are grouped by category (frontend, backend, tooling)
 Hovering an orb shows the skill name and proficiency level
 Proficiency is color-coded (learning / intermediate / confident)
 In Hiring Manager Mode, skills display in plain 3-column grid

Priority: P1

PERSONA C — FELLOW DEVELOPER

US-009 · Terminal CLI Easter Eggs
As a developer, I want to interact with a real CLI in the terminal section,
so that I can discover hidden content and assess the candidate's personality.
Acceptance Criteria:

 Terminal input is focusable by clicking anywhere in terminal body
 All 8 commands produce correct output: help, skills, projects, contact, stats, chat, japanese, clear
 help lists all commands with one-line descriptions
 clear wipes terminal output (not page reload)
 japanese changes all terminal output language for exactly 5000ms then reverts
 Arrow-up / arrow-down cycles through last 20 commands
 Glitch animation fires at least once per 40-second viewing period
 Scanline overlay is visible on the terminal body

Priority: P1

US-010 · Konami Code
As a developer, I want to discover the Konami code easter egg,
so that I can enjoy a hidden reward for knowing the sequence.
Acceptance Criteria:

 Sequence ↑↑↓↓←→←→BA triggers the easter egg
 Full-screen #FDE047 overlay appears instantly
 Overlay disappears after exactly 3000ms
 Easter egg works on any page, any scroll position
 Easter egg does NOT interfere with normal keyboard navigation after firing
 Hidden in Hiring Manager Mode (easter egg still fireable but overlay uses neutral color)

Priority: P2

US-011 · /shadow Secret Route
As a developer, I want to find the /shadow secret page,
so that I feel rewarded for exploring beyond the obvious.
Acceptance Criteria:

 Navigating to /shadow renders the secret page
 Page is Space Mono only, black text on white background, zero decorations
 Text reads exactly: "you found the shadow. not many do."
 No navbar, no footer, no back link (intentional)
 Page is included in sitemap.xml (discoverable, not blocked)
 Page title in browser tab: "shadow // manthan utekar"

Priority: P2

PERSONA D — SITE OWNER (MANTHAN)

US-012 · Availability Status Control
As the site owner, I want to update my availability status without redeploying,
so that recruiters always see accurate information.
Acceptance Criteria:

 Supabase table site_config has a row with key availability_status
 Updating that row value to 'open' or 'busy' changes the badge within 30 seconds of next page load
 No code change or Vercel redeploy required
 Read is unauthenticated (public anon key, read-only policy)

Priority: P1

US-013 · Sound System Control
As a site visitor, I want to mute the ambient sound,
so that I can browse the portfolio in a quiet environment.
Acceptance Criteria:

 Sound is muted by default on first visit
 Mute toggle button visible in navbar (speaker icon)
 Clicking unmutes: ambient loop starts, keyboard click sounds active
 Clicking again mutes all audio
 Preference persists in localStorage key portfolio_sound across sessions
 No audio plays automatically without user interaction (browser policy compliance)

Priority: P1

US-014 · Responsive Mobile Experience
As a mobile visitor, I want to see the full portfolio on my phone,
so that I can evaluate the candidate anywhere.
Acceptance Criteria:

 All sections render at 375px viewport width without horizontal overflow
 Navbar collapses to hamburger at < 768px
 Hamburger tap opens full-screen overlay menu
 Menu items are large enough for thumb tap (min 44px touch target)
 Three.js is never imported or executed on mobile
 Skills section shows 3-column grid (not orbit rings) on mobile
 Projects horizontal scroll works with touch swipe
 Tokyo city block shows CSS illustration (not GLB) on mobile
 Contribution heatmap scrolls horizontally if needed

Priority: P0
