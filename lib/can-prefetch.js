export default function canPrefetch(href) {
  if (!href) {
    return false
  }
  return (
    href.startsWith('/docs') ||
    href.startsWith('/api') ||
    href.startsWith('/error') ||
    href.startsWith('/guides') ||
    href.startsWith('/knowledge')
  )
}
