import { clamp } from './clamp'

export function clampArrayRange(index: number, arr: unknown[]) {
  return clamp(index, 0, arr.length - 1)
}
