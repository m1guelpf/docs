import refractor from 'refractor'
import rehype from 'rehype'

const Code = ({ children, lang }, { darkBg } = {}) => (
  <pre className={(darkBg ? 'dark' : '') + (lang ? ` ${lang}` : '')}>
    {lang ? (
      <code
        className={`language-${lang}`}
        dangerouslySetInnerHTML={{
          __html: rehype()
            .stringify({
              type: 'root',
              children: refractor.highlight(children, lang)
            })
            .toString()
        }}
      />
    ) : (
      <code>{children}</code>
    )}
    <style jsx>
      {`
        pre {
          border: 1px solid #eaeaea;
          padding: 20px;
          margin: 24px 0 16px;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          background: white;
        }
        code {
          color: #000;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 13px;
          line-height: 20px;
        }
        pre.dark {
          border-color: #333;
          background: transparent;
        }
        .dark code {
          color: #fff;
        }
        .dark.bash code {
          color: #50e3c2;
        }
      `}
    </style>
  </pre>
)

export default Code
