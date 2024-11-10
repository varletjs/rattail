import { toRawType } from './toRawType'

export function isFile(val: unknown): val is File {
  return toRawType(val) === 'File'
}
