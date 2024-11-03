import { isFunction, isObject, toTypeString } from './general'
import { randomNumber } from './number'

export function sum(arr: number[]) {
  return arr.reduce((ret, val) => ret + val, 0)
}

export function sumBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((ret, val) => ret + fn(val), 0)
}

export function minBy<T>(arr: T[], fn: (val: T) => number) {
  if (!arr.length) {
    return
  }

  return arr.reduce((result, item) => (fn(result) < fn(item) ? result : item), arr[0])
}

export function maxBy<T>(arr: T[], fn: (val: T) => number) {
  if (!arr.length) {
    return
  }

  return arr.reduce((result, item) => (fn(result) > fn(item) ? result : item), arr[0])
}

export function mean(arr: number[]) {
  return sum(arr) / arr.length
}

export function meanBy<T>(arr: T[], fn: (val: T) => number) {
  return sumBy(arr, fn) / arr.length
}

export function sample<T>(arr: T[]) {
  if (!arr.length) {
    return
  }

  return arr[randomNumber(0, arr.length - 1)]
}

export function sumHash(value: any): string {
  function sum(hash: number, value: string): number {
    for (let i = 0; i < value.length; i++) {
      const chr = value.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }

    return hash < 0 ? hash * -2 : hash
  }

  function sumObject(hash: number, object: Record<string, any>, seen: any[]): number {
    return Object.keys(object)
      .sort()
      .reduce((hash, key) => sumValue(hash, (object as Record<string, any>)[key], key, seen), hash)
  }

  function sumValue(hash: number, value: any, key: string, seen: any[]): number {
    hash = sum(hash, key)
    hash = sum(hash, toTypeString(value))
    hash = sum(hash, typeof value)

    if (value === null) {
      return sum(hash, 'null')
    }

    if (value === undefined) {
      return sum(hash, 'undefined')
    }

    if (isObject(value) || isFunction(value)) {
      if (seen.includes(value)) {
        return sum(hash, `[Circular]${key}`)
      }

      seen.push(value)

      hash = sumObject(hash, value, seen)

      if (isFunction(value.valueOf)) {
        try {
          return sum(hash, String(value.valueOf()))
        } catch (err) {
          return sum(hash, `[valueOf exception]${(err as Error).message}`)
        }
      }

      return hash
    }

    return sum(hash, value.toString())
  }

  return sumValue(0, value, '', []).toString(16).padStart(8, '0')
}
