import slugifyTitle from './slugify-title'
import isMainSectionHead from './is-main-section-head'
import isSectionHead from './is-section-head'
import createBuildSection from './build-section'

export default function createBuildMainSection(title) {
  const slug = slugifyTitle(title)
  return function buildMainSection(children = [], prevContent, sections = []) {
    const [child, ...rest] = children || []

    if (isSectionHead(child)) {
      const buildSection = createBuildSection(child.props.children)
      const [section, remaining] = buildSection(rest, [child])
      return buildMainSection(remaining, prevContent, [
        ...sections,
        section.structure
      ])
    }

    if (isMainSectionHead(child) || !child) {
      const content = prevContent
      const structure = { title, slug, sections, content }
      return [{ content, structure }, children]
    }

    return buildMainSection(rest, [...prevContent, child], sections)
  }
}
