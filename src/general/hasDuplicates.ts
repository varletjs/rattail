import { uniq } from '../array/uniq'

export function hasDuplicates<T>(arr: T[]): boolean {
  return uniq(arr).length !== arr.length
}
