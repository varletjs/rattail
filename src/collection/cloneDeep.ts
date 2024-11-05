import { cloneDeepWith } from './cloneDeepWith'

export function cloneDeep<T>(value: T): T {
  return cloneDeepWith(value, () => undefined)
}
