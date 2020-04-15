import { memo } from 'react'

function CrossInCircle({
  color = '#E00',
  crossColor = '#FFF',
  size = 18,
  ...props
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      {...props}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
    >
      <circle cx="12" cy="12" r="12" fill={color} />
      <path d="M15 9l-6 6" stroke={crossColor} />
      <path d="M9 9l6 6" stroke={crossColor} />
    </svg>
  )
}

export default memo(CrossInCircle)
