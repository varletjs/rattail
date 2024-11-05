import { toRawType } from './toRawType'

export function isRegExp(val: unknown): val is RegExp {
  return toRawType(val) === 'RegExp'
}
