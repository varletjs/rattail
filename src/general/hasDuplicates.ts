import { uniq } from '../array'

export function hasDuplicates<T>(arr: T[]): boolean {
  return uniq(arr).length !== arr.length
}
