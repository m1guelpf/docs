import React, { memo, CSSProperties } from 'react'
import cn from 'classnames'

import AlertCircle from '~/components/icons/alert-circle'
import Spacer from '~/components/spacer'
import styles from './error.module.css'
import { Size, getIxIconSize } from '~/lib/sizing'

const IS_DEV = process.env.NEXT_PUBLIC_VERSION === 'development'

interface ErrorProps {
  id?: string
  label?: string
  className?: string
  style?: CSSProperties
  children: React.ReactNode
  size?: Size
}

const Error: React.FC<ErrorProps> = ({
  id,
  style,
  label,
  className,
  children,
  size
}) => {
  if (IS_DEV) {
    if (label && !label.includes('error')) {
      console.warn(
        'For accessibility purposes, you should include the word "Error" in your label or error message.'
      )
    }
  }

  const iconSize = getIxIconSize(size)

  return (
    <div
      className={cn(styles.error, className, {
        [styles.large]: size === 'large',
        [styles.small]: size === 'small'
      })}
      id={id}
      style={style}
    >
      {/* Decorative images should not be announced */}
      <div aria-hidden>
        <AlertCircle
          size={iconSize}
          color="var(--geist-error)"
          weight="bold"
          align="bottom"
        />
      </div>
      <div className={styles.text}>
        <b>{label || 'Error'}:</b>
        <Spacer inline x={0.25} />
        {children}
      </div>
    </div>
  )
}

Error.displayName = 'Error'

// Children should be fairly stable
export default memo(Error)