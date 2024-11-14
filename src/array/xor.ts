import { xorWith } from './xorWith'

export function xor<T>(...values: T[][]): T[] {
  return xorWith(...values, (a, b) => a === b)
}
