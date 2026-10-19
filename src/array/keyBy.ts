export function keyBy<T, K extends PropertyKey, V = T>(
  arr: readonly T[],
  keyFn: (item: T, index: number) => K,
  valueFn?: (item: T, index: number) => V,
): Record<K, V> {
  return Object.fromEntries(
    arr.map((item, index) => [keyFn(item, index), valueFn ? valueFn(item, index) : item]),
  ) as Record<K, V>
}
