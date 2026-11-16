import { hasOwn } from '../general'

type Fn<T, K> = (val: T) => K

export function groupBy<T, K extends PropertyKey>(arr: T[], fn: Fn<T, K>): Record<K, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = fn(item)

      if (hasOwn(result, key)) {
        result[key].push(item)
      } else {
        // defineProperty avoids inherited Object.prototype members and the `__proto__` setter
        Object.defineProperty(result, key, {
          value: [item],
          enumerable: true,
          writable: true,
          configurable: true,
        })
      }

      return result
    },
    {} as Record<K, T[]>,
  )
}
