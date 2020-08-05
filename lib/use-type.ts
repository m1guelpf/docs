// Hook alternative to the withType HOC
// returns the appropriate className

export type Types =
  | 'secondary'
  | 'warning'
  | 'success'
  | 'default'
  | 'alert'
  | 'error'
  | 'lite'
  | 'ghost'
  | 'alert'
  | 'violet'

export type Variants = 'contrast'

export interface WithTypeProps {
  type?: Types
  fill?: boolean
  variant?: Variants
}

const useType = (type?: Types, fill?: boolean, variant?: Variants) => {
  if (!type) return ''
  return [
    'geist-themed',
    `geist-${type}`,
    fill ? `geist-${type}-fill` : null,
    variant ? `geist-${type}-${variant}` : null
  ]
}

export default useType