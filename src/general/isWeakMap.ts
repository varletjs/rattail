import { toRawType } from './toRawType'

export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return toRawType(val) === 'WeakMap'
}
