export function find<T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any,
  from: 'start' | 'end' = 'start',
): [T, number] | [null, -1] {
  let i = from === 'start' ? 0 : arr.length - 1

  while (arr.length > 0 && i >= 0 && i <= arr.length - 1) {
    const flag = fn(arr[i], i, arr)

    if (flag) {
      return [arr[i], i]
    }

    from === 'start' ? i++ : i--
  }

  return [null, -1]
}
