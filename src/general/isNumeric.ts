import { isNumber } from './isNumber'
import { isString } from './isString'

export function isNumeric(val: unknown): val is number | string {
  return isNumber(val) || (isString(val) && /^[-+]?\d+$/.test(val))
}
