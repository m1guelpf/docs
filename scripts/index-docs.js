const { exec: execSync } = require('child_process')
const { promisify } = require('util')
const algoliasearch = require('algoliasearch')
const fs = require('fs')
const cheerio = require('cheerio')
const globby = require('globby')
const md5 = require('md5')

const execP = promisify(execSync)
const exec = cmd => execP(cmd)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const nextConfigPath = 'next.config.js'

// Main function
async function main() {
  // Initialise Algolia client
  const client = algoliasearch('NNTAHQI9C5', process.env.ALGOLIA_API_KEY)

  const tmpIndex = await client.initIndex('prod_docs_tmp')
  const mainIndex = await client.initIndex('prod_docs')

  // Array to store object with content from pages
  let index = []

  const nextConfig = await readFile(nextConfigPath, 'utf8')

  // next export only works with the server target
  await writeFile(
    nextConfigPath,
    nextConfig.replace(`target: 'serverless'`, `target: 'server'`)
  )
  // Build project
  await exec(`next build && next export -o dist`)
  await writeFile(nextConfigPath, nextConfig)

  // Scan pages and add titles and content as objects in an `index` array
  let files

  try {
    files = await globby([
      'dist/guides/**/*.html',
      'dist/knowledge/**/*.html',
      'dist/docs/v2/**/*.html',
      'dist/docs/api.html',
      'dist/docs/integrations.html',
      'dist/docs/cli.html',
      'dist/docs/configuration.html',
      'dist/docs/runtimes.html'
    ])
    // filter out AMP pages
    files = files.filter(f => f.indexOf('.amp/index.html') < 0)
  } catch (e) {
    throw `Failed to get pages: ${e}`
  }

  // Loop through files
  files.forEach(file => {
    const isAPISection = !!file.startsWith('dist/docs/api')
    const isRefSection =
      !!file.startsWith('dist/docs/cli') ||
      !!file.startsWith('dist/docs/runtimes') ||
      !!file.startsWith('dist/docs/configuration') ||
      !!file.startsWith('dist/docs/integrations')
    const isDocs = !!file.startsWith('dist/docs/v2')
    const isGuides = !!file.startsWith('dist/guides')
    const isKnowledge = !!file.startsWith('dist/knowledge')

    // Fetch file contents and load it with cheerio
    const content = fs.readFileSync(file)
    const $ = cheerio.load(content)

    // Page title
    const pageTitle = $('.content-heading h1').text()

    // Current heading and element, initially null
    let currentHeading = null
    let currentCategory = null
    let currentSection = null
    let currentSubSection = null
    let currentEl = null
    // Current record number for the file loop, starting with ordering
    let currentRecordNumber = 1

    // Loop through all top-level elements in the content div
    $('.content > div > *, .content .category-wrapper *').each((i, e) => {
      // Get current element and its tagName
      currentEl = $(e)
      const tag = currentEl.get(0).tagName

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        // If the element is a heading, catch and store the heading
        // Set current heading:
        currentHeading = {
          text: currentEl.text(),
          anchor: $(currentEl)
            .children('a')
            .attr('href')
        }

        if (tag === 'h1') {
          currentCategory = currentEl.text()
        } else if (tag === 'h2') {
          currentSection = currentEl.text()
        } else if (tag === 'h3') {
          currentSubSection = currentEl.text()
        }
      } else if (['p', 'ul'].includes(tag)) {
        // If the element is a paragraph, create the record using available information, including the current heading, and push it to the index array.

        // Infer URL from filepath
        const url = `/${file
          .replace('dist/', '')
          .replace('/index.html', '')
          .replace('.amp', '')
          .replace('.html', '')}`

        // Create record with title, (if it exists) section heading, url (inferred), paragraph content, and order
        const record = {
          title:
            isAPISection || isRefSection
              ? currentSection || currentCategory
              : pageTitle,
          ...(isAPISection || isRefSection
            ? currentSubSection && { section: currentSubSection }
            : currentHeading && { section: currentHeading.text }),
          url,
          ...(currentHeading &&
            currentHeading.anchor && { anchor: currentHeading.anchor }),
          content: currentEl.text(),
          order: currentRecordNumber,
          objectID: `v2-${url}-${md5(currentEl.text())}`,
          _tags: [
            (isAPISection && 'api') ||
              (isRefSection && 'reference') ||
              (isDocs && 'docs') ||
              (isGuides && 'guide') ||
              (isKnowledge && 'knowledge')
          ]
        }

        // Push record to index array
        index.push(record)

        // Increase record number for the next loop
        currentRecordNumber = currentRecordNumber + 1
      }
    })
  })

  // Test file
  // Before uncommenting the next line, make sure all Algolia lines are commented out. (18 -> 21, 156 -> 167)
  // fs.writeFileSync(`test.json`, JSON.stringify(index))

  // Get settings of main index and set them to the temp index
  const indexSettings = await mainIndex.getSettings()
  await tmpIndex.setSettings(indexSettings)

  const indexTmp = [...index]

  while (indexTmp.length) {
    const { taskID } = await tmpIndex.addObjects(indexTmp.splice(0, 1000))

    await tmpIndex.waitTask(taskID)
  }

  client.moveIndex(tmpIndex.indexName, mainIndex.indexName)
}

// Execute main function
main()
