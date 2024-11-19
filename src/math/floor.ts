import { baseRound } from './round'

export function floor(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.floor)
}
