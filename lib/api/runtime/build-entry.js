import slugifyTitle from './slugify-title'
import isSubEntryHead from './is-sub-entry-head'
import isEntryHead from './is-entry-head'
import isMainSectionHead from './is-main-section-head'
import isSectionHead from './is-section-head'
import createBuildSubEntry from './build-sub-entry'

const isEntryEnd = child =>
  isEntryHead(child) || isMainSectionHead(child) || isSectionHead(child)

export default function createBuildEntry(title) {
  const slug = slugifyTitle(title)
  return function buildEntry(children, prevContent, subEntries = []) {
    const [child, ...rest] = children || []

    if (isSubEntryHead(child)) {
      const buildSubEntry = createBuildSubEntry(child.props.children)
      const [subEntry, remaining] = buildSubEntry(rest, [child])
      return buildEntry(remaining, prevContent, [
        ...subEntries,
        subEntry.structure
      ])
    }

    if (isEntryEnd(child) || !child) {
      const content = prevContent
      const structure = { title, slug, subEntries, content }
      return [{ structure }, children]
    }

    return buildEntry(rest, [...prevContent, child], subEntries)
  }
}
