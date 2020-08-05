import { HTMLProps } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import cn from 'classnames'

import styles from './link.module.css'
import canPrefetch from '@lib/can-prefetch'

type Types = 'primary' | 'highlight' | 'secondary' | 'blend'
type NativeLinkProps = Omit<HTMLProps<HTMLAnchorElement>, 'onClick'>

export type LinkProps = NativeLinkProps &
  NextLinkProps & {
    type?: Types
    external?: boolean

    // We'll override the onClick handler here
    onClick?: () => void
  }

const IS_DEV = process.env.NEXT_PUBLIC_VERSION === 'development'

const Link = ({
  type,
  external,
  href,
  children,
  className,
  ...props
}: LinkProps) => {
  if (IS_DEV && !href && !props.onClick) {
    throw new Error('Links must include an href or onClick prop.')
  }

  const isExternal = external || (href && !canPrefetch(href))
  const typeCn = type ? styles[type] : ''

  // External links open in a new tab
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        {...props}
        className={cn(styles.link, typeCn, className)}
      >
        {children}
      </a>
    )
  }

  const { as, passHref, shallow, ...rest } = props
  let { prefetch = true } = rest

  // No href, must include onClick
  if (!href) {
    // Use <span> with role="link" instead of <a> because an <a> without
    // href is not tabbable, and all links should be focusable
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_link_role#Examples
    return (
      <span
        {...rest}
        className={cn(styles.link, typeCn, className)}
        tabIndex={0}
        role="link"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            rest.onClick?.()
          }
        }}
      >
        {children}
      </span>
    )
  }

  // Cannot prefetch external links
  if (!href.startsWith('/')) {
    prefetch = false
  }

  return (
    <NextLink
      href={href}
      as={as}
      passHref={passHref}
      shallow={shallow}
      prefetch={prefetch ? undefined : false}
    >
      <a {...rest} className={cn(styles.link, typeCn, className)}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
