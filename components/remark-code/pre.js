const Pre = ({ className, children }) => (
  <pre className={className}>
    {children}
    <style jsx>
      {`
        pre {
          border: 1px solid #eaeaea;
          border-radius: var(--geist-radius);
          padding: 20px;
          margin: 24px 0 40px;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          background: white;
          position: relative;
        }

        pre.language-shell,
        pre.language-console,
        pre.language-bash,
        pre.language-sh,
        pre.language-zsh {
          background: #000;
          border-color: #333;
        }
      `}
    </style>
  </pre>
)

export default Pre
