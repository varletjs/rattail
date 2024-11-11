import { mergeWith } from './mergeWith'

export function merge<T extends Record<string, any>, K extends Record<string, any>>(object: T, ...sources: K[]) {
  return mergeWith(object, ...sources, () => undefined)
}
