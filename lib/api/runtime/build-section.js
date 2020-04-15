import slugifyTitle from './slugify-title'
import isMainSectionHead from './is-main-section-head'
import isSectionHead from './is-section-head'
import isEntryHead from './is-entry-head'
import createBuildEntry from './build-entry'

const isSectionEnd = child => isMainSectionHead(child) || isSectionHead(child)

export default function createBuildSection(title) {
  const slug = slugifyTitle(title)
  return function buildSection(children, prevContent, entries = []) {
    const [child, ...rest] = children || []

    if (isEntryHead(child)) {
      const buildEntry = createBuildEntry(child.props.children)
      const [entry, remaining] = buildEntry(rest, [child])
      return buildSection(remaining, prevContent, [...entries, entry.structure])
    }

    if (isSectionEnd(child) || !child) {
      const content = prevContent
      const structure = { title, slug, entries, content }
      return [{ structure }, children]
    }

    return buildSection(rest, [...prevContent, child], entries)
  }
}
