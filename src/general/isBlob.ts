import { toRawType } from './toRawType'

export function isBlob(val: unknown): val is Blob {
  return toRawType(val) === 'Blob'
}
