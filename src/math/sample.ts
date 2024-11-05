import { randomNumber } from '../number'

export function sample<T>(arr: T[]) {
  if (!arr.length) {
    return
  }

  return arr[randomNumber(0, arr.length - 1)]
}
