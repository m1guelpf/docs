import { memo, useCallback, useState, useRef } from 'react'
import cn from 'classnames'

import Input, { InputProps } from './input'
import X from '~/components/icons/x-circle'
import styles from './clearable.module.css'

export type ClearableInputProps = Omit<
  InputProps,
  // These are manually set, so cannot pass custom values
  'suffix' | 'suffixStyling' | 'suffixContainer'
>

const ClearableInput = ({
  value,
  onChange,
  disabled,
  width,
  ...props
}: ClearableInputProps) => {
  const [showButton, setShowButton] = useState(value ? true : false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const widthRef = useRef<number | null>(null)

  const handleInputRef = useCallback((node: HTMLInputElement) => {
    if (!node) return

    inputRef.current = node
    widthRef.current =
      node.closest('[data-geist-input-wrapper]')?.getBoundingClientRect()
        .width || null
  }, [])

  const handleChange = useCallback(
    e => {
      if (e.target.value === '') {
        setShowButton(false)
      } else {
        setShowButton(true)
      }

      onChange?.(e)
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    if (inputRef.current && !disabled) {
      if (inputRef.current.value) {
        inputRef.current.value = ''

        // Manually trigger an onChange event
        handleChange({ target: { value: '' } })
      }

      inputRef.current.focus()
    }
  }, [handleChange, disabled])

  return (
    <Input
      {...props}
      value={value}
      ref={handleInputRef}
      onChange={handleChange}
      suffix={
        showButton && (
          <button
            type="button"
            className={cn(styles.button, {
              [styles.disabled]: disabled
            })}
            onClick={handleClear}
            tabIndex={disabled ? -1 : undefined}
          >
            <span>
              <X />
            </span>
          </button>
        )
      }
      suffixStyling={false}
      suffixContainer={false}
      disabled={disabled}
      // We conditionally render the suffix. To avoid jumping we must
      // hardcode the width of the input container
      width={width || widthRef.current || undefined}
    />
  )
}

export default memo(ClearableInput)