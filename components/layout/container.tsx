import React, { useMemo, memo, CSSProperties } from 'react'
import cn from 'classnames'

import { BREAKPOINTS } from '~/lib/constants'

const BREAKPOINT_NUM = Object.keys(BREAKPOINTS).length
const ROW_ARR = Array(BREAKPOINT_NUM).fill('row')

const IS_DEV = process.env.NEXT_PUBLIC_VERSION === 'development'

const alignments = {
  row: {
    align: {
      top: 'flex-start',
      bottom: 'flex-end',
      center: 'center',
      default: 'stretch',
      baseline: 'baseline'
    },
    justify: {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center',
      default: 'flex-start'
    }
  },
  column: {
    align: {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center',
      default: 'stretch'
    },
    justify: {
      top: 'flex-start',
      bottom: 'flex-end',
      center: 'center',
      default: 'flex-start',
      baseline: 'baseline'
    }
  }
}

type Direction = 'column' | 'row'
type ContainerComponents = 'div' | 'span' | 'form'
type Components = keyof Pick<JSX.IntrinsicElements, ContainerComponents>

interface Props {
  row?: boolean
  direction?: Direction[] | Direction
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean
  hcenter?: boolean
  vcenter?: boolean
  center?: boolean
  vbaseline?: boolean
  full?: boolean
  noWrap?: boolean
  halfGap?: boolean
  gap?: boolean
  flex?: string | number
  inline?: boolean
  wrapper?: boolean
  className?: string
  styleSets?: any
  classNames?: string[]
  style?: CSSProperties
  Component?: Components
}

const Container: React.FC<Props> = memo(
  ({
    // props
    row, // responsive
    direction, // Flex styles
    left,
    right,
    top,
    bottom,
    hcenter,
    vcenter,
    vbaseline, // Center is equivalent to both vcenter, hcenter
    center,
    noWrap,
    wrapper,
    halfGap,
    gap,
    children,
    flex = 1,
    inline, // body wrapper style
    full, // extending styles
    classNames = [],
    styleSets = null,
    Component = 'div',
    className,
    ...props
  }) => {
    // Determine the flex alignment based on the props.
    // This is a bit of a mess but allows us to use props like 'left'
    // rather than requiring users of the component to understand
    // flex properties like 'flex-start'.
    let justify, align
    const horizontalValue = left
      ? 'left'
      : right
      ? 'right'
      : hcenter || center
      ? 'center'
      : 'default'
    const verticalValue = top
      ? 'top'
      : bottom
      ? 'bottom'
      : vcenter || center
      ? 'center'
      : vbaseline
      ? 'baseline'
      : 'default'

    if (row) {
      justify = alignments.row.justify[horizontalValue]
      align = alignments.row.align[verticalValue]
    } else {
      justify = alignments.column.justify[verticalValue]
      align = alignments.column.align[horizontalValue]
    }

    const gapRatio = halfGap ? 0.5 : gap === undefined ? 1 : gap

    // Row value is responsive
    // <Container direction={['row', 'column']} /> means that
    // the container should be row on mobile and column on tablet/desktop
    const responsive = useMemo(() => {
      if (direction) {
        if (Array.isArray(direction)) {
          if (IS_DEV) {
            // Error check the string values
            direction.forEach(v => {
              if (v !== 'row' && v !== 'column') {
                throw new Error(
                  `Invalid direction value '${v}'. Only 'row' and 'column' are accepted.`
                )
              }
            })
          }

          if (direction.length === BREAKPOINT_NUM) return direction

          // "extend" the direction value to be filled with the last value
          // ['row', 'column'] => ['row', 'column', 'column']
          // ['column'] => ['column', 'column', 'column']
          return direction.concat(
            Array(BREAKPOINT_NUM - direction.length).fill(
              direction[direction.length - 1]
            )
          )
        } else {
          // direction="row" => ['row', 'row', 'row']
          return ROW_ARR.fill(direction)
        }
      } else if (row) {
        return ROW_ARR
      }
      return []
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Array.isArray(direction) ? direction.join(',') : direction, row])

    const container = (
      // @ts-ignore
      <Component
        className={cn(
          'geist-container',
          {
            'sm-row': responsive[0] === 'row',
            'md-row': responsive[1] === 'row',
            'lg-row': responsive[2] === 'row',
            nowrap: noWrap,
            inline
          },
          ...classNames,
          className
        )}
        {...props}
      >
        {children}

        <style jsx>{`
          .geist-container {
            --flex: ${flex};
            --justify-content: ${justify};
            --align-items: ${align};
          }
          .geist-container :global(> *) {
            --gap-ratio: ${gapRatio};
          }
        `}</style>
        {styleSets}
      </Component>
    )

    if (wrapper) {
      return <div className={cn('geist-wrapper', { full })}>{container}</div>
    }

    return container
  }
)

Container.displayName = 'Container'

export default Container