import React from 'react'
import Head from '~/components/layout/head'
import Content from '~/components/layout/content'
import Text, { H1, H4 } from '~/components/text'
import { LinkList } from '~/components/list'
import Link from '~/components/text/link'
import { ORG_NAME } from '~/lib/constants'

function ErrorPage() {
  return (
    <>
      <Head
        titlePrefix=""
        titleSuffix={` - ${ORG_NAME} Documentation`}
        title="Page Not Found"
        description="The page that has been requested was not found."
      />
      <Content center small>
        <div className="description">
          <svg
            width="289"
            height="271"
            viewBox="0 0 289 271"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M108.36 2.48l105.7 185.47H2.66L108.35 2.48z"
              fill="#fff"
              stroke="#EAEAEA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <g filter="url(#filter0_d)">
              <ellipse
                cx="182.68"
                cy="156.48"
                rx="74.32"
                ry="74.52"
                fill="#fff"
              />
              <path
                d="M256.5 156.48c0 40.88-33.05 74.02-73.82 74.02-40.77 0-73.83-33.14-73.83-74.02 0-40.87 33.06-74.01 73.83-74.01 40.77 0 73.82 33.14 73.82 74.01z"
                stroke="#EAEAEA"
              />
            </g>
            <mask
              id="a"
              maskUnits="userSpaceOnUse"
              x="108"
              y="81"
              width="149"
              height="150"
            >
              <ellipse
                cx="182.68"
                cy="156.48"
                rx="74.32"
                ry="74.52"
                fill="#fff"
              />
            </mask>
            <g mask="url(#a)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M108.36 2.48l105.7 185.47H2.66L108.35 2.48z"
                fill="#000"
              />
            </g>
            <defs>
              <filter
                id="filter0_d"
                x="76.35"
                y="57.97"
                width="212.65"
                height="213.03"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="8" />
                <feGaussianBlur stdDeviation="16" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>

          <H1>404</H1>
          <H4>Page Not Found</H4>
          <Text type="secondary">
            We couldn’t find the page you were looking for. Try searching the
            documentation for keywords.
          </Text>
          <LinkList>
            <Link href="/docs">Docs</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/blog">Blog</Link>
          </LinkList>
        </div>
      </Content>
      <style jsx>{`
        .description {
          text-align: center;
          width: 512px;
          max-width: 100%;
          padding: 0 16px;
          padding-top: 64px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .description svg {
          margin-bottom: -32px;
          margin-left: 32px;
          max-width: 100%;
        }

        .description :global(h1) {
          margin-bottom: 8px;
        }

        .description :global(h4) {
          margin-top: 0;
          margin-bottom: 16px;
        }

        .description :global(p) {
          margin-top: 0;
          margin-bottom: 32px;
        }
      `}</style>
    </>
  )
}

export default ErrorPage
