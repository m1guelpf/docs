import React from 'react'
import classNames from 'classnames'

const literal = '`'

const Code = React.forwardRef(({ className, children }, ref = {}) => {
  const darkBg = ref ? ref.darkBg : undefined
  return (
    <>
      <code
        ref={ref}
        className={classNames(className, {
          dark: darkBg
        })}
      >
        {children}
      </code>
      <style jsx>
        {`
        code {
          color: #bd10e0;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '${literal}';
        }

        code::after {
          content: '${literal}';
        }

        

        
        :global(pre) code {
          color: #000;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 13px;
          line-height: 20px;
        }

        :global(pre) code::before {
          content: none;
        }

        :global(pre) code::after {
          content: none;
        }



        :global(pre) code.language-shell,
        :global(pre) code.language-console,
        :global(pre) code.language-bash,
        :global(pre) code.language-sh,
        :global(pre) code.language-zsh {
          color: #fff;
          background: transparent;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        :global(pre) code.language-shell :global(ul),
        :global(pre) code.language-console :global(ul),
        :global(pre) code.language-bash :global(ul),
        :global(pre) code.language-sh :global(ul),
        :global(pre) code.language-zsh :global(ul) {
          display: block;
          margin: 0;
          padding: 0;
        }


        :global(pre) code.language-shell :global(ul li),
        :global(pre) code.language-console :global(ul li),
        :global(pre) code.language-bash :global(ul li),
        :global(pre) code.language-sh :global(ul li),
        :global(pre) code.language-zsh :global(ul li) {
          margin: 0;
          padding: 0;
          display: block;
          margin-left: 25px;
          text-indent: -10px;
        }


        :global(pre) code.language-shell :global(ul li)::before,
        :global(pre) code.language-console :global(ul li)::before,
        :global(pre) code.language-bash :global(ul li)::before,
        :global(pre) code.language-sh :global(ul li)::before,
        :global(pre) code.language-zsh :global(ul li)::before {
          content: '$ ';
          user-select: none;
          white-space: pre;
          color: #CCC;
          display: inline-block;
          margin-left: -10px;
          
        }


        :global(pre) code.language-shell :global(span.token),
        :global(pre) code.language-console :global(span.token),
        :global(pre) code.language-bash :global(span.token),
        :global(pre) code.language-sh :global(span.token),
        :global(pre) code.language-zsh :global(span.token) {
          color: #fff;
        }

        :global(pre) code.language-shell :global(span.token.function),
        :global(pre) code.language-console :global(span.token.function),
        :global(pre) code.language-bash :global(span.token.function),
        :global(pre) code.language-sh :global(span.token.function),
        :global(pre) code.language-zsh :global(span.token.function) {
          color: #fff;
          font-weight: bold;
        }

        :global(pre) code.language-shell :global(span.token.string),
        :global(pre) code.language-console :global(span.token.string),
        :global(pre) code.language-bash :global(span.token.string),
        :global(pre) code.language-sh :global(span.token.string),
        :global(pre) code.language-zsh :global(span.token.string) {
          color: #fff;
          opacity: 0.8;
          font-style: italic;
        }

        :global(pre) code.language-shell :global(span.token.variable),
        :global(pre) code.language-console :global(span.token.variable),
        :global(pre) code.language-bash :global(span.token.variable),
        :global(pre) code.language-sh :global(span.token.variable),
        :global(pre) code.language-zsh :global(span.token.variable) {
          color: #fff;
          opacity: 0.8;
          font-style: italic;
        }

        


        :global(pre).dark {
          border-color: #333;
          background: transparent;
        }

        code.dark {
          color: #fff;
        }
        code.dark.bash {
          color: #50e3c2;
        }

        
      `}
      </style>
    </>
  )
})

export default Code
