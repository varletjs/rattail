import { toRawType } from './toRawType'

export function isMap(val: unknown): val is Map<any, any> {
  return toRawType(val) === 'Map'
}
