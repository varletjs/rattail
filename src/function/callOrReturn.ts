import { isFunction } from '../general'

export function callOrReturn<T, A extends any[]>(fnOrValue: T | ((...args: A) => T), ...args: A): T {
  if (isFunction(fnOrValue)) {
    return fnOrValue(...args)
  }

  return fnOrValue
}
