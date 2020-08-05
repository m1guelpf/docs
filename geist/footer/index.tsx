import { useState } from 'react'
import cn from 'classnames'

import useID from '@geist/utils/use-id'
import styles from './footer.module.css'
import Link, { LinkProps } from '@geist/link/UNSTABLE_index'

export interface FooterProps {
  light?: boolean
  subFooter?: React.ReactNode
}

export const Footer: React.FC<FooterProps> = ({
  light,
  subFooter,
  children
}) => {
  return (
    <footer className={cn(styles.footer, { [styles.light]: light })}>
      <nav aria-label="Vercel Directory" role="navigation">
        {children}
      </nav>

      {subFooter && <section>{subFooter}</section>}
    </footer>
  )
}

export interface FooterGroupProps {
  title: string
}

export const FooterGroup: React.FC<FooterGroupProps> = ({
  title,
  children
}) => {
  const [open, setOpen] = useState(false)
  const id = useID('footer-group-')

  return (
    <div className={styles.group}>
      <input
        type="checkbox"
        onChange={() => setOpen(!open)}
        checked={open}
        id={id}
        className={styles.hidden}
        aria-label={open ? 'Close Navigation Menu' : 'Open Navigation Menu'}
      />

      <label htmlFor={id}>
        <h3>{title}</h3>
      </label>

      <ul className={styles.list}>{children}</ul>
    </div>
  )
}

export const FooterColumn: React.FC = ({ children }) => {
  return <div className={styles.column}>{children}</div>
}

export const FooterLink: React.FC<LinkProps> = ({ href, as, children }) => {
  return (
    <li className={styles.item}>
      <Link type="secondary" href={href} as={as}>
        {children}
      </Link>
    </li>
  )
}
