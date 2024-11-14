export function times<T>(num: number, fn: (index: number) => T): T[] {
  return Array.from({ length: num }, (_, index) => fn(index))
}
