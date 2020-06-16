import React from 'react'

const Logo = ({
  height,
  width,
  color = 'var(--geist-foreground)',
  greyscale,
  inverted,
  style
}) => {
  return (
    <svg
      width={height ? undefined : width || 75}
      height={width ? undefined : height || 65}
      viewBox="0 0 75 65"
      fill={
        greyscale ? '#b3b3b3' : inverted ? 'var(--geist-background)' : color
      }
      style={style}
    >
      <path d="M37.59.25l36.95 64H.64l36.95-64z" />
    </svg>
  )
}

export default Logo
