import slugifyTitle from './slugify-title'
import isSubEntryHead from './is-sub-entry-head'
import isEntryHead from './is-entry-head'
import isMainSectionHead from './is-main-section-head'
import isSectionHead from './is-section-head'

const isSubEntryEnd = child =>
  isSubEntryHead(child) ||
  isMainSectionHead(child) ||
  isSectionHead(child) ||
  isEntryHead(child)

export default function createBuildSubEntry(title) {
  const slug = slugifyTitle(title)
  return function buildSubEntry(children, prevContent) {
    const [child, ...rest] = children

    if (isSubEntryEnd(child) || rest.length === 0) {
      const content = rest.length !== 0 ? prevContent : [...prevContent, child]
      const structure = { title, slug, content }
      return [{ structure }, rest.length !== 0 ? children : null]
    }

    return buildSubEntry(rest, [...prevContent, child])
  }
}
