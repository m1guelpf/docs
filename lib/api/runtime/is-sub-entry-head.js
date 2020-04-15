import { pathOr } from 'ramda'

export default function isSubEntryHead(child) {
  return pathOr(undefined, ['props', 'name'], child) === 'h4'
}
