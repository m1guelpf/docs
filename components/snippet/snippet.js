import { memo, useCallback } from 'react'
import copy from 'copy-to-clipboard'
import cn from 'classnames'
import PropTypes from 'prop-types'

import Copy from '~/components/icons/copy'

import { useToasts } from '~/components/toasts'

const Snippet = memo(
  ({ text, onCopy, width = '100%', prompt = true, dark, clipboard = true }) => {
    const toasts = useToasts()

    const copyToClipboard = useCallback(() => {
      copy(text)

      // Show a toast confirming the copy effect
      if (toasts && toasts.current) {
        toasts.current.success({
          text: 'Copied to clipboard!'
        })
      }

      if (onCopy) {
        onCopy()
      }
    }, [onCopy, toasts, text])

    return (
      <div className={cn('snippet-wrapper', { prompt })}>
        <pre className="geist-overflow-scroll-y">{text}</pre>

        {clipboard && (
          <div className="copy" onClick={copyToClipboard}>
            <Copy
              stroke="currentColor"
              fill={dark ? '#000' : 'var(--geist-background)'}
              width="18px"
              height="18px"
            />
          </div>
        )}

        <style jsx>
          {`
            .snippet-wrapper {
              position: relative;
              width: fit-content;
              max-width: 100%;
              min-width: ${width ? width : 'inherit'};
              border-radius: var(--geist-radius);
              border: 1px solid ${dark ? 'transparent' : 'var(--accents-2)'};
              background: ${dark ? '#000' : 'var(--geist-background)'};
              color: ${dark ? '#fff' : 'var(--geist-foreground)'};
              padding: var(--geist-gap-half);
              padding-right: var(--geist-gap-double);
              margin-bottom: 40px;
            }
            :global(.dark-theme) .snippet-wrapper {
              border-color: var(--accents-2);
            }
            .copy {
              cursor: pointer;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              display: inline-flex;
              padding: var(--geist-gap-half);
              color: ${dark ? '#fff' : 'var(--geist-foreground)'};
              background: ${dark ? '#000' : 'var(--geist-background)'};
              border-radius: 0 var(--geist-radius) var(--geist-radius) 0;
              transition: color 0.2s ease;
            }
            .copy:hover {
              color: var(--accents-5);
            }
            .snippet-wrapper pre {
              text-align: left;
              margin: 0;
              font-family: var(--font-mono);
              font-size: 13px;
              line-height: 1.5;
            }
            .snippet-wrapper pre::-webkit-scrollbar {
              display: none;
              width: 0;
              height: 0;
              background: transparent;
            }
            .snippet-wrapper.prompt pre::before {
              content: '$ ';
              user-select: none;
            }
            .snippet-wrapper pre::selection {
              background: var(--geist-selection);
            }
          `}
        </style>
      </div>
    )
  }
)

Snippet.propTypes = {
  text: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  width: PropTypes.string,
  prompt: PropTypes.bool,
  dark: PropTypes.bool
}

export default Snippet
