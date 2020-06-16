// This is a development script executed in the build step of pages
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const productNames = require('../lib/name-constants.json')

const DOMAIN = 'https://vercel.com'
const SITE_PATHS = [
  '/docs',
  '/docs/api',
  '/docs/integrations',
  '/docs/cli',
  '/docs/configuration',
  '/docs/runtimes'
]
const META = /export\s+const\s+meta\s+=\s+({[\s\S]*?\n})/
const SITEMAP_PATH = 'public/sitemap.xml'
const GUIDES_PATH = 'lib/data/guides.json'
const KNOWLEDGE_PATH = 'lib/data/knowledge.json'

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `${xmlHeader}
${nodes}
</urlset>`

function recursiveReadDirSync(dir, arr = [], rootDir = dir) {
  const result = fs.readdirSync(dir)

  result.forEach(part => {
    const absolutePath = path.join(dir, part)
    const pathStat = fs.statSync(absolutePath)

    if (pathStat.isDirectory()) {
      recursiveReadDirSync(absolutePath, arr, rootDir)
      return
    }
    arr.push(absolutePath.replace(rootDir, ''))
  })

  return arr
}

function isV2Page(pagePath) {
  return (
    !pagePath.includes('-mdx/') &&
    !pagePath.includes('.DS_Store') &&
    SITE_PATHS.some(
      dir =>
        pagePath.startsWith(dir + '/index') || pagePath.startsWith(dir + '/v2')
    )
  )
}

function xmlUrlNode(pagePath) {
  const page = path.basename(pagePath)
  const pageName = path.basename(pagePath, path.extname(page))
  const relativeUrl = pagePath.replace(
    page,
    pageName === 'index' ? '' : pageName + '/'
  )
  const content = fs.readFileSync(path.join('pages', pagePath), 'utf-8')
  const match = content.match(META)
  const loc = DOMAIN + relativeUrl

  let meta
  let lastmod

  if (match && typeof match[1] === 'string') {
    meta = eval(
      '(' +
        match[1]
          .replace(/\${PRODUCT_NAME}/g, productNames.productName)
          .replace(/\${ORG_NAME}/g, productNames.orgName)
          .replace(/\${CDN_NAME}/g, productNames.cdnName)
          .replace(/\${CDN_SHORT_NAME}/g, productNames.cdnShortName)
          .replace(/\${PRODUCT_SHORT_NAME}/g, productNames.productShortName)
          .replace(/\${PRODUCT_V1_NAME}/g, productNames.productV1Name)
          .replace(/\${ORG_V1_NAME}/g, productNames.orgV1Name)
          .replace(
            /\${PRODUCT_SHORT_V1_NAME}/g,
            productNames.productShortV1Name
          )
          .replace(/\${CLI_V1_NAME}/g, productNames.cliV1Name)
          .replace(/\${GITHUB_APP_NAME}/g, productNames.githubAppName)
          .replace(/\${GITLAB_APP_NAME}/g, productNames.gitlabAppName)
          .replace(/\${BITBUCKET_APP_NAME}/g, productNames.bitbucketAppName) +
        ')'
    )

    if (meta.lastEdited) {
      lastmod = meta.lastEdited
    }
  }

  const node = `  <url>
    <loc>${loc}</loc>${
    lastmod !== undefined
      ? `
    <lastmod>${lastmod}</lastmod>`
      : ``
  }
    <changefreq>hourly</changefreq>
  </url>`

  return { node, meta }
}

function generateSiteMap() {
  // This will return pages in the format `/docs/v2/name.js`
  const docs = recursiveReadDirSync('pages/docs', [], 'pages')
  const guides = recursiveReadDirSync('pages/guides', [], 'pages')
  const guidesMeta = []
  const knowledge = recursiveReadDirSync('pages/knowledge', [], 'pages')
  const knowledgeMeta = []

  const nodes = docs
    .reduce((carry, filePath) => {
      const pagePath = filePath.replace(/\\/g, '/')

      // Only v2 pages are included in sitemap.xml
      if (isV2Page(pagePath) && !pagePath.startsWith('.')) {
        const { node } = xmlUrlNode(pagePath)
        carry.push(node)
      }
      return carry
    }, [])
    .concat(
      guides.map(filePath => {
        const pagePath = filePath.replace(/\\/g, '/')
        const { node, meta } = xmlUrlNode(pagePath)

        if (meta) {
          guidesMeta.push(
            // If meta.image (URL) contains a space, replace with '%20'
            meta.image
              ? {
                  ...meta,
                  image: meta.image.replace(' ', '%20')
                }
              : meta
          )
        }

        return node
      })
    )
    .concat(
      knowledge.map(filePath => {
        const pagePath = filePath.replace(/\\/g, '/')
        const { node, meta } = xmlUrlNode(pagePath)

        if (meta) {
          knowledgeMeta.push(meta)
        }

        return node
      })
    )

  const sitemap = `${xmlUrlWrapper(nodes.join('\n'))}`

  fs.writeFileSync(SITEMAP_PATH, sitemap)

  console.log(
    `sitemap.xml with ${nodes.length} entries was written to ${SITEMAP_PATH}`
  )

  const sortedGuides = guidesMeta.sort((a, b) => {
    if (a.published === b.published) return a.url.localeCompare(b.url)

    return new Date(b.published) - new Date(a.published)
  })
  const guidesJson = JSON.stringify(sortedGuides, null, 2)

  const sortedKnowledge = knowledgeMeta.sort((a, b) => {
    if (a.published === b.published) return a.url.localeCompare(b.url)

    return new Date(b.published) - new Date(a.published)
  })
  const knowledgeJson = JSON.stringify(sortedKnowledge, null, 2)

  fs.writeFileSync(GUIDES_PATH, prettier.format(guidesJson, { parser: 'json' }))
  fs.writeFileSync(
    KNOWLEDGE_PATH,
    prettier.format(knowledgeJson, { parser: 'json' })
  )

  console.log(
    `guides.json with ${
      guidesMeta.length
    } entries was written to ${GUIDES_PATH}`
  )
  console.log(
    `knowledge.json with ${
      knowledgeMeta.length
    } entries was written to ${KNOWLEDGE_PATH}`
  )
}

generateSiteMap()
