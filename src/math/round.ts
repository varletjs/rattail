import { clamp } from '../number'

export function round(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.round)
}

export function baseRound(val: number, precision: number, fn: (val: number) => number) {
  precision = clamp(precision ?? 0, -292, 292)

  if (!precision) {
    return fn(val)
  }

  const value = fn(`${val}e${precision}` as any)
  return +`${value}e${-precision}`
}
