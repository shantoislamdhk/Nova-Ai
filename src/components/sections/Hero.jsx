import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Mail,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Badge from '../ui/Badge.jsx'
import { heroBadge, heroContent, heroMockup } from '../../data/hero.js'

const easeOutSoft = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
}

const ctaIcons = {
  arrowRight: ArrowRight,
  play: Play,
}

const channelIcons = {
  email: Mail,
  chat: MessageSquare,
}

const priorityTones = {
  high: 'border-blush-400/30 bg-blush-400/10 text-blush-400',
  normal: 'border-aqua-400/30 bg-aqua-400/10 text-aqua-300',
}

const messageStyles = {
  user: 'bg-white/[0.06] text-ink',
  ai: 'border border-nova-400/25 bg-nova-500/[0.08] text-ink',
}

function ThreadRow({ thread, active }) {
  const ChannelIcon = channelIcons[thread.channel] ?? MessageSquare

  return (
    <div
      className={[
        'rounded-card border px-3.5 py-3 transition-colors',
        active
          ? 'border-nova-400/30 bg-nova-500/10'
          : 'border-white/[0.06] bg-white/[0.02]',
      ].join(' ')}
    >
      <p className="truncate text-sm font-medium text-ink">{thread.subject}</p>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
        <ChannelIcon size={13} aria-hidden="true" />
        <span className="truncate">{thread.customer}</span>
        <span className="ml-auto shrink-0">{thread.time}</span>
      </div>
      <span
        className={[
          'mt-2.5 inline-flex rounded-pill border px-2 py-0.5 text-[0.6875rem] font-medium capitalize',
          priorityTones[thread.priority] ?? priorityTones.normal,
        ].join(' ')}
      >
        {thread.priority}
      </span>
    </div>
  )
}

function HeroMockup() {
  const confidence = heroMockup.footerStats.find((stat) => stat.label === 'Confidence')

  return (
    <div
      id="hero-mockup"
      className="relative mt-14 scroll-mt-24 sm:mt-20"
      role="group"
      aria-label="Sample support conversation"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-10 bottom-0 -z-10 rounded-[2rem] bg-nova-500/20 blur-3xl"
      />

      <div className="glass rounded-card p-2 shadow-panel sm:p-3">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2.5 sm:px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-blush-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-nova-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-aqua-400/70" />
          <span className="ml-2 truncate text-xs text-muted">app.nova.ai — inbox</span>
          <span className="ml-auto hidden rounded-pill border border-aqua-400/30 bg-aqua-400/10 px-2 py-0.5 text-[0.6875rem] text-aqua-300 sm:inline">
            Live
          </span>
        </div>

        <div className="grid gap-3 p-1 pt-3 lg:grid-cols-[320px_1fr] lg:gap-4 lg:p-2">
          <div className="rounded-card border border-white/[0.06] bg-void/40 p-3">
            <p className="text-[0.6875rem] font-medium tracking-widest text-muted uppercase">
              {heroMockup.sidebarTitle}
            </p>
            <p className="mt-1 text-xs text-muted">
              {heroMockup.queueLabel} · {heroMockup.threads.length}
            </p>

            <ul className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:gap-2 lg:overflow-visible">
              {heroMockup.threads.map((thread, index) => (
                <li
                  key={thread.id}
                  className={index < 2 ? '' : 'hidden lg:block'}
                >
                  <ThreadRow thread={thread} active={index === 0} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-white/[0.06] bg-void/40 p-3 sm:p-4">
            <p className="text-[0.6875rem] font-medium tracking-widest text-muted uppercase">
              {heroMockup.panelTitle}
            </p>

            <ul className="mt-3 flex flex-col gap-2.5">
              {heroMockup.messages.map((message) => (
                <li
                  key={message.id}
                  className={[
                    'max-w-[85%] rounded-card px-3.5 py-2.5',
                    messageStyles[message.role] ?? messageStyles.user,
                    message.role === 'user' ? 'ml-auto' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-1.5">
                    {message.role === 'ai' && (
                      <Sparkles size={12} className="text-nova-200" aria-hidden="true" />
                    )}
                    <span className="text-[0.6875rem] font-medium tracking-wide text-muted uppercase">
                      {message.author}
                    </span>
                    <span className="ml-auto text-[0.6875rem] text-muted">{message.time}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/90">{message.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-col gap-2 rounded-card border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 sm:flex-row sm:items-center sm:gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-ink">
                <Check size={14} className="text-aqua-300" aria-hidden="true" />
                Approve and send
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck size={14} aria-hidden="true" />
                Human review
              </span>
              {confidence && (
                <span className="sm:ml-auto sm:text-right">
                  <span className="block text-[0.6875rem] text-muted">
                    {confidence.label}
                  </span>
                  <span className="mt-1 block h-1 w-full overflow-hidden rounded-pill bg-white/10 sm:w-28">
                    <span
                      className="block h-full rounded-pill bg-gradient-to-r from-nova-500 to-aqua-400"
                      style={{ width: confidence.value }}
                    />
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-1 grid grid-cols-3 divide-x divide-white/[0.07] rounded-card border border-white/[0.06] bg-void/40 px-2 py-3 sm:mt-2 sm:px-4">
          {heroMockup.footerStats.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <dt className="text-[0.6875rem] tracking-wide text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-ink sm:text-xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden="true"
        className="glass absolute -top-5 right-4 hidden rounded-card px-3 py-2 text-xs text-ink shadow-panel lg:block"
      >
        Resolved in <span className="font-semibold text-aqua-300">38s</span>
      </div>
    </div>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <Section
      id="hero"
      tone="void"
      className="relative isolate overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-nova-500/20 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-aqua-400/10 blur-3xl" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-blush-400/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={reduceMotion ? undefined : fadeUp}>
            <Badge tone={heroBadge.tone}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aqua-400" />
              {heroBadge.label}
            </Badge>
          </motion.div>

          <motion.h1
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-6 max-w-4xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            {heroContent.headlineLead}{' '}
            <span className="text-gradient">{heroContent.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {heroContent.subhead}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : fadeUp}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row"
          >
            {heroContent.ctas.map((cta) => {
              const Icon = ctaIcons[cta.icon]

              return (
                <Button
                  key={cta.label}
                  as="a"
                  href={cta.href}
                  variant={cta.variant}
                  size={cta.size}
                >
                  {Icon && <Icon size={17} aria-hidden="true" />}
                  {cta.label}
                </Button>
              )
            })}
          </motion.div>

          <div className="w-full">
            <HeroMockup />
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Hero
