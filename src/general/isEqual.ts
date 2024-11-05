import { isEqualWith } from './isEqualWith'

export function isEqual(value: any, other: any): boolean {
  return isEqualWith(value, other, () => undefined)
}
