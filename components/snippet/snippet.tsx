import { memo, useCallback } from 'react'
import copy from 'copy-text-to-clipboard'
import cn from 'classnames'

import Copy from '~/components/icons/copy'

import withType, { WithTypeProps } from '~/lib/with-type'
import { useToasts } from '~/components/toasts'

interface SnippetProps extends WithTypeProps {
  text: string | Array<string>
  copyText?: string | Array<string>
  onCopy?: () => void
  width?: number
  prompt?: boolean
  icon?: boolean
  dark?: boolean
  lineBreak?: boolean
}

const Snippet: React.FC<SnippetProps> = memo(
  ({
    text,
    onCopy,
    copyText,
    width,
    prompt = true,
    icon = true,
    lineBreak = true,
    dark,
    className,
    ...props
  }) => {
    const toasts = useToasts()

    const copyToClipboard = useCallback(() => {
      const copyableText = copyText || text
      if (Array.isArray(copyableText)) {
        copy(copyableText.join('\n'))
      } else {
        copy(copyableText)
      }

      // Show a toast confirming the copy effect
      if (toasts && toasts.current) {
        toasts.current.success({
          text: 'Copied to clipboard!'
        })
      }

      if (onCopy) {
        onCopy()
      }
    }, [toasts, onCopy, text, copyText])

    return (
      <div
        className={cn('snippet-wrapper', { prompt, dark, 'line-break': lineBreak && !Array.isArray(text) }, className)}
        {...props}
      >
        {Array.isArray(text) ? (
          text.map((line: string, i: number) => (
            <pre
              className="geist-overflow-scroll-y"
              // Just need a unique key here
              key={`snippet-${text}-${line}-${i}`}
            >
              {line}
            </pre>
          ))
        ) : (
          <pre className="geist-overflow-scroll-y">{text}</pre>
        )}

        {icon && (
          <div className="copy" onClick={copyToClipboard}>
            <Copy size={22} />
          </div>
        )}

        {/* Dynamic Styles */}
        <style jsx>{`
          .snippet-wrapper {
            width: ${width ? width : 'fit-content'};
          }

          .copy {
            color: ${dark ? '#fff' : 'var(--themed-fg)'};
            background: ${dark ? '#000' : 'var(--themed-bg)'};
          }
        `}</style>

        <style jsx>
          {`
            .snippet-wrapper {
              position: relative;
              max-width: 100%;
              border-radius: var(--geist-radius);
              border: 1px solid var(--themed-border);
              background: var(--themed-bg);
              color: var(--themed-fg);
              padding: var(--geist-gap-half);
              padding-right: var(--geist-gap-double);
            }

            .snippet-wrapper:not(.geist-themed) {
              --themed-border: var(--accents-2);
            }

            /* Do not show border in light mode for dark snippet */
            .snippet-wrapper.dark:not(.geist-themed) {
              --themed-border: var(--themed-bg);
              --themed-fg: #fff;
              --themed-bg: #000;
            }

            /* Only show border in dark mode for dark snippet */
            :global(.dark-theme) .snippet-wrapper.dark {
              --themed-border: var(--accents-2);
            }

            .copy {
              cursor: pointer;
              position: absolute;
              right: 0;
              top: 3px;
              bottom: 0;
              display: inline-flex;
              padding: var(--geist-gap-quarter) var(--geist-gap-half);
              border-radius: 0 var(--geist-radius) var(--geist-radius) 0;
              transition: color 0.2s ease;
            }

            .copy:hover {
              color: var(--themed-fg);
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

            .snippet-wrapper.line-break pre {
              white-space: pre-wrap;
              word-break: break-all;
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

export default withType(Snippet)