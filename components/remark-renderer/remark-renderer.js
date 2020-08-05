import React, { useEffect, useRef } from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import rehypePrism from '@mapbox/rehype-prism'

import RemarkNote from '~/components/text/remark-note'
import RemarkCaption from '~/components/text/remark-caption'
import { Code } from '~/components/remark-code'
import withClipboard from '~/lib/with-clipboard'

const RemarkRenderer = ({
  caption,
  allowCopy,
  contentType,
  children,
  components
}) => {
  const codeBlockRefs = []

  const getNewCodeBlockRefs = () => {
    const codeBlockRef = useRef()
    codeBlockRefs.push(codeBlockRef)
    return codeBlockRef
  }

  const renderMarkdown = md => {
    const markdownProcessor = unified()
      .use(markdown)
      .use(remark2rehype)
      .use(rehypePrism)
      .use(rehype2react, {
        createElement: React.createElement,
        components: {
          ...components,
          code:
            allowCopy === true
              ? withClipboard(Code, getNewCodeBlockRefs)
              : props => <Code ref={getNewCodeBlockRefs()} {...props} />
        }
      })

    return markdownProcessor.processSync(md).result
  }

  // reformat shell script, wrap each line with <li> so that CSS can be used to add $ to front of each line
  useEffect(() => {
    const isShellScript = className =>
      ['shell', 'sh', 'bash', 'console', 'zsh'].some(word =>
        className.includes(`language-${word}`)
      )

    codeBlockRefs.map(codeBlockRef => {
      if (codeBlockRef.current) {
        const codeBlock = codeBlockRef.current

        if (isShellScript(codeBlock.className)) {
          codeBlock.innerHTML = `<ul>${codeBlock.innerHTML
            .split('\n')
            .map(line => {
              return line.trim() !== '' ? `<li>${line}</li>` : ``
            })
            .join('')}</ul>`
        }
      }
    })
  }, [children])

  return contentType === 'default' ? (
    <>{renderMarkdown(children)}</>
  ) : contentType === 'note' ? (
    <RemarkNote type="note">{renderMarkdown(children)}</RemarkNote>
  ) : contentType === 'warning' ? (
    <RemarkNote type="warning">{renderMarkdown(children)}</RemarkNote>
  ) : contentType === 'caption' ? (
    <RemarkCaption components={{ ...components }}>{children}</RemarkCaption>
  ) : contentType === 'code' ? (
    <>
      {renderMarkdown(children)}
      <RemarkCaption components={{ ...components }}>{caption}</RemarkCaption>
    </>
  ) : contentType === undefined ? (
    <>{renderMarkdown(children)}</>
  ) : (
    <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
      unsupported <b>markdown</b> contentType type:{' '}
      <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
        {contentType}
      </pre>
    </div>
  )
}

export default RemarkRenderer
