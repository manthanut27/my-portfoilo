// ─── FIZZI COLOR PALETTE ───────────────────────────────────────────
export const colors = {
  fizziYellow: '#FDE047',
  orangeRed: '#FE6334',
  navy: '#0c4a6e',
  lime: '#D9F99D',
  cyan: '#C0F0F5',
  pink: '#FFA6B5',
  lavender: '#E9CFF6',
  green: '#CBEF9A',
  grape: '#572981',
  cherry: '#710523',
  watermelon: '#4B7002',
  berry: '#690B3D',
  footerYellow: '#FEE832',
  darkBg: '#0d1117',
  terminalGreen: '#00ff41',
} as const;

// ─── SECTION CONFIG ────────────────────────────────────────────────
export const sections = [
  { id: 'hero', label: '', kanji: '', bg: colors.fizziYellow },
  { id: 'about', label: 'CREATE', kanji: '創', bg: colors.lime },
  { id: 'skills', label: 'SKILLS', kanji: '技', bg: colors.cyan },
  { id: 'projects', label: 'WORK', kanji: '作', bg: colors.pink },
  { id: 'terminal', label: 'TERMINAL', kanji: '端', bg: colors.lavender },
  { id: 'contact', label: 'CONNECT', kanji: '連', bg: colors.green },
] as const;

// ─── NAV LINKS ─────────────────────────────────────────────────────
export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#terminal', label: 'Terminal' },
  { href: '#contact', label: 'Contact' },
] as const;

// ─── TYPEWRITER STRINGS ────────────────────────────────────────────
export const typewriterStrings = [
  'Full-Stack Developer · React · Node.js · Supabase',
  'Building Eva Bloom · India\'s Jewelry Store',
  'Currently open to full-time roles in Mumbai / Remote',
] as const;

// ─── LOADING SCREEN ────────────────────────────────────────────────
export const loadingPhases = [
  { text: '創造', duration: 800 },
  { text: '構築', duration: 800 },
  { text: 'MANTHAN UTEKAR', duration: 800 },
  { text: 'BUILD. SHIP. REPEAT.', duration: 800 },
] as const;

// ─── DOB FOR LIVE AGE ──────────────────────────────────────────────
export const DOB = new Date('2006-12-27T00:00:00');

// ─── STAT CARDS ────────────────────────────────────────────────────
export const statCards = [
  { label: 'Projects Shipped', value: '6', icon: '🚀' },
  { label: 'Hackathon Won', value: '1', subtitle: 'Hawkathon 2026', icon: '🏆' },
  { label: 'Freelance Clients', value: '2', icon: '💼' },
  { label: 'Eva Bloom Commits', value: 'live', icon: '💎' },
] as const;

// ─── SKILLS DATA ───────────────────────────────────────────────────
export type Proficiency = 'learning' | 'intermediate' | 'confident';

export interface Skill {
  name: string;
  icon: string;
  proficiency: Proficiency;
}

export const proficiencyColors: Record<Proficiency, string> = {
  learning: colors.pink,
  intermediate: colors.lavender,
  confident: colors.orangeRed,
};

export const innerRingSkills: Skill[] = [
  { name: 'React', icon: '⚛️', proficiency: 'confident' },
  { name: 'Next.js', icon: '▲', proficiency: 'confident' },
  { name: 'Node.js', icon: '🟢', proficiency: 'confident' },
  { name: 'Python', icon: '🐍', proficiency: 'learning' },
];

export const middleRingSkills: Skill[] = [
  { name: 'Supabase', icon: '⚡', proficiency: 'confident' },
  { name: 'PostgreSQL', icon: '🐘', proficiency: 'intermediate' },
  { name: 'Prisma', icon: '◆', proficiency: 'confident' },
  { name: 'Redis', icon: '🔴', proficiency: 'intermediate' },
  { name: 'Express', icon: '🚂', proficiency: 'confident' },
  { name: 'Tailwind', icon: '🎨', proficiency: 'confident' },
];

export const outerRingSkills: Skill[] = [
  { name: 'GSAP', icon: '🟩', proficiency: 'confident' },
  { name: 'Three.js', icon: '🔺', proficiency: 'intermediate' },
  { name: 'Framer Motion', icon: '🎬', proficiency: 'intermediate' },
  { name: 'GitHub Actions', icon: '⚙️', proficiency: 'intermediate' },
  { name: 'Vite', icon: '⚡', proficiency: 'confident' },
  { name: 'Vercel', icon: '▲', proficiency: 'confident' },
  { name: 'Razorpay', icon: '💳', proficiency: 'intermediate' },
  { name: 'Zod', icon: '🛡️', proficiency: 'intermediate' },
];

export const allSkills: Skill[] = [
  ...innerRingSkills,
  ...middleRingSkills,
  ...outerRingSkills,
];

// ─── PROJECT DATA ──────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  status: 'LIVE' | 'COMING SOON';
  accentColor: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: 'Eva Bloom',
    description:
      'India\'s premium jewelry e-commerce platform. Full-stack with React, Node.js, Supabase, Prisma, Razorpay payments, and Redis caching.',
    status: 'LIVE',
    accentColor: colors.grape,
    techStack: ['React', 'Node.js', 'Supabase', 'Prisma', 'Razorpay', 'Resend', 'Redis'],
    liveUrl: 'https://evabloom.in',
    githubUrl: 'https://github.com/manthanut27/eva-bloom',
    image: '/projects/eva-bloom.png',
  },
  {
    title: 'BMW M4 GT3',
    description:
      'Immersive 3D car showcase with React Three Fiber, GSAP scroll animations, and Framer Motion transitions.',
    status: 'LIVE',
    accentColor: colors.cherry,
    techStack: ['Next.js', 'R3F', 'GSAP', 'Framer Motion', 'Tailwind'],
    liveUrl: 'https://bmw-m4-gt3.vercel.app',
    githubUrl: 'https://github.com/manthanut27/bmw-m4-gt3',
    image: '/projects/bmw-m4.png',
  },
  {
    title: 'FitMirror',
    description: 'AI-powered fitness tracking application with real-time pose detection and workout analytics.',
    status: 'COMING SOON',
    accentColor: colors.watermelon,
    techStack: ['React', 'TensorFlow.js', 'Node.js'],
    image: '/projects/fitmirror.png',
  },
  {
    title: 'Tokyo SPA',
    description:
      'Japanese-inspired single page application with cinematic GSAP animations and immersive scroll experiences.',
    status: 'COMING SOON',
    accentColor: colors.berry,
    techStack: ['React', 'GSAP', 'Tailwind'],
    image: '/projects/tokyo-spa.png',
  },
];

// ─── TERMINAL COMMANDS ─────────────────────────────────────────────
export const terminalCommands: Record<string, { description: string; output: string }> = {
  help: {
    description: 'List all commands with descriptions',
    output: `Available commands:
  help       — List all commands with descriptions
  skills     — Formatted skill list by category
  projects   — Project list with status and links
  contact    — Email + social links
  stats      — GitHub stats + fun facts
  japanese   — Switch language to Japanese for 5s
  clear      — Clear terminal output`,
  },
  skills: {
    description: 'Formatted skill list by category',
    output: `┌─ FRONTEND ──────────────────────┐
│ React · Next.js · Tailwind     │
│ GSAP · Three.js · Framer       │
├─ BACKEND ──────────────────────┤
│ Node.js · Express · Python     │
│ Supabase · PostgreSQL · Redis  │
│ Prisma · Zod                   │
├─ TOOLING ──────────────────────┤
│ Vite · Vercel · GitHub Actions │
│ Razorpay · Resend              │
└────────────────────────────────┘`,
  },
  projects: {
    description: 'Project list with status and links',
    output: `╔══════════════════════════════════════╗
║ Eva Bloom        [LIVE]   evabloom.in
║ BMW M4 GT3       [LIVE]   bmw-m4-gt3.vercel.app
║ FitMirror        [WIP]    coming soon...
║ Tokyo SPA        [WIP]    coming soon...
╚══════════════════════════════════════╝`,
  },
  contact: {
    description: 'Email + social links',
    output: `📧  manthan@email.com
🐙  github.com/manthanut27
💼  linkedin.com/in/utkmanthan
📍  Mumbai, India`,
  },
  stats: {
    description: 'GitHub stats + fun facts',
    output: `Loading GitHub stats...
──────────────────────────────────
☕ Chai consumed:        ∞
🐛 Bugs created:        too many
🐛 Bugs fixed:          most of them
⌨️ Keyboard smashes:    412
🎌 Japanese words known: 47
💤 Sleep avg:           4.2 hrs/day`,
  },
  japanese: {
    description: 'Switch terminal to Japanese for 5s',
    output: `言語が日本語に変わりました...
ようこそ、マンタンのポートフォリオへ。
5秒後に英語に戻ります。`,
  },
  clear: {
    description: 'Clear terminal output',
    output: '',
  },
};

// ─── CINEMATIC STORY LINES ─────────────────────────────────────────
export const cinematicLines = [
  '> initializing portfolio...',
  '> loading modules: react, node, gsap, three.js',
  '> status: all systems operational',
  '>',
  '> // THE STORY',
  '> I started coding at 16.',
  '> Built my first React app at 17.',
  '> Shipped Eva Bloom — a real e-commerce store.',
  '> Won Hawkathon 2026.',
  '> Now I\'m 18, looking for my first full-time role.',
  '>',
  '> Let\'s build something great together.',
];

// ─── MARQUEE CONTENT ───────────────────────────────────────────────
export const marqueeContent =
  'REACT · NODE.JS · SUPABASE · BUILD · SHIP · REPEAT · GSAP · THREE.JS · FRAMER MOTION · NEXT.JS · TAILWIND · PRISMA · ';

// ─── SOCIAL LINKS ──────────────────────────────────────────────────
export const socialLinks = [
  { platform: 'GitHub', handle: 'manthanut27', url: 'https://github.com/manthanut27', icon: 'github' },
  { platform: 'LinkedIn', handle: 'utkmanthan', url: 'https://www.linkedin.com/in/utkmanthan', icon: 'linkedin' },
  { platform: 'Email', handle: 'manthan@email.com', url: 'mailto:manthan@email.com', icon: 'email' },
] as const;

// ─── BIO TEXT ──────────────────────────────────────────────────────
export const bioText = `I'm Manthan — an 18-year-old full-stack developer from Mumbai, India. I build production-grade web applications with React, Node.js, and Supabase. From running an e-commerce jewelry store (Eva Bloom) to crafting immersive 3D car showcases (BMW M4 GT3), I ship products that users actually love. Currently hunting for my first full-time role while freelancing and winning hackathons. When I'm not coding, you'll find me exploring Japanese culture or drinking way too much chai.`;

// ─── GITHUB CONFIG ─────────────────────────────────────────────────
export const GITHUB_USERNAME = 'manthanut27';
export const GITHUB_CACHE_KEY = 'gh_stats';
export const GITHUB_CACHE_TTL = 3_600_000; // 1 hour

// ─── KONAMI CODE ───────────────────────────────────────────────────
export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

// ─── HEATMAP CONFIG ────────────────────────────────────────────────
export const heatmapColors = [
  'rgba(12,74,110,0.08)', // 0 commits
  '#CBEF9A',              // 1-3
  '#D9F99D',              // 4-7
  'rgba(254,99,52,0.6)',  // 8-14
  '#FE6334',              // 15+
] as const;
