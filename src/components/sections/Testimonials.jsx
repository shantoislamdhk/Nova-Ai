import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import { testimonialsSection } from '../../data/testimonials.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

const avatarGradients = {
  nova: 'from-nova-500 to-nova-400',
  aqua: 'from-aqua-500 to-aqua-400',
  blush: 'from-blush-500 to-blush-400',
}

function Avatar({ initials, tone = 'nova' }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-semibold tracking-tight text-white shadow-glow-sm',
        avatarGradients[tone] ?? avatarGradients.nova,
      ].join(' ')}
    >
      {initials}
    </span>
  )
}

function Testimonials() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="testimonials" tone="surface" bordered className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div variants={reduceMotion ? undefined : fadeUp} className="flex justify-center">
            <Badge tone={testimonialsSection.eyebrow.tone}>
              {testimonialsSection.eyebrow.label}
            </Badge>
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            {testimonialsSection.title}
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {testimonialsSection.subtitle}
          </motion.p>

          <motion.ul
            variants={
              reduceMotion
                ? undefined
                : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
            }
            aria-label="What Nova AI customers say"
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {testimonialsSection.items.map((item) => (
              <motion.li
                key={item.id}
                variants={reduceMotion ? undefined : fadeUp}
                className="group h-full"
              >
                <figure className="relative isolate flex h-full flex-col overflow-hidden rounded-card border border-white/[0.08] bg-elevated/70 p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-nova-400/40 hover:shadow-glow">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(109_92_255/0.18),transparent_70%)]"
                  />

                  <div className="relative flex h-full flex-col">
                    <Quote size={22} className="text-nova-400/60" aria-hidden="true" />

                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
                      <p>&ldquo;{item.quote}&rdquo;</p>
                    </blockquote>

                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                      <Avatar initials={item.initials} tone={item.tone} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">{item.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{item.role}</p>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Testimonials