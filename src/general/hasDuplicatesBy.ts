import { uniqBy } from '../array/uniqBy'

export function hasDuplicatesBy<T>(arr: T[], fn: (a: T, b: T) => any): boolean {
  return uniqBy(arr, fn).length !== arr.length
}
