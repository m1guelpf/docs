import { CSSProperties } from 'react'
import cn from 'classnames'

import styles from './label.module.css'

export interface LabelProps {
  value: React.ReactNode
  children?: React.ReactNode
  withInput?: boolean
  id?: string
  elId?: string
  style?: CSSProperties
}

const Label: React.FC<LabelProps> = ({
  value,
  withInput,
  id,
  children,
  style,
  elId
}) => {
  return (
    <label htmlFor={id} style={style} id={elId}>
      <div
        className={cn(styles.label, {
          [styles.input]: withInput
        })}
      >
        {value}
      </div>

      {children}
    </label>
  )
}

// Intentionally not memoized
export default Label