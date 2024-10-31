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
