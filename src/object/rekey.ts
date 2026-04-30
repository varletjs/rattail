import { hasOwn } from '../general'

type RekeyMap<T extends object> = Partial<Record<keyof T, PropertyKey>>

type RekeyResult<T extends object, M extends RekeyMap<T>> = Omit<T, keyof M> & {
  [K in keyof M as M[K] extends PropertyKey ? M[K] : never]: K extends keyof T ? T[K] : never
}

export function rekey<T extends object, M extends RekeyMap<T>>(object: T, mapping: M): RekeyResult<T, M> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce(
    (result, key) => {
      const nextKey = hasOwn(mapping, key) ? mapping[key] : key
      result[nextKey as keyof typeof result] = object[key as keyof T] as never
      return result
    },
    {} as RekeyResult<T, M>,
  )
}
