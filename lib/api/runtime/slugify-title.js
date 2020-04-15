import slugify from '@sindresorhus/slugify'

export default function slugifyTitle(title) {
  if (Array.isArray(title)) {
    const combinedTitle = title
      .map(item => {
        // If child is NameWrapper, get the value from the name prop
        if (typeof item === 'object' && item !== null && item.props) {
          return item.props.name || ''
        } else {
          return item
        }
      })
      .join()
    return slugify(combinedTitle, { decamelize: false })
  } else if (typeof title === 'object' && title !== null && title.props) {
    return title.props.name || ''
  } else {
    return slugify(title, { decamelize: false })
  }
}
