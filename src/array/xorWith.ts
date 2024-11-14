import { at } from './at'
import { differenceWith } from './differenceWith'
import { uniqBy } from './uniqBy'

type Fn<T> = (a: T, b: T) => any

export function xorWith<T>(...values: [...T[][], fn: Fn<T>]): T[] {
  const fn = at(values, -1) as Fn<T>
  const targets = values.slice(0, -1) as T[][]

  return uniqBy(
    targets.reduce((result, target) => {
      return [...differenceWith(result, target, fn), ...differenceWith(target, result, fn)]
    }),
    fn,
  )
}
