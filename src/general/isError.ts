import { toRawType } from './toRawType'

export function isError(val: unknown): val is Error {
  return toRawType(val) === 'Error'
}
