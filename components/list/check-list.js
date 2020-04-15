import { LI } from '~/components/list'
import CheckmarkInCircle from '~/components/icons/checkmark-in-circle'
import CrossInCircle from '~/components/icons/cross-in-circle'

const CheckList = ({ items, cross, ...props }) => (
  <ul {...props}>
    {items.map(item => (
      <LI key={item}>
        <span className="icon">
          {cross ? <CrossInCircle /> : <CheckmarkInCircle />}
        </span>{' '}
        {item}
      </LI>
    ))}
    <style jsx>{`
      ul {
        padding: 0;
        list-style-type: none;
        margin-left: 0;
      }

      .icon > :global(svg) {
        vertical-align: text-bottom;
        margin-right: 0.25em;
        transform: translateY(0.05em);
      }
    `}</style>
  </ul>
)

export default CheckList
