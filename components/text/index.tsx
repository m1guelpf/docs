import React, { CSSProperties } from 'react'
import cn from 'classnames'

import withType, { WithTypeProps } from '~/lib/with-type'

type TextComponents =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'span'
type WrapComponents = 'mark' | 'u' | 's' | 'b' | 'i'

type Components = keyof Pick<JSX.IntrinsicElements, TextComponents>
type WrapTags = keyof Pick<JSX.IntrinsicElements, WrapComponents>

type Preset =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'body-1'
  | 'body-2'
  | 'small'
  | 'span'
type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

// Conditionally wrap a React element with another
const wrap = (needed = false, children: React.ReactNode, tag: WrapTags) => {
  if (!needed) return children

  return React.createElement(tag, {}, children)
}

interface Modifiers {
  mark?: boolean
  underline?: boolean
  strike?: boolean
  bold?: boolean
  italic?: boolean
}

// Wrap the text in modifier elements like bold and italics
const wrapModifiers = (
  component: React.ReactNode,
  { mark, underline, strike, bold, italic }: Modifiers
) => {
  let result = component

  result = wrap(mark, result, 'mark')
  result = wrap(underline, result, 'u')
  result = wrap(strike, result, 's')
  result = wrap(bold, result, 'b')
  result = wrap(italic, result, 'i')

  return result
}

interface NestedProps {
  preset?: Preset
  code?: boolean
  Component?: Components
  type?: string
  className?: string
  noMargin?: boolean
  weight?: Weight
  uppercase?: boolean
  capitalize?: boolean
  center?: boolean
  maxWidth?: string
  style?: CSSProperties
}

const getComponent = (defaultElement: Components) => {
  const C: React.FC<NestedProps> = ({
    type,
    noMargin,
    weight,
    code,
    uppercase,
    capitalize,
    center,
    Component = defaultElement,
    children,
    className,
    preset,
    maxWidth,
    style,
    ...props
  }) => {
    return (
      <Component
        className={cn(
          className,
          'geist-text',
          { 'geist-text-no-margin': noMargin },
          preset || defaultElement
        )}
        style={{
          fontFamily: code ? 'var(--font-mono)' : 'var(--font-sans)',
          color: type ? 'var(--themed-fg)' : 'inherit',
          fontWeight: weight,
          textTransform: uppercase
            ? 'uppercase'
            : capitalize
            ? 'capitalize'
            : undefined,
          maxWidth,
          textAlign: center ? 'center' : undefined,
          ...style
        }}
        {...props}
      >
        {children}
      </Component>
    )
  }

  C.displayName = 'Text_' + defaultElement

  return C
}

export const H1 = getComponent('h1')
export const H2 = getComponent('h2')
export const H3 = getComponent('h3')
export const H4 = getComponent('h4')
export const H5 = getComponent('h5')
export const H6 = getComponent('h6')
export const P = getComponent('p')
export const Small = getComponent('small')
export const Span = getComponent('span')

const components = [H1, H2, H3, H4, H5, H6, P, Small, Span]

interface TextProps extends WithTypeProps {
  Component?: Components
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  small?: boolean
  span?: boolean
  mark?: boolean
  underline?: boolean
  strike?: boolean
  bold?: boolean
  italic?: boolean
  uppercase?: boolean
  capitalize?: boolean
  weight?: Weight
  style?: React.CSSProperties
}

const Text: React.FC<TextProps & NestedProps> = ({
  // HTML element
  Component,
  // styling
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  small,
  span,
  // wrapper
  mark,
  underline,
  strike,
  bold,
  italic,
  // react
  children,
  ...props
}) => {
  const Styler =
    components[[h1, h2, h3, h4, h5, h6, p, small, span].indexOf(true)] || P

  return (
    <Styler Component={Component} {...props}>
      {wrapModifiers(children, { mark, underline, strike, bold, italic })}
    </Styler>
  )
}

export default withType(Text, { hasFill: false })