export function sumBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((ret, val) => ret + fn(val), 0)
}
