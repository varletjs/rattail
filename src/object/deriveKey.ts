import { hasOwn } from '../general'

type DeriveKeyMap<T extends object> = Partial<Record<keyof T, PropertyKey>>

type DeriveKeyResult<T extends object, M extends DeriveKeyMap<T>> = T & {
  [K in keyof M as M[K] extends PropertyKey ? M[K] : never]: K extends keyof T ? T[K] : never
}

export function deriveKey<T extends object, M extends DeriveKeyMap<T>>(object: T, mapping: M): DeriveKeyResult<T, M> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]
  const result = ownKeys.reduce(
    (result, key) => {
      result[key as keyof typeof result] = object[key as keyof T] as never
      return result
    },
    {} as DeriveKeyResult<T, M>,
  )

  const mappingKeys = [...Object.keys(mapping), ...Object.getOwnPropertySymbols(mapping)]

  mappingKeys.forEach((key) => {
    if (!hasOwn(object, key)) {
      return
    }

    const nextKey = mapping[key as keyof M]
    result[nextKey as keyof typeof result] = object[key as keyof T] as never
  })

  return result
}
