import { toRawType } from './toRawType'

export function isDate(val: unknown): val is Date {
  return toRawType(val) === 'Date'
}
