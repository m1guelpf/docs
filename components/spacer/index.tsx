import React, { memo } from 'react'
import cn from 'classnames'

interface Props {
  x?: number
  y?: number
  expand?: boolean
  className?: string
  inline?: boolean
  padding?: boolean
}

// Using the new var(--geist-gap)
export const NewSpacer: React.FC<Props> = ({
  x = 1,
  y = 1,
  expand,
  inline,
  padding
}) => {
  return (
    <span
      aria-hidden="true"
      className={cn('geist-spacer', { padding, inline, expand })}
      style={{
        marginLeft: x !== 1 ? x * 24 - 1 : undefined,
        marginTop: y !== 1 && !inline ? y * 24 - 1 : undefined,
        paddingLeft: padding ? x * 24 - 1 : undefined,
        paddingTop: padding && !inline ? y * 24 - 1 : undefined
      }}
    />
  )
}

export const Spacer: React.FC<Props> = ({
  x = 1,
  y = 1,
  expand,
  className,
  inline,
  padding
}) => {
  return (
    <span
      aria-hidden="true"
      className={cn('geist-spacer', className, { padding, inline, expand })}
      style={{
        marginLeft: x !== 1 ? `calc(${x * 16}pt - 1px)` : undefined,
        marginTop: y !== 1 && !inline ? `calc(${y * 16}pt - 1px)` : undefined,
        paddingLeft: padding ? `calc(${x * 16}pt - 1px)` : undefined,
        paddingTop: padding && !inline ? `calc(${y * 16}pt - 1px)` : undefined
      }}
    />
  )
}

Spacer.displayName = 'Spacer'
export default memo(Spacer)