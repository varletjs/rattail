import { hasOwn, isArray, isString } from '../general'

export function get<T = any>(object: any, path: string | number | (string | number)[], defaultValue?: T): T {
  const keys = toKeys(object, path)

  if (keys.length === 0) {
    return defaultValue as T
  }

  let value = object

  for (const key of keys) {
    if (value == null) {
      return defaultValue as T
    }

    value = value[key]
  }

  return value === undefined ? (defaultValue as T) : value
}

function toKeys(object: any, path: string | number | (string | number)[]) {
  if (isString(path)) {
    return object != null && hasOwn(Object(object), path) ? [path] : parsePath(path)
  }

  if (isArray(path)) {
    return path
  }

  return path == null ? [] : [path]
}

function parsePath(path: string) {
  return Array.from(
    path.matchAll(/[^.[\]]+|\[(?:(["'])(.*?)\1|([^\]]*))\]/g),
    ([match, quote, quotedKey, bracketKey]) => (quote ? quotedKey : (bracketKey ?? match)),
  )
}
