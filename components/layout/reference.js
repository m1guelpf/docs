import { useState, useEffect } from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { withRouter } from 'next/router'
import { useAmp } from 'next/amp'
import debounce from 'lodash.debounce'
import { HEADER_HEIGHT, PRODUCT_NAME, ORG_NAME } from '~/lib/constants'
import NextLink from 'next/link'

import * as bodyLocker from '~/lib/utils/body-locker'
import Main from '~/components/layout/main'
import changeHash from '~/lib/utils/change-hash'
import components from '~/lib/mdx-components'
import Content from '~/components/layout/content'
import VersionSwitcher from '~/components/layout/version-switcher'
import Context from '~/lib/api/slugs-context'
import DocsRuntime from '~/lib/api/runtime'
import DocsIndex from '~/components/layout/index'
import getFragment from '~/lib/api/get-fragment'
import getHref from '~/lib/api/get-href'
import Head from '~/components/layout/head'
import scrollToElement from '~/lib/utils/scroll-to-element'
import Sidebar from '~/components/layout/sidebar'
import ToggleGroup, { ToggleItem } from '~/components/toggle-group'
import withPermalink from '~/lib/api/with-permalink'
import HR from '~/components/text/hr'
import { FooterFeedback } from '~/components/feedback-input'

const NonAmpOnly = ({ children }) => (useAmp() ? null : children)

const debouncedChangeHash = debounce(changeHash, 200)

function ReferencePage({
  router,
  Data,
  versioned,
  title,
  description,
  defaultActiveCategory,
  defaultActiveSection
}) {
  const [activeCategory, setActiveCategory] = useState(
    defaultActiveCategory || 'getting-started'
  )
  const [activeSection, setActiveSection] = useState(defaultActiveSection || '')
  const [activeEntry, setActiveEntry] = useState(null)
  const [activeSubEntry, setActiveSubEntry] = useState(null)
  const [navigationActive, setNavigationActive] = useState(false)
  const [version] = useState(router.asPath.split(/(v[0-9])/)[1] || 'v2')
  const [sidebarNode, setSidebarNode] = useState(null)

  const updateActive = ({
    category = null,
    section = null,
    entry = null,
    subEntry = null
  }) => {
    if (
      activeCategory !== category ||
      activeSection !== section ||
      activeEntry !== entry ||
      activeSubEntry !== subEntry
    ) {
      setActiveCategory(category)
      setActiveSection(section)
      setActiveEntry(entry)
      setActiveSubEntry(subEntry)
    }
  }

  const setInitiallyActive = ({
    href,
    category = null,
    section = null,
    entry = null,
    subEntry = null
  }) => {
    if (router.asPath.endsWith(href)) {
      updateActive({ category, section, entry, subEntry })
    }
  }

  const handleSidebarRef = node => {
    setSidebarNode(node)
  }

  const handleEntryActive = entryNode => {
    scrollToElement(sidebarNode, entryNode)
  }

  const handleSectionActive = sectionNode => {
    scrollToElement(sidebarNode, sectionNode)
  }

  const handleVersionChange = event => {
    const href = `/docs/api/${event.target.value}`
    router.push(href)
    handleIndexClick()
  }

  const handleIndexClick = () => {
    if (navigationActive) {
      bodyLocker.unlock()
      setNavigationActive(false)
    }
  }

  useEffect(() => {
    debouncedChangeHash(
      getFragment({
        category: activeCategory,
        section: activeSection,
        entry: activeEntry,
        subEntry: activeSubEntry
      })
    )
  }, [activeCategory, activeSection, activeEntry, activeSubEntry])

  return (
    <MDXProvider
      components={{
        ...components,
        h1: withPermalink(components.h1),
        h2: withPermalink(components.h2),
        h3: withPermalink(components.h3),
        h4: withPermalink(components.h4)
      }}
    >
      <>
        <Head
          description={description || ''}
          title={title || `${PRODUCT_NAME} Reference`}
          titlePrefix=""
          titleSuffix={` - ${ORG_NAME}`}
        >
          {versioned && version === 'v1' && (
            <meta name="robots" content="noindex" />
          )}
        </Head>

        <DocsRuntime docs={Data}>
          {({ structure }) => (
            <Main>
              <Sidebar
                active={navigationActive}
                innerRef={handleSidebarRef}
                fixed
              >
                <div className="toggle-group-wrapper">
                  <ToggleGroup>
                    <ToggleItem
                      active={
                        router.pathname.startsWith('/docs') &&
                        !router.pathname.startsWith('/docs/api')
                      }
                    >
                      <NextLink href="/docs">
                        <a onClick={handleIndexClick}>Docs</a>
                      </NextLink>
                    </ToggleItem>
                    <ToggleItem
                      active={router.pathname.startsWith('/docs/api')}
                    >
                      <NextLink href="/docs/api">
                        <a onClick={handleIndexClick}>API Reference</a>
                      </NextLink>
                    </ToggleItem>
                    <ToggleItem
                      active={router.pathname.startsWith('/examples')}
                    >
                      <NextLink href="/examples">
                        <a onClick={handleIndexClick}>Examples</a>
                      </NextLink>
                    </ToggleItem>
                  </ToggleGroup>
                </div>
                <DocsIndex
                  activeItem={{
                    category: activeCategory,
                    section: activeSection,
                    entry: activeEntry,
                    subEntry: activeSubEntry
                  }}
                  getHref={getHref}
                  onEntryActive={handleEntryActive}
                  onSectionActive={handleSectionActive}
                  onClickLink={handleIndexClick}
                  structure={structure}
                  updateActive={updateActive}
                  setInitiallyActive={setInitiallyActive}
                />
                {versioned && (
                  <div className="select-wrapper">
                    <VersionSwitcher
                      version={version}
                      onChange={handleVersionChange}
                    />
                  </div>
                )}
              </Sidebar>
              <Content>
                <div className="content">
                  <div>
                    {structure.map(category => {
                      const categorySlugs = { category: category.slug }
                      return (
                        <div
                          className="category-wrapper"
                          key={getFragment(categorySlugs)}
                        >
                          <span id={getFragment(categorySlugs)} />
                          <Context.Provider
                            value={{
                              slugs: categorySlugs,
                              updateActive
                            }}
                          >
                            {category.content}
                          </Context.Provider>

                          {category.sections.map(section => {
                            const sectionSlugs = {
                              category: category.slug,
                              section: section.slug
                            }

                            return (
                              <div
                                className="section-wrapper"
                                key={getFragment(sectionSlugs)}
                              >
                                <span id={getFragment(sectionSlugs)} />
                                <Context.Provider
                                  value={{
                                    slugs: sectionSlugs,
                                    updateActive
                                  }}
                                >
                                  {section.content}
                                </Context.Provider>
                                <div>
                                  {section.entries.map(entry => {
                                    const entrySlugs = {
                                      category: category.slug,
                                      section: section.slug,
                                      entry: entry.slug
                                    }

                                    return (
                                      <div
                                        className="entry-wrapper"
                                        key={getFragment(entrySlugs)}
                                      >
                                        <span id={getFragment(entrySlugs)} />
                                        <Context.Provider
                                          value={{
                                            slugs: entrySlugs,
                                            updateActive
                                          }}
                                        >
                                          {entry.content}
                                        </Context.Provider>
                                        <div>
                                          {entry.subEntries.map(subEntry => {
                                            const subEntrySlugs = {
                                              category: category.slug,
                                              section: section.slug,
                                              entry: entry.slug,
                                              subEntry: subEntry.slug
                                            }

                                            return (
                                              <div
                                                className="entry-wrapper"
                                                key={getFragment(subEntrySlugs)}
                                              >
                                                <span
                                                  id={getFragment(
                                                    subEntrySlugs
                                                  )}
                                                />
                                                <Context.Provider
                                                  value={{
                                                    slugs: subEntrySlugs,
                                                    updateActive
                                                  }}
                                                >
                                                  {subEntry.content}
                                                </Context.Provider>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <NonAmpOnly>
                  <>
                    <HR />
                    <FooterFeedback />
                  </>
                </NonAmpOnly>
              </Content>
            </Main>
          )}
        </DocsRuntime>

        <style jsx>{`
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .category-wrapper:not(:first-child) {
            padding: 40px 0;
          }

          .category-wrapper:first-child :global(h1) {
            margin-top: 0;
          }

          .category-wrapper:not(:last-child) {
            border-bottom: 1px solid #eaeaea;
          }

          .category-wrapper:last-child {
            padding-bottom: 0;
          }

          .category-wrapper,
          .section-wrapper,
          .entry-wrapper {
            position: relative;
          }

          .entry-wrapper > :global(*:last-child) {
            margin-bottom: 0;
          }

          span {
            position: absolute;
            top: -${HEADER_HEIGHT + 24}px;
          }

          .platform-select-title {
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            font-weight: bold;
            margin-bottom: 16px;
            margin-top: 0;
          }

          .select-wrapper {
          }

          .toggle-group-wrapper {
            display: none;
          }

          @media screen and (max-width: 950px) {
            .toggle-group-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 40px;
            }
          }
        `}</style>
      </>
    </MDXProvider>
  )
}

export default withRouter(ReferencePage)
