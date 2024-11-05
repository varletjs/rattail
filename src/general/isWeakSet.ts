import { toRawType } from './toRawType'

export function isWeakSet(val: unknown): val is WeakSet<any> {
  return toRawType(val) === 'WeakSet'
}
