const Caption = ({ children, ...props }) => (
  <p {...props} className="caption">
    {children}
    <style jsx>
      {`
        p {
          color: var(--accents-5);
          font-size: var(--font-size-small);
          line-height: var(--line-height-small);
          margin: 16px 0 40px 0;
          text-align: center;
        }
      `}
    </style>
  </p>
)

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: var(--font-mono);
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }
      `}
    </style>
  </code>
)

Caption.Code = Code

export default Caption
