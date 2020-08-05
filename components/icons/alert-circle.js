import withIcon from '~/lib/with-icon'

const AlertCircle = `<circle cx="12" cy="12" r="10" fill="var(--geist-fill)"/><path d="M12 8v4" stroke="var(--geist-stroke)"/><path d="M12 16h.01" stroke="var(--geist-stroke)"/>`

export default withIcon(AlertCircle, true, {
  color: 'var(--geist-warning)',
  secondary: 'var(--geist-background)'
})
