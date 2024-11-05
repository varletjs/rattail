import { toRawType } from './toRawType'

export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toRawType(val) === 'ArrayBuffer'
}
