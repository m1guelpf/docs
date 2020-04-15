import NextLink from '~/components/text/link'
import cns from 'classnames'
import { Component } from 'react'
import * as metrics from '~/lib/metrics'

class EntryIndex extends Component {
  componentDidMount() {
    const { category, getHref, section, entry } = this.props
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug,
      entry: entry.slug
    })

    this.props.setInitiallyActive({
      href: as || href,
      category: category.slug,
      section: section.slug,
      entry: entry.slug
    })

    if (entry.subEntries) {
      entry.subEntries.map(subEntry => {
        const { href, as } = getHref({
          category: category.slug,
          section: section.slug,
          entry: entry.slug,
          subEntry: subEntry.slug
        })

        this.props.setInitiallyActive({
          href: as || href,
          category: category.slug,
          section: section.slug,
          entry: entry.slug,
          subEntry: subEntry.slug
        })
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (isEntryActive(this.props) && !isEntryActive(prevProps)) {
      this.props.onActive(this.rootNode)
    }
  }

  handleRef = node => {
    this.rootNode = node
  }

  handleClick = () => {
    const { category, section, entry } = this.props

    metrics.event({
      action: 'sidebar_entry_clicked',
      category: 'engagement',
      label: entry.title
    })

    this.props.updateActive({
      category: category.slug,
      section: section.slug,
      entry: entry.slug
    })
    this.props.onClickLink()
  }

  render() {
    const { category, entry, getHref, section } = this.props
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug,
      entry: entry.slug
    })
    return (
      <li key={entry.slug} ref={this.handleRef}>
        {href.startsWith('#') ? (
          <a
            className={cns({ active: isEntryActive(this.props) })}
            onClick={this.handleClick}
            href={href}
          >
            {entry.title}
          </a>
        ) : (
          <NextLink href={href} as={as}>
            <a
              className={cns({ active: isEntryActive(this.props) })}
              onClick={this.handleClick}
            >
              {entry.title}
            </a>
          </NextLink>
        )}
        <style jsx>{`
          a {
            color: #000;
            display: block;
            font-size: var(--font-size-primary);
            line-height: var(--line-height-primary);
            padding: 10px 0 10px 10px;
            position: relative;
            text-decoration: none;
          }

          a:before {
            content: '-';
            display: inline-block;
            left: 0;
            opacity: 0.5;
            position: absolute;
            top: 9px;
          }

          a:visited {
            color: #000;
          }

          a.active {
            font-weight: 600;
          }

          @media screen and (max-width: 950px) {
            a {
              border-bottom: 1px solid #eee;
              padding: 20px 0 20px 10px;
            }

            a:before {
              content: '-';
              display: inline-block;
              left: 0;
              opacity: 0.5;
              position: absolute;
              top: 19px;
            }
          }
        `}</style>
      </li>
    )
  }
}

function isEntryActive({ isSectionActive, activeItem, entry }) {
  return isSectionActive && activeItem.entry === entry.slug
}

export default EntryIndex
