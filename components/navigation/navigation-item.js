import Link from '~/components/text/link'
import cn from 'classnames'

const NavigationItem = ({
  active,
  children,
  className,
  href,
  onClick,
  customLink,
  as
}) => (
  <span className={cn({ active }, className, 'navigation-item')}>
    {customLink ? (
      children
    ) : (
      <Link href={href} as={as} onClick={onClick}>
        {children}
      </Link>
    )}
    <style jsx>{`
      .navigation-item,
      .navigation-item > :global(span) {
        display: flex;
        align-items: center;
      }

      .navigation-item :global(a) {
        color: #666;
        display: inline-block;
        font-size: var(--font-size-small);
        line-height: var(--line-height-small);
        font-weight: normal;
        padding: 0 8px;
        text-decoration: none;
        text-transform: capitalize;
        transition: color 0.2s ease;
        vertical-align: middle;
      }

      .navigation-item.active :global(a),
      .navigation-item :global(a:hover) {
        color: #000;
        text-decoration: none;
      }

      .navigation-item.active :global(a) {
        font-weight: 500;
      }

      @media screen and (max-width: 950px) {
        .navigation-item :global(a) {
          font-size: var(--font-size-small);
          line-height: var(--line-height-small);
        }
      }
    `}</style>
  </span>
)

export default NavigationItem
