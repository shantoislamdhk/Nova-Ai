function Badge({ tone = 'nova', className = '', children, ...rest }) {
  const tones = {
    nova: 'border-nova-400/30 bg-nova-500/12 text-nova-200',
    aqua: 'border-aqua-400/30 bg-aqua-400/10 text-aqua-300',
    blush: 'border-blush-400/30 bg-blush-400/10 text-blush-400',
    neutral: 'border-white/12 bg-white/[0.04] text-muted',
  }

  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}

export default Badge
