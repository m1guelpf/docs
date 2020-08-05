import React from 'react'
import cn from 'classnames'

import Text from '~/components/text'
import styles from './note.module.css'
import useType, { Types } from '~/lib/use-type'

interface NoteProps {
  label?: string | false
  small?: boolean
  center?: boolean
  type?: Types
  fill?: boolean
  className?: string
}

const Note: React.FC<NoteProps> = ({
  children,
  className,
  type,
  fill,
  label,
  small,
  center,
  ...props
}) => {
  const typeCn = useType(type, fill)

  return (
    <div
      className={cn(styles.note, className, typeCn, {
        [styles.small]: small,
        [styles.fill]: fill,
        [styles.center]: center
      })}
      {...props}
      data-geist-note=""
    >
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
    </div>
  )
}

export default Note