import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Badge from '../ui/Badge.jsx'
import { faqSection } from '../../data/faq.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

function FAQ() {
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState(faqSection.items[0].id)

  return (
    <Section id="faq" tone="void" bordered className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blush-400/[0.07] blur-3xl" />
      </div>

      <Container size="narrow">
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
            <Badge tone={faqSection.eyebrow.tone}>{faqSection.eyebrow.label}</Badge>
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-3xl text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            {faqSection.title}
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          >
            {faqSection.subtitle}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-12 flex flex-col gap-3"
          >
            {faqSection.items.map((item) => {
              const isOpen = openId === item.id
              const triggerId = `faq-trigger-${item.id}`
              const panelId = `faq-panel-${item.id}`

              return (
                <motion.div
                  key={item.id}
                  variants={reduceMotion ? undefined : fadeUp}
                  className="overflow-hidden rounded-card border border-white/[0.08] bg-elevated/50 transition-colors duration-300 has-[button[aria-expanded='true']]:border-nova-400/30 has-[button[aria-expanded='true']]:bg-elevated/70"
                >
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors duration-200 hover:text-nova-200 sm:px-6 sm:py-5 sm:text-lg"
                    >
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                      >
                        <motion.span
                          animate={reduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: easeOutSoft }}
                          className="grid place-items-center text-muted"
                        >
                          <ChevronDown size={17} />
                        </motion.span>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={panelId}
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOutSoft }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default FAQ