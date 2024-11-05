import { isBoolean, isString } from '../general'

export function toNumber(val: number | string | boolean | undefined | null): number {
  if (val == null) {
    return 0
  }

  if (isString(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBoolean(val)) {
    return Number(val)
  }

  return val
}
