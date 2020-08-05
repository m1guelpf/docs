import React, { useRef, useEffect } from 'react'
import { useAmp } from 'next/amp'
import cn from 'classnames'

import { AnimatedDiv } from './animated-container'

import styles from './details.module.css'

function Details({ title, children, className, onClick, ...props }) {
  const animate = useRef(false)
  const isAmp = useAmp()

  useEffect(() => {
    animate.current = true
  }, [])

  return !isAmp ? (
    <AnimatedDiv
      tension={290}
      friction={30}
      initialHeight="auto"
      immediate={!animate.current}
    >
      <details className={cn(styles.details, className)} {...props}>
        <summary
          onClick={e => {
            if (onClick) {
              e.preventDefault()
              onClick(e)
            }
          }}
        >
          {title}
        </summary>
        {children}
      </details>
    </AnimatedDiv>
  ) : (
    <details className={cn(styles.details, className)} {...props}>
      <summary
        onClick={e => {
          if (onClick) {
            e.preventDefault()
            onClick(e)
          }
        }}
      >
        {title}
      </summary>
      {children}
    </details>
  )
}

export default React.memo(Details)
