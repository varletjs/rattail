import { isArray } from './isArray'

export function isNonEmptyArray(val: unknown): val is Array<any> {
  return isArray(val) && !!val.length
}
