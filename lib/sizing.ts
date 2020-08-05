const sizes = {
  large: 24,
  small: 16,
  default: 20
}

export type Size = 'small' | 'large'

export function getIxIconSize(size?: Size) {
  return sizes[size || 'default']
}