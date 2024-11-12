import { at } from './at'
import { uniqBy } from './uniqBy'

type Fn<T> = (a: T, b: T) => any

export function intersectionWith<T>(...values: [...T[][], fn: Fn<T>]): T[] {
  const fn = at(values, -1) as Fn<T>
  const targets = values.slice(0, -1) as T[][]

  if (targets.length === 0) {
    return []
  }

  if (targets.length === 1) {
    return uniqBy(targets[0], fn)
  }

  function baseIntersectionWith(arr1: T[], arr2: T[]): T[] {
    return arr1.filter((item) => arr2.some((value) => fn(item, value)))
  }

  return uniqBy(
    targets.reduce((result, target) => baseIntersectionWith(result, target)),
    fn,
  )
}
