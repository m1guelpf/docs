import cn from 'classnames'
import NextLink from 'next/link'
import Text, { H4 } from '~/components/text'
import ArrowRight from '~/components/icons/chevron-right'
import Plus from '~/components/icons/plus'
import canPrefetch from '~/lib/can-prefetch'

const NextLinkWrapper = ({ href, ...props }) => (
  <NextLink href={href} passHref>
    <a {...props} />
  </NextLink>
)

export function IconCard({
  href,
  buttonHref,
  icon,
  label,
  width,
  arrowed,
  plus
}) {
  const Link = canPrefetch(href) ? NextLinkWrapper : 'a'

  return (
    <Link href={href} className={cn('icon-card', { button: !!buttonHref })}>
      {icon && <span className="icon">{icon}</span>}
      {label}
      {arrowed && (
        <span className="arrow">
          <ArrowRight />
        </span>
      )}
      {plus && (
        <span className="plus">
          <Plus />
        </span>
      )}
      <style jsx>{`
        .icon-card {
          background: var(--geist-background);
          border: 1px solid var(--accents-2);
          transition: box-shadow 0.12s ease, border 0.12s ease;
          height: 80px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          color: var(--geist-foreground);
          text-decoration: none;
          width: ${width ? `${width}px` : 'auto'};
        }

        .icon-card:hover {
          box-shadow: var(--shadow-medium);
          border-color: var(--geist-background);
        }

        .arrow {
          margin-left: auto;
          color: var(--accents-3);
          transition: color 0.12s ease;
        }

        .plus {
          background: var(--geist-success);
          border-radius: 5px;
          margin-left: auto;
          color: var(--geist-background);
          height: 32px;
          width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s ease;
        }

        .icon-card:hover .plus {
          background: var(--geist-success-dark);
        }

        .icon-card:hover .arrow {
          color: var(--accents-6);
        }

        .icon {
          margin-right: 16px;
        }

        span {
          display: flex;
        }
      `}</style>
    </Link>
  )
}

export default function Card({
  href = '#',
  as,
  children,
  className,
  title,
  ...props
}) {
  return (
    <div className={cn('card', className)} {...props}>
      <NextLink href={href} as={as}>
        <a>
          {title && <H4>{title}</H4>}
          <Text small>{children}</Text>
        </a>
      </NextLink>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 5px;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          min-height: 48px;
          margin: 24px 0;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .card :global(p) {
          margin: 0;
        }

        .card :global(a) {
          display: flex;
          padding: 24px;
          width: 100%;
          height: 100%;
          flex-direction: column;
          font-size: var(--font-size-small);
          line-height: var(--line-height-small);
          color: var(--accents-5);
          text-decoration: none;
          transition: color 0.12s ease;
        }

        .card :global(h4) {
          margin-top: 0;
          margin-bottom: 4px;
          color: var(--geist-foreground);
          font-weight: 500;
          font-size: var(--font-size-primary);
          line-height: var(--line-height-primary);
        }

        .card:hover :global(a) {
          text-decoration: none;
          color: var(--geist-foreground);
        }

        .card:hover {
          text-decoration: none;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--accents-2);
        }
      `}</style>
    </div>
  )
}
