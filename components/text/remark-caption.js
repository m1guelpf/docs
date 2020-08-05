import React from 'react'
import RemarkRenderer from '~/components/remark-renderer'
import components from '~/lib/remark-components'

const RemarkCaption = ({
  children,
  components: customComponents,
  ...props
}) => (
  <div {...props} className="caption">
    <RemarkRenderer
      components={{
        ...components,
        ...customComponents
      }}
    >
      {children}
    </RemarkRenderer>
    <style jsx>
      {`
        .caption {
          color: var(--accents-5);
          line-height: var(--line-height-small);
          margin: -24px 0 40px 0;
          text-align: center;
        }

        .caption :global(div p) {
          font-size: var(--font-size-small);
        }
      `}
    </style>
  </div>
)


export default RemarkCaption
