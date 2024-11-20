import { isArray } from './isArray'

export function isNonEmptyArray(val: unknown): val is any[] {
  return isArray(val) && !!val.length
}
