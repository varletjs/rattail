import { differenceWith } from './differenceWith'

export function difference<T>(arr: T[], ...values: T[][]): T[] {
  return differenceWith(arr, ...values, (a, b) => a === b)
}
