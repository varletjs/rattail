import { toRawType } from './toRawType'

export function isPlainObject(val: unknown): val is Record<string, any> {
  return toRawType(val) === 'Object'
}
