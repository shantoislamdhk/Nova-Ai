function Section({
  as: Element = 'section',
  id,
  tone = 'surface',
  bordered = false,
  className = '',
  children,
  ...rest
}) {
  const tones = {
    void: 'bg-void',
    surface: 'bg-surface',
    panel: 'bg-panel',
  }

  return (
    <Element
      id={id}
      className={[
        tones[tone],
        bordered ? 'border-y border-white/[0.07]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Element>
  )
}

export default Section
