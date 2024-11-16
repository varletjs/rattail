import { isArray } from '../general'

export function mapObject<K extends PropertyKey, V, NK extends PropertyKey = K, NV = V>(
  object: Record<K, V>,
  fn: (key: K, value: V) => [PropertyKey, NV] | undefined,
): Record<NK, NV> {
  return Object.entries(object).reduce(
    (result, [key, value]) => {
      const entry = fn(key as K, value as V)

      if (isArray(entry)) {
        const [newKey, newValue] = entry
        result[newKey as NK] = newValue
      }

      return result
    },
    {} as Record<NK, NV>,
  )
}
