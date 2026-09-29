import { motion, useReducedMotion } from 'framer-motion'
import {
  BookOpen,
  Gauge,
  MessageSquareText,
  PlugZap,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import { featuresSection } from '../../data/features.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

const iconMap = {
  bookOpen: BookOpen,
  messageSquareText: MessageSquareText,
  scanSearch: ScanSearch,
  shieldCheck: ShieldCheck,
  plugZap: PlugZap,
  gauge: Gauge,
}

function Features() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="features" tone="panel" bordered className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-nova-500/10 blur-3xl" />
      </div>

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
            <Badge tone={featuresSection.eyebrow.tone}>{featuresSection.eyebrow.label}</Badge>
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            {featuresSection.title}
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {featuresSection.subtitle}
          </motion.p>

          <motion.ul
            variants={
              reduceMotion
                ? undefined
                : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
            }
            aria-label="Nova AI features"
            className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {featuresSection.items.map((item) => {
              const Icon = iconMap[item.icon] ?? Sparkles

              return (
                <motion.li
                  key={item.id}
                  variants={reduceMotion ? undefined : fadeUp}
                  className="group relative isolate overflow-hidden rounded-card border border-white/[0.08] bg-elevated/70 p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-nova-400/40 hover:shadow-glow"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(109_92_255/0.18),transparent_70%)]"
                  />

                  <div className="relative">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-nova-500/10 text-nova-200 transition-colors duration-300 group-hover:border-nova-400/40 group-hover:text-aqua-300">
                      <Icon size={20} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 text-lg">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Features
