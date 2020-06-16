import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { DisabledContext } from '~/lib/with-disabled-context'

export default class Textarea extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errored: PropTypes.bool,
    innerRef: PropTypes.func,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onPaste: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
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
      maxLength,
      placeholder,
      width,
      height,
      type,
      value
    } = this.props
    const { focused } = this.state

    return (
      <div
        className={cn('wrapper', { errored, focused }, this.props.className)}
      >
        <DisabledContext.Consumer>
          {disabledContext => (
            <textarea
              {...this.props}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              autoFocus={autoFocus}
              disabled={disabled || disabledContext}
              maxLength={maxLength}
              onBlur={this.handleBlur}
              onChange={this.props.onChange ? this.handleChange : null}
              onFocus={this.handleFocus}
              onPaste={this.props.onPaste}
              placeholder={placeholder}
              ref={this.handleRef}
              type={type || 'text'}
              value={value}
            />
          )}
        </DisabledContext.Consumer>

        {children}
        <style jsx>{`
          .wrapper {
            align-items: center;
            border-radius: 5px;
            border: 1px solid var(--accents-2);
            display: inline-flex;
            position: relative;
            transition: border 0.2s ease, color 0.2s ease;
            vertical-align: middle;
            ${width ? `width: ${width};` : ''}
            ${height ? `height: ${height};` : ''}
          }

          .wrapper.focused {
            border: 1px solid var(--accents-5);
          }

          .wrapper.errored {
            border: 1px solid var(--geist-error);
          }

          .wrapper.errored.focused {
            border: 1px solid var(--geist-error);
            color: var(--geist-error);
          }

          .wrapper.errored textarea {
            color: var(--geist-error);
          }

          textarea {
            background-color: transparent;
            border-radius: 0;
            border: 0;
            border: none;
            box-shadow: none;
            box-sizing: border-box;
            display: block;
            font-family: var(--font-sans);
            font-size: 14px;
            line-height: 1.7;
            height: 100%;
            min-height: 100px;
            outline: 0;
            padding: 10px;
            resize: none;
            width: 100%;
            color: var(--geist-foreground);
          }

          .wrapper textarea:disabled {
            background: var(--accents-1);
            color: var(--accents-4);
            border-radius: 5px;
            cursor: not-allowed;
          }

          .wrapper textarea::placeholder {
            color: var(--accents-3);
          }

          .wrapper textarea:disabled::placeholder {
            color: var(--accents-3);
          }

          @media only screen and (max-device-width: 780px) and (-webkit-min-device-pixel-ratio: 0) {
            textarea {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    )
  }
}
