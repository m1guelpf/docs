import React from 'react'
import { useAmp } from 'next/amp'
import { withRouter } from 'next/router'

import Head from '~/components/layout/head'
import Heading from '~/components/text/linked-heading'
import ContentFooter from '~/components/layout/content-footer'
import components from '~/lib/remark-components'
import { H1, H2, H3, H4 } from '~/components/text'
import HR from '~/components/text/hr'
import { FooterFeedback } from '~/components/feedback-input'
import { PRODUCT_NAME, ORG_NAME } from '~/lib/constants'
import SubHeader from '~/components/subheader'
import Link from '~/components/text/link'
import Footer from '~/components/footer'
import Wrapper from '~/components/layout/wrapper'

import DatoCMSRenderer from '~/components/datocms-renderer'

const DocH1 = ({ children }) => (
  <>
    <Heading noAnchor lean offsetTop={175}>
      <H1>{children}</H1>
    </Heading>
    <style jsx>{`
      :global(h1) {
        margin: 0;
      }
    `}</style>
  </>
)

const DocH2 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H2>{children}</H2>
    </Heading>
    <style jsx>{`
      :global(h2) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH3 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      :global(h3) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const DocH4 = ({ children }) => (
  <>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      :global(h4) {
        margin: 40px 0 0 0;
      }
    `}</style>
  </>
)

const NonAmpOnly = ({ children }) => (useAmp() ? null : children)

class withStandard extends React.PureComponent {
  render() {
    const {
      post = {
        title: `${PRODUCT_NAME} Documentation`,
        description: `The knowledge base and documentation for how to use ${PRODUCT_NAME} and how it works.`
      }
    } = this.props


    return (
      <>
        <Head
          titlePrefix=""
          titleSuffix={` - ${ORG_NAME} Documentation`}
          title={`${post.title}`}
          description={post.description}
          image={post.image}
          lastEdited={post.lastEdited}
        >
          {/* { 
            //TODO: set `noindex` for previews
            post.editUrl.includes('/docs/error/') && (
            <meta name="robots" content="noindex" />
          )} */}
        </Head>
        <header className="knowledge-heading">
          <Wrapper width="900">
            <SubHeader title="Knowledge">
              <Link href="/knowledge" style={{ fontSize: 14 }}>
                View All Articles
              </Link>
            </SubHeader>
            <div className="knowledge-title">
              <DocH1>{post.title}</DocH1>
            </div>
          </Wrapper>
        </header>
        <Wrapper width="768">
          <section className="knowledge">
            {post.content && (
              <DatoCMSRenderer
                components={{
                  ...components,
                  h2: DocH2,
                  h3: DocH3,
                  h4: DocH4
                }}
                content={post.content}
              />
            )}

            <NonAmpOnly>
              <>
                <HR />
                <FooterFeedback />
              </>
            </NonAmpOnly>
            <ContentFooter
              lastEdited={post._updatedAt}
              // editUrl={meta.editUrl}
            />
          </section>
        </Wrapper>
        <Footer />
        <style jsx>{`
          .knowledge-heading {
            border-bottom: 1px solid #eaeaea;
            margin-top: 36px;
            padding-bottom: 44px;
            text-align: center;
          }

          .knowledge-title {
            padding-top: 15px;
          }

          .knowledge {
            padding-bottom: 64px;
            padding-top: 32px;
          }
        `}</style>
      </>
    )
  }
}

export default withRouter(withStandard)
