import { useEffect, useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import { site, navLinks } from '../../data/site.js'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-colors duration-300',
        scrolled
          ? 'border-b border-white/[0.07] bg-void/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <Container>
        <nav
          aria-label="Main"
          className="flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#top"
            className="flex items-center gap-2 text-ink transition-opacity hover:opacity-80"
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-nova-500 to-aqua-400 text-white shadow-glow-sm"
            >
              <Sparkles size={16} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              {site.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-pill px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button as="a" href="#signin" variant="ghost" size="sm">
              {site.cta.secondary}
            </Button>
            <Button as="a" href="#waitlist" size="sm">
              {site.cta.primary}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="px-2.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </Button>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-white/[0.07] bg-void/95 pb-6 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-card px-3 py-3 text-base text-muted transition-colors hover:bg-white/[0.05] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2">
            <Button as="a" href="#waitlist" className="w-full" onClick={() => setOpen(false)}>
              {site.cta.primary}
            </Button>
            <Button
              as="a"
              href="#signin"
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {site.cta.secondary}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
