import { baseRound } from './round'

export function ceil(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.ceil)
}
