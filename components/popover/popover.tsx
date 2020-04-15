import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
import cn from 'classnames'

type VerticalPosition = 'top' | 'center' | 'bottom'
type HorizontalPosition = 'left' | 'center' | 'right'

type VerticalChoices = Record<VerticalPosition, string>
type HorizontalChoices = Record<HorizontalPosition, string>
type PositionChoice = {
  vertical: VerticalChoices
  horizontal: HorizontalChoices
}
interface Choices {
  anchorOrigin: PositionChoice
  transformOrigin: PositionChoice
}

interface Position {
  vertical: VerticalPosition
  horizontal: HorizontalPosition
}

const choices: Choices = {
  anchorOrigin: {
    vertical: {
      top: 'top: 0',
      center: 'top: 50%',
      bottom: 'top: 100%'
    },
    horizontal: {
      left: 'left: 0',
      center: 'left: 50%',
      right: 'left: 100%'
    }
  },
  transformOrigin: {
    vertical: {
      top: '0',
      center: '-50%',
      bottom: '-100%'
    },
    horizontal: {
      left: '0',
      center: '-50%',
      right: '-100%'
    }
  }
}

interface Props {
  trigger: React.ReactNode
  disabled?: boolean
  debug?: boolean
  overlay?: boolean
  toggleRef?: Function
  onOpen?: () => void
  onClose?: () => void
  anchorOrigin?: Position
  transformOrigin?: Position
}

const Popover: React.FC<Props> = memo<Props>(
  ({
    trigger,
    disabled,
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    debug,
    overlay,
    onOpen,
    onClose,
    children,
    toggleRef
  }) => {
    // We control the details open state manually so we can
    // conditionally mount the menu contents (helps with autoFocus & keybinds)
    const [open, setOpen] = useState(false)

    const toggle = useCallback(
      e => {
        e.preventDefault()
        if (disabled) return
        setOpen(!open)

        if (!open === true && onOpen) {
          onOpen()
        }

        if (!open === false && onClose) {
          onClose()
        }
      },
      [disabled, open, onOpen, onClose]
    )

    useEffect(() => {
      if (toggleRef) {
        toggleRef(toggle)
      }
    }, [toggleRef, toggle])

    const keydown = useCallback(
      e => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      },
      [setOpen]
    )

    // Register keybind on mount
    useEffect(() => {
      if (open) {
        window.addEventListener('keydown', keydown)
      }

      return () => window.removeEventListener('keydown', keydown)
    }, [keydown, open])

    // Lookup the correct styles for the given positions
    const anchor = useMemo(
      () =>
        [
          choices.anchorOrigin.vertical[anchorOrigin.vertical],
          choices.anchorOrigin.horizontal[anchorOrigin.horizontal]
        ].join(';'),
      [anchorOrigin.vertical, anchorOrigin.horizontal]
    )

    const transform = useMemo(
      () => `transform: translate(
    ${choices.transformOrigin.horizontal[transformOrigin.horizontal]},
    ${choices.transformOrigin.vertical[transformOrigin.vertical]});
  `,
      [transformOrigin.horizontal, transformOrigin.vertical]
    )

    return (
      <div className={cn('details', { open })}>
        {/* The element that will open and close the popover */}
        <div onClick={toggle} className={cn('summary', { disabled })}>
          {trigger}
        </div>

        <div role="menu" aria-hidden={!open} className="menu">
          {/* Only mount children when opened */}
          {open && <div className="inner">{children}</div>}

          {/* Show a little positioning dot for debugging */}
          {debug && <div className="dot" />}
        </div>

        <style jsx>{`
          .summary::-webkit-details-marker {
            display: none;
          }

          .summary {
            display: inline-flex;
            list-style: none;
            outline: none;
            cursor: pointer;
            max-width: 100%;
          }

          .summary.disabled {
            cursor: not-allowed;
          }

          .details {
            display: inline-flex;
            position: relative;
          }

          /* The full page overlay that acts as "click-outside" */
          .details.open > .summary::before {
            content: '';
            background: rgba(0, 0, 0, 0);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: default;
            z-index: 80;
          }

          /* The menu contents */
          .details.open > .menu {
            --opacity-end: 1;
            position: absolute;
            top: 0%;
            left: 100%;
            z-index: 90;
            opacity: 0;
            animation: fadeIn 0.1s ease-in forwards;
          }

          /* The inner menu contents is positioned seperately */
          .inner {
            position: absolute;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: var(--opacity-end);
            }
          }
        `}</style>

        {/* Dynamic Styling */}
        <style jsx>{`
          .inner {
            ${transform}
          }

          .details.open > .menu {
            ${anchor}
          }

          .details.open > .summary::before {
            ${overlay ? 'background: rgba(0, 0, 0, 0.3);' : ''}
          }
        `}</style>

        {/* Debug Styling */}
        <style jsx>{`
          .details.open > .summary::before {
            ${debug ? 'content: none;' : ''}
          }

          .dot {
            ${debug ? anchor : ''}
            ${debug &&
              `position: absolute;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: var(--geist-alert);
          transform: translate(-50%, -50%);`}
          }
        `}</style>
      </div>
    )
  }
)

Popover.displayName = 'Popover'

export default Popover