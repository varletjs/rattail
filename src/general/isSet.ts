import { toRawType } from './toRawType'

export function isSet(val: unknown): val is Set<any> {
  return toRawType(val) === 'Set'
}
