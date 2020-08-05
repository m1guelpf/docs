import React from 'react'
import dynamic from 'next/dynamic'

import Logotype from '@components/icons/zeit/logotype-thin'
import GitHub from '@components/icons/brands/github'
import Twitter from '@components/icons/brands/twitter'

import handleImport from '@lib/handle-import'
import { Footer, FooterGroup, FooterLink, FooterProps } from '@geist/footer'

import styles from './footer.module.css'
import { PRODUCT_NAME, PRODUCT_GITHUB, PRODUCT_TWITTER } from '@lib/constants'

const StatusIndicator = dynamic(
  () => handleImport(import('./status-indicator')),
  { ssr: false }
)

const subFooter = (
  <>
    <div className={styles.logotype}>
      <Logotype width={90} height={20} />
    </div>
    <div className={styles.wrapper}>
      <span className={styles.copyright}>
        <span>Copyright</span> © {new Date().getFullYear()} {PRODUCT_NAME} Inc. All
        rights reserved.
      </span>
      <span className={styles.contact}>
        <ul className={styles.social}>
          <li>
            <a
              className={styles.github}
              href={`https://${PRODUCT_GITHUB}`}
              rel="noopener"
              target="_blank"
              aria-label="GitHub"
            >
              {/*
                // @ts-ignore */}
              <GitHub fill="currentColor" height={19} width={19} />
            </a>
          </li>
          <li>
            <a
              className={styles.bird}
              href={`https://${PRODUCT_TWITTER}`}
              rel="noopener"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter fill="currentColor" height={16} />
            </a>
          </li>
        </ul>
      </span>

      <div className={styles.status}>
        <StatusIndicator />
      </div>

      
    </div>
  </>
)

const Foot = ({ light }: FooterProps) => {
  return (
    <Footer subFooter={subFooter} light={light}>
      <FooterGroup title="Product">
        <FooterLink href="/solutions/nextjs">Next.js</FooterLink>
        <FooterLink href="/github">Vercel for GitHub</FooterLink>
        <FooterLink href="/gitlab">Vercel for GitLab</FooterLink>
        <FooterLink href="/bitbucket">Vercel for Bitbucket</FooterLink>
        <FooterLink href="/integrations">Integrations</FooterLink>
        <FooterLink href="/download">Command-Line</FooterLink>
        <FooterLink href="/docs/v2/edge-network/overview">
          Edge Network
        </FooterLink>
      </FooterGroup>

      <FooterGroup title="Resources">
        <FooterLink href="/docs">Documentation</FooterLink>
        <FooterLink href="/guides">Guides</FooterLink>
        <FooterLink href="/knowledge/" as="/knowledge">Knowledge</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="/api">API Reference</FooterLink>
        <FooterLink href="/examples">Examples</FooterLink>
        <FooterLink href="/oss">OSS</FooterLink>
        <FooterLink href="/partners">Partners</FooterLink>
        <FooterLink href="/support">Support</FooterLink>
      </FooterGroup>

      <FooterGroup title="Company">
        <FooterLink href="/home">Home</FooterLink>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/careers">Careers</FooterLink>
        <FooterLink href="/pricing">Pricing</FooterLink>
        <FooterLink href="/security">Security</FooterLink>
        <FooterLink href="https://backendlessconf.com" external>
          backendlessConf_
        </FooterLink>
        <FooterLink href="/contact">Contact Us</FooterLink>
      </FooterGroup>

      <FooterGroup title="Legal">
        <FooterLink href="/legal/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/legal/terms">Terms of Service</FooterLink>
        <FooterLink href="/legal/trademark-policy">Trademark Policy</FooterLink>
        <FooterLink href="/legal/inactivity-policy">
          Inactivity Policy
        </FooterLink>
        <FooterLink href="/legal/dpa">DPA</FooterLink>
        <FooterLink href="/legal/sla">SLA</FooterLink>
      </FooterGroup>
    </Footer>
  )
}

export default React.memo(Foot)
