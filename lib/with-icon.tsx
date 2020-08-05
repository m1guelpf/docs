import React, { memo, useMemo, useContext, CSSProperties } from 'react'
import PropTypes from 'prop-types'

interface Options {
  color?: string
  secondary?: string
  size?: string
  fill?: string
  viewBox?: string
}

interface IconProps {
  size?: number
  color?: string
  secondary?: string
  weight?: 'normal' | 'bold' | 'light'
  fill?: boolean
  align?: 'top' | 'bottom' | 'middle'
  style?: CSSProperties
}

export const IconSizeContext = React.createContext<number | null>(null)
export const useIconSize = () => useContext(IconSizeContext)
IconSizeContext.displayName = 'IconSizeContext'

// Constants (not overridable)
const cap = 'round'
const join = 'round'

const withIcon = (icon: string, iconFill?: boolean, opts: Options = {}) => {
  const {
    color: defaultColor,
    secondary: defaultSecondary,
    size: defaultSize,
    fill: defaultFill,
    viewBox
  } = opts

  const Icon = (props: IconProps) => {
    const contextSize = useIconSize()

    const {
      size = contextSize || defaultSize || 24,
      color = defaultColor || 'currentColor',
      secondary = defaultSecondary || 'var(--geist-background)',
      weight = 'normal',
      fill = defaultFill,
      align,
      ...restProps
    } = props

    const strokeWidth = useMemo(() => {
      if (weight === 'bold') {
        return 2
      } else if (props.weight === 'light') {
        return 1
      }

      return 1.5
    }, [weight, props.weight])

    const verticalAlign = useMemo(() => {
      if (!align) return null

      if (align === 'top') {
        return 'text-top'
      } else if (align === 'bottom') {
        return 'text-bottom'
      } else if (align === 'middle') {
        return 'middle'
      }

      return align
    }, [align])

    if (fill && iconFill) {
      return (
        <svg
          viewBox={viewBox || '0 0 24 24'}
          width={size}
          height={size}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap={cap}
          strokeLinejoin={join}
          shapeRendering="geometricPrecision"
          {...restProps}
          style={{
            ...restProps.style,
            color,
            ['--geist-fill' as string]: 'currentColor',
            ['--geist-stroke' as string]: secondary,
            verticalAlign: verticalAlign || undefined
          }}
          dangerouslySetInnerHTML={{
            __html: iconFill === true ? icon : iconFill
          }}
        />
      )
    }

    return (
      <svg
        viewBox={viewBox || '0 0 24 24'}
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={cap}
        strokeLinejoin={join}
        fill="none"
        shapeRendering="geometricPrecision"
        {...restProps}
        style={{
          ...restProps.style,
          color,
          verticalAlign: verticalAlign || undefined
        }}
        dangerouslySetInnerHTML={{
          __html: icon
        }}
      />
    )
  }

  Icon.propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    secondary: PropTypes.string,
    weight: PropTypes.oneOf(['light', 'normal', 'bold']),
    align: PropTypes.oneOf(['top', 'bottom', 'middle'])
  }

  const memoIcon = memo(Icon)
  ;(memoIcon as any).hasFill = !!iconFill

  return memoIcon
}

export default withIcon