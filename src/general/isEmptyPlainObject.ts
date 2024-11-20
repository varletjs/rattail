import { isPlainObject } from './isPlainObject'

export function isEmptyPlainObject(val: unknown): val is Record<string, any> {
  return isPlainObject(val) && Object.keys(val).length === 0 && Object.getOwnPropertySymbols(val).length === 0
}
