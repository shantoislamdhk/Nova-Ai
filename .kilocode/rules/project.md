# Project: Nova AI — AI SaaS landing page + waitlist (portfolio project)

## Stack (do not change or add libraries without asking)
- React 18 + Vite, JavaScript (no TypeScript), functional components + hooks only
- Tailwind CSS v4 (CSS-first: `@import "tailwindcss";` and `@theme` in src/index.css). There is NO tailwind.config.js — never create one, never use v3 syntax.
- framer-motion for animation, lucide-react for icons, @supabase/supabase-js for the waitlist

## Structure
src/components/ui/  (Button, Container, Section, Badge)
src/components/sections/  (Navbar, Hero, LogoCloud, Features, HowItWorks, Pricing, Testimonials, FAQ, WaitlistCTA, Footer)
src/lib/supabase.js, src/hooks/, src/data/ (all copy/content lives here as arrays, not hardcoded in JSX)

## Rules
- One component per file, PascalCase filenames, default export.
- Mobile-first, responsive at sm/md/lg. Dark theme, modern SaaS look (gradient accents, subtle glow, glassmorphism cards).
- Semantic HTML, accessible: labels on inputs, alt text, focus states, aria where needed.
- No placeholder lorem ipsum: write realistic copy for a fictional AI product called "Nova AI".
- Never hardcode secrets. Use import.meta.env.VITE_* and keep .env.example updated.
- After every task: list the files you changed, and tell me the exact command/URL to verify. Do not start the next task by yourself.
- If unsure about a library API, say so instead of guessing.
