import { useSpring, animated } from 'react-spring'
import useMeasure from 'react-use-measure'
import { ResizeObserver } from '@juggle/resize-observer'

import useMediaQuery from '~/lib/use-media-query'

import Card from '~/components/card'

export function AnimatedDiv({
  children,
  initialHeight = 0,
  allowOverview = false,
  tension = 250,
  friction = 26,
  immediate = false
}) {
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })

  const props = useSpring({
    height: height || initialHeight,
    config: { tension, friction, clamp: true },
    // disable the spring animation
    immediate
  })

  return (
    <animated.div
      style={{
        overflow: 'hidden',
        willChange: 'height',
        ...props
      }}
    >
      <div style={{ overflow: allowOverview ? 'visible' : 'hidden' }} ref={ref}>
        {children}
      </div>
    </animated.div>
  )
}

function AnimatedContainer({ children }) {
  const isMobileMode = useMediaQuery(690)

  // still mounting
  if (isMobileMode === undefined) return null

  // mobile
  if (isMobileMode === true) return children

  // tablet and desktop
  // wrap it with a card
  return <Card>{children}</Card>
}

export default AnimatedContainer
