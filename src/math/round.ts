import { clamp } from '../number'

export function round(val: number, precision: number = 0) {
  precision = clamp(precision, -292, 292)

  if (!precision) {
    return Math.round(val)
  }

  const value = Math.round(`${val}e${precision}` as any)
  return +`${value}e${-precision}`
}
