export function times<T>(num: number, fn: (index: number) => T) {
  return Array.from({ length: num }, (_, index) => fn(index))
}
