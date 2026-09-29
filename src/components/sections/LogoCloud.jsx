import Section from '../ui/Section.jsx'
import Container from '../ui/Container.jsx'
import { logoCloud } from '../../data/partners.js'

function LogoCloud() {
  return (
    <Section tone="surface" bordered className="py-12 sm:py-14">
      <Container>
        <p className="text-center text-xs font-medium tracking-widest text-muted uppercase">
          {logoCloud.heading}
        </p>

        <ul
          aria-label="Companies using Nova AI"
          className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6"
        >
          {logoCloud.companies.map((company, index) => (
            <li key={company} className="flex justify-center">
              <span
                className={[
                  'select-none text-muted transition-colors duration-200 hover:text-ink',
                  index % 2 === 0
                    ? 'font-display text-lg font-semibold tracking-tight sm:text-xl'
                    : 'font-sans text-sm font-medium tracking-[0.18em] uppercase',
                ].join(' ')}
              >
                {company}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export default LogoCloud
