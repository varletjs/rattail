import { sum } from './sum'

export function mean(arr: number[]) {
  return sum(arr) / arr.length
}
