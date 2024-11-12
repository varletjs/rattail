import { intersectionWith } from './intersectionWith'

export function intersection<T>(...values: T[][]): T[] {
  return intersectionWith(...values, (a, b) => a === b)
}
