import formatDate from 'date-fns/format'

import Head from '~/components/layout/head'
import Wrapper from '~/components/layout/wrapper'
import { H1, H3, P } from '~/components/text'
import Link from '~/components/text/link'
import Button from '~/components/buttons'
import { PRODUCT_NAME } from '~/lib/constants'
import Footer from '~/components/footer'

import {
  DATOCMS_KNOWLEDGE_API_KEY,
  DATOCMS_KNOWLEDGE_API_ENDPOINT
} from '~/lib/api/get-datocms-credentials'

const Knowledge = ({ posts }) => (
  <>
    <Head
      titlePrefix=""
      titleSuffix=""
      title={`${PRODUCT_NAME} Knowledge`}
      description={`Learn how to quickly deploy with ${PRODUCT_NAME} in any situation.`}
    />

    <div className="knowledge">
      <div className="knowledge-heading">
        <Wrapper>
          <H1>Knowledge Base</H1>
          <P>
            A collection of knowledge for using the {PRODUCT_NAME} platform.
          </P>

          <div className="actions">
            <span className="caption">Sorted by Newest</span>
            <Link
              href="https://github.com/vercel/docs/issues/new?labels=Section%3A+Knowledge"
              underlineOnHover={false}
            >
              <Button type="secondary" small>
                Request an Article
              </Button>
            </Link>
          </div>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="knowledge-list">
          {posts.map((post, i) => (
            <Link
              href="/knowledge/[slug]"
              as={`/knowledge/${post.slug}`}
              key={`${post.slug}.${i}`}
            >
              <article className="post">
                <div className="titles">
                  <H3>{post.title}</H3>
                  <P style={{ color: '#444' }}>{post.description}</P>
                </div>
                <div className="meta">
                  <span className="date">
                    Published at {formatDate(post._publishedAt, 'MMMM Do YYYY')}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>

    <Footer />

    <style jsx>{`
      .titles {
        margin-right: var(--geist-gap);
      }

      .knowledge {
        min-height: 100vh;
        padding-bottom: 64px;
      }

      .knowledge :global(span a) {
        width: 100%;
      }

      .knowledge-heading {
        border-bottom: 1px solid #eaeaea;
        padding-top: 48px;
        padding-bottom: 16px;
      }

      .knowledge-heading :global(h1) {
        margin-bottom: 8px;
      }

      .knowledge-heading :global(p) {
        font-size: 16px;
        margin-top: 8px;
        color: #444444;
      }

      .actions {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions .caption {
        text-transform: uppercase;
        color: #666;
        font-size: 12px;
        margin-right: 5px;
      }

      .knowledge-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 8px;
      }

      .knowledge-list > :global(a) > .post {
        border-bottom: 1px solid #eaeaea;
      }

      .knowledge-list :global(a):hover {
        text-decoration: none;
      }

      .post {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 24px 0;
        position: relative;
        color: #000;
      }

      .post :global(h3) {
        color: #000;
        margin: 0;
        padding-right: 64px;
      }

      .post :global(p) {
        margin-bottom: 0;
        color: #222;
        padding-right: 64px;
      }

      .post :global(.avatar-group) {
        width: auto;
      }

      .post:hover :global(h4) {
        text-decoration: underline;
      }

      .post.contribute {
        margin-top: 24px;
      }

      .post.contribute :global(h4) {
      }

      .post.contribute :global(p) {
      }

      .post.contribute .meta .avatar {
        width: 24px;
        height: 24px;
        background: #000;
        border-radius: 50%;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 8px;
        font-weight: 700;
        color: white;
      }

      .meta {
        display: flex;
        flex: 0 0 auto;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: flex-end;
      }

      .date {
        color: #666;
        font-size: var(--font-size-small);
        line-height: var(--line-height-primary);
        margin-bottom: 2px;
      }

      @media (max-width: 768px) {
        .post {
          flex-direction: column;
        }

        .post :global(p) {
          padding-right: 0;
        }

        .meta {
          flex-direction: row;
          margin-top: 24px;
        }
      }
    `}</style>
  </>
)

export default Knowledge

export async function getStaticProps() {
  const res = await fetch(`${DATOCMS_KNOWLEDGE_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${DATOCMS_KNOWLEDGE_API_KEY}`
    },
    body: JSON.stringify({
      query: `{
        allKnowledgeBases(first: 100, orderBy: _publishedAt_DESC) {
          title
          slug
          description
          authors {
            slug
            isMemberOfVercelTeam
            profilePicture {
              url
            }
          }
          _publishedAt
          _updatedAt
        }
      }`
    })
  })

  const posts = (await res.json()).data.allKnowledgeBases

  return {
    props: {
      posts
    }
  }
}

export const config = {
  amp: 'hybrid'
}
