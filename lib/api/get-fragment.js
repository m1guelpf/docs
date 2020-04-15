export default function getFragment({ category, section, entry, subEntry }) {
  return `${category}${section ? `/${section}` : ''}${
    entry ? `/${entry}` : ''
  }${subEntry ? `/${subEntry}` : ''}`
}
