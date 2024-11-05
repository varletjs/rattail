import { toRawType } from './toRawType'

export function isDataView(val: unknown): val is DataView {
  return toRawType(val) === 'DataView'
}
