# Pricing, Testimonials, and FAQ sections

## Goal

Add three landing-page sections to the Nova AI site, all content-driven from `src/data/`:

- **Pricing** — 3 tiers (Solo / Team / Business), middle tier highlighted "Most popular", monthly/yearly toggle driven by `useState`.
- **Testimonials** — 3 cards, fictional people, initials avatars.
- **FAQ** — accessible accordion, one open at a time, animated.

Final section order in `src/App.jsx`: Hero, LogoCloud, Features, HowItWorks, **Pricing, Testimonials, FAQ**.

## Decisions (already confirmed with the user)

| Decision | Choice |
| --- | --- |
| Price data model | Explicit `price: { monthly, yearly }` per tier; no math in JSX |
| Tier names | Solo / Team / Business |
| Plan-name consistency | Update `src/data/hero.js` to use Team/Business instead of "Scale to Growth" |
| Toggle a11y | Two `<button role="radio" aria-checked>` inside `role="radiogroup"`, sliding highlight |
| Default period | `monthly`; yearly button carries a "Save 20%" label (not pre-selected) |
| Tier CTAs | Solo/Team -> `#waitlist`; Business -> `mailto:hello@nova.ai` |
| Testimonial layout | 1 / 2 / 3 column grid (`md:grid-cols-2 lg:grid-cols-3`) |
| Avatar | Gradient circle + initials, tone keyed from a data field (`nova` / `aqua` / `blush`) |
| FAQ a11y | `<button aria-expanded aria-controls>` inside `<h3>`; panel `role="region" aria-labelledby`; framer-motion height animation |
| FAQ initial state | First item open (`openId` = first item's id) |
| WaitlistCTA | Out of scope. CTAs link to `#waitlist`; no section has that id yet (already true for Navbar/Hero) |
| Verification | `npm run lint`, `npm run build`, then `npm run dev` + manual browser pass |

## Existing conventions to follow

From `src/components/sections/Features.jsx` and `HowItWorks.jsx`:

- `import { motion, useReducedMotion } from 'framer-motion'`
- Local consts: `const easeOutSoft = [0.22, 1, 0.36, 1]` and
  `const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } } }`
- Wrapper: `<motion.div initial={reduceMotion ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>`
- Every child: `variants={reduceMotion ? undefined : fadeUp}`
- Structure: `Section` -> `Container` -> centered `Badge` (from eyebrow) -> `h2` (title) -> `p` (subtitle) -> content list
- Section padding: `className="relative py-20 sm:py-28"`; alternate `tone`: Features = `panel`, HowItWorks = `surface`, Hero = `void`. Use `bordered` on alternating sections so bands stay visually distinct. **Pricing = `panel`, Testimonials = `surface`, FAQ = `void` with `bordered`.**

From `src/index.css` (`@theme` tokens — use these, do not add new colors):

`void surface panel elevated line muted ink`, `nova-100..600`, `aqua-300/400/500`, `blush-400/500`,
`radius-card`, `radius-pill`, `shadow-glow`, `shadow-glow-sm`, `shadow-panel`, `ease-out-soft`,
plus `@utility` helpers `text-gradient`, `glass`, `glow-ring`.

Other primitives: `Section` (`id`, `tone`, `bordered`), `Container` (`size="narrow"` suits FAQ),
`Badge` (`tone`: nova/aqua/blush/neutral), `Button` (`variant`: primary/ghost, `size`: sm/md/lg, `as`).

Rules from `.kilocode/rules/project.md`: one component per file, PascalCase, default export, no comments
in code, mobile-first, all copy in `src/data/`.

## Tasks

### 1. `src/data/pricing.js`

Shape:

```js
export const pricingSection = {
  eyebrow: { label: 'Pricing', tone: 'nova' },
  title: '...',
  subtitle: '...',
  billing: {
    monthly: { id: 'monthly', label: 'Monthly' },
    yearly: { id: 'yearly', label: 'Yearly', badge: 'Save 20%' },
    default: 'monthly',
  },
  note: '...',            // e.g. "Prices in USD. Cancel anytime."
  tiers: [
    {
      id: 'solo',
      name: 'Solo',
      description: '...',
      price: { monthly: 29, yearly: 23 },   // explicit, no computation
      periodLabel: 'per agent / month',
      featured: false,
      badge: null,                            // 'Most popular' on the middle tier only
      cta: { label: 'Join waitlist', href: '#waitlist' },
      features: ['...', '...'],               // 4-6 short strings each
      footnote: null,                         // optional per-tier line
    },
    { id: 'team',    name: 'Team',    featured: true,  badge: 'Most popular', price: { monthly: 79, yearly: 63 }, cta: { label: 'Join waitlist', href: '#waitlist' }, /* ... */ },
    { id: 'business',name: 'Business',featured: false, badge: null,            price: { monthly: 199, yearly: 159 }, cta: { label: 'Contact sales', href: 'mailto:hello@nova.ai' }, /* ... */ },
  ],
}
```

Use `site.cta.primary` from `site.js` for the waitlist labels rather than duplicating the string —
import it in the data file. Yearly numbers must be exactly 20% below monthly so the "Save 20%" label
is truthful. Featured tier is `tiers[1]` (`Team`); do not hardcode the index, read `featured`.

### 2. `src/data/testimonials.js`

```js
export const testimonialsSection = {
  eyebrow: { label: 'Testimonials', tone: 'aqua' },
  title: '...',
  subtitle: '...',
  items: [
    { id: '...', quote: '...', name: 'Dana Whitfield', role: 'Head of Support, Northwind', initials: 'DW', tone: 'nova' },
    { id: '...', quote: '...', name: 'Marcus Oyelaran', role: 'Support Lead, Lumenly',    initials: 'MO', tone: 'aqua' },
    { id: '...', quote: '...', name: 'Priya Raman',    role: 'VP Customer Experience, Kestrel', initials: 'PR', tone: 'blush' },
  ],
}
```

Names must be fictional and must not collide with the fictional customers in `src/data/hero.js`
(Dana Whitfield, Marcus Oyelaran, Priya Raman, Tomas Lindqvist). Pick different people. Company names
should be consistent with the `logoCloud` list in `src/data/partners.js`
(Northwind, Lumenly, Papertrail, Kestrel, Halcyon, Ridgeway) or otherwise plausible fictional companies.
Write realistic 2-3 sentence quotes with a concrete metric (first-response time, deflection rate, hours
saved) — no lorem ipsum, no generic praise.

### 3. `src/data/faq.js`

```js
export const faqSection = {
  eyebrow: { label: 'FAQ', tone: 'blush' },
  title: '...',
  subtitle: '...',
  items: [
    { id: 'grounding', question: '...', answer: '...' },   // first item is open on load
    // 6-8 items total: data privacy/retention, accuracy & hallucinations, human approval,
    // integrations, onboarding time, pricing & billing, cancellation, support
  ],
}
```

Answers must be specific to this product (grounded in customer docs, human approval step, Zendesk /
Intercom / Front / Slack support) and consistent with `features.js` and `howItWorks.js`. No contradictions
(e.g. do not claim full auto-send is included on every tier, since `features.js` frames approval as mandatory).

### 4. `src/components/sections/Pricing.jsx`

Structure:

- `Section id="pricing" tone="panel" bordered className="relative py-20 sm:py-28"` + a decorative
  blurred `bg-nova-500/10` blob (aria-hidden, `-z-10`) matching the Features treatment.
- `useState(pricingSection.billing.default)` for the period. Derive with
  `const period = useState(...)` -> `const [period, setPeriod] = useState(pricingSection.billing.default)`.
  Price read as `tier.price[period]`.
- Toggle markup:
  - wrapper `role="radiogroup" aria-label="Billing period"` on a `glass rounded-pill` track.
  - two `<button type="button" role="radio" aria-checked={period === id} onClick={() => setPeriod(id)}>`.
  - Sliding highlight: a `motion.span layout` absolutely positioned behind the active button, or
    `motion.span` keyed on `period`. `initial={reduceMotion ? false : 'hidden'}` and
    `transition={{ duration: 0.35, ease: easeOutSoft }}`; skip the slide entirely when
    `reduceMotion` is true.
  - Yearly button renders `pricingSection.billing.yearly.badge` as a small `Badge`/pill.
  - Optional arrow-key roving focus: if implemented, keep it simple — arrow keys move `period` and focus.
    Otherwise two plain tab stops are acceptable; state which was chosen.
- Card grid: `grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6`. Middle `featured` tier gets
  `border-nova-400/40 bg-elevated/80 shadow-glow` plus `lg:-my-4 lg:py-8` (or a scale) so it reads as
  elevated; on mobile it should not overflow horizontally. Featured `Badge tone="nova"` renders
  `tier.badge` at the card top, absolutely positioned or as the first child.
- Price block: `font-display text-4xl sm:text-5xl` for the number, `/mo` suffix, `periodLabel` below in
  `text-muted`. Add `aria-live="polite"` on the price region so the toggle change is announced.
- Feature list: `<ul>` with `Check` from `lucide-react`, `text-sm text-muted`, `aria-hidden` on icons.
- CTA: `Button as="a" href={tier.cta.href} variant={tier.featured ? 'primary' : 'ghost'} className="w-full"`.
- `pricingSection.note` in a centered `text-xs text-muted` line under the grid.
- Animation: `whileInView` + `staggerChildren: 0.08`, each card a `motion.li` with `fadeUp`, plus a hover
  `translate-y-1` / border transition like Features.

### 5. `src/components/sections/Testimonials.jsx`

- `Section id="testimonials" tone="surface" bordered className="relative py-20 sm:py-28"`.
- Header block identical in shape to Features (Badge / h2 / p), all from
  `testimonialsSection`.
- Grid: `grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6`, `motion.li` per item with `fadeUp`.
- Card: `rounded-card border border-white/[0.08] bg-elevated/70 p-6`, hover lift like Features.
  `Quote` from `lucide-react` as a decorative `aria-hidden` glyph.
- Avatar: `span` `grid h-11 w-11 place-items-center rounded-full` with
  `bg-gradient-to-br from-nova-500 to-aqua-400` (and `aqua`/`blush` tone variants per item), initials in
  `font-display text-sm font-semibold text-white`. Decorative only — give it `aria-hidden="true"` because
  the name is already adjacent in text; do not add a redundant `alt`/`img`.
- Attribution: `<blockquote>` for the quote (with cite-style `<p>` or `<footer>` for name/role), or
  `<p>` + `<footer>` inside a `<figure>`. Name in `text-sm font-medium text-ink`, role in `text-xs text-muted`.
  Do not use `<blockquote>` without a proper attribution.

### 6. `src/components/sections/FAQ.jsx`

State: `const [openId, setOpenId] = useState(faqSection.items[0].id)` and
`onClick={() => setOpenId(openId === item.id ? null : item.id)}` (clicking the open item closes it,
leaving all closed is a valid state).

Markup per item:

```jsx
<div className="overflow-hidden rounded-card border border-white/[0.08] bg-elevated/50">
  <h3>
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${item.id}`}
      id={`faq-trigger-${item.id}`}
      onClick={...}
      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
    >
      {item.question}
      <ChevronDown className={isOpen ? 'rotate-180 text-nova-200' : 'text-muted'} aria-hidden="true" />
    </button>
  </h3>
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        key="panel"
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: easeOutSoft }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{item.answer}</p>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

Import `AnimatePresence` from `framer-motion` in addition to `motion` / `useReducedMotion`.
Only the open panel is mounted, so collapsed content is never focusable or announced.

Layout: `Container size="narrow"`, list `mt-12 flex flex-col gap-3`, item `motion.div` with `fadeUp`
(outer wrapper animates in; the inner `motion.div` handles the height).

### 7. `src/App.jsx`

Add imports and render, in order, between `<HowItWorks />` and `</main>`:

```jsx
import Pricing from './components/sections/Pricing.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import FAQ from './components/sections/FAQ.jsx'
...
<HowItWorks />
<Pricing />
<Testimonials />
<FAQ />
```

### 8. `src/data/hero.js` consistency fix

Line 47: `'Refund stuck after plan downgrade'` / line 50: `"Hi — we downgraded from Scale to Growth last week and the difference is still being deducted. Can you release the balance?"`.
Change "Scale to Growth" to "Business to Team" so the plan vocabulary matches the new tiers.
Also line 80 in the AI reply references billing generically — no plan names, so no change needed.
Re-check `hero.js` for any other plan-name mentions before finishing.

## Data-shape contract (used by all three sections)

Every section data file exports one named object with `eyebrow: { label, tone }`, `title`, `subtitle`,
and an array of items. Tone values must stay within the `Badge` tone set (`nova`, `aqua`, `blush`,
`neutral`). Icons are referenced by string name in data and mapped to lucide components in the component
file (see `iconMap` in `Features.jsx:23`), never imported in data files.

## Risks

- **Dead `#waitlist` anchor** — accepted for now; Navbar and Hero already link there. Do not invent a
  waitlist section in this task.
- **Grid + featured elevation** — `lg:-my-4` on the middle card inside a `lg:grid-cols-3` grid can
  overflow the container at the `lg` breakpoint. Check for horizontal overflow at exactly 1024px and
  1280px; prefer padding/scale over negative margins if it clips.
- **`height: 'auto'` animation** — framer-motion v13 handles `height: 'auto'`; if the exit animation
  stutters, fall back to `initial={{ opacity: 0, y: -8 }}` plus a CSS `grid-template-rows` trick.
- **Fictional name collision** with `hero.js` customers — verify before writing `testimonials.js`.
- **`useReducedMotion`** must gate every entrance and height animation, or the
  `prefers-reduced-motion` block in `index.css` will not cover framer-motion's inline transforms.

## Validation

1. `npm run lint` — must be clean. Watch for unused imports (e.g. `Sparkles` fallback in an `iconMap`),
   react-hooks rules, and react-refresh "only export components" violations.
2. `npm run build` — must succeed (catches unresolved imports, bad JSX).
3. `npm run dev` — manual pass:
   - Nav anchors `#pricing`, `#testimonials`, `#faq` scroll to the new sections (smooth scroll +
     `scroll-padding-top: 5rem` already set).
   - Pricing: toggle Monthly/Yearly updates all three prices and the sliding highlight moves; prices
     change by exactly 20%; Team card is visually elevated with "Most popular"; Business CTA is a
     mailto.
   - Testimonials: 3 cards, 2-up at `md`, 3-up at `lg`, avatars show correct initials and gradients.
   - FAQ: opening item 1 is already expanded; clicking item 1 collapses it; clicking item 2 closes 1 and
     opens 2; animation runs; `aria-expanded` toggles.
   - Widths: 375px, 768px, 1024px, 1440px — no horizontal scrollbar, featured card not clipped.
   - Keyboard: Tab reaches every tier CTA and every FAQ trigger; Enter/Space activates them; focus ring
     visible (aqua outline from `index.css`).
4. Report the changed files and the exact verification command/URL (`npm run dev` ->
   `http://localhost:5173/#pricing`) when done, then stop.

## Out of scope

- `WaitlistCTA` section and the Supabase waitlist flow.
- Navbar / Footer / index.html / index.css changes (except nothing is required there).
- Tests — the project has no test runner; do not add one.
