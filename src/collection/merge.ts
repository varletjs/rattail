import { mergeWith } from './mergeWith'

export function merge<T extends Record<string, any>, K extends Record<string, any>>(object: T, source: K) {
  return mergeWith(object, source, () => undefined)
}
