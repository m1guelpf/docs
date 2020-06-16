import { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { DisabledContext } from '~/lib/with-disabled-context'
import px from '~/lib/to-pixels'

class Input extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errored: PropTypes.bool,
    icon: PropTypes.node,
    iconRight: PropTypes.node,
    innerRef: PropTypes.func,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onInput: PropTypes.func,
    onFocus: PropTypes.func,
    onPaste: PropTypes.func,
    placeholder: PropTypes.string,
    typeName: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.string,
    border: PropTypes.bool,
    margin: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number
  }

  state = {
    focused: this.props.autoFocus
  }

  handleChange = event => {
    this.props.onChange(event.target.value)
  }

  handleRef = node => {
    this.innerRef = node
    if (this.props.innerRef) {
      this.props.innerRef(node)
    }
  }

  handleFocus = event => {
    this.setState({ focused: true })
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    this.setState({ focused: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  render() {
    const {
      autoFocus,
      children,
      disabled,
      errored,
      icon,
      iconRight,
      maxLength,
      placeholder,
      type,
      value,
      defaultValue,
      tabIndex,
      spellcheck = 'false',
      width,
      height,
      maxWidth,
      border = true,
      onInput,
      onKeyDown,
      margin,
      max,
      min,
      onChange,
      className,
      onPaste,
      readOnly,
      ...props
    } = this.props

    // Don't add this attribute to the DOM element
    delete props.innerRef

    const { focused } = this.state
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600

    return (
      <DisabledContext.Consumer>
        {disabledContext => (
          <div
            className={cn(
              'wrapper',
              {
                errored,
                focused,
                disabled: disabled || disabledContext
              },
              className
            )}
            style={{ ...this.props.style }}
            {...props}
          >
            {icon && <span className="icon">{icon}</span>}
            <div className="input-wrapper">
              <input
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={spellcheck}
                autoFocus={isMobile ? false : autoFocus}
                disabled={disabled || disabledContext}
                maxLength={maxLength}
                onBlur={this.handleBlur}
                onChange={onChange ? this.handleChange : null}
                onFocus={this.handleFocus}
                onPaste={onPaste}
                onKeyDown={onKeyDown}
                onInput={onInput}
                placeholder={placeholder}
                ref={this.handleRef}
                type={type || 'text'}
                value={value}
                defaultValue={defaultValue}
                tabIndex={tabIndex}
                max={max}
                min={min}
                readOnly={readOnly}
                title={value || placeholder}
              />
              {children}
            </div>
            {iconRight && <span className="icon right">{iconRight}</span>}

            <style jsx>{`
              .wrapper {
                align-items: center;
                ${border ? 'border-radius: 5px;' : ''}
                ${border
                  ? `border: 1px solid var(--accents-2);`
                  : 'border: 1px solid transparent;'}
                display: inline-flex;
                position: relative;
                transition: border 0.2s ease, color 0.2s ease;
                width: ${width || 'initial'};
                ${maxWidth ? `max-width: ${maxWidth};` : ''};
                background: var(--geist-background);
                height: ${height
                  ? `${px(height)}`
                  : 'calc(1.688 * var(--geist-gap));'};
              }
              .wrapper.focused {
                ${border ? `border: 1px solid var(--accents-5);` : ''}
              }
              .wrapper.disabled {
                background: var(--accents-1);
                border-color: var(--accents-2);
                cursor: not-allowed;
              }
              .wrapper.errored {
                border: 1px solid var(--geist-error);
              }
              .wrapper.errored.focused {
                border: 1px solid var(--geist-error);
                color: var(--geist-error);
              }
              .wrapper.errored input {
                color: var(--geist-error);
              }
              .wrapper.right {
                flex-direction: row-reverse;
              }
              .icon {
                align-items: center;
                display: flex;
                height: 100%;
                padding: 0 var(--geist-gap-half);
                vertical-align: middle;
              }
              /* Use flex order so that we can use the sibling selector */
              .icon.right {
                order: 2;
                border-bottom-right-radius: 5px;
                border-top-right-radius: 5px;
              }
              .icon.right ~ .input-wrapper {
                margin-right: 0;
              }
              .icon:not(.right) ~ .input-wrapper {
                margin-left: 0;
              }
              .input-wrapper {
                margin-right: 0;
              }
              .icon :global(svg path) {
                transition: fill 0.2s ease, stroke 0.2s ease;
              }
              .input-wrapper {
                display: block;
                margin: ${margin ? margin : '4px 10px'};
                position: relative;
                width: 100%;
              }
              input {
                border-radius: 0;
                border: none;
                box-shadow: none;
                box-sizing: border-box;
                display: block;
                padding: 0;
                font-family: var(--font-sans);
                font-size: 14px;
                line-height: 26px;
                outline: 0;
                width: 100%;
                color: var(--geist-foreground);
                background-color: transparent;
                caret-color: var(--geist-foreground);
                text-overflow: ellipsis;
                -webkit-appearance: none;
                appearance: none;
              }
              .wrapper input:disabled {
                color: var(--accents-3);
                cursor: not-allowed;
              }
              .wrapper input::placeholder,
              .wrapper input::-webkit-input-placeholder {
                color: var(--accents-3);
              }
              .wrapper input:disabled::placeholder {
                color: var(--accents-3);
              }
              @media only screen and (max-device-width: 780px) and (-webkit-min-device-pixel-ratio: 0) {
                // on iOS, the browser zooms on input if the text size is less than 16px
                // see https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
                input {
                  font-size: 16px;
                  line-height: 1;
                }
                .wrapper {
                  height: calc(2 * var(--geist-gap));
                }
              }
            `}</style>
          </div>
        )}
      </DisabledContext.Consumer>
    )
  }
}

export default Input
