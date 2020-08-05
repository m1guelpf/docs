import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import Text from '~/components/text'
import withType from '~/lib/with-type'

const RemarkNote = ({
  children,
  className,
  type = 'default',
  fill,
  label,
  small,
  center,
  ...props
}) => {
  return (
    <div className={cn('note', className, { small, fill, center })} {...props}>
      {label !== false && (
        <Text bold span uppercase>
          {(label && `${label}: `) ||
            (type === 'success' && `Success: `) ||
            (type === 'error' && `Error: `) ||
            (type === 'warning' && `Warning: `) ||
            `Note: `}
        </Text>
      )}

      {children}

      <style jsx>{`
        .note {
          padding: var(--geist-gap-half) var(--geist-gap);
          border-radius: var(--geist-radius);
          color: var(--themed-fg);
          background: var(--themed-bg);
          border: 1px solid var(--themed-border, var(--accents-2));
          font-size: 14px;
          line-height: 1.8;
        }

        .note.fill {
          color: var(--themed-fg, var(--geist-background));
          background: var(--themed-bg, var(--geist-foreground));
          border: 1px solid var(--themed-border, var(--geist-foreground));
        }

        .note.small {
          padding: 5px var(--geist-gap-half);
        }

        .note.center {
          text-align: center;
        }

        .note > :global(div:first-of-type),
        .note > :global(div:first-of-type > p:first-child) {
          display: inline;
        }
      `}</style>
    </div>
  )
}

RemarkNote.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  type: PropTypes.oneOf([
    'secondary',
    'success',
    'error',
    'warning',
    'default',
    'lite',
  ]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default withType(RemarkNote)
