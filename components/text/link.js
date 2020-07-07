import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import canPrefetch from '~/lib/can-prefetch'

import IconAnchor from '~/components/icons/link'
import IconExternal from '~/components/icons/external-link'
import CircledQuestion from '~/components/icons/circled-question'

const External = props => {
  const {
    href,
    icon,
    color,
    underline,
    tab = true,
    children,
    ...restProps
  } = props

  // Remove the external prop to avoid React boolean error on native DOM element
  delete restProps.external

  return (
    <a
      href={href}
      target={tab ? '_blank' : undefined}
      rel={tab ? 'noopener noreferrer' : undefined}
      {...restProps}
    >
      {children}

      {icon && (
        <i>
          <IconExternal size="1em" />
        </i>
      )}

      <style jsx>
        {`
          a {
            cursor: pointer;
            color: ${color ? 'var(--geist-link-color)' : 'inherit'};
            text-decoration: none;
            display: inline-flex;
            align-items: center;
          }

          a:hover {
            text-decoration: ${underline ? 'underline;' : 'none'};
          }

          i {
            margin: 0 5px;
            display: inline-flex;
          }

          a :global(> code) {
            color: ${color ? 'var(--geist-link-color)' : 'inherit'};
          }
        `}
      </style>
    </a>
  )
}

const Internal = props => {
  const {
    as,
    href,
    passHref,
    shallow,
    color,
    underline,
    children,
    ...restProps
  } = props

  let { prefetch = true } = props

  if (href && !href.startsWith('/')) {
    prefetch = false
  }

  const a = (
    <a {...restProps}>
      {children}
      <style jsx>
        {`
          a {
            color: ${color ? 'var(--geist-link-color)' : 'inherit'};
            text-decoration: none;
            cursor: pointer;
          }
          a:hover {
            text-decoration: ${underline ? 'underline' : 'none'};
          }
          a :global(> code) {
            color: ${color ? 'var(--geist-link-color)' : 'inherit'};
          }
        `}
      </style>
    </a>
  )

  if (!href) return a

  return (
    <NextLink
      href={href}
      passHref={passHref}
      as={as}
      shallow={shallow}
      prefetch={prefetch ? undefined : false}
    >
      {a}
    </NextLink>
  )
}

const Anchor = props => {
  const {
    as,
    href,
    passHref,
    shallow,
    icon,
    color,
    underline,
    children,
    ...restProps
  } = props

  return (
    <NextLink href={href} passHref={passHref} as={as} shallow={shallow}>
      <a {...restProps}>
        {icon && (
          <i>
            <IconAnchor size="1em" />
          </i>
        )}

        {children}

        <style jsx>
          {`
            a {
              display: inline-flex;
              align-items: center;
              color: ${color ? 'var(--geist-link-color)' : 'inherit'};
              text-decoration: none;
              cursor: pointer;
            }

            a:hover {
              text-decoration: ${underline ? 'underline;' : 'none'};
            }

            a:hover i {
              visibility: visible;
            }

            i {
              visibility: hidden;
              position: absolute;
              transform: translateX(-200%);
              display: inline-flex;
            }

            a :global(> code) {
              color: ${color ? 'var(--geist-link-color)' : 'inherit'};
            }
          `}
        </style>
      </a>
    </NextLink>
  )
}

const Link = props => {
  const { external = false, anchor = false, ...restProps } = props

  // We use restProps.href instead of destructuring href
  // so that it's easier to pass along the rest of the props
  // without applying 'external' and 'anchor' props to the DOM
  if (!restProps.href && !restProps.onClick) {
    throw new Error('Links must include an href or onClick prop.')
  }

  if (external) {
    return <External color {...restProps} />
  } else if (restProps.href && !canPrefetch(restProps.href)) {
    // If we cannot prefetch this href, it should be external
    return <External color {...restProps} tab={restProps.tab || false} />
  }

  // If the link begins with # but is not a no-op link, it is an anchor link
  if (
    anchor ||
    (restProps.href && restProps.href.startsWith('#') && restProps.href !== '#')
  ) {
    return <Anchor color {...restProps} />
  }

  return <Internal color {...restProps} />
}

Link.propTypes = {
  href: PropTypes.string,
  external: PropTypes.bool,
  anchor: PropTypes.bool,
  passHref: PropTypes.bool,
  shallow: PropTypes.bool,
  as: PropTypes.string,
  icon: PropTypes.bool,
  color: PropTypes.bool,
  underline: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func
}

export const HelpLink = ({ children, href, hasIcon, ...props }) => (
  <a href={href} {...props} className={hasIcon ? 'icon' : ''}>
    <span>{children}</span>
    {hasIcon && <CircledQuestion />}
    <style jsx>{`
      a {
        text-decoration: none;
        color: #666;
        font-size: inherit;
        display: flex;
        cursor: pointer;
      }
      a.icon {
        align-items: center;
        color: inherit;
        display: flex;
      }
      a:hover,
      a.icon:hover {
        color: #000;
        text-decoration: underline dashed;
      }
      a.icon span {
        margin-right: 5px;
      }
      a.icon:hover :global(svg circle) {
        stroke: #000;
      }
      a.icon:hover :global(svg text) {
        fill: #000;
      }
    `}</style>
  </a>
)

export default Link
