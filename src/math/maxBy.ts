export function maxBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((result, item) => (fn(result) > fn(item) ? result : item), arr[0])
}
