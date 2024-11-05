import { sumBy } from './sumBy'

export function meanBy<T>(arr: T[], fn: (val: T) => number) {
  return sumBy(arr, fn) / arr.length
}
