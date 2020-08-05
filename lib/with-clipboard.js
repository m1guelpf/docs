import copy from 'copy-text-to-clipboard'

import Copy from '~/components/icons/copy'
import { useToasts } from '~/components/toasts'

const withClipboard = (WrappedComponent, ref = {}) => {
  return ({ className, children, ...props }) => {
    const dark = ['shell', 'sh', 'bash', 'console', 'zsh'].some(word =>
      className.includes(`language-${word}`)
    )

    const toasts = useToasts()

    const thisRef = typeof ref === 'function' ? ref() : ref

    const onCopy = () => {
      // Show a toast confirming the copy effect
      if (toasts && toasts.current) {
        toasts.current.success({
          text: 'Copied to clipboard!'
        })
      }

      const toClipboard = thisRef.current.innerHTML
        .replace(/<\/li>/g, '\n')
        .replace(/<\/?[^>]+(>|$)/g, '')
      copy(toClipboard)
    }

    return (
      <>
        <div className="copy" onClick={onCopy}>
          <Copy
            stroke="currentColor"
            fill={dark ? '#000' : 'var(--geist-background)'}
            width="18px"
            height="18px"
          />
        </div>
        <WrappedComponent ref={thisRef} className={className} {...props}>
          {children}
        </WrappedComponent>
        <style jsx>{`
          .copy {
            position: absolute;
            width: fit-content;
            right: 10px;
            bottom: 10px;
            cursor: pointer;
            color: ${dark ? '#fff' : 'var(--geist-foreground)'};
            background: ${dark ? '#000' : 'var(--geist-background)'};
          }
          .copy:hover {
            color: var(--accents-5);
          }
        `}</style>
      </>
    )
  }
}

export default withClipboard
