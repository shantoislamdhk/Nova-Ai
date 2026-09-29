const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-all duration-200 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary:
    'bg-gradient-to-r from-nova-500 to-nova-400 text-white shadow-glow-sm hover:from-nova-400 hover:to-nova-300 hover:shadow-glow active:translate-y-px',
  ghost:
    'border border-white/12 bg-white/[0.03] text-ink backdrop-blur-md hover:border-white/25 hover:bg-white/[0.07] active:translate-y-px',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

function classes({ variant = 'primary', size = 'md', className = '' }) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')
}

function Button({
  as: Element = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Element className={classes({ variant, size, className })} {...rest}>
      {children}
    </Element>
  )
}

export default Button
