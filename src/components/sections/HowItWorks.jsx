import { motion, useReducedMotion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import { howItWorksSection } from '../../data/howItWorks.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const steps = howItWorksSection.steps
  const lastIndex = steps.length - 1

  return (
    <Section id="how-it-works" tone="surface" bordered className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={reduceMotion ? undefined : fadeUp} className="flex justify-center">
            <Badge tone={howItWorksSection.eyebrow.tone}>{howItWorksSection.eyebrow.label}</Badge>
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            {howItWorksSection.title}
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {howItWorksSection.subtitle}
          </motion.p>

          <motion.ol
            variants={reduceMotion ? undefined : fadeUp}
            className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-0"
          >
            <span
              aria-hidden="true"
              className="absolute left-[16.666%] right-[16.666%] top-7 hidden h-px bg-gradient-to-r from-transparent via-nova-400/45 to-transparent md:block"
            />

            {steps.map((step, index) => (
              <motion.li
                key={step.id}
                variants={reduceMotion ? undefined : fadeUp}
                className="relative pl-16 md:pl-0"
              >
                {index < lastIndex && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.75rem] top-14 bottom-[-2.5rem] w-px bg-gradient-to-b from-nova-400/60 to-transparent md:hidden"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-nova-400/30 bg-gradient-to-br from-nova-500/25 to-aqua-400/10 font-display text-lg font-semibold tracking-tight text-nova-200 shadow-glow-sm md:static md:mx-auto"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="md:mt-7 md:px-6 md:text-center">
                  <h3 className="text-lg">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:mx-auto md:max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </Container>
    </Section>
  )
}

export default HowItWorks
