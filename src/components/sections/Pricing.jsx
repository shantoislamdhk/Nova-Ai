import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'
import { pricingSection } from '../../data/pricing.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

function BillingToggle({ period, onChange, reduceMotion }) {
  const triggerRefs = useRef({})
  const periods = pricingSection.billing.periods

  const selectRelative = (index) => {
    const nextIndex = (index + periods.length) % periods.length
    const next = periods[nextIndex]
    onChange(next.id)
    triggerRefs.current[next.id]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="glass relative isolate inline-flex rounded-pill p-1"
    >
      {periods.map((option, index) => {
        const active = period === option.id

        return (
          <button
            key={option.id}
            ref={(node) => {
              triggerRefs.current[option.id] = node
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault()
                selectRelative(index + 1)
              }

              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault()
                selectRelative(index - 1)
              }
            }}
            className={[
              'relative z-10 inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-200 ease-[var(--ease-out-soft)] sm:px-5',
              active ? 'text-ink' : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {active && (
              <motion.span
                layoutId="billing-highlight"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-pill bg-gradient-to-r from-nova-500 to-nova-400 shadow-glow-sm"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 34 }
                }
              />
            )}
            {option.label}
            {option.badge && (
              <span
                className={[
                  'rounded-pill border px-2 py-0.5 text-[0.6875rem] font-semibold transition-colors',
                  active
                    ? 'border-white/25 bg-white/15 text-ink'
                    : 'border-aqua-400/30 bg-aqua-400/10 text-aqua-300',
                ].join(' ')}
              >
                {option.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function Pricing() {
  const reduceMotion = useReducedMotion()
  const [period, setPeriod] = useState(pricingSection.billing.default)

  return (
    <Section id="pricing" tone="panel" bordered className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-nova-500/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div variants={reduceMotion ? undefined : fadeUp} className="flex justify-center">
            <Badge tone={pricingSection.eyebrow.tone}>{pricingSection.eyebrow.label}</Badge>
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            {pricingSection.title}
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {pricingSection.subtitle}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-10 flex justify-center"
          >
            <BillingToggle period={period} onChange={setPeriod} reduceMotion={reduceMotion} />
          </motion.div>

          <motion.ul
            variants={
              reduceMotion
                ? undefined
                : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
            }
            aria-label="Nova AI plans"
            className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {pricingSection.tiers.map((tier) => (
              <motion.li
                key={tier.id}
                variants={reduceMotion ? undefined : fadeUp}
                className={[
                  'group relative flex h-full flex-col rounded-card border p-6 transition-all duration-300 ease-[var(--ease-out-soft)] sm:p-7',
                  tier.featured
                    ? 'border-nova-400/40 bg-elevated/80 shadow-glow lg:-my-4 lg:py-11'
                    : 'border-white/[0.08] bg-elevated/60 hover:border-nova-400/30 hover:shadow-glow-sm',
                ].join(' ')}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-6">
                    <Badge tone="nova">{tier.badge}</Badge>
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {tier.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{tier.description}</p>

                <p
                  aria-hidden="true"
                  className="mt-7 flex items-baseline gap-1.5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                >
                  <span className="text-muted">$</span>
                  {tier.price[period]}
                  <span className="font-sans text-sm font-normal text-muted">
                    {tier.periodLabel}
                  </span>
                </p>
                <span aria-live="polite" className="sr-only">
                  {tier.name} plan, {tier.price[period]} dollars {tier.periodLabel}, billed{' '}
                  {period === 'yearly' ? 'yearly' : 'monthly'}
                </span>

                <Button
                  as="a"
                  href={tier.cta.href}
                  variant={tier.featured ? 'primary' : 'ghost'}
                  className="mt-7 w-full"
                >
                  {tier.cta.label}
                </Button>

                <ul className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-aqua-300"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.footnote && (
                  <p className="mt-6 text-xs leading-relaxed text-muted">{tier.footnote}</p>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-10 text-center text-xs text-muted"
          >
            {pricingSection.note}
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Pricing