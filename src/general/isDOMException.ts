import { toRawType } from './toRawType'

export function isDOMException(val: unknown): val is DOMException {
  return toRawType(val) === 'DOMException'
}
