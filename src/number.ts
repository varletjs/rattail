import { isBoolean, isString } from './general'

export function toNumber(val: number | string | boolean | undefined | null): number {
  if (val == null) {
    return 0
  }

  if (isString(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBoolean(val)) {
    return Number(val)
  }

  return val
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num))
}

export function clampArrayRange(index: number, arr: Array<unknown>) {
  return clamp(index, 0, arr.length - 1)
}

let key = 0

export function genNumberKey() {
  return key++
}

export function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function times<T>(num: number, fn: (index: number) => T) {
  return Array.from({ length: num }, (_, index) => fn(index))
}

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
