import { isArray } from '../general'

export function normalizeToArray<T>(value: T | T[]) {
  return isArray(value) ? value : [value]
}
