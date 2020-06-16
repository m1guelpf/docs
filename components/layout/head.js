import React from 'react'
import { useAmp } from 'next/amp'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import NextHead from 'next/head'
import NProgress from 'nprogress'
import debounce from 'lodash.debounce'
import RouterEvents from '../../lib/router-events'
import * as metrics from '../../lib/metrics'
import { ORG_NAME } from '~/lib/constants'

let title

const start = debounce(NProgress.start, 200)
RouterEvents.on('routeChangeStart', start)
RouterEvents.on('routeChangeComplete', url => {
  start.cancel()
  NProgress.done()

  metrics.pageview(url, title)
})
RouterEvents.on('routeChangeError', () => {
  start.cancel()
  NProgress.done()
})

if (global.document) {
  const info = [
    ...(process.env.NOW_GITHUB_COMMIT_SHA
      ? [
          `Commit: https://github.com/vercel/docs/commit/${
            process.env.NOW_GITHUB_COMMIT_SHA
          }`
        ]
      : []),
    `Check out our code here: https://vercel.com/oss`,
    `Have a great day! 📣🐢`
  ]

  for (const message of info) {
    // eslint-disable-next-line no-console
    console.log(message)
  }
}

function updateTitle(newTitle) {
  title = newTitle
}

const HeadTags = props => {
  const isAmp = useAmp()
  return isAmp ? null : (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="canonical"
        href={
          props.url ||
          `https://vercel.com${props.router.asPath}` ||
          'https://vercel.com/docs'
        }
      />
    </>
  )
}

class Head extends React.PureComponent {
  componentDidMount() {
    updateTitle(
      this.props.titlePrefix + this.props.title + this.props.titleSuffix
    )
  }

  render() {
    const titlePrefix =
      null != this.props.titlePrefix ? this.props.titlePrefix : `${ORG_NAME} – `
    const titleSuffix =
      null != this.props.titleSuffix ? this.props.titleSuffix : ''
    const ogDescription = this.props.ogDescription || this.props.description
    return (
      <>
        <NextHead>
          <link
            rel="preload"
            href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <title>{titlePrefix + this.props.title + titleSuffix}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zeithq" />
          <meta property="og:site_name" content={`${ORG_NAME} Documentation`} />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={
              titlePrefix +
              (this.props.ogTitle || this.props.title) +
              titleSuffix
            }
          />
          <meta property="og:locale" content="en" />
          <meta
            property="og:url"
            content={
              this.props.url ||
              `https://vercel.com${this.props.router.asPath}` ||
              'https://vercel.com/docs'
            }
          />
          <HeadTags {...this.props} />
          {this.props.description ? (
            <meta name="description" content={this.props.description} />
          ) : null}
          {ogDescription ? (
            <meta property="og:description" content={ogDescription} />
          ) : null}
          <meta
            property="og:image"
            content={
              this.props.image ||
              `https://og-image.now.sh/${encodeURIComponent(
                this.props.ogTitle || this.props.title
              )}.png?theme=light&md=1&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fzeit-black-triangle.svg`
            }
          />
          {this.props.image ? (
            <meta property="twitter:image" content={this.props.image} />
          ) : null}
          {this.props.video
            ? [
                <meta property="og:type" content="video" key="0" />,
                <meta property="og:video" content={this.props.video} key="1" />,
                <meta property="og:video:type" content="video/mp4" key="2" />
              ]
            : null}

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/57x57.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/60x60.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/72x72.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/76x76.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/114x114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/120x120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/144x144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/152x152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/180x180.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/96x96.png`}
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/16x16.png`}
            sizes="16x16"
          />
          <link
            rel="manifest"
            href="https://assets.vercel.com/raw/upload/v1573246315/front/favicon/round-2/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href={`${
              process.env.IMAGE_ASSETS_URL
            }/favicon/round-2/safari-pinned-tab.svg`}
            color="#000000"
          />

          <link
            rel="shortcut icon"
            href={`${process.env.IMAGE_ASSETS_URL}/favicon/round-2/favicon.ico`}
          />
          <meta name="theme-color" content="#000" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
            {
              "@type": "WebPage",
              "url": "${this.props.url ||
                `https://vercel.com${this.props.router.asPath}` ||
                'https://vercel.com/docs'}",
              "headline": "${this.props.ogTitle ||
                this.props.title ||
                `${ORG_NAME} Documentation`}",
              ${
                this.props.description
                  ? '"description": "' + this.props.description + '",'
                  : null
              }
              "image": "${this.props.image ||
                `${process.env.IMAGE_ASSETS_URL}/zeit/twitter-card.png`}",
              "name": "${titlePrefix +
                (this.props.ogTitle ||
                  this.props.title ||
                  `${ORG_NAME} Documentation`) +
                titleSuffix}",
              "dateModified": "${
                this.props.lastEdited ? this.props.lastEdited : null
              }",
              "lastReviewed": "${
                this.props.lastEdited ? this.props.lastEdited : null
              }",
              "author": {
                "@type": "Person",
                "name": "${ORG_NAME}"
              },
              "publisher": {
                "@type": "Organization",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${`${
                    process.env.IMAGE_ASSETS_URL
                  }/favicon/favicon-96x96.png`}"
                },
                "name": "${ORG_NAME}"
              },
              "@context": "http:\/\/schema.org"
            }
          `
            }}
          />

          {this.props.children}
        </NextHead>
      </>
    )
  }
}

Head.contextTypes = {
  darkBg: PropTypes.bool
}

export default withRouter(Head)
