import { toTypeString } from './toTypeString'

export function toRawType(value: unknown): string {
  return toTypeString(value).slice(8, -1)
}
