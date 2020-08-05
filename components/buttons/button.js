// Packages
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import cn from 'classnames'
import titlize from 'title'

import LoadingDots from '~/components/loading-dots'
import Animation from './button-animation'

import withType from '~/lib/with-type'
import { useDisabled } from '~/lib/with-disabled-context'

const ButtonBase = ({
  Component = 'button',
  typeName = 'text',
  title,
  disabled,
  icon,
  iconAutoSize,
  iconRight,
  iconPush,
  iconOffset,
  textOffset,
  iconNoColorOverride,
  iconNoStrokeOverride = true,
  loading,
  small,
  medium,
  large,
  shadow,
  width,
  children,
  onClick,
  disableEvents,
  normalStyle = {},
  hoverStyle = {},
  innerRef,
  animation: _animation,
  themeColor,
  type,
  className,
  inputSize,
  ...props
}) => {
  const [
    { animationStartAt, animationX, animationY },
    setAnimationData
  ] = useState({
    animationStartAt: null,
    animationX: null,
    animationY: null
  })
  const buttonRef = useRef(null)
  const disabledContext = useDisabled()
  const animation = !(_animation === false) && shadow !== true

  const onButtonClick = ev => {
    if (disabled || disabledContext) return

    if (animation) {
      const ref = innerRef || buttonRef
      if (ref.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setAnimationData({
          animationStartAt: Date.now(),
          animationX: ev.clientX - rect.left,
          animationY: ev.clientY - rect.top
        })
      }
    }

    if (onClick) {
      onClick(ev)
    }
  }

  const restProps = { ...props }

  return (
    <Component
      role="button"
      ref={buttonRef}
      title={title}
      onClick={onButtonClick}
      type={typeName}
      disabled={disabled || disabledContext}
      className={cn(
        'button',
        {
          disabled: disabled || disabledContext,
          shadow,
          small,
          medium,
          'icon-color': !iconNoColorOverride,
          'icon-stroke': !iconNoStrokeOverride,
          loading,
          'auto-size': iconAutoSize,
          'geist-no-events': disableEvents
        },
        className
      )}
      {...(innerRef ? { ref: innerRef } : {})}
      {...restProps}
    >
      {icon && !loading ? <span className="icon">{icon}</span> : null}

      {/* Always show the text to ensure the width is correct.
          The text will be visbility: hidden when in loading state */}
      <span className="text">
        {typeof children === 'string' ? titlize(children) : children}
      </span>

      {loading && (
        <span className="loading-dots">
          <LoadingDots size={4} />
        </span>
      )}

      {animation && animationStartAt && (
        <Animation
          key={animationStartAt}
          x={animationX}
          y={animationY}
          onComplete={() => {
            setAnimationData({
              animationStartAt: null,
              animationX: null,
              animationY: null
            })
          }}
        />
      )}

      {/* Dynamic Styles */}
      <style jsx>{`
        /* Order of precendence:
            type="..."
            themeColor
            normalStyle/hoverStyle
        */
        .button {
          /* Use button- variables here because you cannot fallback to existing value
             i.e. you cannot do --themed-fg: var(--themed-fg); */
          --button-fg: ${type
            ? 'var(--themed-fg)'
            : themeColor
            ? '#fff'
            : normalStyle.color || 'var(--geist-background)'};
          --button-bg: ${type
            ? 'var(--themed-bg)'
            : themeColor ||
              normalStyle.backgroundColor ||
              'var(--geist-foreground)'};
          --button-border: ${type
            ? 'var(--themed-border)'
            : themeColor ||
              normalStyle.borderColor ||
              'var(--geist-foreground)'};
        }

        .button:hover,
        .button:focus,
        .button:active {
          /* Use -hover variables here for the same reason */
          --button-fg-hover: ${type
            ? 'var(--button-bg)'
            : themeColor || hoverStyle.color || 'var(--geist-foreground)'};
          --button-bg-hover: ${type
            ? 'transparent'
            : hoverStyle.backgroundColor};
          --button-border-hover: ${type
            ? 'var(--button-bg)'
            : themeColor ||
              hoverStyle.borderColor ||
              'var(--geist-foreground)'};
        }
      `}</style>

      <style jsx>{`
        .button {
          /* base */
          appearance: none;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          /* typography */
          text-align: center;
          text-decoration: none;
          line-height: ${inputSize ? '34px' : '38px'};
          white-space: nowrap;
          font-weight: 500;
          font-family: var(--font-sans);

          /* size */
          min-width: ${width
            ? typeof width === 'number'
              ? width + 'px'
              : width
            : '200px'};
          height: ${large
            ? '50px;'
            : inputSize
            ? 'calc(9 * var(--geist-space))'
            : '40px'};
          padding: 0 ${icon && iconPush && iconRight ? 55 : 25}px 0
            ${icon && iconPush && !iconRight ? 55 : 25}px;
          border-radius: var(--geist-radius);
          font-size: ${large ? '1rem' : '0.875rem'};
          flex-shrink: 0;
          margin: 0;

          /* color */
          color: var(--button-fg);
          background-color: var(--button-bg);
          border: 1px solid var(--button-border);

          /* other */
          transition: all 0.2s ease;
          user-select: none;
          cursor: pointer;
          overflow: hidden;
          outline: none;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }

        /* Ghost buttons break the rules */
        .button.geist-themed.geist-ghost {
          --button-fg-hover: var(--geist-foreground);
          --button-bg-hover: transparent;
          --button-border-hover: transparent;
        }

        /* Secondary buttons break the rules */
        .button.geist-themed.geist-secondary {
          --button-fg: var(--accents-5);
          --button-bg: var(--geist-background);
          --button-border: var(--accents-2);
        }
        .button.geist-themed.geist-secondary.shadow {
          --button-border: transparent;
        }
        .button.geist-themed.geist-secondary:not(.shadow):hover,
        .button.geist-themed.geist-secondary:not(.shadow):focus,
        .button.geist-themed.geist-secondary:not(.shadow):active {
          --button-fg-hover: var(--geist-foreground);
          --button-bg-hover: var(--geist-background);
          --button-border-hover: var(--geist-foreground);
        }

        /* Shadow hover styles should be the same as non-hovered */
        .button.shadow:hover,
        .button.shadow:focus,
        .button.shadow:active {
          --button-fg-hover: var(--button-fg);
          --button-bg-hover: var(--button-bg);
          --button-border-hover: var(--button-border);
        }

        /* Sizes */
        .button.small {
          min-width: ${width
            ? typeof width === 'number'
              ? width + 'px'
              : width
            : 'auto'};
          height: 24px;
          line-height: 22px;
          padding: 0 ${icon && iconPush && iconRight ? 15 : 10}px 0
            ${icon && iconPush && !iconRight ? 15 : 10}px;
        }
        .button.small .icon {
          left: ${iconRight ? 'auto' : '11px'};
          right: ${iconRight ? '12px' : 'auto'};
        }
        .button.medium {
          min-width: ${width
            ? typeof width === 'number'
              ? width + 'px'
              : width
            : 'auto'};
          height: 32px;
          line-height: 0;
          font-size: 0.875rem;
          padding: 6px ${icon && iconPush && iconRight ? 45 : 12}px 6px
            ${icon && iconPush && !iconRight ? 45 : 12}px;
        }
        // we match input height on mobile devices (inputs are higher on mobile)
        @media only screen and (max-device-width: 780px) and (-webkit-min-device-pixel-ratio: 0) {
          button {
            ${inputSize ? 'height: calc(2 * var(--geist-gap));' : ''}
          }
        }

        /* Shadow modifier */
        .button.shadow {
          font-weight: 400;
          box-shadow: var(--shadow-small);
        }

        /* Button text */
        .button .text {
          position: relative;
          z-index: 1;
          margin-left: ${textOffset ? `${textOffset}px` : '0'};
        }

        /* Button icon */
        .button .icon {
          position: absolute;
          display: flex;
          align-items: center;
          top: 0;
          bottom: 0;
          z-index: 1;
          left: ${iconRight ? 'auto' : `${iconOffset || 22}px`};
          right: ${iconRight ? `${iconOffset || 22}px` : 'auto'};
          color: var(--button-fg);
        }
        .button.medium .icon {
          left: ${iconRight ? 'auto' : `${iconOffset || 15}px`};
          right: ${iconRight ? `${iconOffset || 15}px` : 'auto'};
        }
        .button.auto-size .icon :global(svg) {
          height: 20px;
          width: 20px;
        }
        .button.icon-color .icon :global(path) {
          fill: var(--button-fg);
          transition: fill 0.2s ease, color 0.2s ease;
        }
        .button.icon-stroke .icon :global(path) {
          stroke: var(--button-fg);
          transition: stroke 0.2s ease, color 0.2s ease;
        }

        /* Hover style */
        .button:hover,
        .button:focus,
        .button:active,
        .button:focus-within {
          color: var(--button-fg-hover);
          background-color: var(--button-bg-hover);
          border-color: var(--button-border-hover);
        }

        .button:hover .icon,
        .button:focus .icon,
        .button:active .icon,
        .button:focus-within .icon {
          color: var(--button-fg-hover);
        }

        .button.icon-color:hover .icon :global(path),
        .button.icon-color:focus .icon :global(path),
        .button.icon-color:active .icon :global(path) {
          fill: var(--button-fg-hover);
        }
        .button.icon-stroke:hover .icon :global(path),
        .button.icon-stroke:focus .icon :global(path),
        .button.icon-stroke:active .icon :global(path) {
          stroke: var(--button-fg-hover);
        }
        .button.shadow:hover,
        .button.shadow:focus,
        .button.shadow:active {
          box-shadow: var(--shadow-medium);
          transform: translate3d(0px, -1px, 0px);
        }

        /* Disabled style */
        .button.disabled {
          cursor: not-allowed;
          background: var(--accents-1);
          border-color: var(--accents-2);
          color: var(--accents-4);
          filter: grayscale(1);
        }
        .button.disabled .icon {
          color: var(--accents-4);
        }
        .button.disabled .icon :global(svg) {
          opacity: 0.4;
        }
        .button.disabled.icon-color .icon :global(path) {
          fill: var(--accents-4);
        }
        .button.disabled.stroke-color .icon :global(path) {
          stroke: var(--accents-4);
        }
        .button.disabled.shadow:hover,
        .button.disabled.shadow:focus,
        .button.disabled.shadow:active {
          box-shadow: var(--shadow-medium);
          transform: unset;
        }

        /* loading style */
        .button.loading {
          background: var(--accents-1);
          border-color: var(--accents-2);
          color: var(--accents-4);
          cursor: default;
          pointer-events: none;
          filter: grayscale(1);
        }
        .button.loading .text {
          visibility: hidden;
        }
        .button.loading .loading-dots {
          position: absolute;
          display: inline-flex;
        }
      `}</style>
    </Component>
  )
}

ButtonBase.propTypes = {
  Component: PropTypes.string,
  typeName: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  iconAutoSize: PropTypes.bool,
  iconRight: PropTypes.bool,
  iconPush: PropTypes.bool,
  iconNoColorOverride: PropTypes.bool,
  iconNoStrokeOverride: PropTypes.bool,
  loading: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  shadow: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  normalStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  animation: PropTypes.bool,
  themeColor: PropTypes.string
}

const Button = (props, ref) => {
  return <ButtonBase {...props} innerRef={ref} />
}

export default withType(React.forwardRef(Button), {
  defaultFill: true,
  hasFill: false
})
