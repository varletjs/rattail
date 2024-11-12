import { at } from './at'

type Fn<T> = (a: T, b: T) => any

export function differenceWith<T>(arr: T[], ...values: [...T[][], fn: Fn<T>]): T[] {
  const fn = at(values, -1) as Fn<T>
  const targets = (values.slice(0, -1) as T[][]).reduce((targets, value) => [...targets, ...value], [])

  return arr.filter((item) => !targets.some((value) => fn(item, value)))
}
