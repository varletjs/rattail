import { isArray } from './general'

export function uniq<T>(arr: T[]) {
  return [...new Set(arr)]
}

export function uniqBy<T>(arr: T[], fn: (a: T, b: T) => boolean): T[] {
  return arr.reduce((ret: T[], i: T) => {
    const index = ret.findIndex((j: T) => fn(i, j))

    if (index === -1) {
      ret.push(i)
    }

    return ret
  }, [])
}

export function normalizeToArray<T>(value: T | T[]) {
  return isArray(value) ? value : [value]
}

export function removeItem<T>(arr: Array<T>, item: T) {
  if (arr.length) {
    const index: number = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function toggleItem<T>(arr: Array<T>, item: T) {
  arr.includes(item) ? removeItem(arr, item) : arr.push(item)
  return arr
}

export function removeArrayBlank<T>(arr: Array<T | null | undefined>) {
  return arr.filter((item) => item != null) as T[]
}

export const removeArrayEmpty = <T>(arr: Array<T | null | undefined | ''>) =>
  arr.filter((item) => item != null && item !== '') as T[]

export function find<T>(
  arr: Array<T>,
  fn: (item: T, index: number, array: Array<T>) => any,
  from: 'start' | 'end' = 'start',
): [T, number] | [null, -1] {
  let i = from === 'start' ? 0 : arr.length - 1

  while (arr.length > 0 && i >= 0 && i <= arr.length - 1) {
    const flag = fn(arr[i], i, arr)

    if (flag) {
      return [arr[i], i]
    }

    from === 'start' ? i++ : i--
  }

  return [null, -1]
}

export function at<T>(arr: T[], index: number): T | undefined {
  if (!arr.length) {
    return
  }

  if (index < 0) {
    index += arr.length
  }

  return arr[index]
}

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function sum(arr: number[]) {
  return arr.reduce((ret, val) => ret + val, 0)
}

export function sumBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((ret, val) => ret + fn(val), 0)
}
