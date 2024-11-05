import { clamp } from '../number'

export function chunk<T>(arr: T[], size = 1): T[][] {
  size = clamp(size, 1, arr.length)

  const result: T[][] = []
  let index = 0

  while (index < arr.length) {
    result.push(arr.slice(index, index + size))
    index += size
  }

  return result
}
