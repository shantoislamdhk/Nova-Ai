function Container({ as: Element = 'div', size = 'default', className = '', children, ...rest }) {
  const sizes = {
    default: 'max-w-6xl px-5 sm:px-8',
    narrow: 'max-w-3xl px-5 sm:px-8',
    wide: 'max-w-7xl px-5 sm:px-8',
  }

  return (
    <Element className={`mx-auto w-full ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Element>
  )
}

export default Container
