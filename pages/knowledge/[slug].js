import Layout from '~/components/layout/knowledge'
import {
  DATOCMS_KNOWLEDGE_API_KEY, DATOCMS_KNOWLEDGE_API_ENDPOINT } from '~/lib/api/get-datocms-credentials'


export default ({ post }) => <Layout post={ post } />


export async function getStaticProps({ params: {slug} } ) {

  const res = await fetch(`${DATOCMS_KNOWLEDGE_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${DATOCMS_KNOWLEDGE_API_KEY}`,
    },
    body: JSON.stringify({
      query: `{
        knowledgeBase(filter: {slug: {eq: "${slug}"}}) {
          title
          slug
          description
          _updatedAt
          _publishedAt
          relatedContents {
            ... on KnowledgeBaseRecord {
              title
              slug
              _publishedAt
              _updatedAt
              description
            }
            ... on GuideRecord {
              title
              slug
              _publishedAt
              _updatedAt
              description
              authors {
                isMemberOfVercelTeam
              }
            }
            ... on FaqRecord {
              question
              slug
              _publishedAt
              _updatedAt
            }
          }
          content {
            ... on MarkdownRecord {
              id
              content
              contentType
              _modelApiKey
            }
            ... on HtmlRecord {
              id
              content
              contentType
              _modelApiKey
            }
            ... on ImageRecord {
              id
              caption
              imageAnchor
              openAnchorInNewWindow
              _modelApiKey
              image {
                url
                width
                height
                alt
                title
              }
            }
            ... on CodeRecord {
              id
              _modelApiKey
              allowCopy
              caption
              content
            }
            ... on GitImportRecord {
              id
              _modelApiKey
              showBitbucket
              showGithub
              showGitlab
              repoUrl
            }
            ... on VercelDeployButtonRecord {
              id
              _modelApiKey
            }
            ... on VideoRecord {
              id
              _modelApiKey
            }
            ... on VideoExternalRecord {
              id
              _modelApiKey
            }
            ... on ImageExternalRecord {
              id
              imageAnchor
              openAnchorInNewWindow
              imageUrl
              imageWidth
              imageHeight
              imageTitle
              imageAlt
              caption
              _modelApiKey
            }
          }
          seo {
            description
            image {
              url
            }
            twitterCard
            title
          }
          topics {
            slug
            title
            position
            description
          }
        }
      }`
    }),
  })
  const post = (await res.json()).data.knowledgeBase

  return { props: { post } }
}


export async function getStaticPaths() {
  const res = await fetch(`${DATOCMS_KNOWLEDGE_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${DATOCMS_KNOWLEDGE_API_KEY}`,
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
    }),
  })
  const posts = (await res.json()).data.allKnowledgeBases

  //console.log('posts', posts);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/knowledge/${post.slug}`)

  // TODO: add support for previews

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.

  return { paths, fallback: false }
}


export const config = {
  amp: 'hybrid'
}
