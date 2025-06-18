import { isArray } from './isArray'

export function isEmpty(val: string): val is ''
export function isEmpty<T>(val: T | null | undefined): val is null | undefined
export function isEmpty<T extends any[]>(val: T): val is T
export function isEmpty(val: unknown): boolean {
  return val === undefined || val === null || val === '' || (isArray(val) && !val.length)
}
