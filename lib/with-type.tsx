import React from 'react'
import cn from 'classnames'

export type Types =
  | 'secondary'
  | 'warning'
  | 'success'
  | 'default'
  | 'alert'
  | 'error'
  | 'lite'
  | 'ghost'
  | 'alert'
  | 'violet'

interface Options {
  hasFill?: boolean
  defaultFill?: boolean
}

export interface WithTypeProps {
  className?: string
  type?: Types
  fill?: boolean
  children?: React.ReactNode
}

interface ForwardedRefProps {
  forwardedRef?: React.Ref<HTMLElement>
}

const getCn = (type?: Types, fill?: boolean) => {
  if (!type) return null
  return ['geist-themed', `geist-${type}`, fill ? `geist-${type}-fill` : null]
}

const withType = <P extends WithTypeProps>(
  Component: React.ComponentType<P>,
  opts: Options = {}
) => {
  const { defaultFill, hasFill } = opts

  const Comp: React.ComponentType<P & ForwardedRefProps> = ({
    className,
    forwardedRef,
    ...props
  }) => {
    // Do not immediately destructure these props, they should still be passed
    const { type } = props
    let fill = props.fill || defaultFill

    // Disable fill styling if hasFill option is false
    if (hasFill === false) {
      fill = defaultFill || false
    }

    // Combine any possible className prop and the generated .geist-themed classnames
    const classNames = cn(getCn(type, fill), className)

    return (
      <Component className={classNames} {...(props as P)} ref={forwardedRef} />
    )
  }

  const forwardRef: React.ComponentType<P> = (
    props: P,
    ref: React.Ref<HTMLElement>
  ) => {
    return <Comp {...(props as P)} forwardedRef={ref} />
  }

  // Name for React DevTools
  forwardRef.displayName = Component.displayName || Component.name

  return React.forwardRef(forwardRef)
}

export default withType