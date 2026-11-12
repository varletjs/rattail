import { isArray } from '../general/isArray'

export function normalizeToArray<T>(value: T | T[]) {
  return isArray(value) ? value : [value]
}
