import React, {
  forwardRef,
  memo,
  CSSProperties,
  Ref,
  Fragment,
  DetailedHTMLProps,
  InputHTMLAttributes
} from 'react'
import cn from 'classnames'

import Label from '~/components/label'
import styles from './input.module.css'
import { useDisabled } from '~/lib/with-disabled-context'
import { IconSizeContext } from '~/lib/with-icon'
import useType, { Types } from '~/lib/use-type'
import useID from '~/lib/use-id'
import { Size, getIxIconSize } from '~/lib/sizing'
import Spacer from '~/components/spacer'
import ErrorMessage from '~/components/error'

type NativeInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'prefix' | 'type' | 'size'
>

export interface GenericInputProps {
  // Content
  value: string
  defaultValue?: string

  // Overriding form settings
  label?: React.ReactNode

  type?: Types
  width?: CSSProperties['width']
  size?: Size

  error?: string
}

export type InputProps = NativeInputProps &
  GenericInputProps & {
    typeName?: string
    type?: Types
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    prefixStyling?: boolean
    suffixStyling?: boolean
    prefixContainer?: boolean
    suffixContainer?: boolean
  }

function Input(
  {
    disabled,
    label,
    typeName = 'text',
    prefix,
    suffix,
    prefixStyling = true,
    prefixContainer = true,
    suffixStyling = true,
    suffixContainer = true,
    width,
    error,
    type,
    size,
    className,
    ...props
  }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const Wrapper = label ? Label : Fragment
  const wrapperProps = {
    ...(label && {
      value: label,
      withInput: true,
      style: { width }
    })
  }
  const isDisabled = useDisabled() || disabled
  const inputId = useID('input-')

  // Always show error styling when error is set
  type = error ? 'error' : type
  const typeCn = useType(type)

  return (
    // eslint-disable-next-line
    // @ts-ignore I can't figure this one out. How do I tell TS that the necessary props will be there?
    <Wrapper {...wrapperProps}>
      <div
        className={cn(styles.container, typeCn, {
          [styles.prefix]: prefix,
          [styles.suffix]: suffix,
          [styles.noPrefixStyle]: !prefixStyling,
          [styles.noSuffixStyle]: !suffixStyling,
          [styles.large]: size === 'large',
          [styles.small]: size === 'small'
        })}
        style={{ width }}
        data-geist-input-wrapper=""
      >
        <IconSizeContext.Provider value={getIxIconSize(size)}>
          <input
            {...props}
            className={cn(styles.input, className)}
            disabled={isDisabled}
            type={typeName}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            data-geist-input=""
          />
          {prefix &&
            (!prefixContainer ? (
              prefix
            ) : (
              <span data-geist-input-prefix="">{prefix}</span>
            ))}
          {suffix &&
            (!suffixContainer ? (
              suffix
            ) : (
              <span data-geist-input-suffix="">{suffix}</span>
            ))}
        </IconSizeContext.Provider>
      </div>

      {error && (
        <>
          <Spacer y={0.5} />
          <ErrorMessage id={`${inputId}-error`} style={{ width }} size={size}>
            {error}
          </ErrorMessage>
        </>
      )}
    </Wrapper>
  )
}

Input.displayName = 'Input'
export default memo(forwardRef(Input))