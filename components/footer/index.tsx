// Packages
import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

// Components
import Logotype from '../icons/logotype'
import GitHub from '../icons/github'
import Twitter from '../icons/twitter'

import styles from './footer.module.css'

interface FooterProps {
  light?: boolean
}

const Footer = ({ light }: FooterProps) => {
  return (
    <footer className={cn(styles.footer, { [styles.light]: light })}>
      <div className={styles.links}>
        <ul className={styles.navigation}>
          <li className={styles['links-title']}>Company</li>
          <li>
            <Link href="/" as="/home">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/careers">
              <a>Careers</a>
            </Link>
          </li>
          <li>
            <Link href="/partners">
              <a>Partners</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <a
              href="https://backendlessconf.com"
              rel="noopener"
              target="_blank"
            >
              backendlessConf_
            </a>
          </li>
        </ul>
        <ul className={styles.navigation}>
          <li className={styles['links-title']}>Product</li>
          <li>
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
          </li>
          <li>
            <Link href="/github">
              <a>Vercel for GitHub</a>
            </Link>
          </li>
          <li>
            <Link href="/gitlab">
              <a>Vercel for GitLab</a>
            </Link>
          </li>
          <li>
            <Link href="/bitbucket">
              <a>Vercel for Bitbucket</a>
            </Link>
          </li>
          <li>
            <Link href="/edge-network">
              <a>Vercel Edge Network</a>
            </Link>
          </li>
          <li>
            <Link href="/integrations">
              <a>Integrations Marketplace</a>
            </Link>
          </li>
          <li>
            <Link href="/download">
              <a>Command-Line</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.navigation}>
          <li className={styles['links-title']}>Education</li>
          <li>
            <Link href="/docs">
              <a>Documentation</a>
            </Link>
          </li>
          <li>
            <Link href="/knowledge">
              <a>Knowledge</a>
            </Link>
          </li>
          <li>
            <Link href="/guides">
              <a>Guides</a>
            </Link>
          </li>
          <li>
            <Link href="/api">
              <a>API Reference</a>
            </Link>
          </li>
          <li>
            <a href="/examples">Examples</a>
          </li>
          <li>
            <Link href="/tv">
              <a>TV</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.navigation}>
          <li className={styles['links-title']}>More</li>
          <li>
            <Link href="/oss">
              <a>Open Source Software</a>
            </Link>
          </li>
          <li>
            <Link href="/design">
              <a>Design Assets</a>
            </Link>
          </li>

          <li>
            <Link href="/security">
              <a>Security</a>
            </Link>
          </li>
          <li>
            <Link href="/support">
              <a>Support</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </li>
        </ul>

        <ul className={styles.navigation}>
          <li className={styles['links-title']}>Legal</li>
          <li>
            <Link href="/legal/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/terms">
              <a>Terms of Service</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/trademark-policy">
              <a>Trademark Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/inactivity-policy">
              <a>Inactivity Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/dpa">
              <a>DPA</a>
            </Link>
          </li>
          <li>
            <Link href="/legal/sla">
              <a>SLA</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.logotype}>
        <Logotype width={90} height={20} />
      </div>
      <div className={styles.wrapper}>
        <span className={styles.copyright}>
          <span>Copyright</span> © {new Date().getFullYear()} Vercel Inc. All
          rights reserved.
        </span>
        <span className={styles.contact}>
          <ul className={styles.social}>
            <li>
              <a
                className={styles.github}
                href={`https://github.com/vercel`}
                rel="noopener"
                target="_blank"
                aria-label="GitHub"
              >
                {/*
                // @ts-ignore */}
                <GitHub color="currentColor" height={19} width={19} />
              </a>
            </li>
            <li>
              <a
                className={styles.bird}
                href={`https://twitter.com/vercel`}
                rel="noopener"
                target="_blank"
                aria-label="Twitter"
              >
                <Twitter fill="currentColor" height={16} />
              </a>
            </li>
            <li>
              <a href={`mailto:support@vercel.com`}>support@vercel.com</a>
            </li>
          </ul>
        </span>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
