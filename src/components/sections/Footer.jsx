import { Sparkles, Mail, ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container.jsx'
import { site, footerColumns, socialLinks } from '../../data/site.js'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.07] bg-surface">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2.6fr] lg:gap-16">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-ink transition-opacity hover:opacity-80"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-nova-500 to-aqua-400 text-white"
              >
                <Sparkles size={16} strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                {site.name}
              </span>
            </a>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.description}
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-nova-200"
            >
              <Mail size={16} aria-hidden="true" />
              {site.email}
            </a>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 rounded-pill border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-white/25 hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="font-sans text-xs font-semibold tracking-widest text-ink uppercase">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs text-muted sm:flex-row">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Built for teams who care about the last 10%.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
